import { TAnimation, TElement, TElementPosition } from '@/shared/types'

class ItemBuilder {
  private item: TElement
  private pageId: string

  constructor(name: string, icon: string, pageId: string) {
    this.pageId = pageId
    this.item = {
      animation: {
        name: '',
        css: '',
        duration: '300ms',
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
  }

  withIcon(icon: string): ItemBuilder {
    this.item.icon = icon
    return this
  }

  withPosition(position: TElementPosition): ItemBuilder {
    this.item.position = position
    return this
  }

  withAnimation(animation: TAnimation): ItemBuilder {
    this.item.animation = animation
    return this
  }

  withSize(width: string, height: string): ItemBuilder {
    this.item.width = width
    this.item.height = height
    return this
  }

  build(): TElement {
    return this.item
  }
}

export default ItemBuilder
