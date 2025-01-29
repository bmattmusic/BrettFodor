// src/hooks/useToast.ts
import { create } from 'zustand'

interface ToastStore {
  isVisible: boolean
  message: string
  showToast: (message: string) => void
  hideToast: () => void
}

export const useToast = create<ToastStore>((set) => ({
  isVisible: false,
  message: '',
  showToast: (message: string) => set({ isVisible: true, message }),
  hideToast: () => set({ isVisible: false, message: '' }),
}))