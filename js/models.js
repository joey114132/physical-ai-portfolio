import * as THREE from "three";

/** Standard surface material with optional emissive self-colour. */
function mat(color, e = 0) {
  return new THREE.MeshStandardMaterial({
    color,
    metalness: 0.32,
    roughness: 0.55,
    emissive: color,
    emissiveIntensity: e,
  });
}

/** Brushed-metal structural material. */
function metalMat(color) {
  return new THREE.MeshStandardMaterial({ color, metalness: 0.72, roughness: 0.34 });
}

/** Near-black albedo with a strong emissive — reads as a glowing accent under bloom. */
function glow(color, e = 1.3) {
  return new THREE.MeshStandardMaterial({ color: 0x070708, emissive: color, emissiveIntensity: e });
}

function addDot(group, material, x, y, z, r = 0.07) {
  const d = new THREE.Mesh(new THREE.SphereGeometry(r, 12, 12), material);
  d.position.set(x, y, z);
  group.add(d);
  return d;
}

/** Gesto — stylized hand with glowing MediaPipe-style landmark points. */
export function createHandModel(color = 0x7c5cff) {
  const g = new THREE.Group();
  const skin = mat(0x5b5680, 0.12);
  const dot = glow(color, 1.7);
  const boneMat = glow(color, 0.55);

  const palm = new THREE.Mesh(new THREE.BoxGeometry(1.05, 0.26, 0.95), skin);
  g.add(palm);
  addDot(g, dot, 0, 0.04, -0.52, 0.09); // wrist landmark

  const fingerX = [-0.39, -0.13, 0.13, 0.39];
  const fingerLen = [0.5, 0.62, 0.58, 0.44];
  fingerX.forEach((x, i) => {
    const len = fingerLen[i];
    const baseZ = 0.48;
    const seg1 = new THREE.Mesh(new THREE.BoxGeometry(0.13, 0.13, len), skin);
    seg1.position.set(x, 0.03, baseZ + len / 2);
    g.add(seg1);
    const seg2 = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.11, len * 0.78), skin);
    seg2.position.set(x, 0.07, baseZ + len + len * 0.36);
    g.add(seg2);
    addDot(g, dot, x, 0.05, baseZ, 0.06); // knuckle
    addDot(g, dot, x, 0.06, baseZ + len, 0.055); // mid joint
    addDot(g, dot, x, 0.09, baseZ + len * 1.78, 0.07); // tip
    // bone between knuckle and tip
    const bone = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, len * 1.7, 6), boneMat);
    bone.position.set(x, 0.07, baseZ + len * 0.85);
    bone.rotation.x = Math.PI / 2;
    g.add(bone);
  });

  // thumb
  const thumb = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.13, 0.46), skin);
  thumb.position.set(-0.58, 0.03, 0.12);
  thumb.rotation.y = 0.7;
  g.add(thumb);
  addDot(g, dot, -0.52, 0.05, -0.12, 0.06);
  addDot(g, dot, -0.82, 0.07, 0.32, 0.07);

  g.userData.spin = 0.35;
  return g;
}

/** IoT — parking barrier gate + LPR camera + fee tower + waiting car. */
export function createParkingModel(color = 0x00e5a0) {
  const g = new THREE.Group();

  const post = new THREE.Mesh(new THREE.BoxGeometry(0.26, 1.35, 0.26), metalMat(0x39414f));
  post.position.set(-1.0, 0.68, 0);
  g.add(post);

  // striped boom gate (animated via userData.arm)
  const gate = new THREE.Group();
  gate.position.set(-1.0, 1.3, 0);
  const segN = 4;
  const segL = 0.4;
  for (let i = 0; i < segN; i++) {
    const c = i % 2 === 0 ? 0xff5b46 : 0xe8eef7;
    const s = new THREE.Mesh(new THREE.BoxGeometry(segL, 0.11, 0.11), mat(c, i % 2 ? 0.04 : 0.28));
    s.position.x = 0.36 + i * segL;
    gate.add(s);
  }
  gate.rotation.z = 0.22;
  g.add(gate);
  g.userData.arm = gate;

  // LPR camera looking down at the gate
  const cam = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.16, 0.22), mat(0x10161e, 0));
  cam.position.set(-1.0, 1.46, 0.16);
  cam.rotation.x = 0.4;
  g.add(cam);
  addDot(g, glow(color, 1.4), -1.0, 1.42, 0.27, 0.04);

  // fee tower with glowing display + beacon
  const tower = new THREE.Mesh(new THREE.BoxGeometry(0.58, 1.7, 0.58), metalMat(0x2b3340));
  tower.position.set(1.75, 0.85, 0);
  g.add(tower);
  const display = new THREE.Mesh(new THREE.PlaneGeometry(0.44, 0.32), glow(color, 1.0));
  display.position.set(1.75, 1.18, 0.3);
  g.add(display);
  const beacon = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.22, 10), glow(color, 1.5));
  beacon.position.set(1.75, 1.85, 0);
  g.add(beacon);

  // waiting car
  const car = new THREE.Group();
  const cbody = new THREE.Mesh(new THREE.BoxGeometry(0.92, 0.3, 0.5), mat(0x3f7fc4, 0.08));
  cbody.position.y = 0.22;
  car.add(cbody);
  const cabin = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.26, 0.46), mat(0x6fb3ff, 0.12));
  cabin.position.set(-0.04, 0.45, 0);
  car.add(cabin);
  [
    [-0.31, 0.1, 0.27],
    [0.31, 0.1, 0.27],
    [-0.31, 0.1, -0.27],
    [0.31, 0.1, -0.27],
  ].forEach(([x, y, z]) => {
    const w = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.11, 0.08, 12), mat(0x14181f));
    w.rotation.x = Math.PI / 2;
    w.position.set(x, y, z);
    car.add(w);
  });
  car.position.set(0.05, 0, 0.75);
  car.rotation.y = -0.18;
  g.add(car);

  g.userData.spin = 0.25;
  return g;
}

