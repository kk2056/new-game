import React, { useState, useRef } from 'react';
import { Game } from '../types';

interface GameFrameProps {
  game: Game;
}

export const GameFrame: React.FC<GameFrameProps> = ({ game }) => {
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleReload = () => {
    setIsLoading(true);
    const iframe = containerRef.current?.querySelector('iframe');
    if (iframe) {
      iframe.src = iframe.src;
    }
  };

  const toggleFullscreen = async () => {
    if (!containerRef.current) return;

    try {
      if (!document.fullscreenElement) {
        await containerRef.current.requestFullscreen();
        setIsFullscreen(true);
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch (err) {
      console.error("Error attempting to enable fullscreen:", err);
    }
  };

  // Listen for fullscreen changes (e.g. user presses Esc)
  React.useEffect(() => {
    const handleChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleChange);
    return () => document.removeEventListener('fullscreenchange', handleChange);
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <div 
        ref={containerRef}
        className={`w-full bg-black rounded-xl overflow-hidden shadow-2xl border border-slate-700 flex flex-col ${isFullscreen ? 'p-0 border-0' : ''}`}
      >
        {/* Header - Hidden in fullscreen usually, or customizable */}
        {!isFullscreen && (
          <div className="bg-slate-800 px-4 py-2 border-b border-slate-700 flex justify-between items-center">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
              Playing: {game.title}
            </h2>
            <span className="px-2 py-0.5 text-xs font-medium bg-slate-700 text-slate-300 rounded-full border border-slate-600 uppercase">
              {game.category}
            </span>
          </div>
        )}
        
        <div className={`relative bg-slate-900 ${isFullscreen ? 'h-full w-full flex-grow' : 'aspect-video w-full'}`}>
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center z-10 bg-slate-900 text-slate-400">
              <div className="flex flex-col items-center gap-2">
                <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <p>Loading Game...</p>
              </div>
            </div>
          )}
          
          <iframe
            src={game.embedUrl}
            title={game.title}
            className="w-full h-full border-0 block"
            allow="autoplay; fullscreen; gamepad; accelerometer; gyroscope"
            onLoad={() => setIsLoading(false)}
            sandbox="allow-scripts allow-same-origin allow-presentation allow-popups allow-forms"
          />
        </div>
      </div>

      {/* Game Controls Bar */}
      <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex flex-wrap gap-4 items-center justify-between">
        <div className="flex gap-2">
           <button 
              onClick={handleReload}
              className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-md text-sm font-medium transition-colors text-white"
           >
             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 12" /><path d="M3 3v9h9" /></svg>
             Reload
           </button>
           <button 
             onClick={toggleFullscreen}
             className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-md text-sm font-medium transition-colors"
           >
             {isFullscreen ? (
               <>
                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3v3a2 2 0 0 1-2 2H3"/><path d="M21 8h-3a2 2 0 0 1-2-2V3"/><path d="M3 16h3a2 2 0 0 1 2 2v3"/><path d="M16 21v-3a2 2 0 0 1 2-2h3"/></svg>
                 Exit Fullscreen
               </>
             ) : (
               <>
                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg>
                 Fullscreen
               </>
             )}
           </button>
        </div>
        <div className="text-slate-400 text-sm hidden sm:block">
          <span className="mr-2">Controls not working?</span>
          <span className="text-slate-500 text-xs border border-slate-700 px-2 py-1 rounded">Click inside the game area</span>
        </div>
      </div>

      <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
          <h3 className="text-lg font-semibold text-white mb-2">Instructions</h3>
          <p className="text-slate-300 leading-relaxed">{game.description}</p>
      </div>
    </div>
  );
};