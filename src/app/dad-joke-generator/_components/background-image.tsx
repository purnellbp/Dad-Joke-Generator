'use client';

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { getBackgroundImage } from '../actions'

export function BackgroundImage() {
  const [imageUrl, setImageUrl] = useState<string>('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getBackgroundImage()
      .then(url => {
        if (url) setImageUrl(url)
      })
      .finally(() => setIsLoading(false))
  }, [])

  // Show gradient background while loading or if there's an error
  if (isLoading || !imageUrl) {
    return (
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-primary-500 to-primary-600" />
    )
  }

  return (
    <div className="fixed inset-0 -z-10">
      <Image
        src={imageUrl}
        alt="Background"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/90 to-secondary-foreground/90" />
    </div>
  )
} 