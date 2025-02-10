'use client'

import { useState } from 'react'

interface Measurements {
  height: number
  weight: number
  bodyType: string
  preferredFit: string
}

export function SizeRecommender() {
  const [measurements, setMeasurements] = useState<Measurements>()
  
  async function getRecommendation() {
    const response = await fetch('/api/recommend-size', {
      method: 'POST',
      body: JSON.stringify(measurements)
    })
    // Show personalized size recommendation
  }
  
  return (
    <div>
      <h3>Find Your Perfect Size</h3>
      {/* Measurement input form */}
    </div>
  )
} 