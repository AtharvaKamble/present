import Image from 'next/image'

import { TElement } from '@/shared/types'
import { useEffect, useState } from 'react'

export interface PreviewElementProps {
  element: TElement
}

export default function PreviewElement({ element }: PreviewElementProps) {
  const [initialTransition, setInitialTransition] = useState(false)

  const { id, icon, position, width, height, name, animation } = element
  const { x, y } = position

  useEffect(() => {
    setInitialTransition(true)
  }, [])
  console.log(id)
  return (
    <div
      style={{
        top: position.y,
        left: position.x,
        width,
        height,
        opacity: initialTransition ? 1 : 0,
        transition: `opacity ${animation.duration} ${animation.css}`,
      }}
      className={`absolute`}
    >
      {typeof icon === 'string' ? (
        <Image
          className="mx-auto text-xs"
          src={icon}
          alt="icon"
          width={parseInt(width.substring(0, width.length - 2))}
          height={parseInt(height.substring(0, height.length - 2))}
        />
      ) : (
        icon
      )}
    </div>
  )
}
