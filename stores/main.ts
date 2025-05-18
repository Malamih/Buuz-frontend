import { create } from "zustand";

interface MainStore {
  baseUrl: string;
  smoothScrolling: boolean;
  stopLenis: () => void;
  startLenis: () => void;
}

export const useMainStore = create<MainStore>((set) => ({
  baseUrl: "https://buuz-api.onrender.com",
  smoothScrolling: true,
  stopLenis: () => set(() => ({ smoothScrolling: false })),
  startLenis: () => set(() => ({ smoothScrolling: true })),
}));
