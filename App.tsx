import React, { useState, useMemo } from 'react';
import { GAMES, TOP_BANNER_AD_CONFIG, SIDEBAR_RECTANGLE_AD_CONFIG } from './constants';
import { GameFrame } from './components/GameFrame';
import { AdSenseUnit } from './components/AdSenseUnit';
import { Game } from './types';

const App: React.FC = () => {
  const [activeGame, setActiveGame] = useState<Game>(GAMES[0]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = new Set(GAMES.map(g => g.category));
    return ['All', ...Array.from(cats)];
  }, []);

  // Filter games based on category
  const filteredGames = useMemo(() => {
    if (selectedCategory === 'All') return GAMES;
    return GAMES.filter(g => g.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-200 font-sans">
      
      {/* Header */}
      <header className="bg-slate-900/90 backdrop-blur-md border-b border-slate-800 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveGame(GAMES[0])}>
            <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-2 rounded-lg shadow-lg shadow-blue-900/20">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 tracking-tight">
              ArcadeZone
            </h1>
          </div>
          <nav className="hidden md:flex gap-6 text-sm font-medium text-slate-400">
            {categories.slice(0, 4).map(cat => (
              <button 
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`transition-colors ${selectedCategory === cat ? 'text-white font-bold scale-105' : 'hover:text-white'}`}
              >
                {cat === 'All' ? 'Featured' : cat}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-6">
        
        {/* Top Ad Unit */}
        <div className="mb-8 w-full flex justify-center">
          <div className="w-full max-w-[728px] min-h-[90px]">
             <AdSenseUnit config={TOP_BANNER_AD_CONFIG} className="min-h-[90px]" label="Top Banner Ad" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Game Area */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            {/* We use 'key' here to force a remount of GameFrame when the game changes. 
                This ensures the loading state resets and the iframe reloads cleanly. */}
            <GameFrame key={activeGame.id} game={activeGame} />
          </div>

          {/* Sidebar - Sticky */}
          <div className="lg:col-span-4 flex flex-col gap-6 sticky top-20">
            
            {/* Side Ad Unit */}
            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex justify-center shadow-lg">
                <div className="w-[300px] min-h-[250px]">
                  <AdSenseUnit config={SIDEBAR_RECTANGLE_AD_CONFIG} className="min-h-[250px]" label="Sidebar Ad" />
                </div>
            </div>

            {/* Game List */}
            <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden shadow-lg flex flex-col max-h-[calc(100vh-400px)]">
              <div className="p-4 border-b border-slate-800 bg-slate-800/50 flex justify-between items-center sticky top-0 z-10 backdrop-blur-sm">
                <h3 className="font-bold text-white">More Games</h3>
                
                {/* Mobile Category Filter (Simple) */}
                <select 
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="bg-slate-950 text-xs text-slate-300 border border-slate-700 rounded px-2 py-1 outline-none focus:border-blue-500"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div className="divide-y divide-slate-800 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
                {filteredGames.map((game) => (
                  <button
                    key={game.id}
                    onClick={() => {
                      setActiveGame(game);
                      // Scroll to top on mobile
                      if (window.innerWidth < 1024) {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }
                    }}
                    className={`w-full p-3 flex items-center gap-3 hover:bg-slate-800 transition-all text-left group ${
                      activeGame.id === game.id ? 'bg-slate-800/80 border-l-4 border-blue-500' : 'border-l-4 border-transparent'
                    }`}
                  >
                    <div className="relative flex-shrink-0">
                      <img 
                        src={game.thumbnail} 
                        alt={game.title} 
                        className="w-20 h-14 object-cover rounded bg-slate-700 group-hover:opacity-90 transition-opacity"
                      />
                      {game.isNew && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold shadow-sm">
                          NEW
                        </span>
                      )}
                      {activeGame.id === game.id && (
                         <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded">
                            <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
                         </div>
                      )}
                    </div>
                    <div className="flex-grow min-w-0">
                      <h4 className={`font-medium truncate ${activeGame.id === game.id ? 'text-blue-400' : 'text-slate-200 group-hover:text-white'}`}>
                        {game.title}
                      </h4>
                      <div className="flex items-center gap-2 mt-1">
                         <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 bg-slate-950 text-slate-400 rounded border border-slate-800">
                           {game.category}
                         </span>
                      </div>
                    </div>
                  </button>
                ))}
                {filteredGames.length === 0 && (
                   <div className="p-8 text-center text-slate-500 text-sm">
                     No games found in this category.
                   </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 py-8 mt-auto">
        <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-center items-center gap-4 text-sm text-slate-500">
              <p>&copy; {new Date().getFullYear()} ArcadeZone. All rights reserved.</p>
            </div>
        </div>
      </footer>
    </div>
  );
};

export default App;