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

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      preserveDrawingBuffer: true,
      powerPreference: 'high-performance'
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(0, 0.55, 8.2);

    const root = new THREE.Group();
    root.rotation.set(-0.08, 0.2, 0.08);
    scene.add(root);

    scene.add(new THREE.AmbientLight(0xeaf7dd, 0.72));

    const keyLight = new THREE.DirectionalLight(0xfff8dc, 2.1);
    keyLight.position.set(4, 5, 7);
    scene.add(keyLight);

    const greenLight = new THREE.PointLight(0xd6ff63, 9, 12);
    greenLight.position.set(-3.5, 1.3, 3);
    scene.add(greenLight);

    const cyanLight = new THREE.PointLight(0x37ffd0, 4.5, 10);
    cyanLight.position.set(3, -1.5, 2.5);
    scene.add(cyanLight);

    const coreMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xd6ff63,
      emissive: 0x8bff63,
      emissiveIntensity: 0.18,
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
        emissiveIntensity: 0.34,
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
        opacity: 0.2
      })
    );
    root.add(wireCore);

    const ringMaterials = [
      new THREE.MeshBasicMaterial({color: 0xd6ff63, transparent: true, opacity: 0.34}),
      new THREE.MeshBasicMaterial({color: 0x7cffd4, transparent: true, opacity: 0.2}),
      new THREE.MeshBasicMaterial({color: 0xffffff, transparent: true, opacity: 0.12})
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
      opacity: 0.16
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

    const particleGeometry = new THREE.BufferGeometry();
    const particleCount = 72;
    const positions = new Float32Array(particleCount * 3);

    for (let index = 0; index < particleCount; index += 1) {
      const radius = 2.4 + Math.random() * 2.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[index * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[index * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.72;
      positions[index * 3 + 2] = radius * Math.cos(phi) * 0.72;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particles = new THREE.Points(
      particleGeometry,
      new THREE.PointsMaterial({
        color: 0xd6ff63,
        size: 0.024,
        transparent: true,
        opacity: 0.24,
        sizeAttenuation: true
      })
    );
    root.add(particles);

    const startedAt = window.performance.now();

    const resize = () => {
      const parent = canvas.parentElement;
      const width = parent?.clientWidth || canvas.clientWidth || 640;
      const height = parent?.clientHeight || canvas.clientHeight || 480;

      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
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
      particles.rotation.y = -elapsed * 0.05;

      rings[0].rotation.z = elapsed * 0.55;
      rings[1].rotation.x = Math.PI / 2.9 + elapsed * 0.22;
      rings[2].rotation.y = Math.PI / 4 - elapsed * 0.18;

      nodes.forEach((node, index) => {
        const pulse = 1 + Math.sin(elapsed * 1.8 + index * 0.74) * 0.12;
        node.scale.setScalar(pulse);
      });

      greenLight.intensity = 8 + Math.sin(elapsed * 1.4) * 1.2;
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
      className="relative -mx-5 min-h-[22rem] overflow-hidden rounded-[2rem] border border-white/10 bg-[#050705] shadow-[0_30px_120px_rgba(0,0,0,0.42)] sm:mx-0 sm:min-h-[30rem] lg:min-h-[34rem]"
      aria-label={content.label}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(214,255,99,0.18),transparent_15rem),radial-gradient(circle_at_58%_58%,rgba(25,85,62,0.28),transparent_20rem),linear-gradient(180deg,#0d130f_0%,#050705_66%,#030403_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_32%,rgba(3,4,3,0.54)_72%,rgba(3,4,3,0.9)_100%)]" />
      <div className="pointer-events-none absolute inset-x-10 bottom-10 h-24 rounded-full bg-accent/10 blur-3xl" />
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full touch-none" aria-hidden="true" />
    </div>
  );
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
