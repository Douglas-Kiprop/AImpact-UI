import React from 'react';
import MathematicalArt from './MathematicalArt';

const HeroSection: React.FC = () => {
  return (
    <section className="relative w-full flex flex-col items-center justify-center py-6">
      {/* Title */}
      <div className="relative z-10 text-center mb-6">
        <div className="relative">
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-2">
            <span className="bg-gradient-to-r from-white via-silver-200 to-white 
                           bg-clip-text text-transparent drop-shadow-2xl">
              AI
            </span>
            <span className="bg-gradient-to-r from-silver-300 via-white to-silver-300 
                           bg-clip-text text-transparent">
              mpact
            </span>
          </h1>
          
          {/* Subtle glow behind title */}
          <div className="absolute inset-0 bg-gradient-to-r from-silver/20 via-white/10 to-silver/20 
                        blur-3xl opacity-30 -z-10" />
        </div>
        
        <div className="flex items-center justify-center gap-4 mt-4">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-silver/50" />
          <p className="text-lg md:text-xl text-silver/90 font-light tracking-wide">
            Super Agent
          </p>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-silver/50" />
        </div>
      </div>

      {/* Mathematical Art Animation - Completely unconstrained */}
      <div className="relative z-10 mb-8">
        <MathematicalArt />
      </div>
    </section>
  );
};

export default HeroSection;