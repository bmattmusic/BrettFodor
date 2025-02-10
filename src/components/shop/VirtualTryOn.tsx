'use client'

import { useState } from 'react'

export function VirtualTryOn() {
  const [userImage, setUserImage] = useState<File>()
  const [productImage, setProductImage] = useState<string>()
  
  async function generatePreview() {
    const formData = new FormData()
    formData.append('user', userImage)
    formData.append('product', productImage)
    
    const response = await fetch('/api/virtual-tryon', {
      method: 'POST',
      body: formData
    })
    // Show AI-generated preview
  }
  
  return (
    <div>
      <h3>Virtual Try-On</h3>
      <input type="file" onChange={e => setUserImage(e.target.files[0])} />
      {/* Preview area */}
    </div>
  )
} 