
import React, { useState, useRef, useEffect } from 'react';

interface ComparisonSliderProps {
  beforeImg: string;
  afterImg: string;
}

const ComparisonSlider: React.FC<ComparisonSliderProps> = ({ beforeImg, afterImg }) => {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const newPos = ((x - rect.left) / rect.width) * 100;
    setPosition(Math.min(Math.max(newPos, 0), 100));
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden cursor-ew-resize select-none border border-slate-800 shadow-2xl"
      onMouseMove={handleMove}
      onTouchMove={handleMove}
    >
      {/* After Image (Sharp) */}
      <img src={afterImg} className="absolute inset-0 w-full h-full object-cover" alt="Enhanced" />
      
      {/* Before Image (Blurry) */}
      <div 
        className="absolute inset-0 w-full h-full overflow-hidden"
        style={{ width: `${position}%` }}
      >
        <img 
          src={beforeImg} 
          className="absolute inset-0 h-full object-cover grayscale-[0.5] contrast-[0.8] brightness-[0.9]" 
          style={{ width: '100vw' }} // Hack to maintain scale
          alt="Original" 
        />
        <div className="absolute inset-0 bg-black/10 backdrop-blur-[2px]"></div>
      </div>

      {/* Slider Handle */}
      <div 
        className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)] z-10"
        style={{ left: `${position}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
          <div className="flex space-x-0.5">
            <div className="w-0.5 h-3 bg-slate-400"></div>
            <div className="w-0.5 h-3 bg-slate-400"></div>
          </div>
        </div>
      </div>

      {/* Labels */}
      <div className="absolute bottom-4 left-4 glass px-3 py-1 rounded text-xs font-bold pointer-events-none">BEFORE</div>
      <div className="absolute bottom-4 right-4 glass px-3 py-1 rounded text-xs font-bold pointer-events-none text-cyan-400">AFTER</div>
    </div>
  );
};

export default ComparisonSlider;
