import { Game, AdFormat, AdConfig } from './types';

// AdSense Configuration
export const ADSENSE_CLIENT_ID = "ca-pub-9774042341049510";

// Ad Slots
export const TOP_BANNER_AD_CONFIG: AdConfig = {
  client: ADSENSE_CLIENT_ID,
  slot: "1234567890", // 部署后请替换为真实的 AdSlot ID
  format: AdFormat.AUTO,
  responsive: true,
  style: { display: 'block' }
};

export const SIDEBAR_RECTANGLE_AD_CONFIG: AdConfig = {
  client: ADSENSE_CLIENT_ID,
  slot: "1234567890", // 部署后请替换为真实的 AdSlot ID
  format: AdFormat.RECTANGLE,
  responsive: true,
  style: { display: 'block' }
};

// 修复后的游戏列表：使用允许 iframe 嵌入的稳定源
export const GAMES: Game[] = [
  {
    id: 'hextris',
    title: 'Hextris',
    description: 'An addictive puzzle game inspired by Tetris. Rotate the hexagon to stack colored blocks. Fast-paced and fun!',
    embedUrl: 'https://hextris.github.io/hextris/', 
    gradient: 'from-amber-400 to-pink-600',
    category: 'Puzzle',
    isNew: true
  },
  {
    id: '2048-clean',
    title: '2048 Classic',
    description: 'The most reliable version of 2048. Join the numbers and get to the 2048 tile! No ads, just pure gameplay.',
    embedUrl: 'https://kielero.github.io/2048/', 
    gradient: 'from-yellow-400 to-orange-500',
    category: 'Puzzle',
    isNew: false
  },
  {
    id: 'flappy',
    title: 'Flappy Bird',
    description: 'The legendary frustrating game. Tap to fly through the pipes. How high can you score?',
    embedUrl: 'https://nebezb.com/floppybird/',
    gradient: 'from-green-400 to-emerald-600',
    category: 'Arcade',
    isNew: true
  },
  {
    id: 'dino-run',
    title: 'Dino Runner',
    description: 'The classic Chrome offline game. Run, jump over cacti, and dodge pterodactyls. Works perfectly online.',
    embedUrl: 'https://offline-dino-game.firebaseapp.com/',
    gradient: 'from-slate-500 to-gray-800',
    category: 'Arcade',
    isNew: false
  },
  {
    id: 'pacman',
    title: 'Pac-Man',
    description: 'Navigate the maze, eat pellets, and avoid ghosts. A timeless retro classic that never gets old.',
    embedUrl: 'https://pacman-e281c.firebaseapp.com/',
    gradient: 'from-blue-600 to-indigo-700',
    category: 'Retro',
    isNew: false
  }
];
