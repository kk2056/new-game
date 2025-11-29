import React, { useState, useMemo, useEffect } from 'react';
import { GAMES, TOP_BANNER_AD_CONFIG, SIDEBAR_RECTANGLE_AD_CONFIG } from './constants';
import { GameFrame } from './components/GameFrame';
import { AdSenseUnit } from './components/AdSenseUnit';
import { Game } from './types';
import { Menu, X, Gamepad2 } from 'lucide-react';

const App: React.FC = () => {
  const [activeGame, setActiveGame] = useState<Game>(GAMES[0]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // 1. AdSense Dynamic Injection (Anti-Blocking)
  useEffect(() => {
    const existingScript = document.querySelector('script[src*="adsbygoogle"]');
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9774042341049510";
      script.async = true;
      script.crossOrigin = "anonymous";
      document.body.appendChild(script);
    }
  }, []);

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
              <Gamepad2 className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 tracking-tight">
              ArcadeZone
            </h1>
          </div>

          {/* Desktop Nav */}
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

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-slate-400"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Nav Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-slate-900 border-b border-slate-800 p-4 animate-in slide-in-from-top-2">
             <div className="flex flex-col gap-4">
                {categories.map(cat => (
                  <button 
                    key={cat}
                    onClick={() => { setSelectedCategory(cat); setIsMobileMenuOpen(false); }}
                    className={`text-left px-4 py-2 rounded ${selectedCategory === cat ? 'bg-slate-800 text-white' : 'text-slate-400'}`}
                  >
                    {cat === 'All' ? 'Featured Games' : cat}
                  </button>
                ))}
             </div>
          </div>
        )}
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
              </div>

              <div className="divide-y divide-slate-800 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
                {filteredGames.map((game) => (
                  <button
                    key={game.id}
                    onClick={() => {
                      setActiveGame(game);
                      if (window.innerWidth < 1024) {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }
                    }}
                    className={`w-full p-3 flex items-center gap-3 hover:bg-slate-800 transition-all text-left group ${
                      activeGame.id === game.id ? 'bg-slate-800/80 border-l-4 border-blue-500' : 'border-l-4 border-transparent'
                    }`}
                  >
                    <div className={`w-16 h-12 rounded-lg flex-shrink-0 flex items-center justify-center shadow-inner bg-gradient-to-br ${game.gradient} relative overflow-hidden group-hover:opacity-90 transition-opacity`}>
                      <span className="text-white font-black text-xl drop-shadow-md select-none">
                        {game.title.charAt(0)}
                      </span>
                      {game.isNew && (
                        <span className="absolute -top-1 -right-1 flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                        </span>
                      )}
                    </div>
                    
                    <div className="flex-grow min-w-0">
                      <h4 className={`font-medium text-sm truncate ${activeGame.id === game.id ? 'text-blue-400' : 'text-slate-200 group-hover:text-white'}`}>
                        {game.title}
                      </h4>
                      <div className="flex items-center gap-2 mt-0.5">
                         <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 bg-slate-950 text-slate-400 rounded border border-slate-800">
                           {game.category}
                         </span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 py-8 mt-auto">
        <div className="container mx-auto px-4 text-center">
            <div className="flex flex-col items-center gap-4">
              <div className="flex flex-wrap justify-center gap-4 text-sm font-medium">
                 <a href="/" className="text-slate-400 hover:text-purple-400 transition-colors">Home</a>
                 <span className="text-slate-700">|</span>
                 <a href="/privacy.html" className="text-slate-400 hover:text-purple-400 transition-colors">Privacy Policy</a>
                 <span className="text-slate-700">|</span>
                 <a href="/about.html" className="text-slate-400 hover:text-purple-400 transition-colors">About Us</a>
                 <span className="text-slate-700">|</span>
                 <a href="/contact.html" className="text-slate-400 hover:text-purple-400 transition-colors">Contact</a>
              </div>
              <p className="text-slate-600 text-xs">&copy; {new Date().getFullYear()} Pro Max Games. All rights reserved.</p>
            </div>
        </div>
      </footer>
    </div>
  );
};

export default App;