import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface Particle {
  x: number;
  y: number;
  speed: number;
  radius: number;
  opacity: number;
  cycle: number;
}

const seededValue = (index: number, offset: number): number => {
  const value = Math.sin(index * 9283.31 + offset * 77.17) * 43758.5453;
  return value - Math.floor(value);
};

export function ParticleField() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!canvas.current) return;
    const element = canvas.current;
    const context = element.getContext("2d");
    if (!context) return;

    let frame = 0;
    let width = 0;
    let height = 0;
    let previousTime = 0;
    let running = !document.hidden && !reducedMotion;
    const particleCount = window.matchMedia("(max-width: 767px)").matches ? 52 : 96;
    const particles: Particle[] = Array.from({ length: particleCount }, (_, index) => ({
      x: seededValue(index, 1),
      y: seededValue(index, 2),
      speed: 28 + seededValue(index, 3) * 22,
      radius: 0.45 + seededValue(index, 4) * 1.15,
      opacity: 0.16 + seededValue(index, 5) * 0.38,
      cycle: 0
    }));

    const resize = () => {
      const scale = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      element.width = Math.round(width * scale);
      element.height = Math.round(height * scale);
      element.style.width = `${width}px`;
      element.style.height = `${height}px`;
      context.setTransform(scale, 0, 0, scale, 0, 0);
    };

    const resetParticle = (particle: Particle, index: number) => {
      particle.cycle += 1;
      particle.x = seededValue(index + particle.cycle * particles.length, 7);
      particle.y = -0.015 - seededValue(index + particle.cycle, 8) * 0.08;
    };

    const draw = (time: number) => {
      frame = 0;
      const elapsed = previousTime ? Math.min((time - previousTime) / 1000, 0.05) : 0;
      previousTime = time;
      context.clearRect(0, 0, width, height);
      particles.forEach((particle, index) => {
        if (!reducedMotion) particle.y += (particle.speed * elapsed) / height;
        if (particle.y > 1.02) resetParticle(particle, index);
        const x = particle.x * width;
        const y = particle.y * height;
        context.beginPath();
        context.fillStyle = `rgb(255 255 255 / ${particle.opacity})`;
        context.arc(x, y, particle.radius, 0, Math.PI * 2);
        context.fill();
      });
      if (running && !frame) frame = window.requestAnimationFrame(draw);
    };

    const handleVisibility = () => {
      running = !document.hidden && !reducedMotion;
      if (running && !frame) {
        previousTime = 0;
        frame = window.requestAnimationFrame(draw);
      }
      if (!running && frame) {
        window.cancelAnimationFrame(frame);
        frame = 0;
      }
    };

    const handleResize = () => {
      resize();
      if (reducedMotion) draw(0);
    };

    resize();
    if (reducedMotion) draw(0);
    else frame = window.requestAnimationFrame(draw);
    window.addEventListener("resize", handleResize);
    document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      running = false;
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [reducedMotion]);

  return (
    <canvas
      ref={canvas}
      className="pointer-events-none fixed inset-0 z-0 block max-w-full opacity-90"
      aria-hidden="true"
      data-ui="particle-field"
    />
  );
}
