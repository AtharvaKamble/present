import { TPage } from '@/shared/types'
import PreviewElement from './PreviewElement'

export interface PreviewPageProps {
  page: TPage
  className?: string
}

export default function PreviewPage({ page, className }: PreviewPageProps) {
  return (
    <div className={`relative rounded-sm ${className}`}>
      {page?.elements.map((element) => {
        if (element?.name?.toLowerCase() === 'text') {
          return (
            <input
              disabled
              key={element?.id}
              value={element?.inputValue}
              placeholder="put somnulle value"
              className="font-heading"
              style={{
                position: 'absolute',
                top: element?.position?.y,
                left: element?.position.x,
                fontSize: '45px', // pull this from presentation.settings
                background: 'transparent',
              }}
              onChange={() => {
                // dispatch(changeInputValue(element?.id))
              }}
            />
          )
        } else {
          return <PreviewElement key={element.id} element={element} />
        }
        // <Resizable
        //   key={element.id}
        //   style={{
        //     position: 'absolute',
        //     top: element.position.y,
        //     left: element.position.x,
        //   }}
        //   defaultSize={{ width: element.width, height: element.height }}
        //   onResize={(e) => {
        //     handleResize(e, element)
        //   }}
        // </Resizable>
      })}
      {/* <ContextMenu initSettings={contextMenuState} /> */}
    </div>
  )
}
