import { ConnectDropTarget } from 'react-dnd'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useRef, useState } from 'react'
import { Resizable } from 're-resizable'

import { ContextMenuState, TElement, TPage } from '@/shared/types'
import { Element } from './Element'
import ContextMenu from './Element/ContextMenuRightClick'
import {
  changeElementSize,
  setEditorProperties,
  changeInputValue,
} from '@/redux/editor/editorSlice'

const tmap: any = {
  1: 'bg-orange-100',
  2: 'bg-blue-100',
  3: 'bg-red-100',
  4: 'bg-teal-100',
  5: 'bg-purple-100',
}

const initContextMenuState: ContextMenuState = {
  left: '0',
  top: '0',
  visible: false,
}

export interface PageProps {
  className?: string
  drop: ConnectDropTarget
  page: TPage
}

export function Page({ className, drop, page }: PageProps) {
  const [contextMenuState, setContextMenuState] =
    useState<ContextMenuState>(initContextMenuState)

  const { focusedPageId, pages } = useSelector((state: any) => state.editor)
  const dispatch = useDispatch()

  const targetPage: TPage = pages?.find((p: TPage) => p?.id === focusedPageId)

  if (!targetPage) {
    console.error(`PageError: Page with ${focusedPageId} not found!`)
    return <div>Select a page from the sidepanel</div>
  }

  const inx = page?.id.charAt(page?.id.length - 1)
  const bg = tmap[+inx]

  function handleLeftClick(event: MouseEvent) {
    event.preventDefault()

    setContextMenuState((prev) => {
      return {
        ...prev,
        visible: false,
      }
    })
  }

  function handleRightClick(event: MouseEvent) {
    event.preventDefault()

    setContextMenuState((prev) => {
      return {
        ...prev,
        left: `${event.clientX}px`,
        top: `${event.clientY}px`,
        visible: true,
      }
    })
  }

  function handleResize(e: any, element: TElement) {
    e.preventDefault()

    const workAreaElement = document.getElementById('workarea')
    if (workAreaElement) {
      const workAreaRect = workAreaElement?.getBoundingClientRect()

      dispatch(
        changeElementSize({
          width: `${Math.abs(workAreaRect.left - e.clientX)}px`,
          height: `${Math.abs(workAreaRect.top - e.clientY)}px`,
          item: element,
        }),
      )
    }
  }

  return (
    <div
      ref={drop}
      id="workarea"
      className={`w-3/4 relative rounded-sm mx-[45px] ${bg} ${className}`}
      data-testid="editor"
    >
      {targetPage?.elements?.map((element) => {
        if (element?.name.toLowerCase() === 'text') {
          return (
            <input
              key={element?.id}
              value={element?.inputValue}
              placeholder="Enter something"
              className="font-heading"
              style={{
                position: 'absolute',
                top: element?.position?.y,
                left: element?.position.x,
                fontSize: '45px',
                background: 'transparent',
                color: 'black',
              }}
              onChange={(e) => {
                dispatch(
                  changeInputValue({
                    id: element?.id,
                    value: e?.target?.value,
                  }),
                )
              }}
            />
          )
        } else {
          return (
            <Resizable
              key={element?.id}
              style={{
                position: 'absolute',
                top: element?.position?.y,
                left: element?.position?.x,
              }}
              defaultSize={{ width: element?.width, height: element?.height }}
              onResize={(e) => {
                handleResize(e, element)
              }}
            >
              <Element
                key={element?.id}
                element={element}
                onLeftClick={handleLeftClick}
                onRightClick={handleRightClick}
              />
            </Resizable>
          )
        }
      })}
    </div>
  )
}
