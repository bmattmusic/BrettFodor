// src/components/ToastContainer.tsx
'use client'

import { Toast } from '@/components/ui/Toast'
import { useToast } from '@/hooks/useToast'

export function ToastContainer() {
  const { isVisible, message, hideToast } = useToast()
  return <Toast isVisible={isVisible} message={message} onClose={hideToast} />
}