import {
  ArrowBackIcon,
  ArrowDownIcon,
  ArrowForwardIcon,
} from '@chakra-ui/icons'
import { TabPanel } from '@chakra-ui/tabs'
import { Tool } from '../ToolBox'
import { AnimationEntity } from './AnimationEntity'

export interface AnimationsProps {
  className?: string
}

const tools = [
  {
    name: 'Ease in',
    css: 'ease-in',
    icon: `/${process.env.NEXT_PUBLIC_ASSET_PREFIX}/icons/ease-in.svg`,
  },
  {
    name: 'Ease out',
    css: 'ease-out',
    icon: `/${process.env.NEXT_PUBLIC_ASSET_PREFIX}/icons/ease-out.svg`,
  },
  {
    name: 'Ease in out',
    css: 'ease-in-out',
    icon: `/${process.env.NEXT_PUBLIC_ASSET_PREFIX}/icons/ease-in-out.svg`,
  },
]

export function Animations({ className }: AnimationsProps) {
  return (
    <>
      <div className="grid grid-cols-4">
        {tools.map(({ name, css, icon }) => {
          function generateKey(s: string) {
            return s.trim().replace(' ', '').toLowerCase()
          }
          return (
            <AnimationEntity
              key={generateKey(name)}
              name={name}
              css={css}
              icon={icon}
            />
          )
        })}
      </div>
    </>
  )
}
