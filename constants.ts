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

// Mock Game Data (English)
export const GAMES: Game[] = [
  {
    id: 'snake',
    title: 'Classic Snake',
    description: 'Navigate the snake to eat apples and grow longer. Avoid hitting the walls or your own tail! A modern take on the timeless classic.',
    embedUrl: 'https://patorjk.com/games/snake/',
    thumbnail: 'https://picsum.photos/200/200?random=1',
    category: 'Arcade',
    isNew: false
  },
  {
    id: 'sudoku',
    title: 'Daily Sudoku',
    description: 'Challenge your brain with classic logic puzzles. Features multiple difficulty levels. Play a quick game daily to keep your mind sharp!',
    embedUrl: 'https://sudoku.com/embed',
    thumbnail: 'https://picsum.photos/200/200?random=2',
    category: 'Puzzle',
    isNew: true
  },
  {
    id: 'tetris',
    title: 'Tetris Master',
    description: 'Stack blocks and clear lines! The speed increases as you level up. How long can you survive in this tribute to the block-stacking phenomenon?',
    embedUrl: 'https://jstris.jezevec10.com/embed',
    thumbnail: 'https://picsum.photos/200/200?random=3',
    category: 'Arcade',
    isNew: false
  },
  {
    id: '2048',
    title: '2048 Puzzle',
    description: 'Slide tiles to merge matching numbers. Can you reach the 2048 tile? An addictive mathematical logic game.',
    embedUrl: 'https://2048game.com/embed',
    thumbnail: 'https://picsum.photos/200/200?random=4',
    category: 'Puzzle',
    isNew: false
  },
  {
    id: 'pacman',
    title: 'Pac-Man',
    description: 'Eat all the dots while avoiding the ghosts! Don\'t forget to grab the power pellets to turn the tables on your pursuers.',
    embedUrl: 'https://freepacman.org/',
    thumbnail: 'https://picsum.photos/200/200?random=5',
    category: 'Arcade',
    isNew: false
  }
];