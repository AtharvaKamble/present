import React, { ReactNode, useState, useEffect } from 'react'

export interface GradientDivProps {
  children: ReactNode
  className: string
}

export function NoiseSvg() {
  return (
    <svg viewBox="0 0 250 250" xmlns="http://www.w3.org/2000/svg">
      <filter id="noiseFilter">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.1"
          numOctaves="3"
          stitchTiles="stitch"
        />
      </filter>

      <rect width="100%" height="100%" filter="url(#noiseFilter)" />
    </svg>
  )
}

const GradientPosition = () => {
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 })

  React.useEffect(() => {
    const updateMousePosition = (ev: any) => {
      setMousePosition({ x: ev.clientX, y: ev.clientY })
    }
    window.addEventListener('mousemove', updateMousePosition)
    return () => {
      window.removeEventListener('mousemove', updateMousePosition)
    }
  }, [])

  return mousePosition
}

function GradientDiv({ children, className }: GradientDivProps) {
  return (
    <div
      className={` ${className}`}
      style={{
        backgroundImage: `radial-gradient( circle at ${
          GradientPosition().x
        }px ${
          GradientPosition().y
        }px, rgb(4 47 46) 10%, rgb(28, 25, 23) 90%), url(/present/icons/noise.svg)`,
        filter: 'contrast(100%) brightness(100%)',
      }}
    >
      {children}
    </div>
  )
}

export default GradientDiv
