import * as THREE from "three";
import { PROJECT_COLORS, PROJECT_KEYS } from "./i18n.js";
import { buildProjectModel, tickProceduralAnimation } from "./models.js";

const NODE_POSITIONS = PROJECT_KEYS.map((_, i) => {
  const angle = (i / (PROJECT_KEYS.length - 1)) * Math.PI * 0.85 - Math.PI * 0.425;
  const r = 12;
  return new THREE.Vector3(Math.sin(angle) * r, 1.5 + Math.sin(i * 1.2) * 1.2, Math.cos(angle) * r * 0.55);
});

export class OrbitScene {
  constructor(container) {
    this.container = container;
    this.nodes = [];
    this.targetIndex = 0;
    this.activeIndex = 0;
    this.scrollTarget = 0;
    this.scrollCurrent = 0;
    this.keys = { w: false, a: false, s: false, d: false };
    this.onNodeSelect = null;
    this.hoveredIndex = -1;

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x080a10);
    this.scene.fog = new THREE.FogExp2(0x080a10, 0.026);

    this.camera = new THREE.PerspectiveCamera(52, 1, 0.1, 200);
    this.camera.position.set(0, 8, 18);

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(this.renderer.domElement);

    this.raycaster = new THREE.Raycaster();
    this.pointer = new THREE.Vector2();

    this._lights();
    this._path();
    this._nodes();
    this._stars();

    window.addEventListener("resize", () => this._resize());
    window.addEventListener("pointermove", (e) => this._pointer(e));
    window.addEventListener("click", (e) => this._click(e));
    window.addEventListener("keydown", (e) => this._key(e, true));
    window.addEventListener("keyup", (e) => this._key(e, false));
    window.addEventListener(
      "wheel",
      (e) => {
        e.preventDefault();
        this.scrollTarget += e.deltaY * 0.0018;
        this.scrollTarget = THREE.MathUtils.clamp(this.scrollTarget, 0, 1);
      },
      { passive: false },
    );

