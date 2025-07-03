import React, { useEffect, useRef } from 'react';
import p5 from 'p5';

const MathematicalArt: React.FC = () => {
  const sketchRef = useRef<HTMLDivElement>(null);
  const p5InstanceRef = useRef<p5 | null>(null);

  useEffect(() => {
    if (!sketchRef.current) return;

    const sketch = (p: p5) => {
      let t = 0;

      p.setup = () => {
        const canvas = p.createCanvas(600, 300);
        canvas.parent(sketchRef.current!);
        p.background(10, 10, 10);
        p.stroke(255, 120);
        p.strokeWeight(0.6);
      };

      p.draw = () => {
        p.background(10, 10, 10);
        
        // Center the animation
        p.translate(p.width / 2, p.height / 2);
        
        for (let i = 0; i < 8000; i++) {
          const x = i;
          const y = i / 235;
          const d = p.mag(
            (4 + p.sin(y * 2 - t) * 3) * p.cos(x / 29),
            y / 8 - 13
          );
          const q = 3 * p.sin(2 * (4 + p.sin(y * 2 - t) * 3) * p.cos(x / 29)) + 
                   0.3 / ((4 + p.sin(y * 2 - t) * 3) * p.cos(x / 29)) + 
                   p.sin(y / 25) * ((4 + p.sin(y * 2 - t) * 3) * p.cos(x / 29)) * 
                   (9 + 4 * p.sin((y / 8 - 13) * 9 - d * 3 + t * 2));
          const c = d - t;
          
          // Scale to show the full majestic pattern
          const px = (q + 30 * p.cos(c)) * 1.2;
          const py = (q * p.sin(c) + d * 39 - 220 + p.height / -1.5) * 1.2;
          
          // Add subtle color variation
          const alpha = p.map(p.sin(c + t), -1, 1, 60, 140);
          p.stroke(255, alpha);
          
          p.point(px, py);
        }
        t += p.PI / 240;
      };
    };

    p5InstanceRef.current = new p5(sketch);

    return () => {
      if (p5InstanceRef.current) {
        p5InstanceRef.current.remove();
      }
    };
  }, []);

  return (
    <div 
      ref={sketchRef} 
      className="flex justify-center items-center"
    />
  );
};

export default MathematicalArt;