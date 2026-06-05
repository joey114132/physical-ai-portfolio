import * as THREE from "three";
import { PROJECT_COLORS } from "./config.js";
import { buildProjectModel } from "./models.js";

/** Target max dimension in world units for detail viewer. */
const NORMALIZED_SIZE = 2.8;

const SPECS = {
  dl: {
    kind: "procedural",
    builder: "dl",
    display: { yaw: Math.PI * 0.18, pitch: -0.12 },
    modelCredit: "Gesto · hand-tracking landmarks (low-poly)",
    animate: (root, t) => {
      root.rotation.z = Math.sin(t * 1.1) * 0.06;
    },
  },
  iot: {
    kind: "procedural",
    builder: "iot",
    display: { yaw: Math.PI * 0.22 },
    modelCredit: "Wizard of Parking · gate & fee tower (low-poly)",
  },
  ros: {
    kind: "procedural",
    builder: "ros",
    display: { yaw: Math.PI * 0.42 },
    modelCredit: "ShopPinkki · autonomous cart (low-poly)",
  },
  pai: {
    kind: "procedural",
    builder: "pai",
    display: { yaw: Math.PI * 0.18, pitch: -0.08 },
    modelCredit: "EduPing · dual-arm high-five (low-poly)",
    animate: (root, t) => {
      const p = root.userData.parts;
      if (p?.armR) {
        const s = Math.sin(t * 2.2) * 0.25;
        p.armR.rotation.x = s;
        p.armL.rotation.x = -s * 0.6;
      }
    },
  },
};

function fitToSize(object, targetSize = NORMALIZED_SIZE) {
  const box = new THREE.Box3().setFromObject(object);
  const size = box.getSize(new THREE.Vector3());
  const maxDim = Math.max(size.x, size.y, size.z, 0.001);
  const s = targetSize / maxDim;
  object.scale.multiplyScalar(s);
  box.setFromObject(object);
  const center = box.getCenter(new THREE.Vector3());
  object.position.sub(center);
  object.position.y += size.y * s * 0.08;
  object.userData.baseY = object.position.y;
  return object;
}

function applyDisplayRotation(root, display = {}) {
  if (display.yaw) root.rotation.y = display.yaw;
  if (display.pitch) root.rotation.x = display.pitch;
  if (display.roll) root.rotation.z = display.roll;
}

function wrapProcedural(model, spec) {
  const root = new THREE.Group();
  root.add(model);
  applyDisplayRotation(root, spec.display);
  root.userData.procedural = true;
  root.userData.animate = spec.animate;
  root.userData.modelCredit = spec.modelCredit;
  root.userData.arm = model.userData?.arm;
  root.userData.parts = model.userData?.parts;
  return root;
}

export async function loadProjectModel(key) {
  const color = PROJECT_COLORS[key];
  const spec = SPECS[key];
  if (!spec) return buildProjectModel(key, color);

  const built = buildProjectModel(spec.builder ?? key, color);
  const model = wrapProcedural(built, spec);
  fitToSize(model, NORMALIZED_SIZE);
  return model;
}

export function tickModelAnimation(model, t) {
  if (!model) return;
  if (typeof model.userData.animate === "function") {
    model.userData.animate(model, t);
    return;
  }
  const arm = model.userData?.arm;
  if (arm) arm.rotation.z = Math.sin(t * 1.5) * 0.55 - 0.2;
}

/** Fit camera so the full model stays inside the detail frame. */
export function frameModelForCamera(model, camera, controls) {
  const box = new THREE.Box3().setFromObject(model);
  if (box.isEmpty()) return;

  const sphere = box.getBoundingSphere(new THREE.Sphere());
  const radius = Math.max(sphere.radius, NORMALIZED_SIZE * 0.35);

  const vFov = (camera.fov * Math.PI) / 180;
  const aspect = Math.max(camera.aspect || 1, 0.5);
  const hFov = 2 * Math.atan(Math.tan(vFov / 2) * aspect);
  const distV = radius / Math.sin(vFov / 2);
  const distH = radius / Math.sin(hFov / 2);
  const dist = Math.max(distV, distH) * 1.02;

  const center = sphere.center;
  camera.position.set(center.x + dist * 0.62, center.y + dist * 0.32, center.z + dist * 0.78);
  controls.target.set(center.x, center.y, center.z);
  controls.minDistance = radius * 0.4;
  controls.maxDistance = radius * 2.8;
  controls.update();
}

export function getModelCredit(key) {
  return SPECS[key]?.modelCredit ?? null;
}
