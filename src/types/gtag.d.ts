interface Window {
  gtag: (
    command: 'config',
    targetId: string,
    config?: { page_path?: string }
  ) => void
} 