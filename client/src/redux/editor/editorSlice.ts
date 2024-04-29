import { EditorState, TElement, TLayer, TPage } from '@/shared/types'
import { createSlice, current } from '@reduxjs/toolkit'

const initialState: EditorState = {
  pages: [],
  focusedPageId: 'NULL',
  editor: {
    top: 0,
    left: 0,
  },
}

export const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    focusPage: (state: EditorState, action) => {
      state.focusedPageId = action.payload
    },

    addPage: (state: EditorState): EditorState => {
      // const element: TElement = {
      //   animation: {
      //     name: 'Ease in', /// these values will be given through the actions.payload
      //     css: 'ease-in',
      //     duration: '300ms',
      //   },
      //   position: {
      //     x: 30,
      //     y: 50,
      //   },
      //   id: '0',
      //   width: '300px',
      //   height: '300px',
      //   name: 'default',
      //   icon: '',
      //   mouseOffset: {
      //     x: 0,
      //     y: 0,
      //   },
      // }
      const page: TPage = {
        id: `page-${state?.pages?.length + 1}`,
        layers: [],
        elements: [],
      }
      return {
        ...state,
        pages: state.pages ? [...state.pages, page] : [page],
      }
    },

    mountElement: (state: EditorState, action) => {
      const { pages, focusedPageId } = state
      const { payload } = action

      const targetPage = pages?.find((p: TPage) => p?.id === focusedPageId)
      if (!targetPage) {
        console.error(`PageError: Page with ${focusedPageId} not found!`)
        return
      }

      const numberOfElements = targetPage.elements.length

      const element = payload
      element.id = `element-${numberOfElements}-${focusedPageId}`

      targetPage.elements.push(element)

      console.log(`Element (${element.name}) mounted`)
    },

    changeInputValue: (state: EditorState, action) => {
      const { pages, focusedPageId } = state
      const { payload } = action
      const { id, value } = payload

      const elementId: string = id
      if (elementId === '0') return

      const targetpage = pages?.find((p: TPage) => p?.id === focusedPageId)
      if (!targetpage) {
        console.error(`PageError: Page with ${focusedPageId} not found!`)
        return
      }

      const element = targetpage.elements.filter((p) => p?.id === elementId)[0]

      element.inputValue = value
    },

    moveElement: (state: EditorState, action) => {
      const { pages, focusedPageId } = state
      const { payload } = action

      const elementId: string = payload.item.id
      if (elementId === '0') return

      const targetPage = pages?.find((p: TPage) => p?.id === focusedPageId)
      if (!targetPage) {
        console.error(`PageError: Page with ${focusedPageId} not found!`)
        return
      }

      const element = targetPage.elements.filter((p) => p?.id === elementId)[0]

      element.position.x = payload.x - state.editor.left
      element.position.y = payload.y - state.editor.top
    },

    deletePage: (state: EditorState, action) => {
      const { pages, focusedPageId } = state
      const { payload } = action

      return {
        ...state,
        pages: state.pages.filter((p) => p?.id !== payload),
      }
    },

    loadPages: (state: EditorState, action) => {
      const { payload } = action

      return {
        ...state,
        pages: payload,
      }
    },

    setEditorProperties: (state: EditorState, action) => {
      const { payload } = action

      const { top, left } = payload

      state.editor.left = left
      state.editor.top = top

      // return {
      //   ...state,
      //   editor: {
      //     ...state?.editor,
      //     top,
      //     left,
      //   },
      // }
    },

    changeElementSize: (state: EditorState, action) => {
      const { pages, focusedPageId } = state
      const { payload } = action

      const elementId: string = payload.item.id
      if (elementId === '0') return

      const targetPage = pages?.find((p: TPage) => p?.id === focusedPageId)
      if (!targetPage) {
        console.error(`PageError: Page with ${focusedPageId} not found!`)
        return
      }

      const element = targetPage.elements.filter((p) => p?.id === elementId)[0]
      element.width = payload.width
      element.height = payload.height
    },

    addAnimation: (state: EditorState, action) => {
      const { pages, focusedPageId } = state
      const { payload } = action

      const elementId: string = payload?.id
      if (elementId === '0') return

      const targetPage = pages?.find((p: TPage) => p?.id === focusedPageId)
      if (!targetPage) {
        console.error(`PageError: Page with ${focusedPageId} not found!`)
        return
      }

      const element = targetPage.elements.filter((p) => p?.id === elementId)[0]
      element.animation = payload.item
    },
  },
})

export const {
  focusPage,
  addPage,
  mountElement,
  moveElement,
  changeElementSize,
  loadPages,
  addAnimation,
  setEditorProperties,
  deletePage,
  changeInputValue,
} = editorSlice.actions

export default editorSlice.reducer
