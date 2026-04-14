import { create } from 'zustand';

interface AppState {
  loaded: boolean;
  setLoaded: (loaded: boolean) => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export const useStore = create<AppState>((set) => ({
  loaded: false,
  setLoaded: (loaded) => set({ loaded }),
  activeSection: 'hero',
  setActiveSection: (section) => set({ activeSection: section }),
}));
