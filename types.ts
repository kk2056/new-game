import React from 'react';

export interface Game {
  id: string;
  title: string;
  description: string;
  embedUrl: string;
  gradient: string; // CSS gradient class (e.g., "from-blue-500 to-purple-500")
  category: string;
  isNew?: boolean;
}

export enum AdFormat {
  AUTO = 'auto',
  FLUID = 'fluid',
  RECTANGLE = 'rectangle',
}

export interface AdConfig {
  client: string;
  slot: string;
  format: AdFormat;
  responsive: boolean;
  style?: React.CSSProperties;
}