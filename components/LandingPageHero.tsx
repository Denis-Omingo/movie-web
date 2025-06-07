'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import clsx from 'clsx'

type Slide = {
  image: string
  heading: string
  text: string
}

const slides: Slide[] = [
  {
    image: '/landing-page1.jpg',
    heading: 'Unforgettable Stories',
    text: 'Watch amazing shows with stunning visuals.',
  },
  {
    image: '/landing-page2.jpg',
    heading: 'Live the Action',
    text: 'Experience cinematic moments from home.',
  },
  {
    image: '/landing-page3.jpg',
    heading: 'New Adventures Weekly',
    text: 'Join our community and never miss an update.',
  },
]

export default function LandingHero() {
  const [current, setCurrent] = useState(0)
  const length = slides.length

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % length)
    }, 10000)
    return () => clearInterval(interval)
  }, [length])

  const goToSlide = (index: number) => setCurrent(index)
  const nextSlide = () => setCurrent((prev) => (prev + 1) % length)
  const prevSlide = () => setCurrent((prev) => (prev - 1 + length) % length)

  return (
    <section className="relative w-full h-[100vh] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={clsx(
            'absolute inset-0 transition-opacity duration-1000 ease-in-out',
            {
              'opacity-100 z-10 scale-110': index === current,
              'opacity-0 z-0 scale-100': index !== current,
            }
          )}
        >
          <Image
            src={slide.image}
            alt={`Slide ${index + 1}`}
            fill
            className="object-cover transition-transform duration-[10000ms] ease-in-out"
            priority={index === current}
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
      ))}

      <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 text-white z-20">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          {slides[current].heading}
        </h1>
        <p className="text-lg md:text-xl mb-6 max-w-2xl">
          {slides[current].text}
        </p>
        <Button
          variant="ghost"
          className="relative overflow-hidden text-lg px-8 py-4 rounded-xl font-semibold bg-primary text-primary-foreground shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl"
        >
          <span className="relative z-10">Join Our Shows</span>
          <span
            className="absolute inset-0 bg-white/10 rounded-xl blur-sm scale-110 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            aria-hidden="true"
          />
        </Button>
      </div>

      <div className="absolute left-4 top-1/2 -translate-y-1/2 z-30">
        <button
          onClick={prevSlide}
          aria-label="Previous Slide"
          className="bg-black/50 p-2 rounded-full hover:bg-black/70"
        >
          <ChevronLeft className="text-white w-6 h-6" />
        </button>
      </div>

      <div className="absolute right-4 top-1/2 -translate-y-1/2 z-30">
        <button
          onClick={nextSlide}
          aria-label="Next Slide"
          className="bg-black/50 p-2 rounded-full hover:bg-black/70"
        >
          <ChevronRight className="text-white w-6 h-6" />
        </button>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-30">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={clsx(
              'w-2 h-3 rounded-full',
              index === current ? 'bg-white' : 'bg-white/50'
            )}
          />
        ))}
      </div>
    </section>
  )
}
