'use client';

import {useEffect, useRef} from 'react';
import * as THREE from 'three';

import type {Locale} from '@/i18n/routing';

type AgencyDashboardProps = {
  locale: Locale;
};

const copy = {
  de: {
    label: 'Animiertes TreeTech Workflow-System'
  },
  en: {
    label: 'Animated TreeTech workflow system'
  },
  ru: {
    label: 'Анимированная workflow-система TreeTech'
  }
} satisfies Record<Locale, {label: string}>;

export function AgencyDashboard({locale}: AgencyDashboardProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const content = copy[locale];

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return undefined;
    }

    let frameId = 0;
    let disposed = false;
    const pointer = new THREE.Vector2(0, 0);
    const targetPointer = new THREE.Vector2(0, 0);
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const context = createWebGLContext(canvas);

    if (!context) {
      return undefined;
    }

    let renderer: THREE.WebGLRenderer;

    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        context,
        alpha: true,
        antialias: true,
        preserveDrawingBuffer: false,
        powerPreference: 'high-performance'
      });
    } catch {
      return undefined;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(0, 0.55, 8.2);

    const root = new THREE.Group();
    root.rotation.set(-0.08, 0.2, 0.08);
    scene.add(root);

    scene.add(new THREE.AmbientLight(0xdfffd0, 1.1));

    const keyLight = new THREE.DirectionalLight(0xf8ffe8, 2.4);
    keyLight.position.set(4, 5, 7);
    scene.add(keyLight);

    const greenLight = new THREE.PointLight(0xd6ff63, 14, 12);
    greenLight.position.set(-3.5, 1.3, 3);
    scene.add(greenLight);

    const cyanLight = new THREE.PointLight(0x37ffd0, 7, 10);
    cyanLight.position.set(3, -1.5, 2.5);
    scene.add(cyanLight);

    const coreMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xd6ff63,
      emissive: 0x8bff63,
      emissiveIntensity: 0.22,
      metalness: 0.24,
      roughness: 0.18,
      clearcoat: 0.78,
      clearcoatRoughness: 0.18,
      transparent: true,
      opacity: 0.78
    });

    const core = new THREE.Mesh(new THREE.IcosahedronGeometry(1.05, 2), coreMaterial);
    root.add(core);

    const innerCore = new THREE.Mesh(
      new THREE.DodecahedronGeometry(0.58, 1),
      new THREE.MeshStandardMaterial({
        color: 0xf4ffd2,
        emissive: 0xd6ff63,
        emissiveIntensity: 0.42,
        metalness: 0.12,
        roughness: 0.28
      })
    );
    root.add(innerCore);

    const wireCore = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.16, 1),
      new THREE.MeshBasicMaterial({
        color: 0xd6ff63,
        wireframe: true,
        transparent: true,
        opacity: 0.3
      })
    );
    root.add(wireCore);

    const ringMaterials = [
      new THREE.MeshBasicMaterial({color: 0xd6ff63, transparent: true, opacity: 0.48}),
      new THREE.MeshBasicMaterial({color: 0x7cffd4, transparent: true, opacity: 0.28}),
      new THREE.MeshBasicMaterial({color: 0xffffff, transparent: true, opacity: 0.18})
    ];

    const rings = [
      new THREE.Mesh(new THREE.TorusGeometry(1.92, 0.012, 12, 160), ringMaterials[0]),
      new THREE.Mesh(new THREE.TorusGeometry(2.36, 0.01, 12, 180), ringMaterials[1]),
      new THREE.Mesh(new THREE.TorusGeometry(2.82, 0.008, 12, 220), ringMaterials[2])
    ];

    rings[0].rotation.x = Math.PI / 2.7;
    rings[1].rotation.y = Math.PI / 2.9;
    rings[1].rotation.z = Math.PI / 8;
    rings[2].rotation.x = Math.PI / 1.8;
    rings[2].rotation.y = Math.PI / 4;
    rings.forEach((ring) => root.add(ring));

    const nodeMaterial = new THREE.MeshStandardMaterial({
      color: 0xd6ff63,
      emissive: 0xb8ff4a,
      emissiveIntensity: 0.5,
      metalness: 0.18,
      roughness: 0.24
    });

    const blueNodeMaterial = new THREE.MeshStandardMaterial({
      color: 0x71ffe1,
      emissive: 0x2cffc8,
      emissiveIntensity: 0.36,
      metalness: 0.12,
      roughness: 0.28
    });

    const lineMaterial = new THREE.MeshBasicMaterial({
      color: 0xd6ff63,
      transparent: true,
      opacity: 0.28
    });

    const nodePositions = [
      new THREE.Vector3(-2.15, 1.25, 0.25),
      new THREE.Vector3(2.1, 1.02, -0.2),
      new THREE.Vector3(-2.45, -1.06, -0.15),
      new THREE.Vector3(2.28, -1.18, 0.22),
      new THREE.Vector3(0.06, 2.23, -0.32),
      new THREE.Vector3(0.02, -2.25, 0.3)
    ];

    const nodes: THREE.Mesh[] = [];

    nodePositions.forEach((position, index) => {
      const node = new THREE.Mesh(
        new THREE.SphereGeometry(index < 2 ? 0.18 : 0.15, 32, 18),
        index % 2 === 0 ? nodeMaterial : blueNodeMaterial
      );
      node.position.copy(position);
      root.add(node);
      nodes.push(node);

      const line = createCylinderLine(new THREE.Vector3(0, 0, 0), position, 0.01, lineMaterial);
      root.add(line);
    });

    for (let index = 0; index < nodePositions.length; index += 1) {
      const nextIndex = (index + 1) % nodePositions.length;
      const line = createCylinderLine(nodePositions[index], nodePositions[nextIndex], 0.006, lineMaterial);
      root.add(line);
    }

    const startedAt = window.performance.now();

    const resize = () => {
      const parent = canvas.parentElement;
      const width = parent?.clientWidth || canvas.clientWidth || 640;
      const height = parent?.clientHeight || canvas.clientHeight || 480;
      const compact = width < 640;

      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.fov = compact ? 45 : 38;
      camera.position.set(0, compact ? 0.12 : 0.55, compact ? 8.8 : 8.2);
      camera.updateProjectionMatrix();
      root.scale.setScalar(compact ? 0.92 : 1.08);
      root.position.set(0, compact ? 0.16 : 0, 0);
    };

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetPointer.x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      targetPointer.y = -((event.clientY - rect.top) / rect.height - 0.5) * 2;
    };

    canvas.addEventListener('pointermove', onPointerMove);
    resize();

    const renderFrame = () => {
      if (disposed) {
        return;
      }

      const elapsed = (window.performance.now() - startedAt) / 1000;
      pointer.lerp(targetPointer, 0.045);

      root.rotation.y = elapsed * 0.18 + pointer.x * 0.2;
      root.rotation.x = -0.08 + pointer.y * 0.08;
      core.rotation.x = elapsed * 0.34;
      core.rotation.y = elapsed * 0.42;
      innerCore.rotation.y = -elapsed * 0.7;
      wireCore.rotation.x = -elapsed * 0.26;
      wireCore.rotation.z = elapsed * 0.2;

      rings[0].rotation.z = elapsed * 0.55;
      rings[1].rotation.x = Math.PI / 2.9 + elapsed * 0.22;
      rings[2].rotation.y = Math.PI / 4 - elapsed * 0.18;

      nodes.forEach((node, index) => {
        const pulse = 1 + Math.sin(elapsed * 1.8 + index * 0.74) * 0.12;
        node.scale.setScalar(pulse);
      });

      greenLight.intensity = 12 + Math.sin(elapsed * 1.4) * 2;
      renderer.render(scene, camera);

      if (!prefersReducedMotion) {
        frameId = window.requestAnimationFrame(renderFrame);
      }
    };

    renderFrame();

    return () => {
      disposed = true;
      window.cancelAnimationFrame(frameId);
      canvas.removeEventListener('pointermove', onPointerMove);
      observer.disconnect();
      root.traverse((object) => {
        const mesh = object as THREE.Mesh;
        mesh.geometry?.dispose();

        if (Array.isArray(mesh.material)) {
          mesh.material.forEach((material) => material.dispose());
        } else {
          mesh.material?.dispose();
        }
      });
      renderer.dispose();
    };
  }, []);

  return (
    <div
      id="hero-3d"
      className="relative z-10 -mx-6 h-[40svh] min-h-[15rem] max-h-[18rem] overflow-hidden sm:mx-0 sm:h-auto sm:min-h-[30rem] sm:max-h-none lg:min-h-[34rem]"
      role="img"
      aria-label={content.label}
    >
      <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center opacity-80" aria-hidden="true">
        <div className="relative h-56 w-56 sm:h-80 sm:w-80">
          <span className="absolute inset-8 rounded-full border border-accent/30 shadow-[0_0_80px_rgba(214,255,99,0.16)]" />
          <span className="absolute inset-0 rounded-full border border-white/10" />
          <span className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-[2rem] bg-accent/35 blur-xl" />
          <span className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-[1.25rem] border border-accent/50 bg-accent/20" />
        </div>
      </div>
      <canvas ref={canvasRef} className="absolute inset-0 z-10 h-full w-full touch-none" aria-hidden="true" />
    </div>
  );
}

function createWebGLContext(canvas: HTMLCanvasElement) {
  const attributes = {
    alpha: true,
    antialias: true,
    powerPreference: 'high-performance'
  } satisfies WebGLContextAttributes;

  try {
    return (
      canvas.getContext('webgl2', attributes) ||
      canvas.getContext('webgl', attributes) ||
      canvas.getContext('experimental-webgl', attributes)
    ) as WebGLRenderingContext | WebGL2RenderingContext | null;
  } catch {
    return null;
  }
}

function createCylinderLine(
  start: THREE.Vector3,
  end: THREE.Vector3,
  radius: number,
  material: THREE.Material
) {
  const direction = new THREE.Vector3().subVectors(end, start);
  const length = direction.length();
  const geometry = new THREE.CylinderGeometry(radius, radius, length, 12, 1, true);
  const cylinder = new THREE.Mesh(geometry, material.clone());

  cylinder.position.copy(start).add(end).multiplyScalar(0.5);
  cylinder.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.normalize());

  return cylinder;
}
