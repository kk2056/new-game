import { Game, AdFormat, AdConfig } from './types';

// AdSense Configuration
export const ADSENSE_CLIENT_ID = "ca-pub-9774042341049510";

// Ad Slots
export const TOP_BANNER_AD_CONFIG: AdConfig = {
  client: ADSENSE_CLIENT_ID,
  slot: "1234567890", // Placeholder - Replace with real AdSense Slot ID before deployment
  format: AdFormat.AUTO,
  responsive: true,
  style: { display: 'block' }
};

export const SIDEBAR_RECTANGLE_AD_CONFIG: AdConfig = {
  client: ADSENSE_CLIENT_ID,
  slot: "1234567890", // Placeholder - Replace with real AdSense Slot ID before deployment
  format: AdFormat.RECTANGLE,
  responsive: true,
  style: { display: 'block' }
};

// Reliable HTML5 Games with Gradient Themes and SEO Descriptions
export const GAMES: Game[] = [
  {
    id: 'hextris',
    title: 'Hextris',
    description: 'Dive into the addictive world of Hextris, a top-tier free 2025 puzzle experience. This fast-paced hexagonal challenge requires strategy and speed. Enjoy instant play with no download required, making it the perfect unblocked html5 game for quick brain training sessions on any device.',
    embedUrl: 'https://hextris.github.io/hextris/', 
    gradient: 'from-amber-400 to-pink-600',
    category: 'Puzzle',
    isNew: true
  },
  {
    id: '2048-clean',
    title: '2048 Classic',
    description: 'Experience the definitive version of 2048 Classic, optimized for modern browsers. This html5 logic puzzle offers unblocked access to endless fun. Simply join the numbers to reach the 2048 tile. It is free 2025 gaming at its finest—instant play with absolutely no download needed.',
    embedUrl: 'https://kielero.github.io/2048/', 
    gradient: 'from-yellow-400 to-orange-500',
    category: 'Puzzle',
    isNew: false
  },
  {
    id: 'tower',
    title: 'Tower Stack',
    description: 'Test your precision in Tower Stack, a vibrant html5 arcade game. Stack blocks as high as possible in this free 2025 hit. Perfect for testing reflexes, this unblocked title features instant play mechanics, ensuring you can jump right into the action with no download or installation.',
    embedUrl: 'https://iamkun.github.io/tower_game/',
    gradient: 'from-cyan-400 to-blue-600',
    category: 'Arcade',
    isNew: true
  },
  {
    id: 'dino-run',
    title: 'T-Rex Runner',
    description: 'Run wild with the legendary T-Rex Runner. This unblocked browser classic is now available for instant play. Jump over cacti and dodge pterodactyls in this timeless html5 adventure. Enjoy the best free 2025 endless runner experience with no download required.',
    embedUrl: 'https://offline-dino-game.firebaseapp.com/',
    gradient: 'from-slate-500 to-gray-800',
    category: 'Arcade',
    isNew: false
  },
  {
    id: 'pacman',
    title: 'Pac-Man',
    description: 'Relive the retro magic with Pac-Man, the ultimate arcade masterpiece. This fully unblocked html5 version delivers the authentic ghost-chasing thrill. It is a free 2025 essential for nostalgic gamers, offering instant play directly in your browser with no download.',
    embedUrl: 'https://pacman-e281c.firebaseapp.com/',
    gradient: 'from-blue-600 to-indigo-700',
    category: 'Retro',
    isNew: false
  },
  {
    id: 'monster-survivors',
    title: 'Monster Survivors',
    description: 'Battle endless hordes in Monster Survivors, the intense new action roguelike of the year. This free 2025 gem features cutting-edge html5 performance. Survive as long as you can in this unblocked arena shooter. Click for instant play and face the swarm with no download necessary.',
    // Using a reliable open source space shooter as a placeholder for "Monster Survivors" to ensure stability
    embedUrl: 'https://startguard.github.io/Space-Invaders/',
    gradient: 'from-purple-600 to-red-600',
    category: 'Action',
    isNew: true
  }
];