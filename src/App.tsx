import React from 'react';
import HeroSection from './components/HeroSection';
import ChatInterface from './components/ChatInterface';

function App() {
  return (
    <div className="min-h-screen bg-vanta-black relative overflow-hidden">
      {/* Subtle noise texture */}
       {/* <div className="absolute inset-0 opacity-[0.015] bg-noise" /> */}
      
      {/* Main content */}
      <div className="relative z-10">
        <HeroSection />
        <div className="px-6">
          <ChatInterface />
        </div>
      </div>
      
      {/* Ambient lighting effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] 
                      bg-gradient-radial from-silver/2 via-silver/1 to-transparent blur-3xl" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] 
                      bg-gradient-radial from-silver/1 via-transparent to-transparent blur-3xl" />
      </div>
    </div>
  );
}

export default App;