/** ShopPinkki — differential-drive mart cart with lidar mast + basket. */
export function createCartModel(color = 0xff6b4a) {
  const g = new THREE.Group();

  const body = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.5, 1.9), mat(color, 0.12));
  body.position.y = 0.5;
  g.add(body);
  const skirt = new THREE.Mesh(new THREE.BoxGeometry(1.56, 0.18, 1.96), mat(0xd0dae8, 0.08));
  skirt.position.y = 0.28;
  g.add(skirt);

  const screen = new THREE.Mesh(new THREE.PlaneGeometry(0.6, 0.4), glow(0x7cc4ff, 0.9));
  screen.position.set(0, 0.95, 0.82);
  screen.rotation.x = -0.22;
  g.add(screen);

  // lidar mast + spinning puck (animated via userData.parts.lidar)
  const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.85, 8), metalMat(0xb9c2cf));
  mast.position.set(-0.42, 1.05, -0.25);
  g.add(mast);
  const lidar = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.16, 16), glow(color, 0.9));
  lidar.position.set(-0.42, 1.55, -0.25);
  g.add(lidar);

  [
    [-0.52, 0.18, 0.62],
    [0.52, 0.18, 0.62],
    [-0.52, 0.18, -0.62],
    [0.52, 0.18, -0.62],
  ].forEach(([x, y, z]) => {
    const w = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.12, 14), mat(0xffffff, 0.04));
    w.rotation.z = Math.PI / 2;
    w.position.set(x, y, z);
    g.add(w);
  });

  const basket = new THREE.Mesh(new THREE.BoxGeometry(0.88, 0.34, 0.66), mat(0xffd166, 0.12));
  basket.position.set(0.35, 0.92, -0.4);
  g.add(basket);

  g.userData.spin = 0.3;
  return g;
}

/** pingdergarten — dual-arm EduPing robot in a high-five pose with a glowing face. */
export function createRobotModel(color = 0xffd166) {
  const g = new THREE.Group();

  const base = new THREE.Mesh(new THREE.CylinderGeometry(0.52, 0.68, 0.38, 16), metalMat(0x2a2f3c));
  base.position.y = 0.19;
  g.add(base);
  const column = new THREE.Mesh(new THREE.CylinderGeometry(0.17, 0.2, 0.7, 12), metalMat(0x39414f));
  column.position.y = 0.7;
  g.add(column);

  const torso = new THREE.Mesh(new THREE.BoxGeometry(0.82, 0.92, 0.48), mat(0x333a4a, 0.03));
  torso.position.y = 1.32;
  g.add(torso);

  // glowing tablet face + eyes
  const face = new THREE.Mesh(new THREE.BoxGeometry(0.58, 0.46, 0.05), glow(color, 0.85));
  face.position.set(0, 1.46, 0.26);
  g.add(face);
  [-0.12, 0.12].forEach((x) => {
    const eye = new THREE.Mesh(new THREE.CircleGeometry(0.055, 14), mat(0x0a1410, 0));
    eye.position.set(x, 1.5, 0.292);
    g.add(eye);
  });

  function arm(side) {
    const a = new THREE.Group();
    a.position.set(side * 0.48, 1.55, 0);
    const upper = new THREE.Mesh(new THREE.BoxGeometry(0.13, 0.5, 0.13), metalMat(0x49526a));
    upper.position.y = -0.12;
    upper.rotation.z = side * -0.45;
    a.add(upper);
    const fore = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.44, 0.11), metalMat(0x49526a));
    fore.position.set(side * 0.2, -0.42, 0.06);
    fore.rotation.z = side * -0.95;
    a.add(fore);
    const palm = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.24, 0.08), glow(color, 0.7));
    palm.position.set(side * 0.46, -0.56, 0.14);
    a.add(palm);
    return a;
  }
  const armL = arm(-1);
  const armR = arm(1);
  g.add(armL);
  g.add(armR);

  const antenna = new THREE.Mesh(
    new THREE.CylinderGeometry(0.02, 0.02, 0.24, 6),
    metalMat(0xc8cfda),
  );
  antenna.position.set(0, 1.92, 0);
  g.add(antenna);
  addDot(g, glow(color, 1.7), 0, 2.08, 0, 0.06);

  g.userData.parts = { armL, armR };
  g.userData.spin = 0.22;
  return g;
}

export const MODEL_BUILDERS = {
  dl: createHandModel,
  iot: createParkingModel,
  ros: createCartModel,
  pai: createRobotModel,
};

export function buildProjectModel(key, color) {
  const fn = MODEL_BUILDERS[key] ?? createRobotModel;
  return fn(color);
}

/** Legacy hook used by the (orphan) intro scene.js — animates a barrier-style arm. */
export function tickProceduralAnimation(model, t) {
  const arm = model?.userData?.arm;
  if (arm) arm.rotation.z = Math.sin(t * 1.5) * 0.55 - 0.2;
}
