import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";
import { PROJECT_COLORS } from "./config.js";
import {
  loadProjectModel,
  tickModelAnimation,
  getModelCredit,
  frameModelForCamera,
} from "./mesh-models.js";
import { getPixelRatio, useBloom } from "./perf.js";

export class DetailScene {
  constructor(canvas, options = {}) {
    this.canvas = canvas;
    this.perf = options.perf ?? "medium";
    this.useBloomPass = useBloom(this.perf);
    this.key = "dl";
    this.model = null;
    this.loadToken = 0;
    this.onCreditChange = null;

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x080b13);
    this.scene.fog = new THREE.Fog(0x080b13, 14, 55);

    this.camera = new THREE.PerspectiveCamera(42, 1, 0.1, 120);
    this.camera.position.set(2.4, 1.6, 3.2);

    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: this.perf !== "low",
      alpha: true,
      powerPreference: "high-performance",
    });
    this.renderer.setPixelRatio(getPixelRatio(this.perf));
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.1;

    if (this.useBloomPass) {
      this.composer = new EffectComposer(this.renderer);
      this.composer.addPass(new RenderPass(this.scene, this.camera));
      this.bloom = new UnrealBloomPass(new THREE.Vector2(1, 1), 0.42, 0.4, 0.55);
      this.composer.addPass(this.bloom);
      this.composer.addPass(new OutputPass());
    }

    this.controls = new OrbitControls(this.camera, canvas);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.06;
    this.controls.target.set(0, 0.35, 0);
    this.controls.minDistance = 0.8;
    this.controls.maxDistance = 24;
    this.controls.maxPolarAngle = Math.PI * 0.88;
    this.controls.zoomSpeed = 1.1;

    this.scene.add(new THREE.AmbientLight(0x556688, 0.6));
    const key = new THREE.DirectionalLight(0xffffff, 1.7);
    key.position.set(4, 8, 6);
    this.scene.add(key);
    const fill = new THREE.DirectionalLight(0xaabbff, 0.5);
    fill.position.set(-5, 3, -4);
    this.scene.add(fill);
    const rim = new THREE.DirectionalLight(0x9fd8ff, 0.6);
    rim.position.set(-3, 2, -6);
    this.scene.add(rim);
    this.accent = new THREE.PointLight(0xffd166, 1.4, 30);
    this.accent.position.set(-2, 3, 3);
    this.scene.add(this.accent);

    const floor = new THREE.Mesh(
      new THREE.CircleGeometry(9, 24),
      new THREE.MeshLambertMaterial({ color: 0x141a28 }),
    );
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -1.05;
    this.scene.add(floor);

    this.grid = new THREE.GridHelper(16, 16, 0x2a3344, 0x151b26);
    this.grid.position.y = -1.04;
    this.scene.add(this.grid);

    this.clock = new THREE.Clock();
    this.running = false;
    this._resize();
    window.addEventListener("resize", () => {
      this._resize();
      if (this.model) frameModelForCamera(this.model, this.camera, this.controls);
    });
  }

  async setProject(key) {
    this.key = key;
    const token = ++this.loadToken;
    const color = PROJECT_COLORS[key];

    if (this.model) {
      this.scene.remove(this.model);
      this.model = null;
    }

    try {
      const loaded = await loadProjectModel(key);
      if (token !== this.loadToken) return;
      this.scene.add(loaded);
      this.model = loaded;
      fitPlaceholder(loaded);
      frameModelForCamera(loaded, this.camera, this.controls);
      const c = new THREE.Color(PROJECT_COLORS[key]);
      this.scene.fog.color.setRGB(c.r * 0.07, c.g * 0.07, c.b * 0.07);
      this.accent.color.set(c);
      if (this.onCreditChange) this.onCreditChange(getModelCredit(key) ?? "");
    } catch {
      if (this.onCreditChange) this.onCreditChange("");
    }
  }

  _resize() {
    const parent = this.canvas.parentElement;
    if (!parent) return;
    const w = Math.max(parent.clientWidth, 1);
    const h = Math.max(parent.clientHeight, 1);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h, false);
    if (this.composer) {
      this.composer.setSize(w, h);
      this.bloom?.setSize(w, h);
    }
  }

  start() {
    if (this.running) return;
    this.running = true;
    this.clock.start();
    this._loop();
  }

  stop() {
    this.running = false;
  }

  _loop() {
    if (!this.running) return;
    requestAnimationFrame(() => this._loop());
    if (document.hidden) return;

    const t = this.clock.getElapsedTime();
    if (this.model) {
      if (this.model.userData.turntable) {
        this.model.rotation.y = t * 0.18;
      }
      this.model.position.y = (this.model.userData.baseY ?? 0) + Math.sin(t * 1.2) * 0.025;
      tickModelAnimation(this.model, t);
    }
    this.controls.update();
    if (this.composer) this.composer.render();
    else this.renderer.render(this.scene, this.camera);
  }
}

function fitPlaceholder(model) {
  const box = new THREE.Box3().setFromObject(model);
  const center = box.getCenter(new THREE.Vector3());
  model.position.sub(center);
  model.userData.baseY = model.position.y;
}

function disposeObject(root) {
  root.traverse((c) => {
    if (c.geometry) c.geometry.dispose();
    if (c.material) {
      const mats = Array.isArray(c.material) ? c.material : [c.material];
      mats.forEach((m) => m?.dispose?.());
    }
  });
}
