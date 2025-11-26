"use client";
import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  twinkleSpeed: number;
  twinkleOffset: number;
}

export const StarryBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

    // Create stars with better distribution
    const stars: Star[] = [];
    const numStars = 80; // Reduced for better performance

    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.5 + 0.3, // Smaller, more subtle stars
        opacity: Math.random() * 0.6 + 0.4, // Higher base opacity
        twinkleSpeed: Math.random() * 0.02 + 0.01,
        twinkleOffset: Math.random() * Math.PI * 2
      });
    }

    // Animation variables
    let animationId: number;
    let time = 0;

    const animate = () => {
      // Clear with subtle fade effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw stars
      stars.forEach((star) => {
        // Twinkle effect with smoother animation
        const twinkle = Math.sin(time * star.twinkleSpeed + star.twinkleOffset) * 0.4 + 0.6;
        
        // Draw star with better positioning
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity * twinkle})`;
        ctx.fill();

        // Add subtle glow for larger stars
        if (star.size > 0.8) {
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size * 1.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity * twinkle * 0.2})`;
          ctx.fill();
        }
      });

      time++;
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ 
        background: 'radial-gradient(ellipse at center, rgba(0,0,0,0) 0%, rgba(0,0,0,0.1) 100%)',
        opacity: 0.7
      }}
    />
  );
}; 