import { Tooltip } from '@chakra-ui/react'
import Image from 'next/image'
import { useEffect, useRef, useState, memo } from 'react'
import { useDrag } from 'react-dnd'
import { useDispatch, useSelector } from 'react-redux'
import { useImageSize } from 'react-image-size'

import { mountElement } from '@/redux/editor/editorSlice'
import ItemBuilder from '@/utils/builders/ItemBuilder'
import { TElement, TElementDropResult } from '@/shared/types'

export interface ToolProps {
  className?: string
  name: string
  icon: string
}

export const Tool = function Tool({ className, name, icon }: ToolProps) {
  const [element, setElement] = useState<TElement>()

  const [naturalDimensions, { loading, error }] = useImageSize(icon as string)

  const { focusedPageId } = useSelector((state: any) => state.editor)
  const dispatch = useDispatch()

  useEffect(() => {
    const item = {
      ...element,
      width: `${naturalDimensions?.width}px`,
      height: `${naturalDimensions?.height}px`,
    }

    // if (!('animation' in item)) {
    //   return
    // }

    dispatch(mountElement(item))
  }, [naturalDimensions, element])

  const item: TElement = {
    animation: {
      name: '',
      css: '',
      duration: '',
    },
    position: {
      x: 0,
      y: 0,
    },
    id: '0',
    width: '0px',
    height: '0px',
    name,
    icon,
    mouseOffset: {
      x: 0,
      y: 0,
    },
    inputValue: '',
  }

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'TElement',
    item,
    end: (item: TElement, monitor) => {
      const dropResult = monitor.getDropResult<TElementDropResult>()
      if (item && dropResult) {
        let { x, y } = dropResult
        x = x ?? 0
        y = y ?? 0

        const _item = new ItemBuilder(name, icon, focusedPageId)
          .withAnimation({ name: '', css: '', duration: '300ms' })
          .withPosition({ x, y })
          .build()

        setElement(_item)
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }))

  if (loading) return <div>Images are loading</div>

  return (
    <Tooltip label={name}>
      <div
        ref={drag}
        className={`p-2 hover:bg-slate-200 rounded-sm cursor-grabbing flex flex-col text-center ${className}`}
        data-testid="tool"
      >
        {typeof icon === 'string' ? (
          <span className="mx-auto">
            <Image
              className="mx-auto text-xs"
              src={icon}
              alt="icon"
              width={35}
              height={35}
            />
          </span>
        ) : (
          <span className="mx-auto">{icon}</span>
        )}
      </div>
    </Tooltip>
  )
}
