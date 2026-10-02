import { useEffect, useMemo, useRef, useState } from 'react';

const HEAD_BONE = 'Cabeza';
const SPINE_BONE = 'Espalda_media';
const ARM_BONES = ['Hombro_izq', 'Hombro_der'];

const ease = (t) => t * t * (3 - 2 * t);

export default function ModelViewer({ model, title, cover }) {
  const [started, setStarted] = useState(false);

  if (!started) {
    return (
      <div className="model-viewer">
        <div className="media-frame model-stage">
          <button
            type="button"
            className="media-facade"
            style={{ backgroundImage: `url(${cover})` }}
            onClick={() => setStarted(true)}
          >
            <span className="facade-play" aria-hidden="true">
              <i className="bi bi-box" />
            </span>
            <span className="facade-label">
              Explorar en 3D{model.size ? ` · ${model.size}` : ''}
            </span>
            <span className="visually-hidden">: {title}</span>
          </button>
        </div>
        {model.note && <p className="model-note">{model.note}</p>}
      </div>
    );
  }

  return <ModelStage model={model} title={title} cover={cover} />;
}

function ModelStage({ model, title, cover }) {
  const mountRef = useRef(null);
  const engine = useRef(null);
  const [status, setStatus] = useState('loading');
  const [progress, setProgress] = useState(0);
  const [groups, setGroups] = useState([]);
  const [values, setValues] = useState({});
  const [options, setOptions] = useState({ autoRotate: true, wireframe: false, skeleton: false, demo: false });

  const sections = useMemo(() => {
    const map = new Map();
    groups.forEach((g) => {
      if (!map.has(g.section)) map.set(g.section, []);
      map.get(g.section).push(g);
    });
    return [...map.entries()];
  }, [groups]);

  useEffect(() => {
    let disposed = false;
    const mount = mountRef.current;

    (async () => {
      let THREE, GLTFLoader, OrbitControls;
      try {
        [THREE, { GLTFLoader }, { OrbitControls }] = await Promise.all([
          import('three'),
          import('three/addons/loaders/GLTFLoader.js'),
          import('three/addons/controls/OrbitControls.js'),
        ]);
      } catch {
        if (!disposed) setStatus('error');
        return;
      }
      if (disposed) return;

      let renderer;
      try {
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      } catch {
        setStatus('error');
        return;
      }
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(mount.clientWidth, mount.clientHeight);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.domElement.setAttribute('aria-label', `Modelo 3D interactivo de ${title}`);
      renderer.domElement.setAttribute('role', 'img');
      mount.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(30, mount.clientWidth / mount.clientHeight, 0.01, 100);

      scene.add(new THREE.HemisphereLight(0xdfe6ff, 0x1e293b, 1.4));
      const key = new THREE.DirectionalLight(0xffffff, 2.4);
      key.position.set(-2, 3, 3);
      const rim = new THREE.DirectionalLight(0xf37321, 2.6);
      rim.position.set(3, 2, -3);
      const fill = new THREE.DirectionalLight(0x7c3aed, 1.2);
      fill.position.set(3, 1, 2);
      scene.add(key, rim, fill);

      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.08;
      controls.autoRotate = true;
      controls.autoRotateSpeed = 1.2;
      controls.addEventListener('start', () => {
        if (engine.current?.tween) return;
        setOptions((o) => (o.autoRotate ? { ...o, autoRotate: false } : o));
      });

      const e = {
        THREE,
        renderer,
        scene,
        camera,
        controls,
        targets: [],
        rig: [],
        demoWeight: 0,
        lastWeight: 0,
        options: { autoRotate: true, wireframe: false, skeleton: false, demo: false },
        values: {},
        visible: true,
        clock: new THREE.Clock(),
      };
      engine.current = e;

      const loader = new GLTFLoader();
      loader.load(
        model.src,
        (gltf) => {
          if (disposed) return;
          const root = gltf.scene;
          scene.add(root);

          const meshes = [];
          root.traverse((o) => {
            if (!o.isMesh) return;
            o.frustumCulled = false;
            const src = o.material;
            o.material = new THREE.MeshStandardMaterial({
              color: src.color ? src.color.clone() : new THREE.Color(0x999999),
              roughness: Math.max(src.roughness ?? 0.6, 0.45),
              metalness: 0,
              side: THREE.DoubleSide,
            });
            src.dispose();
            meshes.push(o);
          });
          e.meshes = meshes;

          root.updateMatrixWorld(true);
          const box = new THREE.Box3().setFromObject(root, true);
          const size = box.getSize(new THREE.Vector3());
          const center = box.getCenter(new THREE.Vector3());

          const shadowCanvas = document.createElement('canvas');
          shadowCanvas.width = shadowCanvas.height = 128;
          const ctx = shadowCanvas.getContext('2d');
          const grad = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
          grad.addColorStop(0, 'rgba(0,0,0,0.55)');
          grad.addColorStop(1, 'rgba(0,0,0,0)');
          ctx.fillStyle = grad;
          ctx.fillRect(0, 0, 128, 128);
          const shadow = new THREE.Mesh(
            new THREE.PlaneGeometry(size.y * 0.5, size.y * 0.5),
            new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(shadowCanvas), transparent: true, depthWrite: false }),
          );
          shadow.rotation.x = -Math.PI / 2;
          shadow.position.set(center.x, box.min.y + 0.002, center.z);
          scene.add(shadow);

          const fov = THREE.MathUtils.degToRad(camera.fov);
          const fitH = (size.y / 2) / Math.tan(fov / 2);
          const fitW = (size.x / 2) / (Math.tan(fov / 2) * camera.aspect);
          const dist = Math.max(fitH, fitW) * 1.15;
          e.home = {
            position: new THREE.Vector3(center.x, center.y + size.y * 0.04, center.z + dist),
            target: center.clone(),
          };
          camera.position.copy(e.home.position);
          controls.target.copy(center);
          controls.minDistance = size.y * 0.15;
          controls.maxDistance = dist * 2.5;
          controls.update();

          const head = root.getObjectByName(HEAD_BONE);
          if (head) {
            const p = head.getWorldPosition(new THREE.Vector3());
            p.y += size.y * 0.04;
            e.face = { target: p, position: new THREE.Vector3(p.x, p.y + size.y * 0.01, p.z + size.y * 0.32) };
          }

          const skinned = meshes.find((m) => m.isSkinnedMesh);
          if (skinned) {
            const helper = new THREE.SkeletonHelper(root);
            helper.material = new THREE.LineBasicMaterial({ color: 0xf37321, depthTest: false, transparent: true });
            helper.renderOrder = 999;
            helper.visible = false;
            scene.add(helper);
            e.skeleton = helper;
          }

          const down = new THREE.Vector3(0, -1, 0);
          const rig = [];
          const addBone = (name, build) => {
            const bone = root.getObjectByName(name);
            if (bone?.isBone && bone.parent) rig.push({ bone, rest: bone.quaternion.clone(), ...build(bone) });
          };
          addBone(SPINE_BONE, () => ({ kind: 'spine' }));
          addBone(HEAD_BONE, () => ({ kind: 'head' }));
          ARM_BONES.forEach((name) =>
            addBone(name, (bone) => {
              const child = bone.children.find((c) => c.isBone);
              if (!child) return { kind: 'none' };
              const a = bone.getWorldPosition(new THREE.Vector3());
              const b = child.getWorldPosition(new THREE.Vector3());
              const dir = b.sub(a).normalize();
              const axis = new THREE.Vector3().crossVectors(dir, down);
              if (axis.lengthSq() < 1e-6) return { kind: 'none' };
              const below = Math.asin(THREE.MathUtils.clamp(-dir.y, -1, 1));
              return { kind: 'arm', axis: axis.normalize(), lower: Math.max(0, THREE.MathUtils.degToRad(62) - below) };
            }),
          );
          e.rig = rig.filter((r) => r.kind !== 'none');

          const dictNames = new Set();
          meshes.forEach((m) => Object.keys(m.morphTargetDictionary ?? {}).forEach((n) => dictNames.add(n)));
          const resolve = (names) =>
            meshes.flatMap((m) =>
              names
                .filter((n) => m.morphTargetDictionary && n in m.morphTargetDictionary)
                .map((n) => ({ mesh: m, index: m.morphTargetDictionary[n] })),
            );
          const used = new Set();
          const list = [];
          (model.morphs ?? []).forEach((section) =>
            section.items.forEach((item) => {
              const bindings = resolve(item.targets);
              item.targets.forEach((t) => used.add(t));
              if (bindings.length) list.push({ id: item.label, label: item.label, section: section.title, role: item.role, bindings });
            }),
          );
          [...dictNames]
            .filter((n) => !used.has(n))
            .forEach((n) => list.push({ id: n, label: n.replace(/_/g, ' '), section: 'Otros', bindings: resolve([n]) }));
          e.targets = list;

          setGroups(list.map(({ id, label, section, role }) => ({ id, label, section, role })));
          setStatus('ready');
        },
        (xhr) => {
          if (xhr.total) setProgress(Math.round((xhr.loaded / xhr.total) * 100));
        },
        () => {
          if (!disposed) setStatus('error');
        },
      );

      const q = new THREE.Quaternion();
      const pq = new THREE.Quaternion();
      const worldQ = new THREE.Quaternion();
      const Y = new THREE.Vector3(0, 1, 0);
      const X = new THREE.Vector3(1, 0, 0);
      const Z = new THREE.Vector3(0, 0, 1);

      const rotateWorld = (entry, axis, angle) => {
        entry.bone.parent.getWorldQuaternion(pq);
        worldQ.setFromAxisAngle(axis, angle);
        q.copy(pq).invert().multiply(worldQ).multiply(pq);
        entry.bone.quaternion.copy(q).multiply(entry.rest);
      };

      const setInfluence = (group, v) => group.bindings.forEach(({ mesh, index }) => (mesh.morphTargetInfluences[index] = v));

      renderer.setAnimationLoop(() => {
        if (!e.visible) return;
        const dt = Math.min(e.clock.getDelta(), 0.1);
        const t = e.clock.elapsedTime;

        if (e.tween) {
          const k = Math.min((t - e.tween.start) / 0.8, 1);
          const s = ease(k);
          camera.position.lerpVectors(e.tween.fromPos, e.tween.toPos, s);
          controls.target.lerpVectors(e.tween.fromTarget, e.tween.toTarget, s);
          if (k >= 1) e.tween = null;
        }

        const goal = e.options.demo ? 1 : 0;
        e.demoWeight += (goal - e.demoWeight) * Math.min(dt * 3, 1);
        const w = e.demoWeight;

        if (e.rig.length) {
          e.rig.forEach((r) => {
            if (w < 0.001) {
              r.bone.quaternion.copy(r.rest);
              return;
            }
            if (r.kind === 'spine') rotateWorld(r, Z, Math.sin(t * 0.9) * 0.05 * w);
            if (r.kind === 'head') {
              r.bone.parent.getWorldQuaternion(pq);
              worldQ.setFromAxisAngle(Y, Math.sin(t * 0.7) * 0.35 * w).multiply(q.setFromAxisAngle(X, Math.sin(t * 1.3) * 0.06 * w));
              r.bone.quaternion.copy(pq).invert().multiply(worldQ).multiply(pq).multiply(r.rest);
            }
            if (r.kind === 'arm') rotateWorld(r, r.axis, r.lower * w * (0.92 + 0.08 * Math.sin(t * 1.6)));
          });
        }

        if (e.targets.length && w <= 0.001 && e.lastWeight > 0.001) {
          e.targets.forEach((g) => setInfluence(g, e.values[g.id] ?? 0));
        }
        e.lastWeight = w;

        if (e.targets.length && w > 0.001) {
          const blink = (t % 3.4) < 0.18 ? Math.sin(((t % 3.4) / 0.18) * Math.PI) : 0;
          const cycle = e.targets.filter((g) => g.role === 'cycle');
          const period = model.cycleTime ?? 0.7;
          const active = cycle.length ? Math.floor(t / period) % cycle.length : -1;
          const phase = (t % period) / period;
          e.targets.forEach((g) => {
            let demoValue = 0;
            if (g.role === 'blink') demoValue = blink;
            if (g.role === 'cycle' && cycle[active] === g) demoValue = Math.sin(phase * Math.PI);
            setInfluence(g, (e.values[g.id] ?? 0) * (1 - w) + demoValue * w);
          });
        }

        controls.autoRotate = e.options.autoRotate && !e.tween;
        controls.update();
        renderer.render(scene, camera);
      });

      e.setInfluence = setInfluence;

      const resize = new ResizeObserver(() => {
        const { clientWidth: cw, clientHeight: ch } = mount;
        if (!cw || !ch) return;
        renderer.setSize(cw, ch);
        camera.aspect = cw / ch;
        camera.updateProjectionMatrix();
      });
      resize.observe(mount);
      const io = new IntersectionObserver(([entry]) => {
        e.visible = entry.isIntersecting;
        if (e.visible) e.clock.getDelta();
      });
      io.observe(mount);
      e.cleanup = () => {
        resize.disconnect();
        io.disconnect();
      };
    })();

    return () => {
      disposed = true;
      const e = engine.current;
      if (!e) return;
      e.cleanup?.();
      e.renderer.setAnimationLoop(null);
      e.controls.dispose();
      e.scene.traverse((o) => {
        o.geometry?.dispose();
        if (o.material) [].concat(o.material).forEach((m) => {
          m.map?.dispose();
          m.dispose();
        });
      });
      e.renderer.dispose();
      e.renderer.domElement.remove();
      engine.current = null;
    };
  }, [model, title]);

  useEffect(() => {
    const e = engine.current;
    if (!e) return;
    e.options = options;
    e.meshes?.forEach((m) => {
      m.material.wireframe = options.wireframe;
      m.material.transparent = options.skeleton;
      m.material.opacity = options.skeleton ? 0.35 : 1;
      m.material.depthWrite = !options.skeleton;
    });
    if (e.skeleton) e.skeleton.visible = options.skeleton;
  }, [options, status]);

  const toggle = (key) => setOptions((o) => ({ ...o, [key]: !o[key] }));

  const flyTo = (view) => {
    const e = engine.current;
    if (!e || !view) return;
    e.tween = {
      start: e.clock.elapsedTime,
      fromPos: e.camera.position.clone(),
      toPos: view.position.clone(),
      fromTarget: e.controls.target.clone(),
      toTarget: view.target.clone(),
    };
    setOptions((o) => ({ ...o, autoRotate: false }));
  };

  const setMorph = (group, v) => {
    const e = engine.current;
    setValues((prev) => ({ ...prev, [group.id]: v }));
    if (!e) return;
    e.values = { ...e.values, [group.id]: v };
    if (!e.options.demo) e.setInfluence(e.targets.find((g) => g.id === group.id), v);
    if (options.demo) setOptions((o) => ({ ...o, demo: false }));
  };

  const reset = () => {
    const e = engine.current;
    setValues({});
    if (e) {
      e.values = {};
      e.targets.forEach((g) => e.setInfluence(g, 0));
      flyTo(e.home);
    }
    setOptions({ autoRotate: true, wireframe: false, skeleton: false, demo: false });
  };

  const hasFace = Boolean(engine.current?.face);

  return (
    <div className="model-viewer">
      <div className="media-frame model-stage" ref={mountRef}>
        {status !== 'ready' && (
          <div className="model-status" style={status === 'error' ? { backgroundImage: `url(${cover})` } : undefined}>
            {status === 'loading' ? (
              <>
                <span className="model-spinner" aria-hidden="true" />
                <span role="status">Cargando modelo… {progress > 0 && `${progress}%`}</span>
              </>
            ) : (
              <span className="model-error" role="alert">
                No se pudo mostrar el modelo 3D en este navegador.
              </span>
            )}
          </div>
        )}
        {status === 'ready' && (
          <p className="model-hint" aria-hidden="true">
            <i className="bi bi-arrows-move" /> Arrastra para girar · rueda o pellizca para acercar
          </p>
        )}
      </div>

      {status === 'ready' && (
        <>
          <div className="model-toolbar" role="toolbar" aria-label="Controles del visor 3D">
            <ToolButton icon="bi-arrow-repeat" label="Girar" pressed={options.autoRotate} onClick={() => toggle('autoRotate')} />
            <ToolButton icon="bi-person-arms-up" label="Animar" pressed={options.demo} onClick={() => toggle('demo')} />
            <ToolButton icon="bi-diagram-3" label="Esqueleto" pressed={options.skeleton} onClick={() => toggle('skeleton')} />
            <ToolButton icon="bi-grid-3x3" label="Malla" pressed={options.wireframe} onClick={() => toggle('wireframe')} />
            {hasFace && <ToolButton icon="bi-emoji-smile" label="Rostro" onClick={() => flyTo(engine.current.face)} />}
            <ToolButton icon="bi-arrow-counterclockwise" label="Restablecer" onClick={reset} />
          </div>

          {sections.length > 0 && (
            <div className="morph-panel">
              <h3 className="morph-title">
                <i className="bi bi-sliders" aria-hidden="true" /> Blend shapes
                <small>Mueve los controles para ver cada expresión</small>
              </h3>
              <div className="morph-sections">
                {sections.map(([name, items]) => (
                  <fieldset key={name} className="morph-section">
                    <legend>{name}</legend>
                    {items.map((g) => {
                      const id = `morph-${g.id.replace(/\W+/g, '-')}`;
                      const v = values[g.id] ?? 0;
                      return (
                        <div key={g.id} className="morph-row">
                          <label htmlFor={id}>{g.label}</label>
                          <input
                            id={id}
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            value={v}
                            onChange={(ev) => setMorph(g, Number(ev.target.value))}
                            style={{ '--fill': `${v * 100}%` }}
                          />
                          <output htmlFor={id}>{Math.round(v * 100)}</output>
                        </div>
                      );
                    })}
                  </fieldset>
                ))}
              </div>
            </div>
          )}
        </>
      )}
      {model.note && <p className="model-note">{model.note}</p>}
    </div>
  );
}

function ToolButton({ icon, label, pressed, onClick }) {
  return (
    <button
      type="button"
      className={`model-tool ${pressed ? 'is-on' : ''}`}
      aria-pressed={pressed === undefined ? undefined : pressed}
      onClick={onClick}
    >
      <i className={`bi ${icon}`} aria-hidden="true" /> {label}
    </button>
  );
}