    this.clock = new THREE.Clock();
    this._resize();
    this._loop();
  }

  _lights() {
    this.scene.add(new THREE.AmbientLight(0x445588, 0.4));
    const key = new THREE.DirectionalLight(0xffffff, 1.15);
    key.position.set(10, 18, 8);
    this.scene.add(key);
    const fill = new THREE.PointLight(0xffd166, 1.8, 50);
    fill.position.set(-8, 6, -6);
    this.scene.add(fill);
  }

  _path() {
    this.curve = new THREE.CatmullRomCurve3(NODE_POSITIONS, false, "catmullrom", 0.35);
    const tube = new THREE.Mesh(
      new THREE.TubeGeometry(this.curve, 100, 0.05, 6, false),
      new THREE.MeshBasicMaterial({ color: 0x334466, transparent: true, opacity: 0.35 }),
    );
    this.scene.add(tube);
  }

  _nodes() {
    PROJECT_KEYS.forEach((key, i) => {
      const color = PROJECT_COLORS[key];
      const group = new THREE.Group();
      group.position.copy(NODE_POSITIONS[i]);
      group.userData = { key, index: i };

      const placeholder = buildProjectModel(key, color);
      placeholder.scale.setScalar(0.85);
      group.add(placeholder);

      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(2.1, 0.035, 8, 48),
        new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.35 }),
      );
      ring.rotation.x = Math.PI / 2;
      group.add(ring);

      group.userData.model = placeholder;
      group.userData.ring = ring;
      this.scene.add(group);
      this.nodes.push(group);
    });
  }

  _stars() {
    const n = 420;
    const pos = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 70;
      pos[i * 3 + 1] = Math.random() * 25;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 50;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    this.stars = new THREE.Points(
      geo,
      new THREE.PointsMaterial({ color: 0x8899cc, size: 0.06, transparent: true, opacity: 0.5 }),
    );
    this.scene.add(this.stars);
  }

  get currentKey() {
    return PROJECT_KEYS[Math.round(this.activeIndex)];
  }

  setIndex(i, notify = false) {
    this.targetIndex = THREE.MathUtils.clamp(i, 0, PROJECT_KEYS.length - 1);
    this.scrollTarget = this.targetIndex / (PROJECT_KEYS.length - 1);
    if (notify && this.onNodeSelect) this.onNodeSelect(PROJECT_KEYS[this.targetIndex], "focus");
    this._updateVisuals();
  }

  _updateVisuals() {
    const idx = Math.round(this.activeIndex);
    this.nodes.forEach((node, i) => {
      const active = i === idx;
      const hover = i === this.hoveredIndex;
      const s = active ? 1.12 : hover ? 1.05 : 1;
      node.scale.lerp(new THREE.Vector3(s, s, s), 0.12);
      node.userData.ring.material.opacity = active ? 0.85 : hover ? 0.55 : 0.28;
    });
  }

  _resize() {
    const w = this.container.clientWidth;
    const h = this.container.clientHeight;
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h);
  }

  _pointer(e) {
    const rect = this.renderer.domElement.getBoundingClientRect();
    this.pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    this.pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    this.raycaster.setFromCamera(this.pointer, this.camera);
    const hits = this.raycaster.intersectObjects(this.nodes, true);
    if (hits.length) {
      let o = hits[0].object;
      while (o && o.userData.index === undefined) o = o.parent;
      const idx = o?.userData?.index ?? o?.parent?.userData?.index;
      this.hoveredIndex = idx ?? -1;
      document.body.style.cursor = idx !== undefined ? "pointer" : "default";
    } else {
      this.hoveredIndex = -1;
      document.body.style.cursor = "default";
    }
    this._updateVisuals();
  }

  _click(e) {
    if (e.target.closest(".ui, .detail")) return;
    this.raycaster.setFromCamera(this.pointer, this.camera);
    const hits = this.raycaster.intersectObjects(this.nodes, true);
    if (!hits.length) return;
    let o = hits[0].object;
    while (o && o.userData.index === undefined) o = o.parent;
    const idx = o?.userData?.index ?? o?.parent?.userData?.index;
    if (idx !== undefined && this.onNodeSelect) {
      this.setIndex(idx);
      this.onNodeSelect(PROJECT_KEYS[idx], "open");
    }
  }

  _key(e, down) {
    const k = e.key.toLowerCase();
    if (k in this.keys) this.keys[k] = down;
  }

  _loop() {
    requestAnimationFrame(() => this._loop());
    const t = this.clock.getElapsedTime();

    this.scrollCurrent += (this.scrollTarget - this.scrollCurrent) * 0.08;
    this.activeIndex += (this.scrollTarget * (PROJECT_KEYS.length - 1) - this.activeIndex) * 0.08;

    const camT = this.scrollCurrent;
    const point = this.curve.getPointAt(camT);
    const ahead = this.curve.getPointAt(Math.min(camT + 0.06, 1));
    const drift = new THREE.Vector3(
      (this.keys.d ? 1 : 0) - (this.keys.a ? 1 : 0),
      (this.keys.w ? 1 : 0) - (this.keys.s ? 1 : 0),
      0,
    ).multiplyScalar(0.05);

    this.camera.position.lerp(
      new THREE.Vector3(point.x - 3.5, point.y + 4.2, point.z + 10).add(drift),
      0.06,
    );
    this.camera.lookAt(ahead.x, ahead.y + 0.3, ahead.z);

    this.nodes.forEach((node, i) => {
      const base = NODE_POSITIONS[i];
      node.position.y = base.y + Math.sin(t * 1.1 + i * 1.7) * 0.22;
      const model = node.userData.model;
      if (model) {
        node.rotation.y = t * (model.userData?.spin ?? 0.25) * 0.3;
        tickProceduralAnimation(model, t);
      }
    });

    if (this.stars) this.stars.rotation.y = t * 0.012;
    this._updateVisuals();
    this.renderer.render(this.scene, this.camera);
  }

  dispose() {
    this.renderer.dispose();
  }
}
