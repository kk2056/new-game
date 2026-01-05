import React, { useState, useMemo } from 'react';
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
import { Menu, X, Gamepad2, Info, Star, ShieldCheck, Zap, TrendingUp } from 'lucide-react';

const App: React.FC = () => {
  const [activeGame, setActiveGame] = useState<Game>(GAMES[0]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const categories = useMemo(() => {
    const cats = new Set(GAMES.map(g => g.category));
    return ['All', ...Array.from(cats)];
  }, []);

  const filteredGames = useMemo(() => {
    if (selectedCategory === 'All') return GAMES;
    return GAMES.filter(g => g.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="min-h-screen flex flex-col bg-[#0f051d] text-slate-200 font-sans selection:bg-indigo-500 selection:text-white">
      
      {/* Header */}
      <header className="bg-slate-900/80 backdrop-blur-lg border-b border-white/5 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setActiveGame(GAMES[0])}>
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-2 rounded-xl shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform">
              <Gamepad2 className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col -space-y-1">
              <h1 className="text-xl md:text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white via-indigo-200 to-purple-200 tracking-tighter italic">
                ARCADE ZONE
              </h1>
              <span className="text-[10px] text-indigo-400 font-bold tracking-[0.2em] uppercase">ProMax Unblocked</span>
            </div>
          </div>

          <nav className="hidden lg:flex gap-8 text-sm font-semibold text-slate-400">
            {categories.map(cat => (
              <button 
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`transition-all relative py-1 ${
                  selectedCategory === cat 
                  ? 'text-white' 
                  : 'hover:text-white'
                }`}
              >
                {cat === 'All' ? 'Featured' : cat}
                {selectedCategory === cat && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-indigo-500 rounded-full"></span>
                )}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button 
              className="lg:hidden p-2 text-slate-400 hover:text-white transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden bg-slate-900 border-b border-white/5 p-4 space-y-2 animate-in slide-in-from-top-4 duration-300">
             {categories.map(cat => (
                <button 
                  key={cat}
                  onClick={() => { setSelectedCategory(cat); setIsMobileMenuOpen(false); }}
                  className={`w-full text-left px-4 py-3 rounded-xl transition-colors font-medium ${
                    selectedCategory === cat ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-800'
                  }`}
                >
                  {cat === 'All' ? '🔥 Featured Games' : cat}
                </button>
             ))}
          </div>
        )}
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        
        {/* Top Ad Unit - Maximum Visibility */}
        <div className="mb-10 w-full flex flex-col items-center">
          <div className="w-full max-w-[970px] min-h-[90px] shadow-2xl shadow-indigo-900/10 rounded-xl overflow-hidden">
             <AdSenseUnit config={TOP_BANNER_AD_CONFIG} className="min-h-[90px]" label="Leaderboard Ad" />
          </div>
          <p className="text-[10px] text-slate-600 mt-2 uppercase tracking-widest font-bold">Advertisement</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Main Content Area */}
          <div className="lg:col-span-8 flex flex-col gap-10">
            
            {/* Game Player Section */}
            <section className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
              <GameFrame key={activeGame.id} game={activeGame} />
            </section>

            {/* Ad Unit: Mid Content */}
            <div className="w-full flex flex-col items-center">
               <div className="w-full max-w-[728px] min-h-[100px] rounded-xl overflow-hidden bg-slate-900/30">
                 <AdSenseUnit config={MID_CONTENT_AD_CONFIG} className="min-h-[100px]" label="Sponsored Content" />
               </div>
               <p className="text-[10px] text-slate-600 mt-2 uppercase tracking-widest font-bold">Recommended for You</p>
            </div>

            {/* Strategy Guide Block */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-900/40 p-8 rounded-2xl border border-white/5 shadow-2xl backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-6 text-blue-400">
                  <TrendingUp className="w-6 h-6" />
                  <h2 className="text-xl font-bold text-white">Why Play with Us?</h2>
                </div>
                <div className="text-slate-400 space-y-4 text-sm leading-relaxed">
                  <p>
                    Experience <strong>unblocked games 2025</strong> with the lowest latency. Our platform uses advanced edge caching to ensure your <strong>school chromebook</strong> gaming session is smooth and lag-free.
                  </p>
                  <p>
                    No account registration, no downloads, and 100% free. We specialize in "ProMax" performance versions of your favorite classics.
                  </p>
                </div>
              </div>

              <div className="bg-slate-900/40 p-8 rounded-2xl border border-white/5 shadow-2xl backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-6 text-yellow-400">
                  <Zap className="w-6 h-6" />
                  <h2 className="text-xl font-bold text-white">Pro Strategy Tip</h2>
                </div>
                <div className="text-slate-400 space-y-4 text-sm leading-relaxed">
                  <p>
                    Always enable <strong>Fullscreen Mode</strong> for the most immersive experience. Our "ProMax" games are optimized for 1080p and 4K displays.
                  </p>
                  <p>
                    Use keyboard shortcuts (Arrow keys, Space) for precise movement in arcade and puzzle titles.
                  </p>
                </div>
              </div>
            </div>

            {/* SEO Content Block */}
            <div className="bg-slate-900/60 p-10 rounded-3xl border border-white/5 shadow-inner">
              <div className="flex items-center gap-3 mb-6 text-indigo-400">
                <Info className="w-6 h-6" />
                <h2 className="text-2xl font-black text-white tracking-tight">THE 2025 UNBLOCKED GAMING REVOLUTION</h2>
              </div>
              <div className="text-slate-300 space-y-6 text-lg leading-relaxed">
                <p>
                  Welcome to the ultimate destination for <strong>unblocked games 2025</strong>. We understand the struggle of trying to find high-quality entertainment on managed devices like a <strong>school chromebook</strong>. That's why we built ArcadeZone—a high-performance hub for games that requires <strong>no download</strong> and bypasses common network restrictions effortlessly.
                </p>
                <p>
                  Our library is hand-picked for maximum compatibility and fun. Whether you're mastering the geometry of <em>Hextris</em>, reaching the 2048 tile in <em>2048 Classic</em>, or surviving the endless hordes of <em>Monster Survivors</em>, you're playing the most optimized versions available on the web today.
                </p>
                <p>
                  In 2025, web gaming is about speed and accessibility. We leverage modern browser capabilities to deliver console-grade physics and visuals without the bloat of traditional gaming sites. No ads that break your game, just pure, unadulterated "ProMax" gaming.
                </p>
              </div>
            </div>

            {/* Internal Linking Block */}
            <div className="bg-gradient-to-br from-indigo-900/20 to-transparent p-8 rounded-3xl border border-indigo-500/10 shadow-2xl">
                <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-3">
                  <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                  Explore the ProMax Network
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {[
                      { name: "Snake Game 2025", url: "https://snakegame.cfd" },
                      { name: "Zero Lag Games", url: "https://playzero2025.sbs" },
                      { name: "Free Games Hub", url: "https://freegames2025.sbs" },
                      { name: "No Download Zone", url: "https://nodownload2025.online" },
                      { name: "Unblocked Main", url: "https://unblocked2025.cfd" },
                      { name: "Retro Bowl Max", url: "https://retrobowl2025.online" },
                      { name: "1v1.LOL Arena", url: "https://1v1lol2025.online" },
                      { name: "Drift Hunters", url: "https://drift2025.site" },
                      { name: "Slope Pro", url: "https://slope2025.online" }
                    ].map((link, i) => (
                      <li key={i}>
                        <a href={link.url} className="group flex items-center gap-2 p-3 rounded-xl bg-slate-900/50 hover:bg-indigo-600/20 border border-white/5 transition-all text-sm font-medium text-slate-400 hover:text-white">
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 group-hover:scale-150 transition-transform"></span>
                          {link.name}
                        </a>
                      </li>
                    ))}
                </ul>
            </div>
            
            {/* Bottom Ad Unit */}
            <div className="w-full flex flex-col items-center mt-6">
                <div className="w-full max-w-[728px] min-h-[90px] rounded-xl overflow-hidden">
                  <AdSenseUnit config={BOTTOM_LINKS_AD_CONFIG} className="min-h-[90px]" label="Recommended links" />
                </div>
            </div>

          </div>

          {/* Sidebar Area */}
          <aside className="lg:col-span-4 flex flex-col gap-8 sticky top-24">
            
            {/* Sidebar Ad Unit - High CTR Placement */}
            <div className="bg-slate-900/40 p-2 rounded-2xl border border-white/5 flex flex-col items-center shadow-2xl">
                <div className="w-full max-w-[300px] min-h-[250px] overflow-hidden rounded-xl">
                  <AdSenseUnit config={SIDEBAR_RECTANGLE_AD_CONFIG} className="min-h-[250px]" label="Premium Partner" />
                </div>
                <p className="text-[9px] text-slate-700 mt-2 uppercase tracking-[0.2em]">Advertisement</p>
            </div>

            {/* Game List */}
            <div className="bg-slate-900/60 rounded-3xl border border-white/5 overflow-hidden shadow-2xl flex flex-col max-h-[calc(100vh-200px)]">
              <div className="p-5 border-b border-white/5 bg-white/5 flex justify-between items-center backdrop-blur-md">
                <h3 className="font-bold text-white flex items-center gap-2">
                  <Gamepad2 className="w-4 h-4 text-indigo-400" />
                  Trending Now
                </h3>
              </div>

              <div className="divide-y divide-white/5 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
                {filteredGames.map((game) => (
                  <button
                    key={game.id}
                    onClick={() => {
                      setActiveGame(game);
                      if (window.innerWidth < 1024) {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }
                    }}
                    className={`w-full p-4 flex items-center gap-4 hover:bg-white/5 transition-all text-left group ${
                      activeGame.id === game.id ? 'bg-indigo-600/10' : ''
                    }`}
                  >
                    <div className={`w-14 h-14 rounded-2xl flex-shrink-0 flex items-center justify-center shadow-lg bg-gradient-to-br ${game.gradient} relative overflow-hidden group-hover:scale-105 transition-transform`}>
                      <span className="text-white font-black text-2xl drop-shadow-lg select-none">
                        {game.title.charAt(0)}
                      </span>
                      {game.isNew && (
                        <div className="absolute top-0 right-0 p-1">
                          <span className="flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-grow min-w-0">
                      <h4 className={`font-bold text-sm truncate ${activeGame.id === game.id ? 'text-indigo-400' : 'text-slate-200 group-hover:text-white'}`}>
                        {game.title}
                      </h4>
                      <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider mt-1">{game.category}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* sidebar small benefit */}
            <div className="bg-indigo-600/10 p-6 rounded-3xl border border-indigo-500/20">
                <div className="flex items-center gap-2 mb-3 text-indigo-400">
                  <ShieldCheck className="w-5 h-5" />
                  <h3 className="font-bold text-sm">Safe & Encrypted</h3>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  ArcadeZone uses end-to-end encryption. Play securely without tracking or data collection. Trusted by millions of unblocked gamers globally.
                </p>
            </div>

          </aside>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-white/5 py-12 mt-20">
        <div className="container mx-auto px-4">
            <div className="flex flex-col items-center gap-8">
              <div className="flex items-center gap-3">
                <Gamepad2 className="w-5 h-5 text-indigo-500" />
                <span className="font-black text-white italic tracking-tighter">ARCADE ZONE</span>
              </div>
              
              <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm font-semibold">
                 <a href="/" className="text-slate-500 hover:text-indigo-400 transition-colors">Home</a>
                 <a href="/privacy.html" className="text-slate-500 hover:text-indigo-400 transition-colors">Privacy</a>
                 <a href="/about.html" className="text-slate-500 hover:text-indigo-400 transition-colors">About</a>
                 <a href="/contact.html" className="text-slate-500 hover:text-indigo-400 transition-colors">Contact</a>
              </div>

              <div className="max-w-2xl text-slate-600 text-[11px] leading-relaxed text-center px-4">
                Disclaimer: ArcadeZone provides free-to-play HTML5 games curated for the unblocked community. We do not host malicious content or require sensitive permissions. All trademarks belong to their respective owners. ProMax refers to our performance optimization standards.
              </div>

              <div className="flex flex-col items-center gap-2">
                <p className="text-slate-500 text-[10px] font-bold tracking-widest uppercase">&copy; {new Date().getFullYear()} ARCADE ZONE NETWORK</p>
                <div className="h-px w-10 bg-indigo-500/30"></div>
              </div>
            </div>
        </div>
      </footer>
    </div>
  );
};

export default App;