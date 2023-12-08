import { TPage } from '@/shared/types'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import DisplayPage from '../../components/Play/DisplayPage'
import { useToast } from '@chakra-ui/react'
import ControlsBar from '../../components/Play/ControlsBar'
import { useParams } from 'next/navigation'

export interface PlayPresentationProps {
  className?: string
}

export default function PlayPresentation({ className }: PlayPresentationProps) {
  const [pages, setPages] = useState<TPage[]>([])
  const [focusedPage, setFocusedPage] = useState<number>(0)

  const params = useParams()
  const toast = useToast()

  const SERVER_DOMAIN =
    process.env.NEXT_PUBLIC_API_URL || `http://localhost:3000`
  async function fetchPresentation() {
    const res = await fetch(`/api/presentation/${params?.pid}`)
    const data = await res.json()
    setPages(() => data?.body?.pages)
  }

  function handleKeyPress(e: KeyboardEvent) {
    const { key } = e
    if (key === 'Enter' || key === 'n') {
      setFocusedPage((prev) => prev + 1)
    } else if (key === 'b') {
      setFocusedPage((prev) => Math.max(0, prev - 1))
    }
  }

  useEffect(() => {
    fetchPresentation()

    document.addEventListener('keypress', handleKeyPress)

    return () => {
      document.removeEventListener('keypress', handleKeyPress)
    }
  }, [params])

  return (
    <div>
      <DisplayPage page={pages[focusedPage]} />
      <ControlsBar setFocusedPage={setFocusedPage} focusedPage={focusedPage} />
    </div>
  )
}
