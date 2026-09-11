/* ============================================================
   BLACK QUACK — Three.js hero scene
   Low-poly swan, drifting particles, subtle parallax + scroll dolly.
   Lazy-loaded. Bails cleanly if WebGL unavailable.
   ============================================================ */

(function () {
  const THREE_URL = "https://unpkg.com/three@0.160.0/build/three.module.js";

  function hasWebGL() {
    try {
      const c = document.createElement("canvas");
      return !!(window.WebGLRenderingContext && (c.getContext("webgl2") || c.getContext("webgl")));
    } catch (e) { return false; }
  }

  window.BQ_initHero = async function initHero(container, opts = {}) {
    if (!container) return null;
    const motion = opts.motion ?? "subtle"; // off | subtle | full
    const variant = opts.variant ?? "swan";  // swan | pint | can
    const paletteBg = opts.bg ?? "#0a0a0a";

    if (!hasWebGL()) {
      container.classList.remove("ready");
      return { destroy: () => {}, updateOpts: () => {} };
    }

    let THREE;
    try {
      THREE = await import(/* webpackIgnore: true */ THREE_URL);
    } catch (e) {
      console.warn("[BQ] Three.js failed to load, using fallback", e);
      return { destroy: () => {}, updateOpts: () => {} };
    }

    // Scene
    const scene = new THREE.Scene();
    scene.background = null;
    scene.fog = new THREE.Fog(new THREE.Color(paletteBg), 6, 18);

    const camera = new THREE.PerspectiveCamera(
      42,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0.4, 6);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Lights
    const ambient = new THREE.AmbientLight(0xffffff, 0.35);
    scene.add(ambient);

    const key = new THREE.DirectionalLight(0xffffff, 1.4);
    key.position.set(3, 4, 3);
    scene.add(key);

    const rim = new THREE.DirectionalLight(0xf4f2ee, 0.8);
    rim.position.set(-4, 2, -3);
    scene.add(rim);

    const fill = new THREE.PointLight(0xf5efe4, 0.4, 20);
    fill.position.set(0, -2, 3);
    scene.add(fill);

    // Group for the hero object
    const hero = new THREE.Group();
    scene.add(hero);

    // ----- SWAN (built from primitives, low-poly stylized) -----
    function buildSwan() {
      const g = new THREE.Group();
      const bodyMat = new THREE.MeshStandardMaterial({
        color: 0x0a0a0a,
        roughness: 0.42,
        metalness: 0.1,
        flatShading: true,
      });
      const highlightMat = new THREE.MeshStandardMaterial({
        color: 0x1a1a1a,
        roughness: 0.65,
        flatShading: true,
      });
      const beakMat = new THREE.MeshStandardMaterial({
        color: 0xc94a2a,
        roughness: 0.5,
        flatShading: true,
      });
      const eyeMat = new THREE.MeshBasicMaterial({ color: 0xf4f2ee });

      // Body — elongated ellipsoid
      const body = new THREE.Mesh(
        new THREE.SphereGeometry(1, 20, 14),
        bodyMat
      );
      body.scale.set(1.5, 0.85, 1);
      body.position.set(0, 0, 0);
      g.add(body);

      // Tail feathers (small cone)
      const tail = new THREE.Mesh(
        new THREE.ConeGeometry(0.35, 0.9, 8),
        highlightMat
      );
      tail.rotation.z = Math.PI / 2;
      tail.rotation.y = -0.2;
      tail.position.set(-1.4, 0.25, 0);
      g.add(tail);

      // Wings — flattened, angled
      const wingGeo = new THREE.SphereGeometry(0.9, 14, 10);
      const leftWing = new THREE.Mesh(wingGeo, highlightMat);
      leftWing.scale.set(1.1, 0.28, 0.6);
      leftWing.position.set(-0.1, 0.35, 0.6);
      leftWing.rotation.z = -0.15;
      leftWing.rotation.y = -0.25;
      g.add(leftWing);

      const rightWing = leftWing.clone();
      rightWing.position.z = -0.6;
      rightWing.rotation.y = 0.25;
      g.add(rightWing);

      // Neck — series of small spheres following a curve for stylized S-shape
      const neckGroup = new THREE.Group();
      const neckSegments = 10;
      // S curve control points
      const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(1.1, 0.2, 0),
        new THREE.Vector3(1.5, 1.0, 0),
        new THREE.Vector3(1.35, 1.8, 0),
        new THREE.Vector3(1.0, 2.3, 0),
        new THREE.Vector3(1.35, 2.65, 0),
        new THREE.Vector3(1.85, 2.55, 0),
      ]);
      const pts = curve.getPoints(neckSegments);
      for (let i = 0; i < pts.length; i++) {
        const r = 0.24 - (i / pts.length) * 0.09;
        const seg = new THREE.Mesh(
          new THREE.SphereGeometry(r, 10, 8),
          bodyMat
        );
        seg.position.copy(pts[i]);
        neckGroup.add(seg);
      }
      g.add(neckGroup);

      // Head
      const head = new THREE.Mesh(
        new THREE.SphereGeometry(0.28, 14, 10),
        bodyMat
      );
      head.position.set(1.85, 2.55, 0);
      g.add(head);

      // Beak
      const beak = new THREE.Mesh(
        new THREE.ConeGeometry(0.09, 0.32, 8),
        beakMat
      );
      beak.rotation.z = -Math.PI / 2;
      beak.rotation.y = 0.15;
      beak.position.set(2.15, 2.55, 0);
      g.add(beak);

      // Eyes
      const eyeL = new THREE.Mesh(new THREE.SphereGeometry(0.035, 8, 6), eyeMat);
      eyeL.position.set(2.02, 2.63, 0.15);
      g.add(eyeL);
      const eyeR = eyeL.clone();
      eyeR.position.z = -0.15;
      g.add(eyeR);

      // Center & tilt
      g.position.set(-0.7, -0.6, 0);
      g.rotation.y = -0.15;
      g.scale.setScalar(0.85);

      return g;
    }

    // ----- PINT GLASS -----
    function buildPint() {
      const g = new THREE.Group();
      const glassMat = new THREE.MeshStandardMaterial({
        color: 0xf4f2ee,
        roughness: 0.1,
        metalness: 0.0,
        transparent: true,
        opacity: 0.18,
      });
      const beerMat = new THREE.MeshStandardMaterial({
        color: 0x1a1a1a,
        roughness: 0.4,
      });
      const foamMat = new THREE.MeshStandardMaterial({
        color: 0xf5efe4,
        roughness: 0.9,
      });

      const glass = new THREE.Mesh(
        new THREE.CylinderGeometry(0.7, 0.55, 2.2, 32, 1, true),
        glassMat
      );
      g.add(glass);

      const beer = new THREE.Mesh(
        new THREE.CylinderGeometry(0.68, 0.54, 1.9, 32),
        beerMat
      );
      beer.position.y = -0.08;
      g.add(beer);

      const foam = new THREE.Mesh(
        new THREE.CylinderGeometry(0.72, 0.68, 0.25, 32),
        foamMat
      );
      foam.position.y = 0.98;
      g.add(foam);

      g.rotation.z = 0.08;
      return g;
    }

    // ----- CAN -----
    function buildCan() {
      const g = new THREE.Group();
      const canMat = new THREE.MeshStandardMaterial({
        color: 0x0a0a0a,
        roughness: 0.35,
        metalness: 0.6,
      });
      const topMat = new THREE.MeshStandardMaterial({
        color: 0x2a2a28,
        roughness: 0.3,
        metalness: 0.8,
      });
      const labelMat = new THREE.MeshStandardMaterial({
        color: 0xf4f2ee,
        roughness: 0.6,
      });

      const can = new THREE.Mesh(
        new THREE.CylinderGeometry(0.6, 0.6, 1.8, 40),
        canMat
      );
      g.add(can);

      const top = new THREE.Mesh(
        new THREE.CylinderGeometry(0.58, 0.58, 0.05, 40),
        topMat
      );
      top.position.y = 0.92;
      g.add(top);

      const label = new THREE.Mesh(
        new THREE.CylinderGeometry(0.605, 0.605, 0.45, 40, 1, true),
        labelMat
      );
      label.position.y = 0.1;
      g.add(label);

      g.rotation.z = 0.12;
      g.rotation.y = 0.6;
      return g;
    }

    let mainObj;
    function rebuildObject(v) {
      if (mainObj) hero.remove(mainObj);
      if (v === "pint") mainObj = buildPint();
      else if (v === "can") mainObj = buildCan();
      else mainObj = buildSwan();
      hero.add(mainObj);
    }
    rebuildObject(variant);

    // ----- PARTICLES -----
    const PARTICLE_COUNT = 320;
    const pPositions = new Float32Array(PARTICLE_COUNT * 3);
    const pSpeeds = new Float32Array(PARTICLE_COUNT);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      pPositions[i * 3 + 0] = (Math.random() - 0.5) * 16;
      pPositions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pPositions[i * 3 + 2] = (Math.random() - 0.5) * 12 - 2;
      pSpeeds[i] = 0.002 + Math.random() * 0.006;
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(pPositions, 3));
    const pMat = new THREE.PointsMaterial({
      color: 0xf4f2ee,
      size: 0.02,
      transparent: true,
      opacity: 0.55,
      depthWrite: false,
      sizeAttenuation: true,
    });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    // ----- Interaction state -----
    const state = {
      mouseX: 0, mouseY: 0,
      targetMX: 0, targetMY: 0,
      scrollY: 0,
      motion,
      running: true,
    };

    function onMouseMove(e) {
      const rect = container.getBoundingClientRect();
      state.targetMX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      state.targetMY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    }
    function onScroll() {
      state.scrollY = window.scrollY;
    }
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });

    // Resize
    function onResize() {
      const w = container.clientWidth;
      const h = container.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    }
    const ro = new ResizeObserver(onResize);
    ro.observe(container);

    // Visibility pausing
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { state.running = e.isIntersecting; });
    }, { threshold: 0 });
    io.observe(container);

    // ----- Loop -----
    const clock = new THREE.Clock();
    let raf;
    function tick() {
      raf = requestAnimationFrame(tick);
      if (!state.running) return;
      const t = clock.getElapsedTime();
      const dt = Math.min(clock.getDelta ? 0.016 : 0.016, 0.05);

      // Smooth mouse
      state.mouseX += (state.targetMX - state.mouseX) * 0.06;
      state.mouseY += (state.targetMY - state.mouseY) * 0.06;

      const mFactor = state.motion === "off" ? 0 : state.motion === "full" ? 1.5 : 1;

      // Hero float + rotate
      if (hero) {
        hero.position.y = Math.sin(t * 0.6) * 0.14 * mFactor;
        hero.rotation.y = Math.sin(t * 0.25) * 0.12 * mFactor + state.mouseX * 0.25 * mFactor;
        hero.rotation.x = state.mouseY * 0.08 * mFactor;
        hero.rotation.z = Math.sin(t * 0.4) * 0.02 * mFactor;
      }

      // Scroll dolly + slight tilt
      const scrollNorm = Math.min(state.scrollY / (window.innerHeight || 800), 1.2);
      camera.position.x = state.mouseX * 0.3 * mFactor;
      camera.position.y = 0.4 - scrollNorm * 0.6 - state.mouseY * 0.15 * mFactor;
      camera.position.z = 6 + scrollNorm * 2.5;
      camera.lookAt(0, 0, 0);

      // Particle drift
      const posArr = pGeo.attributes.position.array;
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        posArr[i * 3 + 1] += pSpeeds[i] * mFactor;
        posArr[i * 3 + 0] += Math.sin(t * 0.3 + i) * 0.0008 * mFactor;
        if (posArr[i * 3 + 1] > 5) posArr[i * 3 + 1] = -5;
      }
      pGeo.attributes.position.needsUpdate = true;
      particles.rotation.y = t * 0.02 * mFactor;

      renderer.render(scene, camera);
    }
    tick();

    // Ready — reveal the canvas as soon as first frame has rendered.
    // (A single rAF wrapper was proving unreliable in some browsers; add
    // synchronously since we've already forced a render inside tick().)
    container.classList.add("ready");

    return {
      destroy() {
        cancelAnimationFrame(raf);
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("scroll", onScroll);
        ro.disconnect();
        io.disconnect();
        renderer.dispose();
        pGeo.dispose();
        pMat.dispose();
        if (renderer.domElement.parentNode) {
          renderer.domElement.parentNode.removeChild(renderer.domElement);
        }
      },
      updateOpts(newOpts) {
        if (newOpts.motion) state.motion = newOpts.motion;
        if (newOpts.variant && newOpts.variant !== variant) {
          rebuildObject(newOpts.variant);
        }
        if (newOpts.bg) {
          scene.fog.color = new THREE.Color(newOpts.bg);
        }
      }
    };
  };
})();
