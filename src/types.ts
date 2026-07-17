export type Emotion =
  | 'Love'
  | 'Longing'
  | 'Reflection'
  | 'Hope'
  | 'Melancholy'
  | 'Nature'
  | 'Dreams'
  | 'Reflective'
  | 'All';

export interface Poem {
  id: string;
  title: string;
  preview: string;
  body: string;
  category: string; // Matches Emotion roughly, but kept as string for flexibility
  date: string; // ISO date - preserved exactly from the original works
  emotion: Emotion; // Internal emotion tag for logic
  featured?: boolean; // Standalone / special pieces
  author?: string;
}

export interface ThemeConfig {
  base: string;
  accent: string;
  background: string;
  text: string;
  secondary: string;
  gradient: string;
  particleColor: string;
  /** RGB triplet used by the WebGL shader (e.g. "251,113,133") */
  rgb: string;
}

export interface MoodOption {
  id: Emotion;
  label: string;
  description: string;
}
