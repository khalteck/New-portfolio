import { useEffect, useRef } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface Particle {
  x: number;
  y: number;
  speed: number;
  radius: number;
  opacity: number;
}

const seededValue = (index: number, offset: number): number => {
  const value = Math.sin(index * 9283.31 + offset * 77.17) * 43758.5453;
  return value - Math.floor(value);
};

export function ParticleField() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const reducedMotion = useReducedMotion();
  const constrained = useMediaQuery("(max-width: 1023px), (pointer: coarse)");

  useEffect(() => {
    if (reducedMotion || constrained || !canvas.current) return;
    const element = canvas.current;
    const context = element.getContext("2d");
    if (!context) return;

    let frame = 0;
    let width = 0;
    let height = 0;
    let running = !document.hidden;
    const particles: Particle[] = Array.from({ length: 76 }, (_, index) => ({
      x: seededValue(index, 1),
      y: seededValue(index, 2),
      speed: 0.000035 + seededValue(index, 3) * 0.00011,
      radius: 0.45 + seededValue(index, 4) * 1.15,
      opacity: 0.14 + seededValue(index, 5) * 0.42
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

    const draw = () => {
      context.clearRect(0, 0, width, height);
      particles.forEach((particle) => {
        particle.y = (particle.y + particle.speed) % 1;
        const x = particle.x * width;
        const y = particle.y * height;
        context.beginPath();
        context.fillStyle = `rgb(255 255 255 / ${particle.opacity})`;
        context.arc(x, y, particle.radius, 0, Math.PI * 2);
        context.fill();
      });
      if (running) frame = window.requestAnimationFrame(draw);
    };

    const handleVisibility = () => {
      running = !document.hidden;
      if (running && !frame) frame = window.requestAnimationFrame(draw);
      if (!running && frame) {
        window.cancelAnimationFrame(frame);
        frame = 0;
      }
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      running = false;
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [constrained, reducedMotion]);

  if (reducedMotion || constrained) return null;
  return <canvas ref={canvas} className="particle-field" aria-hidden="true" />;
}
