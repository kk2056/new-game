import React from 'react';

export interface Game {
  id: string;
  title: string;
  description: string;
  embedUrl: string;
  thumbnail: string;
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