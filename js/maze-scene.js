import * as THREE from "three";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";
import { PROJECT_COLORS } from "./i18n.js";
import { createPlayerRobot, updatePlayerRobot } from "./player-robot.js";
import { getPixelRatio, useBloom, envCounts } from "./perf.js";

/**
 * Robotics-lab corridor maze. Boustrophedon route threads four project
 * "chambers" (stations) in order, then opens an exit. Side stubs are
 * decorative dead-ends — the BFS route always finds the lit path.
 */
const MAZE_ROWS = [
  "###########",
  "#S.......1#",
  "#########.#",
  "#3.......2#",
  "#.#########",
  "#4.......E#",
  "###########",
];

const CELL = 5.5;
/** Collision radius — slightly smaller than the robot mesh to slip through corridor corners. */
const PLAYER_COLLIDE_R = 0.5;
/** Overlap adjacent wall hitboxes so seams between blocks cannot be slipped through. */
const WALL_COLLIDE_SEAM = 0.2;
const GATE_RADIUS = 3.2;
const EXIT_RADIUS = 3.2;
const WALL_H = 5.0;

const GATE_ORDER = ["dl", "iot", "ros", "pai"];
const GATE_CHAR = { "1": "dl", "2": "iot", "3": "ros", "4": "pai" };

// ── Palette (cool neon lab) ──
const COL_BG = 0x05070d;
const COL_FOG = 0x070b14;
const COL_WALL = 0x1a3048;
const COL_RAIL = 0x2fe1ff; // glowing wall edge
const COL_ROUTE = 0x1cffc4; // lit corridor lane
const COL_ARROW = 0x6affe0;
const COL_EXIT = 0xffd166;

function parseMazeRows(rows) {
  const walls = [];
  const paths = [];
  let start = { c: 1, r: 1 };
  let exit = { c: 25, r: 21 };
  const gates = {};
  for (let r = 0; r < rows.length; r++) {
    const row = rows[r];
    for (let c = 0; c < row.length; c++) {
      const ch = row[c];
      if (ch === "#") walls.push({ c, r });
      else {
        paths.push({ c, r });
        if (ch === "S") start = { c, r };
        if (ch === "E") exit = { c, r };
        if (GATE_CHAR[ch]) gates[GATE_CHAR[ch]] = { c, r };
      }
    }
  }
  return { walls, paths, start, exit, cols: rows[0].length, rows: rows.length, gates };
}

function bfsPath(pathsSet, a, b) {
  const key = (p) => `${p.c},${p.r}`;
  const q = [a];
  const prev = new Map([[key(a), null]]);
  while (q.length) {
    const p = q.shift();
    if (p.c === b.c && p.r === b.r) {
      const out = [];
      let cur = p;
      while (cur) {
        out.unshift([cur.c, cur.r]);
        cur = prev.get(key(cur));
      }
      return out;
    }
    for (const [dc, dr] of [
      [0, 1],
      [0, -1],
      [1, 0],
      [-1, 0],
    ]) {
      const n = { c: p.c + dc, r: p.r + dr };
      const nk = key(n);
      if (pathsSet.has(nk) && !prev.has(nk)) {
        prev.set(nk, p);
        q.push(n);
      }
    }
  }
  return null;
}

function buildRouteCells(maze) {
  const pathsSet = new Set(maze.paths.map((p) => `${p.c},${p.r}`));
  const waypoints = [maze.start, ...GATE_ORDER.map((k) => maze.gates[k]), maze.exit];
  const route = [];
  for (let i = 0; i < waypoints.length - 1; i++) {
    const seg = bfsPath(pathsSet, waypoints[i], waypoints[i + 1]);
    if (!seg) {
      console.warn("[maze] route segment missing", waypoints[i], waypoints[i + 1]);
      continue;
    }
    if (!route.length) route.push(...seg);
    else route.push(...seg.slice(1));
  }
  return route;
}

const STATION_LABEL = {
  dl: "STATION 01 · GESTO",
  iot: "STATION 02 · PARKING",
  ros: "STATION 03 · SHOPPINKKI",
  pai: "STATION 04 · PINGDERGARTEN",
};

const MAZE = parseMazeRows(MAZE_ROWS);
const GATES = MAZE.gates;
const ROUTE_CELLS = buildRouteCells(MAZE);

function cellCenter(c, r) {
  const { cols, rows } = MAZE;
  const ox = (-cols * CELL) / 2 + CELL / 2;
  const oz = (-rows * CELL) / 2 + CELL / 2;
  return new THREE.Vector3(ox + c * CELL, 0, oz + r * CELL);
}

function mazeOrigin() {
  const { cols, rows } = MAZE;
  return { ox: (-cols * CELL) / 2, oz: (-rows * CELL) / 2 };
}

function cellAabb(c, r) {
  const { ox, oz } = mazeOrigin();
  const seam = WALL_COLLIDE_SEAM;
  return {
    minX: ox + c * CELL - seam,
    maxX: ox + (c + 1) * CELL + seam,
    minZ: oz + r * CELL - seam,
    maxZ: oz + (r + 1) * CELL + seam,
  };
}

function worldToGrid(px, pz) {
  const { ox, oz } = mazeOrigin();
  return {
    c: Math.floor((px - ox) / CELL),
    r: Math.floor((pz - oz) / CELL),
  };
}

function isWallGridCell(c, r) {
  return MAZE.walls.some((w) => w.c === c && w.r === r);
}

function isWalkablePosition(px, pz) {
  const { cols, rows } = MAZE;
  const { c, r } = worldToGrid(px, pz);
  if (c < 0 || c >= cols || r < 0 || r >= rows) return false;
  if (isWallGridCell(c, r)) return false;
  return !circleCollidesWalls(px, pz);
}

