
export interface GeneratedImage {
  id: string;
  url: string;
  prompt: string;
  timestamp: Date;
}

export interface ThumbnailConfig {
  text: string;
  color: string;
  fontSize: number;
  isBackgroundRemoved: boolean;
  image: string | null;
}
