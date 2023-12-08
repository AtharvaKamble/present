import Image from 'next/image'
import { useDispatch, useSelector } from 'react-redux'
import { DragSourceMonitor, useDrag, useDrop } from 'react-dnd'
import { useRef } from 'react'
import { useToast } from '@chakra-ui/react'

import { TElement } from '@/shared/types'
import { addAnimation, setEditorProperties } from '@/redux/editor/editorSlice'
import ContextMenu from './ContextMenuRightClick'

export interface ElementProps {
  element: TElement
  onLeftClick?: (event: any) => void
  onRightClick?: (event: any) => void
  className?: string
}

export function Element({
  element,
  onLeftClick,
  onRightClick,
  className,
}: ElementProps) {
  const { editor } = useSelector((state: any) => state.editor)
  const dispath = useDispatch()

  const toast = useToast()

  const { id, icon, position, width, height, name } = element

  const [{ isDragging }, elementDrag, preview] = useDrag(
    () => ({
      type: 'TElement',
      item: element,
      collect: (monitor: DragSourceMonitor) => {
        return {
          isDragging: monitor.isDragging(),
        }
      },
      end(draggedItem, monitor) {
        // console.log(draggedItem)
      },
    }),
    [id, position?.x, position?.y, name],
  )

  const [, drop] = useDrop({
    accept: 'TAnimation',
    drop: (item: any) => {
      toast({
        title: `${item.name} applied`,
        colorScheme: 'linkedin',
        position: 'bottom-right',
      })
      dispath(addAnimation({ item, id }))
    },
  })

  function onMouseDown(e: any, x: number, y: number) {
    const W = parseInt(width.substring(0, width.length - 2))
    const boundingRect = elementBox.current?.getBoundingClientRect()

    const offsetX = e.clientX - (boundingRect?.left as number)
    const offsetY = e.clientY - (boundingRect?.top as number)

    dispath(
      setEditorProperties({
        top: offsetY,
        left: offsetX,
      }),
    )
  }

  const elementBox = useRef<HTMLDivElement | null>(null)

  return (
    <div
      ref={(node) => {
        elementBox.current = node
        return elementDrag(drop(node))
      }}
      style={{
        top: position?.y,
        left: position?.x,
        width,
        height,
      }}
      className={`${className}`}
      onClick={onLeftClick}
      onMouseDown={(e) => onMouseDown(e, position.x, position.y)}
    >
      {/* <ContextMenu animation={element?.animation}> */}
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
      {/* </ContextMenu> */}
    </div>
  )
}
