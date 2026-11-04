import * as THREE from "three";

export type CodeSymbol = {
  /** Dessine une image ; px/py = position du pointeur normalisée (-0.5 … 0.5). */
  render: (px: number, py: number) => void;
  /** Un coup de toupie quand on change de plan. */
  kick: (toAbout: boolean) => void;
  dispose: () => void;
};

// Contours du </> (repère 400 × 300 du SVG d'origine)
const POLYS: [number, number][][] = [
  [[150, 92], [72, 150], [150, 208], [166, 186], [118, 150], [166, 114]],
  [[250, 92], [328, 150], [250, 208], [234, 186], [282, 150], [234, 114]],
  [[214, 58], [248, 58], [186, 242], [152, 242]],
];

/** Monte le </> 3D dans `host`. Renvoie null si WebGL est indisponible. */
export function mountCodeSymbol(host: HTMLElement, reduce: boolean): CodeSymbol | null {
  let renderer: THREE.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  } catch {
    return null;
  }
  // rendu identique à l'ancienne version de three (couleurs et éclairage « legacy »)
  THREE.ColorManagement.enabled = false;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  host.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(32, 4 / 3, 0.1, 100);
  camera.position.set(0, 0, 9);

  const shapes = POLYS.map((poly) => {
    const s = new THREE.Shape();
    poly.forEach(([x, y], i) => {
      const X = (x - 200) / 50;
      const Y = -(y - 150) / 50;
      if (i) s.lineTo(X, Y);
      else s.moveTo(X, Y);
    });
    s.closePath();
    return s;
  });
  const geo = new THREE.ExtrudeGeometry(shapes, {
    depth: 0.7,
    bevelEnabled: true,
    bevelThickness: 0.08,
    bevelSize: 0.06,
    bevelSegments: 4,
    curveSegments: 1,
  });
  geo.center();
  const mat = new THREE.MeshStandardMaterial({ color: 0x050505, roughness: 0.32, metalness: 0.15 });
  const group = new THREE.Group();
  group.add(new THREE.Mesh(geo, mat));
  scene.add(group);

  // intensités × π : équivalent des lumières de three r128
  const PI = Math.PI;
  const hemi = new THREE.HemisphereLight(0xffffff, 0x444444, 0.55 * PI);
  const key = new THREE.DirectionalLight(0xffffff, 1.3 * PI);
  key.position.set(4, 5, 6);
  const rim = new THREE.DirectionalLight(0xffffff, 0.9 * PI);
  rim.position.set(-6, -2, -4);
  scene.add(hemi, key, rim);

  const root = document.documentElement;
  const mq = matchMedia("(prefers-color-scheme: dark)");
  const isDark = () => {
    const t = root.dataset.theme;
    return t ? t === "dark" : mq.matches;
  };
  const applyTheme = () => {
    if (isDark()) {
      mat.color.set(0xe8e8e8);
      key.intensity = 1.1 * PI;
    } else {
      mat.color.set(0x050505);
      key.intensity = 1.3 * PI;
    }
  };
  applyTheme();
  mq.addEventListener("change", applyTheme);
  const themeObserver = new MutationObserver(applyTheme);
  themeObserver.observe(root, { attributes: true, attributeFilter: ["data-theme"] });

  const resize = () => {
    const w = host.clientWidth;
    const h = host.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  };
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(host);
  resize();

  // rotation : dérive lente + glisser à la souris / au doigt
  let cx = 0, cy = 0, spin = -0.5, dragging = false, lastX = 0;
  const base = reduce ? 0 : 0.006;
  let vel = base;
  const onDown = (e: PointerEvent) => {
    dragging = true;
    lastX = e.clientX;
    host.classList.add("dragging");
  };
  const onMove = (e: PointerEvent) => {
    if (!dragging) return;
    const dx = e.clientX - lastX;
    lastX = e.clientX;
    vel = dx * 0.004;
    spin += dx * 0.01;
  };
  const onUp = () => {
    dragging = false;
    host.classList.remove("dragging");
  };
  host.addEventListener("pointerdown", onDown);
  window.addEventListener("pointermove", onMove);
  window.addEventListener("pointerup", onUp);

  const clock = new THREE.Clock();

  return {
    render(px, py) {
      const t = clock.getElapsedTime();
      if (!dragging) {
        vel += (base - vel) * 0.025;
        spin += vel;
      }
      cx += (px * 0.5 - cx) * 0.06;
      cy += (py * 0.4 - cy) * 0.06;
      group.rotation.y = spin + cx;
      group.rotation.x = cy - 0.12;
      group.position.y = reduce ? 0 : Math.sin(t * 1.2) * 0.08;
      renderer.render(scene, camera);
    },
    kick(toAbout) {
      if (!reduce) vel = toAbout ? 0.22 : -0.22;
    },
    dispose() {
      host.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      mq.removeEventListener("change", applyTheme);
      themeObserver.disconnect();
      resizeObserver.disconnect();
      geo.dispose();
      mat.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    },
  };
}