function circleHitsCell(px, pz, c, r, radius) {
  const { minX, maxX, minZ, maxZ } = cellAabb(c, r);
  const cx = THREE.MathUtils.clamp(px, minX, maxX);
  const cz = THREE.MathUtils.clamp(pz, minZ, maxZ);
  const dx = px - cx;
  const dz = pz - cz;
  return dx * dx + dz * dz < radius * radius;
}

function circleCollidesWalls(px, pz, radius = PLAYER_COLLIDE_R) {
  const { walls, cols, rows } = MAZE;
  const { ox, oz } = mazeOrigin();
  const c0 = Math.floor((px - ox) / CELL) - 1;
  const c1 = Math.floor((px - ox) / CELL) + 2;
  const r0 = Math.floor((pz - oz) / CELL) - 1;
  const r1 = Math.floor((pz - oz) / CELL) + 2;
  for (const w of walls) {
    if (w.c < c0 || w.c > c1 || w.r < r0 || w.r > r1) continue;
    if (circleHitsCell(px, pz, w.c, w.r, radius)) return true;
  }
  if (px < ox || pz < oz || px > ox + cols * CELL || pz > oz + rows * CELL) return true;
  return false;
}

function lerpAngle(a, b, t) {
  let d = ((b - a + Math.PI) % (Math.PI * 2)) - Math.PI;
  if (d < -Math.PI) d += Math.PI * 2;
  return a + d * t;
}

function makeLabelSprite(text, color, sub = "") {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = sub ? 100 : 76;
  const ctx = canvas.getContext("2d");
  const hex = typeof color === "number" ? color.toString(16).padStart(6, "0") : "2dffb3";
  ctx.fillStyle = "rgba(5,10,18,0.82)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = `#${hex}`;
  ctx.lineWidth = 3;
  ctx.strokeRect(5, 5, canvas.width - 10, canvas.height - 10);
  ctx.shadowColor = `#${hex}`;
  ctx.shadowBlur = 12;
  ctx.font = "bold 27px 'JetBrains Mono', monospace";
  ctx.fillStyle = "#eaf6ff";
  ctx.textAlign = "center";
  ctx.fillText(text, 256, sub ? 40 : 48);
  ctx.shadowBlur = 0;
  if (sub) {
    ctx.font = "18px 'JetBrains Mono', monospace";
    ctx.fillStyle = `#${hex}`;
    ctx.fillText(sub, 256, 74);
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  const mat = new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false });
  const sprite = new THREE.Sprite(mat);
  sprite.scale.set(7.8, sub ? 1.7 : 1.25, 1);
  sprite.position.y = 5.4;
  return sprite;
}

export class MazeScene {
  constructor(container, options = {}) {
    this.container = container;
    this.perf = options.perf ?? "medium";
    this.useBloomPass = useBloom(this.perf);
    this._env = envCounts(this.perf);
    this.nearZone = null;
    this.nearExit = false;
    this.nearExitProximity = false;
    this.onZoneFocus = null;
    this.onZoneActivate = null;
    this.onReachExit = null;
    this.onGateLocked = null;
    this.onStep = null;
    this.onArrive = null;
    this._stepT = 0;
    this.paused = false;
    this.visited = new Set();
    this.arrived = new Set();
    this.bursts = [];
    this._stuckTime = 0;

    this.keys = { w: false, a: false, s: false, d: false, shift: false };
    this.stickX = 0;
    this.stickZ = 0;
    this.facing = 0;
    this.pulse = 0;
    this.moveSpeed = 0;
    this.velX = 0;
    this.velZ = 0;

    const { start } = MAZE;

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(COL_BG);
    // Light fog — clear top-down view, only the far edges fade out.
    this.scene.fog = new THREE.Fog(COL_FOG, 30, 130);

    this.camera = new THREE.PerspectiveCamera(58, 1, 0.5, 220);
    this.camera.position.set(0, 24, 14);

    this.renderer = new THREE.WebGLRenderer({
      antialias: this.perf !== "low",
      powerPreference: "high-performance",
    });
    this.renderer.setPixelRatio(getPixelRatio(this.perf));
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.0;
    container.appendChild(this.renderer.domElement);

    this._composer();
    this._lights();
    this._floor();
    this._environment();
    this._routeLane();
    this._routeArrows();
    this._walls();
    this._particles();
    this._player(start);
    this._gates();
    this._exitMarker();
    this._frame = 0;

    window.addEventListener("resize", () => this._resize());
    window.addEventListener("keydown", (e) => this._key(e, true));
    window.addEventListener("keyup", (e) => this._key(e, false));
    window.addEventListener("keydown", (e) => {
      if (e.key === "e" || e.key === "E" || e.key === "Enter") this.tryInteract();
    });

    this.clock = new THREE.Clock();
    this._resize();
    this._loop();
  }

  getNextGate() {
    return GATE_ORDER[this.visited.size] ?? null;
  }

  canActivateGate(key) {
    return key === this.getNextGate();
  }

  get currentKey() {
    return this.nearZone ?? this.getNextGate() ?? "dl";
  }

  get visitCount() {
    return this.visited.size;
  }

  setPaused(p) {
    this.paused = p;
    if (p) {
      this.keys = { w: false, a: false, s: false, d: false, shift: false };
      this.stickX = 0;
      this.stickZ = 0;
      this.velX = 0;
      this.velZ = 0;
      this.moveSpeed = 0;
    }
  }

  setVirtualStick(x, z) {
    this.stickX = x;
    this.stickZ = z;
  }

