import { TPage } from '@/shared/types'
import { TabPanel } from '@chakra-ui/tabs'
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'

import { deletePage, focusPage } from '@/redux/editor/editorSlice'
export interface PreviewsProps {
  className?: string
}

export function Previews({ className }: PreviewsProps) {
  const { pages } = useSelector((state: any) => state.editor)

  if (!pages?.length) {
    return (
      <>
        <p className="text-center">Add a slide!</p>
      </>
    )
  }

  return (
    <>
      {pages?.map((page: TPage) => {
        return <Thumbnail key={page?.id} pageId={page?.id} />
      })}
    </>
  )
}

interface ThumbnailProps {
  pageId: string
  className?: string
}

function Thumbnail({ className, pageId }: ThumbnailProps) {
  const [hovered, setHovered] = useState<boolean>(false)
  const dispatch = useDispatch()

  function handleThumbnailClick(e: any) {
    dispatch(focusPage(pageId))
  }

  return (
    <div
      onClick={handleThumbnailClick}
      className={`h-28 mb-4 rounded relative bg-slate-200 cursor-pointer hover:bg-slate-300 hover:border-2 border-slate-400 ${className}`}
      onMouseEnter={() => setHovered(() => true)}
      onMouseLeave={() => setHovered(() => false)}
    >
      <ButtonGroup
        visible={hovered}
        className="absolute top-2 right-2"
        pageId={pageId}
      />
    </div>
  )
}

interface ButtonGroupProps {
  visible: boolean
  pageId: string
  className?: string
}

function ButtonGroup({ className, visible, pageId }: ButtonGroupProps) {
  const dispatch = useDispatch()

  function handleDeleteSlide() {
    dispatch(deletePage(pageId))
  }

  return (
    <div
      className={`${
        visible ? 'inline-block' : 'hidden'
      } transition duration-150 hover:scale-[1.06] hover:bg-slate-200 p-1 rounded-md ${className}`}
    >
      <button onClick={() => handleDeleteSlide()}>
        <img
          src={`${process.env.NEXT_PUBLIC_ASSET_PREFIX}/icons/delete.svg`}
          width={15}
          height={15}
          alt="Delete icon"
        />
      </button>
    </div>
  )
}
