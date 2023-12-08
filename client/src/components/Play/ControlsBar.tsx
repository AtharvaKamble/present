import { Tooltip } from '@chakra-ui/react'
import { MouseEventHandler } from 'react'

export interface ControlsBarProps {
  setFocusedPage: React.Dispatch<React.SetStateAction<number>>
  focusedPage: number
  className?: string
}

export default function ControlsBar({
  setFocusedPage,
  focusedPage,
  className,
}: ControlsBarProps) {
  const controls = [
    {
      icon: '../icons/previous.svg',
      title: 'Previous',
      onClick: () => {
        setFocusedPage((prev) => Math.max(0, prev - 1))
      },
    },
    {
      icon: '../icons/pause.svg',
      title: 'Pause',
      onClick: () => {},
    },
    {
      icon: '../icons/play.svg',
      title: 'Play',
      onClick: () => {},
    },
    {
      icon: '../icons/forward.svg',
      title: 'Next',
      onClick: () => {
        setFocusedPage((prev) => prev + 1)
      },
    },
  ]

  return (
    <div
      className={`bg-slate-300 p-6 w-72 fixed bottom-7 left-[40%] text-center rounded-lg flex justify-between align-middle ${className}`}
    >
      {controls.map(({ icon, title, onClick }) => (
        <Tooltip key={title} label={title}>
          <button
            className="p-2 hover:bg-slate-400 rounded-md transition duration-200 hover:scale-[1.07] "
            onClick={onClick}
          >
            <img src={icon} width={25} height={25} alt={title} />
          </button>
        </Tooltip>
      ))}
      <p className="my-auto">Page {focusedPage}</p>
    </div>
  )
}
