import { create } from 'zustand';

interface ColorState {
  activeColor: string;
  setActiveColor: (color: string) => void;
}

export const useColorStore = create<ColorState>((set) => ({
  activeColor: '#FFFFFF', // Default color
  setActiveColor: (color) => set({ activeColor: color }),
}));