  setVirtualKey(key, down) {
    if (!this.keys) return;
    const k = String(key).toLowerCase();
    if (k in this.keys) this.keys[k] = down;
  }

  tryInteract() {
    if (this.paused || document.body.classList.contains("cutscene-mode")) return;
    if (this.nearExit) {
      if (this.visited.size >= 4 && this.onReachExit) this.onReachExit();
      else if (this.onGateLocked) this.onGateLocked("exit");
      return;
    }
    if (this.nearZone) {
      if ((this.canActivateGate(this.nearZone) || this.visited.has(this.nearZone)) && this.onZoneActivate) {
        this.onZoneActivate(this.nearZone);
      } else if (this.onGateLocked) {
        this.onGateLocked(this.nearZone);
      }
    }
  }

  teleportToGate(key) {
    const idx = GATE_ORDER.indexOf(key);
    if (idx < 0) return;
    if (idx > this.visited.size) return;
    const g = GATES[key];
    if (!g) return;
    this._snapToFreePosition(cellCenter(g.c, g.r));
    this.velX = 0;
    this.velZ = 0;
    this._stuckTime = 0;
  }

  _composer() {
    if (!this.useBloomPass) return;
    this.composer = new EffectComposer(this.renderer);
    this.composer.addPass(new RenderPass(this.scene, this.camera));
    const bloomStr = this.perf === "medium" ? 0.22 : 0.3;
    this.bloom = new UnrealBloomPass(new THREE.Vector2(1, 1), bloomStr, 0.26, 0.62);
    this.composer.addPass(this.bloom);
    this.composer.addPass(new OutputPass());
  }

  _render() {
    if (this.useBloomPass && this.composer) this.composer.render();
    else this.renderer.render(this.scene, this.camera);
  }

  _lights() {
    // Moderate ambient so the wider top-down view stays readable; neon still pops.
    this.scene.add(new THREE.HemisphereLight(0x2a4366, 0x04060a, 0.42));
    const key = new THREE.DirectionalLight(0x9ec8ff, 0.4);
    key.position.set(12, 44, 16);
    this.scene.add(key);
    const fill = new THREE.DirectionalLight(0x2b5cff, 0.12);
    fill.position.set(-18, 22, -12);
    this.scene.add(fill);

    // Robot headlamp — a forward spotlight that reveals the corridor ahead.
    this.headlamp = new THREE.SpotLight(0xdbeeff, 60, 30, 0.62, 0.45, 1.2);
    this.headlampTarget = new THREE.Object3D();
    this.scene.add(this.headlamp);
    this.scene.add(this.headlampTarget);
    this.headlamp.target = this.headlampTarget;
  }

  _floor() {
    const { cols, rows } = MAZE;
    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(cols * CELL + 24, rows * CELL + 24),
      new THREE.MeshStandardMaterial({ color: 0x070b12, metalness: 0.2, roughness: 0.85 }),
    );
    floor.rotation.x = -Math.PI / 2;
    this.scene.add(floor);

