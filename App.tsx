import React, { useState, useMemo, useEffect } from 'react';
import { 
  GAMES, 
  TOP_BANNER_AD_CONFIG, 
  SIDEBAR_RECTANGLE_AD_CONFIG, 
  MID_CONTENT_AD_CONFIG, 
  BOTTOM_LINKS_AD_CONFIG 
} from './constants';
import { GameFrame } from './components/GameFrame';
import { AdSenseUnit } from './components/AdSenseUnit';
import { Game } from './types';
import { Menu, X, Gamepad2, Info, Star, ShieldCheck, Zap } from 'lucide-react';

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

  const categories = useMemo(() => {
    const cats = new Set(GAMES.map(g => g.category));
    return ['All', ...Array.from(cats)];
  }, []);

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

          <button 
            className="md:hidden p-2 text-slate-400"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

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
          
          {/* Main Content Area */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            
            {/* Game Player Section */}
            <GameFrame key={activeGame.id} game={activeGame} />

            {/* 300+ Words SEO Content Block */}
            <div className="bg-slate-900/50 p-8 rounded-xl border border-slate-800 shadow-xl leading-relaxed">
              <div className="flex items-center gap-2 mb-4 text-blue-400">
                <Info className="w-5 h-5" />
                <h2 className="text-xl font-bold text-white">Why Play Unblocked Games 2025 at ArcadeZone?</h2>
              </div>
              <div className="text-slate-300 space-y-4">
                <p>
                  Welcome to the definitive portal for <strong>unblocked games 2025</strong>. If you are browsing from a <strong>school chromebook</strong> and need a <strong>no download</strong> solution for your gaming needs, you have come to the right place. In 2025, web gaming has reached a professional peak, with HTML5 technology allowing for near-console quality experiences directly in your browser.
                </p>
                <p>
                  Our platform is specifically optimized for <strong>school chromebook</strong> users who often face restrictive filters and hardware limitations. We ensure that every title in our library—from the geometric complexity of Hextris to the logic-driven thrills of 2048—is fully <strong>unblocked</strong> and requires absolutely <strong>no download</strong>. This keeps your system lightweight and secure while providing instant entertainment during breaks.
                </p>
                <p>
                  The "ProMax" experience at ArcadeZone means we don't just host games; we curate the highest-performing versions available. Whether it's the 60FPS fluidity of T-Rex Runner or the classic nostalgic joy of Pac-Man, our servers are tuned for 2025 connectivity standards. Say goodbye to lag and intrusive pop-ups. We prioritize your gameplay experience, offering full-screen modes and responsive controls that turn any standard browser into a high-performance gaming station.
                </p>
              </div>
            </div>

            {/* Ad Unit: Mid Content */}
            <div className="w-full flex justify-center my-4">
               <div className="w-full max-w-[728px] min-h-[100px]">
                 <AdSenseUnit config={MID_CONTENT_AD_CONFIG} className="min-h-[100px]" label="Content Middle Ad" />
               </div>
            </div>

            {/* Strategy Guide Block */}
            <div className="strategy mt-4 text-slate-300 p-6 bg-slate-800/80 rounded-lg border-l-4 border-blue-500 shadow-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Zap className="w-5 h-5 text-yellow-400" />
                  <h3 className="text-lg font-bold text-white">ProMax Performance Strategy Guide</h3>
                </div>
                <p className="mb-4">
                  ProMax Games Unblocked 2025 represents the gold standard in web gaming graphics and performance. Leveraging WebGL and WebAssembly technology, we provide 3D gaming experiences that rival native applications. If you have a newer Chromebook or PC, this site will push your hardware to its potential. It’s not just about visuals; the controls and physics engines here are "ProMax" level.
                </p>
                <p>
                  Performance Guide: The racing and shooting games here feature detailed lighting and textures. While they require slightly better hardware, our optimized code ensures a steady 60FPS even on mid-range devices. For players seeking the ultimate experience, this is your stage. Say goodbye to pixelated graphics and enjoy console-quality visuals right in your browser.
                </p>
            </div>

            {/* Internal Linking Block */}
            <div className="other-games mt-8 bg-slate-900 p-6 rounded-lg shadow-2xl border border-slate-700">
                <h3 className="text-xl font-bold text-white mb-6 border-b border-slate-600 pb-2 flex items-center gap-2">
                  <Star className="w-5 h-5 text-purple-400" />
                  More Unblocked Games 2025 Network
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 list-none">
                    <li><a href="https://snakegame.cfd" className="text-blue-400 hover:text-blue-300 flex items-center gap-2 transition-all hover:translate-x-1"><span>•</span> Play Snake Game Unblocked 2025</a></li>
                    <li><a href="https://playzero2025.sbs" className="text-blue-400 hover:text-blue-300 flex items-center gap-2 transition-all hover:translate-x-1"><span>•</span> Play Zero Lag Games Unblocked 2025</a></li>
                    <li><a href="https://freegames2025.sbs" className="text-blue-400 hover:text-blue-300 flex items-center gap-2 transition-all hover:translate-x-1"><span>•</span> Play Free Games Unblocked 2025</a></li>
                    <li><a href="https://nodownload2025.online" className="text-blue-400 hover:text-blue-300 flex items-center gap-2 transition-all hover:translate-x-1"><span>•</span> Play No Download Games Unblocked 2025</a></li>
                    <li><a href="https://unblocked2025.cfd" className="text-blue-400 hover:text-blue-300 flex items-center gap-2 transition-all hover:translate-x-1"><span>•</span> Play Unblocked Games 2025 (Main)</a></li>
                    <li><a href="https://unblocked2025.sbs" className="text-blue-400 hover:text-blue-300 flex items-center gap-2 transition-all hover:translate-x-1"><span>•</span> Play Best Unblocked Games 2025</a></li>
                    <li><a href="https://promax.it.com" className="text-blue-400 hover:text-blue-300 flex items-center gap-2 transition-all hover:translate-x-1"><span>•</span> Play ProMax Games Unblocked 2025</a></li>
                    <li><a href="https://retrobowl2025.online" className="text-blue-400 hover:text-blue-300 flex items-center gap-2 transition-all hover:translate-x-1"><span>•</span> Play Retro Bowl Unblocked 2025</a></li>
                    <li><a href="https://1v1lol2025.online" className="text-blue-400 hover:text-blue-300 flex items-center gap-2 transition-all hover:translate-x-1"><span>•</span> Play 1v1.LOL Unblocked 2025</a></li>
                    <li><a href="https://drift2025.site" className="text-blue-400 hover:text-blue-300 flex items-center gap-2 transition-all hover:translate-x-1"><span>•</span> Play Drift Hunters Unblocked 2025</a></li>
                    <li><a href="https://slope2025.online" className="text-blue-400 hover:text-blue-300 flex items-center gap-2 transition-all hover:translate-x-1"><span>•</span> Play Slope Game Unblocked 2025</a></li>
                    <li><a href="https://gd2025.site" className="text-blue-400 hover:text-blue-300 flex items-center gap-2 transition-all hover:translate-x-1"><span>•</span> Play Geometry Dash Unblocked 2025</a></li>
                    <li><a href="https://motox3m2025.online" className="text-blue-400 hover:text-blue-300 flex items-center gap-2 transition-all hover:translate-x-1"><span>•</span> Play Moto X3M Unblocked 2025</a></li>
                    <li><a href="https://surfers2025.site" className="text-blue-400 hover:text-blue-300 flex items-center gap-2 transition-all hover:translate-x-1"><span>•</span> Play Subway Surfers Unblocked 2025</a></li>
                    <li><a href="https://run32025.online" className="text-blue-400 hover:text-blue-300 flex items-center gap-2 transition-all hover:translate-x-1"><span>•</span> Play Run 3 Unblocked 2025</a></li>
                    <li><a href="https://fireboy2025.site" className="text-blue-400 hover:text-blue-300 flex items-center gap-2 transition-all hover:translate-x-1"><span>•</span> Play Fireboy & Watergirl Unblocked 2025</a></li>
                    <li><a href="https://paperio2025.online" className="text-blue-400 hover:text-blue-300 flex items-center gap-2 transition-all hover:translate-x-1"><span>•</span> Play Paper.io Unblocked 2025</a></li>
                    <li><a href="https://driftbest2025.site" className="text-blue-400 hover:text-blue-300 flex items-center gap-2 transition-all hover:translate-x-1"><span>•</span> Play Drift Hunters MAX Unblocked 2025</a></li>
                    <li><a href="https://gd-full2025.site" className="text-blue-400 hover:text-blue-300 flex items-center gap-2 transition-all hover:translate-x-1"><span>•</span> Play Geometry Dash Full Unblocked 2025</a></li>
                    <li><a href="https://subway2025.online" className="text-blue-400 hover:text-blue-300 flex items-center gap-2 transition-all hover:translate-x-1"><span>•</span> Play Subway Surfers World Unblocked 2025</a></li>
                </ul>
            </div>
            
            {/* Additional Ad Unit: Bottom Content */}
            <div className="w-full flex justify-center mt-6">
                <div className="w-full max-w-[728px] min-h-[90px]">
                  <AdSenseUnit config={BOTTOM_LINKS_AD_CONFIG} className="min-h-[90px]" label="Bottom Links Ad" />
                </div>
            </div>

          </div>

          {/* Sidebar Area */}
          <div className="lg:col-span-4 flex flex-col gap-6 sticky top-20">
            
            {/* Sidebar Benefits Card */}
            <div className="bg-gradient-to-br from-indigo-900/40 to-slate-900 p-5 rounded-xl border border-indigo-500/30 shadow-lg">
                <div className="flex items-center gap-2 mb-3 text-indigo-400">
                  <ShieldCheck className="w-5 h-5" />
                  <h3 className="font-bold">Safe & Verified</h3>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Every game on ArcadeZone is manually tested for safety. We ensure 100% compatibility with Chrome, Safari, and Edge.
                </p>
            </div>

            {/* Sidebar Ad Unit */}
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
            <div className="flex flex-col items-center gap-6">
              <div className="flex flex-wrap justify-center gap-4 text-sm font-medium">
                 <a href="/" className="text-slate-400 hover:text-purple-400 transition-colors">Home</a>
                 <span className="text-slate-700">|</span>
                 <a href="/privacy.html" className="text-slate-400 hover:text-purple-400 transition-colors">Privacy Policy</a>
                 <span className="text-slate-700">|</span>
                 <a href="/about.html" className="text-slate-400 hover:text-purple-400 transition-colors">About Us</a>
                 <span className="text-slate-700">|</span>
                 <a href="/contact.html" className="text-slate-400 hover:text-purple-400 transition-colors">Contact</a>
              </div>
              <div className="max-w-2xl text-slate-500 text-xs leading-relaxed italic">
                Disclaimer: All games on ArcadeZone are free to play and hosted for educational/entertainment purposes. We do not require account registration or software downloads. ArcadeZone respects all intellectual property rights and intellectual property owners.
              </div>
              <p className="text-slate-600 text-xs font-bold">&copy; {new Date().getFullYear()} Pro Max Games Network. Unblocked Games 2025 Expert.</p>
            </div>
        </div>
      </footer>
    </div>
  );
};

export default App;