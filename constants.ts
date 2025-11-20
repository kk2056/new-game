import { Game, AdFormat, AdConfig } from './types';

// AdSense Configuration
export const ADSENSE_CLIENT_ID = "ca-pub-9774042341049510";

// Use placeholder slots as requested. In production, replace "1234567890" with real IDs.
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

// Reliable HTML5 Games with Gradient Themes
export const GAMES: Game[] = [
  {
    id: 'hextris',
    title: 'Hextris',
    description: 'An addictive puzzle game inspired by Tetris. Rotate the hexagon to stack colored blocks. Don\'t let them stack outside the outer grey hexagon!',
    embedUrl: 'https://hextris.io/',
    gradient: 'from-amber-400 to-pink-600',
    category: 'Puzzle',
    isNew: true
  },
  {
    id: '2048',
    title: '2048 Classic',
    description: 'Join the numbers and get to the 2048 tile! Use your arrow keys to move tiles. When two tiles with the same number touch, they merge into one.',
    embedUrl: 'https://play2048.co/',
    gradient: 'from-yellow-400 to-orange-500',
    category: 'Puzzle',
    isNew: false
  },
  {
    id: 'tower',
    title: 'Tower Stack',
    description: 'Test your reflexes! Stack the blocks as high as you can. Precision is key—any overhang will be sliced off, making the next block smaller.',
    embedUrl: 'https://iamkun.github.io/tower_game/',
    gradient: 'from-cyan-400 to-blue-600',
    category: 'Arcade',
    isNew: true
  },
  {
    id: 'trex',
    title: 'T-Rex Runner',
    description: 'The legendary Chrome dinosaur game. Run as far as you can, jump over cacti, and dodge pterodactyls. Simple controls, infinite fun.',
    embedUrl: 'https://wayou.github.io/t-rex-runner/',
    gradient: 'from-slate-500 to-gray-800',
    category: 'Arcade',
    isNew: false
  },
  {
    id: 'pacman',
    title: 'Pac-Man',
    description: 'The arcade classic. Navigate the maze, eat all the pellets, and avoid the ghosts. Grab the power pellets to turn the tables!',
    embedUrl: 'https://pacman-e281c.firebaseapp.com/',
    gradient: 'from-blue-600 to-indigo-700',
    category: 'Retro',
    isNew: false
  }
];