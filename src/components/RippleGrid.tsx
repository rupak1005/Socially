"use client";

import { useEffect, useRef } from 'react';

interface RippleGridProps {
  enableRainbow?: boolean;
  gridColor?: string;
  rippleIntensity?: number;
  gridSize?: number;
  gridThickness?: number;
  mouseInteraction?: boolean;
  mouseInteractionRadius?: number;
  opacity?: number;
}

export default function RippleGrid({
  enableRainbow = false,
  gridColor = "#e5e7eb",
  rippleIntensity = 0.05,
  gridSize = 50,
  gridThickness = 1,
  mouseInteraction = true,
  mouseInteractionRadius = 1.2,
  opacity = 0.3
}: RippleGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    if (mouseInteraction) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    // Animation variables
    let time = 0;
    const ripples: Array<{ x: number; y: number; radius: number; intensity: number }> = [];

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw grid
      ctx.strokeStyle = gridColor;
      ctx.lineWidth = gridThickness;
      ctx.globalAlpha = opacity;

      // Vertical lines
      for (let x = 0; x <= canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      // Horizontal lines
      for (let y = 0; y <= canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Add ripples based on mouse movement
      if (mouseInteraction && Math.random() < rippleIntensity) {
        ripples.push({
          x: mouseRef.current.x,
          y: mouseRef.current.y,
          radius: 0,
          intensity: 1
        });
      }

      // Update and draw ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const ripple = ripples[i];
        ripple.radius += 3;
        ripple.intensity -= 0.015;

        if (ripple.intensity <= 0) {
          ripples.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
        ctx.strokeStyle = enableRainbow 
          ? `hsl(${(time + ripple.radius) % 360}, 70%, 50%)`
          : gridColor;
        ctx.lineWidth = gridThickness * ripple.intensity * 3;
        ctx.globalAlpha = opacity * ripple.intensity;
        ctx.stroke();
      }

      time += 0.5;
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (mouseInteraction) {
        window.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, [enableRainbow, gridColor, rippleIntensity, gridSize, gridThickness, mouseInteraction, mouseInteractionRadius, opacity]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none'
      }}
    />
  );
}
