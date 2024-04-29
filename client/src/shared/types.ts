export interface TPage {
  id: string
  elements: TElement[]
  layers: TLayer[]
}

export interface TLayer {
  id: string
  elements: TElement[]
}

export interface TElement {
  id: string
  name: string
  icon: string
  position: TElementPosition
  animation: TAnimation
  width: string
  height: string
  mouseOffset: TMouseOffset
  inputValue: string
}

export interface TMouseOffset {
  x: number
  y: number
}

export interface TElementPosition {
  x: number
  y: number
}

export interface TAnimation {
  name: string | null
  css: string
  duration: string
}

export interface TElementDropResult {
  item: TElement
  x: number | undefined
  y: number | undefined
}

export interface TAnimationDropResult {
  item: TAnimation
}

/**
 * State types
 */
export interface UtilState {
  mouse: {
    elementRelative: {
      x: number
      y: number
    }
  }
}

export interface EditorState {
  pages: TPage[]
  focusedPageId: string
  editor: {
    top: number
    left: number
  }
}

export interface ContextMenuState {
  visible: boolean
  top: string
  left: string
}