    const size = Math.max(cols, rows) * CELL + 24;
    const grid = new THREE.GridHelper(size, Math.round(size / CELL), 0x1c3e58, 0x0e2436);
    grid.material.transparent = true;
    grid.material.opacity = 0.28;
    grid.material.depthWrite = false;
    grid.position.y = 0.02;
    this.scene.add(grid);
  }

  _routeLane() {
    const geo = new THREE.PlaneGeometry(CELL * 0.55, CELL * 0.55);
    // Unlit so it reads as pure light and feeds bloom; per-instance colour pulses.
    const mat = new THREE.MeshBasicMaterial({ toneMapped: true });
    this.laneMesh = new THREE.InstancedMesh(geo, mat, ROUTE_CELLS.length);
    this.laneMesh.instanceColor = null;
    const dummy = new THREE.Object3D();
    const base = new THREE.Color(COL_ROUTE);
    this._routeCenters = [];
    ROUTE_CELLS.forEach(([c, r], i) => {
      const p = cellCenter(c, r);
      this._routeCenters.push(p);
      dummy.position.set(p.x, 0.07, p.z);
      dummy.rotation.x = -Math.PI / 2;
      dummy.updateMatrix();
      this.laneMesh.setMatrixAt(i, dummy.matrix);
      this.laneMesh.setColorAt(i, base);
    });
    this.laneMesh.instanceMatrix.needsUpdate = true;
    this.laneMesh.instanceColor.setUsage(THREE.DynamicDrawUsage);
    this.scene.add(this.laneMesh);
    this._laneBase = base;
  }

  _environment() {
    const { cols, rows } = MAZE;
    const spanX = cols * CELL;
    const spanZ = rows * CELL;

    // Large faint outer grid → a sense of a bigger space beyond the maze.
    const big = new THREE.GridHelper(Math.max(spanX, spanZ) * 3.5, 44, 0x14304a, 0x0a1a2a);
    big.material.transparent = true;
    big.material.opacity = 0.16;
    big.material.depthWrite = false;
    big.position.y = -0.06;
    this.scene.add(big);

    const colors = [0x2fe1ff, 0x7c5cff, 0x1cffc4, 0x5a8cff, 0xffd166];
    const R = Math.max(spanX, spanZ) * 0.62;
    const seededRand = (n) => Math.abs(Math.sin(n * 127.1) * 43758.5453) % 1;

    // Inner ring of glowing pylons (caps feed bloom).
    const N = this._env.pylons;
    for (let i = 0; i < N; i++) {
      const a = (i / N) * Math.PI * 2;
      const x = Math.cos(a) * R * 1.3;
      const z = Math.sin(a) * R * 0.95;
      const col = colors[i % colors.length];
      const h = 3 + (i % 3) * 2.5;
      const pylon = new THREE.Mesh(
        new THREE.BoxGeometry(1.4, h, 1.4),
        new THREE.MeshStandardMaterial({ color: 0x0b1018, emissive: col, emissiveIntensity: 0.55, metalness: 0.4, roughness: 0.5 }),
      );
      pylon.position.set(x, h / 2, z);
      this.scene.add(pylon);
      const cap = new THREE.Mesh(
        new THREE.BoxGeometry(1.7, 0.3, 1.7),
        new THREE.MeshBasicMaterial({ color: col, toneMapped: true }),
      );
      cap.position.set(x, h + 0.18, z);
      this.scene.add(cap);
    }

    // Outer "skyline" — taller dim towers further out for a city-block backdrop.
    const M = this._env.towers;
    for (let i = 0; i < M; i++) {
      const a = (i / M) * Math.PI * 2 + 0.18;
      const rr = R * (2.0 + seededRand(i) * 1.4);
      const x = Math.cos(a) * rr;
      const z = Math.sin(a) * rr * 0.95;
      const col = colors[(i + 2) % colors.length];
      const h = 8 + seededRand(i + 9) * 26;
      const w = 2.2 + seededRand(i + 3) * 2.6;
      const tower = new THREE.Mesh(
        new THREE.BoxGeometry(w, h, w),
        new THREE.MeshStandardMaterial({ color: 0x080d15, emissive: col, emissiveIntensity: 0.18, metalness: 0.5, roughness: 0.6 }),
      );
      tower.position.set(x, h / 2, z);
      this.scene.add(tower);
      // a glowing window strip near the top
      const strip = new THREE.Mesh(
        new THREE.BoxGeometry(w * 1.02, 0.5, w * 1.02),
        new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: 0.7, toneMapped: true }),
      );
      strip.position.set(x, h - 1.5, z);
      this.scene.add(strip);
    }

    this._floaters = [];
    for (let i = 0; i < this._env.floaters; i++) {
      const col = colors[i % colors.length];
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(2.2 + seededRand(i) * 2.5, 0.12, 8, 32),
        new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: 0.5, toneMapped: true }),
      );
      const a = (i / 6) * Math.PI * 2;
      ring.position.set(Math.cos(a) * R * 1.1, 16 + seededRand(i + 5) * 14, Math.sin(a) * R * 0.9);
      ring.rotation.set(seededRand(i) * 3, seededRand(i + 1) * 3, seededRand(i + 2) * 3);
      ring.userData.spin = 0.05 + seededRand(i + 4) * 0.12;
      this.scene.add(ring);
      this._floaters.push(ring);
    }
  }

  _routeArrows() {
    this.arrowMeshes = [];
    const arrowGeo = new THREE.ConeGeometry(0.42, 0.95, 4);
    const step = Math.max(2, Math.floor(ROUTE_CELLS.length / 16));
    for (let i = 0; i < ROUTE_CELLS.length - 1; i += step) {
      const [c0, r0] = ROUTE_CELLS[i];
      const [c1, r1] = ROUTE_CELLS[i + 1];
      if (c0 === c1 && r0 === r1) continue;
      const p = cellCenter(c0, r0);
      const cone = new THREE.Mesh(
        arrowGeo,
        new THREE.MeshBasicMaterial({ color: COL_ARROW, transparent: true, opacity: 0.7 }),
      );
      cone.rotation.x = Math.PI;
      cone.rotation.y = Math.atan2(c1 - c0, r1 - r0);
      cone.position.set(p.x, 0.5, p.z);
      cone.userData.routeIndex = i;
      this.scene.add(cone);
      this.arrowMeshes.push(cone);
    }
  }

  _walls() {
    const { walls } = MAZE;
    // Mid-blue raised blocks read clearly against the near-black floor in the
    // top-down view — solid tone is the primary "this is a wall" cue.
    const wallGeo = new THREE.BoxGeometry(CELL, WALL_H, CELL);
    const wallMat = new THREE.MeshStandardMaterial({
      color: COL_WALL,
      metalness: 0.3,
      roughness: 0.62,
      emissive: 0x0e2236,
      emissiveIntensity: 0.5,
    });
    const mesh = new THREE.InstancedMesh(wallGeo, wallMat, walls.length);

    // Thin neon edge frame on each wall top (not a full cap) — a "lab grid"
    // accent that feeds bloom without flooding the view with colour.
    const half = CELL * 0.492;
    const inner = CELL * 0.4;
    const shape = new THREE.Shape();
    shape.moveTo(-half, -half);
    shape.lineTo(half, -half);
    shape.lineTo(half, half);
    shape.lineTo(-half, half);
    shape.lineTo(-half, -half);
    const hole = new THREE.Path();
    hole.moveTo(-inner, -inner);
    hole.lineTo(-inner, inner);
    hole.lineTo(inner, inner);
    hole.lineTo(inner, -inner);
    hole.lineTo(-inner, -inner);
    shape.holes.push(hole);
    const railGeo = new THREE.ShapeGeometry(shape);
    const railMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(COL_RAIL).multiplyScalar(0.42),
      toneMapped: true,
      side: THREE.DoubleSide,
    });
    // Only frame walls that line a corridor — outlines the path, not every block.
    const pathKeys = new Set(MAZE.paths.map((p) => `${p.c},${p.r}`));
    const edgeWalls = walls.filter((w) =>
      [
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1],
      ].some(([dc, dr]) => pathKeys.has(`${w.c + dc},${w.r + dr}`)),
    );
    const rails = new THREE.InstancedMesh(railGeo, railMat, edgeWalls.length);

    const body = new THREE.Object3D();
    walls.forEach((w, i) => {
      const p = cellCenter(w.c, w.r);
      body.position.set(p.x, WALL_H / 2, p.z);
      body.updateMatrix();
      mesh.setMatrixAt(i, body.matrix);
    });
    const rail = new THREE.Object3D();
    rail.rotation.x = -Math.PI / 2;
    edgeWalls.forEach((w, i) => {
      const p = cellCenter(w.c, w.r);
      rail.position.set(p.x, WALL_H + 0.05, p.z);
      rail.updateMatrix();
      rails.setMatrixAt(i, rail.matrix);
    });
    mesh.instanceMatrix.needsUpdate = true;
    rails.instanceMatrix.needsUpdate = true;
    this.scene.add(mesh);
    this.scene.add(rails);
  }

  _particles() {
    const N = this._env.dust;
    const pos = new Float32Array(N * 3);
    const halfX = (MAZE.cols * CELL) / 2;
    const halfZ = (MAZE.rows * CELL) / 2;
    this._dustSeed = [];
    for (let i = 0; i < N; i++) {
      const x = (Math.sin(i * 12.9898) * 43758.5453) % 1;
      const z = (Math.sin(i * 78.233) * 12543.123) % 1;
      const y = (Math.sin(i * 3.17) * 9123.77) % 1;
      pos[i * 3] = (Math.abs(x) * 2 - 1) * halfX;
      pos[i * 3 + 1] = Math.abs(y) * 12 + 0.5;
      pos[i * 3 + 2] = (Math.abs(z) * 2 - 1) * halfZ;
      this._dustSeed.push(Math.abs(x) * 6.28);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    const mat = new THREE.PointsMaterial({
      color: 0x6fd8ff,
      size: 0.13,
      transparent: true,
      opacity: 0.32,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });
    this.dust = new THREE.Points(geo, mat);
    this.scene.add(this.dust);
  }

  _player(start) {
    this.playerRobot = createPlayerRobot();
    this.player = this.playerRobot.group;
    this._snapToFreePosition(cellCenter(start.c, start.r));
    this.player.rotation.y = 0;
    this.scene.add(this.player);
  }

  _makeStation(color, label, index) {
    const group = new THREE.Group();
    const order = index + 1;

    const platform = new THREE.Mesh(
      new THREE.CylinderGeometry(2.3, 2.6, 0.38, 6),
      new THREE.MeshStandardMaterial({
        color: 0x0a121e,
        metalness: 0.5,
        roughness: 0.5,
        emissive: color,
        emissiveIntensity: 0.22,
      }),
    );
    platform.position.y = 0.2;
    group.add(platform);

    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(2.25, 0.08, 8, 40),
      new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.85 }),
    );
    ring.rotation.x = Math.PI / 2;
    ring.position.y = 0.44;
    ring.userData.isGateRing = true;
    group.add(ring);

    // Upward light column — the "data node" beam.
    const beam = new THREE.Mesh(
      new THREE.CylinderGeometry(1.7, 0.45, 9, 20, 1, true),
      new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0.1,
        side: THREE.DoubleSide,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    );
    beam.position.y = 4.6;
    beam.userData.isBeam = true;
    group.add(beam);

    const pillar = new THREE.Mesh(
      new THREE.BoxGeometry(0.16, 3.2, 2.8),
      new THREE.MeshStandardMaterial({ color: 0x223349, metalness: 0.6, roughness: 0.4 }),
    );
    pillar.position.y = 1.8;
    group.add(pillar);

    const numSprite = makeLabelSprite(`0${order}`, color);
    numSprite.position.set(0, 3.5, 1.5);
    numSprite.scale.set(2, 1, 1);
    group.add(numSprite);

    group.add(makeLabelSprite(label, color));

    const light = new THREE.PointLight(color, 0, 16, 1.6);
    light.position.set(0, 2.4, 0);
    light.userData.isStationLight = true;
    group.add(light);

    group.userData.stationIndex = index;
    return group;
  }

  _gates() {
    this.gateGroups = {};
    GATE_ORDER.forEach((key, index) => {
      const g = GATES[key];
      const group = this._makeStation(PROJECT_COLORS[key], STATION_LABEL[key], index);
      group.position.copy(cellCenter(g.c, g.r));
      group.userData.key = key;
      this.scene.add(group);
      this.gateGroups[key] = group;
    });
  }

  _exitMarker() {
    const { exit } = MAZE;
    this.exitGroup = new THREE.Group();
    this.exitGroup.position.copy(cellCenter(exit.c, exit.r));

    const door = new THREE.Mesh(
      new THREE.BoxGeometry(3.2, 4.2, 0.35),
      new THREE.MeshStandardMaterial({
        color: 0x1a150a,
        metalness: 0.5,
        roughness: 0.5,
        emissive: COL_EXIT,
        emissiveIntensity: 0.35,
      }),
    );
    door.position.y = 2.4;
    this.exitGroup.add(door);

    const portal = new THREE.Mesh(
      new THREE.TorusGeometry(2, 0.14, 10, 32),
      new THREE.MeshBasicMaterial({ color: COL_EXIT, transparent: true, opacity: 0.9 }),
    );
    portal.rotation.y = Math.PI / 2;
    portal.position.y = 2.5;
    portal.userData.isExitArch = true;
    this.exitGroup.add(portal);

    const beam = new THREE.Mesh(
      new THREE.CylinderGeometry(1.9, 0.5, 11, 20, 1, true),
      new THREE.MeshBasicMaterial({
        color: COL_EXIT,
        transparent: true,
        opacity: 0.06,
        side: THREE.DoubleSide,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    );
    beam.position.y = 5.5;
    beam.userData.isExitBeam = true;
    this.exitGroup.add(beam);

    this.exitLight = new THREE.PointLight(COL_EXIT, 0, 20, 1.6);
    this.exitLight.position.y = 2.6;
    this.exitGroup.add(this.exitLight);

    this.exitGroup.add(makeLabelSprite("EXIT", COL_EXIT, "ABOUT ME"));
    this.scene.add(this.exitGroup);
  }

  _spawnBurst(pos, color, scale = 1) {
    const ring = new THREE.Mesh(
      new THREE.RingGeometry(0.2, 0.34, 28),
      new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.9, side: THREE.DoubleSide }),
    );
    ring.rotation.x = -Math.PI / 2;
    ring.position.set(pos.x, 0.35, pos.z);
    ring.userData.t = 0;
    ring.userData.scale = scale;
    this.scene.add(ring);
    this.bursts.push(ring);
  }

  _updateBursts(dt) {
    for (let i = this.bursts.length - 1; i >= 0; i--) {
      const b = this.bursts[i];
      b.userData.t += dt;
      const t = b.userData.t;
      const s = 1 + t * 9 * b.userData.scale;
      b.scale.set(s, s, s);
      b.material.opacity = Math.max(0, 0.9 - t * 1.9);
      if (b.material.opacity <= 0) {
        this.scene.remove(b);
        b.geometry.dispose();
        b.material.dispose();
        this.bursts.splice(i, 1);
      }
    }
  }

  _updateGateVisuals() {
    const next = this.getNextGate();
    GATE_ORDER.forEach((key) => {
      const g = this.gateGroups[key];
      const visited = this.visited.has(key);
      const isNext = key === next;
      const locked = !visited && !isNext;
      const ring = g.children.find((c) => c.userData?.isGateRing);
      const beam = g.children.find((c) => c.userData?.isBeam);
      const light = g.children.find((c) => c.userData?.isStationLight);
      const pulse = 0.5 + Math.sin(this.pulse * 3) * 0.5;

      if (ring?.material) {
        ring.material.opacity = visited ? 0.3 : isNext ? 0.75 + pulse * 0.25 : locked ? 0.18 : 0.5;
        ring.material.color.setHex(locked ? 0x3a4a5a : PROJECT_COLORS[key]);
      }
      if (beam?.material) {
        beam.material.opacity = isNext ? 0.12 + pulse * 0.16 : visited ? 0.05 : 0.03;
      }
      if (light) {
        light.intensity = isNext ? 3.2 + pulse * 2.2 : visited ? 1.4 : 0.5;
      }
      g.scale.setScalar(isNext && this.nearZone === key ? 1.07 : 1);
    });
  }

  _key(e, down) {
    if (
      this.paused ||
      document.body.classList.contains("detail-mode") ||
      document.body.classList.contains("cutscene-mode")
    ) {
      return;
    }
    const k = e.key.toLowerCase();
    if (k === "w" || k === "arrowup") this.keys.w = down;
    if (k === "s" || k === "arrowdown") this.keys.s = down;
    if (k === "a" || k === "arrowleft") this.keys.a = down;
    if (k === "d" || k === "arrowright") this.keys.d = down;
    if (k === "shift") this.keys.shift = down;
  }

  _collides(px, pz) {
    return !isWalkablePosition(px, pz);
  }

  _inputDir() {
    let ix = 0;
    let iz = 0;
    if (this.keys.d) ix += 1;
    if (this.keys.a) ix -= 1;
    if (this.keys.s) iz += 1;
    if (this.keys.w) iz -= 1;
    const len = Math.hypot(ix, iz);
    if (len < 1e-6) return null;
    return { x: ix / len, z: iz / len };
  }

  _penetrationPush(px, pz) {
    const { walls } = MAZE;
    const { ox, oz } = mazeOrigin();
    const c0 = Math.floor((px - ox) / CELL) - 1;
    const c1 = Math.floor((px - ox) / CELL) + 2;
    const r0 = Math.floor((pz - oz) / CELL) - 1;
    const r1 = Math.floor((pz - oz) / CELL) + 2;
    let pushX = 0;
    let pushZ = 0;
    const R = PLAYER_COLLIDE_R;
    for (const w of walls) {
      if (w.c < c0 || w.c > c1 || w.r < r0 || w.r > r1) continue;
      const { minX, maxX, minZ, maxZ } = cellAabb(w.c, w.r);
      const cx = THREE.MathUtils.clamp(px, minX, maxX);
      const cz = THREE.MathUtils.clamp(pz, minZ, maxZ);
      let dx = px - cx;
      let dz = pz - cz;
      let distSq = dx * dx + dz * dz;
      if (distSq < 1e-8) {
        dx = px - (minX + maxX) * 0.5;
        dz = pz - (minZ + maxZ) * 0.5;
        distSq = dx * dx + dz * dz || 1;
      }
      const dist = Math.sqrt(distSq);
      if (dist < R) {
        const depth = R - dist;
        pushX += (dx / dist) * depth;
        pushZ += (dz / dist) * depth;
      }
    }
    if (Math.abs(pushX) < 1e-6 && Math.abs(pushZ) < 1e-6) return null;
    return { x: pushX, z: pushZ };
  }

  _nearestFreeCell(px, pz) {
    let best = null;
    let bestD = Infinity;
    const routeKeys = new Set(ROUTE_CELLS.map(([c, r]) => `${c},${r}`));
    const candidates = MAZE.paths.filter((cell) => routeKeys.has(`${cell.c},${cell.r}`));
    for (const cell of candidates.length ? candidates : MAZE.paths) {
      const center = cellCenter(cell.c, cell.r);
      if (!isWalkablePosition(center.x, center.z)) continue;
      const d = (center.x - px) ** 2 + (center.z - pz) ** 2;
      if (d < bestD) {
        bestD = d;
        best = center;
      }
    }
    return best;
  }

  _snapToFreePosition(pos) {
    this.player.position.copy(pos);
    if (isWalkablePosition(pos.x, pos.z)) return;
    const push = this._penetrationPush(pos.x, pos.z);
    if (push && isWalkablePosition(pos.x + push.x, pos.z + push.z)) {
      this.player.position.x += push.x;
      this.player.position.z += push.z;
      return;
    }
    const free = this._nearestFreeCell(pos.x, pos.z);
    if (free) this.player.position.copy(free);
  }

  _resolveStuck(dt) {
    if (this.paused) {
      this._stuckTime = 0;
      return;
    }
    const input = this._inputDir();
    if (!input) {
      this._stuckTime = 0;
      return;
    }
    const p = this.player.position;
    if (isWalkablePosition(p.x, p.z)) {
      this._stuckTime = 0;
      return;
    }

    this._stuckTime += dt;
    const step = 0.07 + Math.min(this._stuckTime * 0.45, 0.32);
    const slides = [
      [input.x * step, input.z * step],
      [input.x * step, 0],
      [0, input.z * step],
      [-input.z * step * 0.55, input.x * step * 0.55],
      [input.z * step * 0.55, -input.x * step * 0.55],
    ];
    for (const [ox, oz] of slides) {
      if (isWalkablePosition(p.x + ox, p.z + oz)) {
        p.x += ox;
        p.z += oz;
        this._stuckTime = 0;
        return;
      }
    }

    if (this._stuckTime < 0.2) return;

    const push = this._penetrationPush(p.x, p.z);
    if (push && isWalkablePosition(p.x + push.x, p.z + push.z)) {
      p.x += push.x;
      p.z += push.z;
      this._stuckTime = 0;
      return;
    }

    if (this._stuckTime >= 0.55) {
      const free = this._nearestFreeCell(p.x, p.z);
      if (free) {
        this.player.position.copy(free);
        this.velX = 0;
        this.velZ = 0;
        this._stuckTime = 0;
      }
    }
  }

  _applyMovement(dt) {
    const p = this.player.position;
    const startX = p.x;
    const startZ = p.z;
    const dx = this.velX * dt;
    const dz = this.velZ * dt;

    if (Math.abs(dx) < 1e-6 && Math.abs(dz) < 1e-6) {
      this._resolveStuck(dt);
      return;
    }

    if (isWalkablePosition(startX + dx, startZ + dz)) {
      p.x = startX + dx;
      p.z = startZ + dz;
      this._stuckTime = 0;
      return;
    }

    const tryXFirst = Math.abs(dx) >= Math.abs(dz);
    const axes = tryXFirst ? ["x", "z"] : ["z", "x"];
    let curX = startX;
    let curZ = startZ;
    let moved = false;

    for (const axis of axes) {
      if (axis === "x" && Math.abs(dx) > 1e-6) {
        const nx = curX + dx;
        if (isWalkablePosition(nx, curZ)) {
          curX = nx;
          moved = true;
        } else {
          this.velX = 0;
        }
      }
      if (axis === "z" && Math.abs(dz) > 1e-6) {
        const nz = curZ + dz;
        if (isWalkablePosition(curX, nz)) {
          curZ = nz;
          moved = true;
        } else {
          this.velZ = 0;
        }
      }
    }

    p.x = curX;
    p.z = curZ;

    if (!moved || !isWalkablePosition(p.x, p.z)) this._resolveStuck(dt);
    else this._stuckTime = 0;
  }

  _resize() {
    const w = this.container.clientWidth;
    const h = this.container.clientHeight;
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h);
    if (this.composer) {
      this.composer.setSize(w, h);
      this.bloom?.setSize(w, h);
    }
  }

  _loop() {
    requestAnimationFrame(() => this._loop());
    if (this.paused || document.hidden) return;

    this._frame += 1;
    const dt = Math.min(this.clock.getDelta(), 0.05);
    this.pulse += dt;

    {
      const sprint = this.keys.shift;
      const speed = sprint ? 16 : 10;
      let mx = this.stickX;
      let mz = this.stickZ;
      const stickMag = Math.hypot(mx, mz);
      if (stickMag < 0.08) {
        mx = 0;
        mz = 0;
        if (this.keys.w) mz -= 1;
        if (this.keys.s) mz += 1;
        if (this.keys.a) mx -= 1;
        if (this.keys.d) mx += 1;
      }
      const moving = mx !== 0 || mz !== 0;
      if (moving) {
        const len = Math.hypot(mx, mz) || 1;
        mx /= len;
        mz /= len;
        this.facing = lerpAngle(this.facing, Math.atan2(mx, mz), 0.35);
        this.moveSpeed = THREE.MathUtils.lerp(this.moveSpeed, 1, 0.15);
      } else {
        this.moveSpeed = THREE.MathUtils.lerp(this.moveSpeed, 0, 0.2);
      }
      this.player.rotation.y = this.facing;

      const accel = moving ? 0.38 : 0.55;
      this.velX = THREE.MathUtils.lerp(this.velX, mx * speed, accel);
      this.velZ = THREE.MathUtils.lerp(this.velZ, mz * speed, accel);

      if (Math.hypot(this.velX, this.velZ) > 1.5) {
        this._stepT += dt;
        const interval = sprint ? 0.25 : 0.35;
        if (this._stepT >= interval) {
          this._stepT = 0;
          if (this.onStep) this.onStep(sprint);
        }
      } else {
        this._stepT = 0.3;
      }

      updatePlayerRobot(this.playerRobot, dt, this.moveSpeed > 0.15, sprint);
      this._applyMovement(dt);

      // Light the lane ahead of progress; pulse a flow toward the goal.
      const seg = ROUTE_CELLS.length / (GATE_ORDER.length + 1);
      const minStep = Math.max(0, this.visited.size * seg - 3);
      const c = this._tmpColor || (this._tmpColor = new THREE.Color());
      const off = this._laneOff || (this._laneOff = new THREE.Color(0x05080e));
      const lit = this._laneLit || (this._laneLit = new THREE.Color());
      const px = this.player.position.x;
      const pz = this.player.position.z;
      const laneInit = this._lanePx == null;
      const movedLane =
        laneInit ||
        Math.hypot(px - this._lanePx, pz - this._lanePz) > 0.35;
      if (movedLane) {
        this._lanePx = px;
        this._lanePz = pz;
        for (let i = 0; i < ROUTE_CELLS.length; i++) {
          const ctr = this._routeCenters[i];
          const dx = ctr.x - px;
          const dz = ctr.z - pz;
          const d2 = dx * dx + dz * dz;
          const step = d2 < 16 ? 1 - d2 / 16 : 0;
          if (step <= 0) {
            c.copy(off);
          } else {
            lit.copy(this._laneBase).multiplyScalar(0.5 + step * 1.6);
            c.copy(off).lerp(lit, step);
          }
          this.laneMesh.setColorAt(i, c);
        }
        this.laneMesh.instanceColor.needsUpdate = true;
      }

      this.arrowMeshes.forEach((cone) => {
        const show = cone.userData.routeIndex >= minStep;
        cone.visible = show;
        if (show) {
          cone.material.opacity = 0.5 + Math.sin(this.pulse * 4 + cone.userData.routeIndex) * 0.3;
          cone.position.y = 0.5 + Math.sin(this.pulse * 3 + cone.userData.routeIndex * 0.5) * 0.12;
        }
      });

      this._updateBursts(dt);

      let near = null;
      let nearD = Infinity;
      GATE_ORDER.forEach((key) => {
        const d = this.gateGroups[key].position.distanceTo(this.player.position);
        if (d < GATE_RADIUS && d < nearD) {
          nearD = d;
          near = key;
        }
      });

      const exitD = this.exitGroup.position.distanceTo(this.player.position);
      this.nearExitProximity = exitD < EXIT_RADIUS;
      this.nearExit = this.nearExitProximity && this.visited.size >= 4;
      const ready = this.visited.size >= 4;
      const arch = this.exitGroup.children.find((c) => c.userData?.isExitArch);
      const exitBeam = this.exitGroup.children.find((c) => c.userData?.isExitBeam);
      const ep = 0.5 + Math.sin(this.pulse * 2.5) * 0.5;
      if (arch?.material) arch.material.opacity = ready ? 0.7 + ep * 0.3 : 0.22;
      if (exitBeam?.material) exitBeam.material.opacity = ready ? 0.1 + ep * 0.18 : 0.03;
      if (this.exitLight) this.exitLight.intensity = ready ? 3 + ep * 3 : 0.4;

      if (near !== this.nearZone) {
        this.nearZone = near;
        if (near && !this.arrived.has(near)) {
          this.arrived.add(near);
          this._spawnBurst(this.gateGroups[near].position, PROJECT_COLORS[near], 1.6);
          if (this.onArrive) this.onArrive(near);
        }
        if (this.onZoneFocus) this.onZoneFocus(near);
      }

      this._updateGateVisuals();

      // Drifting dust.
      if (this.dust) {
        const arr = this.dust.geometry.attributes.position.array;
        for (let i = 0; i < this._dustSeed.length; i++) {
          arr[i * 3 + 1] += dt * 0.35;
          if (arr[i * 3 + 1] > 12.5) arr[i * 3 + 1] = 0.4;
        }
        this.dust.geometry.attributes.position.needsUpdate = true;
        this.dust.rotation.y += dt * 0.01;
      }

      // Slow-spinning floating rings.
      if (this._floaters) {
        for (const f of this._floaters) {
          f.rotation.z += dt * f.userData.spin;
          f.rotation.x += dt * f.userData.spin * 0.4;
        }
      }
    }

    // Camera: follow with a little look-ahead toward facing.
    const target = this.player.position;
    const fwdx = Math.sin(this.facing);
    const fwdz = Math.cos(this.facing);

    // Headlamp still follows the robot's heading, so the lit cone sweeps as you turn.
    if (this.headlamp) {
      this.headlamp.position.set(target.x - fwdx * 0.6, 3.4, target.z - fwdz * 0.6);
      this.headlampTarget.position.set(target.x + fwdx * 8, 0.3, target.z + fwdz * 8);
    }

    // Top-down follow cam (slight tilt) — zoomed out so much more of the map reads.
    // Fixed orientation: W is always up-screen; heading shows as the robot's top.
    const camH = 32 + (this.keys.shift ? 3 : 0);
    const camPos = new THREE.Vector3(target.x, camH, target.z + 5);
    this.camera.position.lerp(camPos, 0.1);
    const look = new THREE.Vector3(target.x, 0.5, target.z);
    this._lookAt = this._lookAt || look.clone();
    this._lookAt.lerp(look, 0.14);
    this.camera.lookAt(this._lookAt);

    this._render();
  }

  dispose() {
    this.renderer.dispose();
    this.composer?.dispose?.();
  }
}

export function getMazeLayout() {
  return {
    rows: MAZE_ROWS,
    gates: GATES,
    cell: CELL,
    route: ROUTE_CELLS,
    gateOrder: GATE_ORDER,
    start: MAZE.start,
    exit: MAZE.exit,
  };
}
