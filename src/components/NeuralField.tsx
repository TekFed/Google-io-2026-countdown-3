/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
  radius: number;
  angle: number;
  orbitRadius: number;
  orbitSpeed: number;
  color: string;
}

export const NeuralField: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const particles = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      const particleCount = Math.min(window.innerWidth / 10, 150);
      particles.current = [];
      const colors = ['#4285F4', '#EA4335', '#FBBC04', '#34A853'];

      for (let i = 0; i < particleCount; i++) {
        const orbitRadius = 150 + Math.random() * 300;
        const angle = Math.random() * Math.PI * 2;
        particles.current.push({
          x: 0,
          y: 0,
          originX: 0,
          originY: 0,
          vx: 0,
          vy: 0,
          radius: Math.random() * 1.5 + 0.5,
          angle: angle,
          orbitRadius: orbitRadius,
          orbitSpeed: (Math.random() - 0.5) * 0.005,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // Draw connections
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.current.length; i++) {
        const p1 = particles.current[i];
        
        // Update position based on orbit
        p1.angle += p1.orbitSpeed;
        const targetX = centerX + Math.cos(p1.angle) * p1.orbitRadius;
        const targetY = centerY + Math.sin(p1.angle) * p1.orbitRadius;

        // Mouse reaction
        const dx = mouse.current.x - targetX;
        const dy = mouse.current.y - targetY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 200;
        
        let offsetX = 0;
        let offsetY = 0;

        if (dist < maxDist) {
          const force = (maxDist - dist) / maxDist;
          offsetX = (dx / dist) * force * -50;
          offsetY = (dy / dist) * force * -50;
        }

        p1.x = targetX + offsetX;
        p1.y = targetY + offsetY;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
        ctx.fillStyle = p1.color + '88'; // Add some transparency
        ctx.fill();

        // Draw lines to neighbors
        for (let j = i + 1; j < particles.current.length; j++) {
          const p2 = particles.current[j];
          const dx2 = p1.x - p2.x;
          const dy2 = p1.y - p2.y;
          const dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);

          if (dist2 < 100) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * (1 - dist2 / 100)})`;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    });

    resize();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="neural-canvas"
      className="fixed inset-0 pointer-events-none"
      style={{ filter: 'blur(0.5px)' }}
    />
  );
};
