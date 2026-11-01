import { useEffect, useRef } from "react";

const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = (e.clientX / window.innerWidth - 0.5) * 100;
      mouseRef.current.targetY = (e.clientY / window.innerHeight - 0.5) * 100;
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);

    // Brand colors
    const colors = {
      teal: { r: 20, g: 184, b: 166 },      // #14B8A6
      green: { r: 34, g: 197, b: 94 },       // #22C55E
      dark: { r: 3, g: 7, b: 18 },           // #030712 (background)
    };

    // Blob class for organic shapes
    class Blob {
      x: number;
      y: number;
      radius: number;
      color: { r: number; g: number; b: number };
      speedX: number;
      speedY: number;
      phase: number;

      constructor(x: number, y: number, radius: number, color: { r: number; g: number; b: number }) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = (Math.random() - 0.5) * 0.3;
        this.phase = Math.random() * Math.PI * 2;
      }

      update(width: number, height: number, time: number) {
        this.x += this.speedX + Math.sin(time * 0.001 + this.phase) * 0.2;
        this.y += this.speedY + Math.cos(time * 0.001 + this.phase) * 0.2;

        // Bounce off edges with padding
        const padding = this.radius * 0.5;
        if (this.x < -padding) this.x = width + padding;
        if (this.x > width + padding) this.x = -padding;
        if (this.y < -padding) this.y = height + padding;
        if (this.y > height + padding) this.y = -padding;
      }

      draw(ctx: CanvasRenderingContext2D) {
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.radius
        );
        gradient.addColorStop(0, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 0.4)`);
        gradient.addColorStop(0.5, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 0.15)`);
        gradient.addColorStop(1, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Create blobs
    const blobs: Blob[] = [
      new Blob(canvas.width * 0.3, canvas.height * 0.3, 400, colors.teal),
      new Blob(canvas.width * 0.7, canvas.height * 0.6, 350, colors.green),
      new Blob(canvas.width * 0.5, canvas.height * 0.5, 300, colors.teal),
      new Blob(canvas.width * 0.2, canvas.height * 0.7, 280, colors.green),
      new Blob(canvas.width * 0.8, canvas.height * 0.2, 320, colors.teal),
    ];

    const animate = () => {
      time += 16;

      // Smooth mouse following
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      // Clear with transparent background (video shows through)
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Apply mouse offset transform
      ctx.save();
      ctx.translate(mouseRef.current.x, mouseRef.current.y);

      // Update and draw blobs
      blobs.forEach((blob) => {
        blob.update(canvas.width, canvas.height, time);
        blob.draw(ctx);
      });

      ctx.restore();

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ zIndex: 0 }}
    />
  );
};

export default AnimatedBackground;
