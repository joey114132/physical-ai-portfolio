import * as THREE from "three";

const BODY = 0xe8a849;
const METAL = 0x6a7a94;
const ACCENT = 0x2dffb3;
const VISOR = 0x88eeff;

function mat(color, opts = {}) {
  return new THREE.MeshStandardMaterial({
    color,
    metalness: opts.metalness ?? 0.55,
    roughness: opts.roughness ?? 0.38,
    emissive: opts.emissive ?? color,
    emissiveIntensity: opts.emissiveIntensity ?? 0.12,
  });
}

/**
 * Low-poly service robot with procedural walk cycle.
 */
export function createPlayerRobot() {
  const root = new THREE.Group();
  root.userData.isPlayerRobot = true;
  root.scale.setScalar(1.3);

  const body = new THREE.Group();
  body.position.y = 0.95;
  root.add(body);

  const torso = new THREE.Mesh(
    new THREE.BoxGeometry(0.52, 0.62, 0.38),
    mat(BODY, { emissiveIntensity: 0.22 }),
  );
  body.add(torso);

  const chestPlate = new THREE.Mesh(
    new THREE.BoxGeometry(0.38, 0.28, 0.08),
    mat(METAL, { emissiveIntensity: 0.05 }),
  );
  chestPlate.position.set(0, 0.05, 0.22);
  body.add(chestPlate);

  const chestLed = new THREE.Mesh(
    new THREE.BoxGeometry(0.12, 0.12, 0.04),
    mat(ACCENT, { emissiveIntensity: 0.85 }),
  );
  chestLed.position.set(0, 0.08, 0.28);
  body.add(chestLed);

  const head = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.36, 0.4), mat(METAL));
  head.position.y = 0.52;
  body.add(head);

  const visor = new THREE.Mesh(
    new THREE.BoxGeometry(0.36, 0.14, 0.06),
    mat(VISOR, { emissiveIntensity: 0.55, metalness: 0.2 }),
  );
  visor.position.set(0, 0.04, 0.22);
  head.add(visor);

  const antenna = new THREE.Mesh(
    new THREE.CylinderGeometry(0.02, 0.02, 0.35, 6),
    mat(ACCENT, { emissiveIntensity: 0.6 }),
  );
  antenna.position.set(0, 0.32, 0);
  head.add(antenna);
  const tip = new THREE.Mesh(
    new THREE.SphereGeometry(0.06, 8, 8),
    mat(ACCENT, { emissiveIntensity: 1.4 }),
  );
  tip.position.y = 0.2;
  antenna.add(tip);

  function leg(side) {
    const legG = new THREE.Group();
    legG.position.set(side * 0.2, -0.32, 0);
    const hip = new THREE.Mesh(new THREE.SphereGeometry(0.1, 8, 8), mat(METAL));
    legG.add(hip);
    const thigh = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.32, 0.14), mat(METAL));
    thigh.position.y = -0.18;
    legG.add(thigh);
    const shin = new THREE.Mesh(
      new THREE.BoxGeometry(0.12, 0.3, 0.16),
      mat(BODY, { emissiveIntensity: 0.15 }),
    );
    shin.position.y = -0.42;
    legG.add(shin);
    const foot = new THREE.Mesh(
      new THREE.BoxGeometry(0.2, 0.08, 0.28),
      mat(METAL, { emissiveIntensity: 0.08 }),
    );
    foot.position.set(0, -0.6, 0.06);
    legG.add(foot);
    return legG;
  }

  const legL = leg(-1);
  const legR = leg(1);
  body.add(legL);
  body.add(legR);

  function arm(side) {
    const a = new THREE.Group();
    a.position.set(side * 0.34, 0.12, 0);
    const upper = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.28, 0.1), mat(METAL));
    upper.position.y = -0.12;
    a.add(upper);
    const lower = new THREE.Mesh(
      new THREE.BoxGeometry(0.09, 0.24, 0.09),
      mat(BODY, { emissiveIntensity: 0.12 }),
    );
    lower.position.set(side * 0.04, -0.32, 0.04);
    a.add(lower);
    return a;
  }

  const armL = arm(-1);
  const armR = arm(1);
  body.add(armL);
  body.add(armR);

  // Player marker ring — always visible (drawn over walls) so you never lose the robot.
  const ring = new THREE.Mesh(
    new THREE.RingGeometry(0.55, 0.9, 48),
    new THREE.MeshBasicMaterial({
      color: 0xffc83a,
      transparent: true,
      opacity: 0.85,
      side: THREE.DoubleSide,
      depthTest: false,
      depthWrite: false,
    }),
  );
  ring.rotation.x = -Math.PI / 2;
  ring.position.y = 0.04;
  ring.renderOrder = 999;
  root.add(ring);

  const light = new THREE.PointLight(0xffd166, 1.8, 13);
  light.position.y = 1.4;
  root.add(light);

  return {
    group: root,
    parts: { body, legL, legR, armL, armR, ring, chestLed },
    walkPhase: 0,
    idlePhase: 0,
  };
}

/** @param {ReturnType<typeof createPlayerRobot>} robot */
export function updatePlayerRobot(robot, dt, moving, sprint) {
  const { body, legL, legR, armL, armR, ring, chestLed } = robot.parts;
  const speedMul = sprint ? 1.45 : 1;

  if (moving) {
    robot.walkPhase += dt * 9 * speedMul;
    const s = Math.sin(robot.walkPhase);
    const c = Math.cos(robot.walkPhase);
    legL.rotation.x = s * 0.55;
    legR.rotation.x = -s * 0.55;
    armL.rotation.x = -s * 0.35;
    armR.rotation.x = s * 0.35;
    body.position.y = 0.95 + Math.abs(c) * 0.06;
    body.rotation.z = s * 0.04;
    ring.scale.setScalar(1 + Math.abs(s) * 0.06);
  } else {
    robot.idlePhase += dt * 2;
    const b = Math.sin(robot.idlePhase) * 0.03;
    legL.rotation.x = THREE.MathUtils.lerp(legL.rotation.x, b, 0.1);
    legR.rotation.x = THREE.MathUtils.lerp(legR.rotation.x, -b, 0.1);
    armL.rotation.x = THREE.MathUtils.lerp(armL.rotation.x, 0, 0.1);
    armR.rotation.x = THREE.MathUtils.lerp(armR.rotation.x, 0, 0.1);
    body.position.y = THREE.MathUtils.lerp(body.position.y, 0.95, 0.1);
    body.rotation.z = THREE.MathUtils.lerp(body.rotation.z, 0, 0.1);
    ring.scale.setScalar(1 + Math.sin(robot.idlePhase * 2) * 0.03);
  }

  chestLed.material.emissiveIntensity =
    0.85 + (moving ? Math.abs(Math.sin(robot.walkPhase * 2)) * 0.6 : 0.2);
}
