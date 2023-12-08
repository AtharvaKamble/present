import { TPage } from '@/shared/types'
import DisplayElement from './DisplayElement'

export interface DisplayPageProps {
  page: TPage
}

export default function DisplayPage({ page }: DisplayPageProps) {
  return (
    <div
      id="workarea"
      className={`w-3/4 relative rounded-sm mx-[45px] ${''}`}
      data-testid="editor"
    >
      {page?.elements.map((element) => {
        if (element?.name.toLowerCase() === 'text') {
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
                fontSize: '45px',
                background: 'transparent',
              }}
              onChange={() => {
                // dispatch(changeInputValue(element?.id))
              }}
            />
          )
        } else {
          return <DisplayElement key={element.id} element={element} />
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
