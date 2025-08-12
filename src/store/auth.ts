import { create } from 'zustand';

export interface AuthState {
  isAdmin: boolean;
  setAdmin: (admin: boolean) => void;
}

export const useAuthStore = create<AuthState>((set: any) => ({
  isAdmin: false,
  setAdmin: (admin: boolean) => set({ isAdmin: admin }),
}));