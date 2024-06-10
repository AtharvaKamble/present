import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Topbar from '@/components/Topbar/'
import { Workspace } from '@/components/Workspace/'
import { loadPages } from '@/redux/editor/editorSlice'
import { TPage } from '@/shared/types'
import './globals.css'
import { useParams } from 'next/navigation'
import { TPresentation } from '@/server/models/Presentation'
import { Toaster } from '@/shadcn/ui/toaster'

const { log } = console

export default function App() {
  const [presentationName, setPresentationName] = useState<string>('')

  const dispatch = useDispatch()
  const params = useParams()

  const SERVER_DOMAIN =
    process.env.NEXT_PUBLIC_API_URL || `http://localhost:3000`
  async function fetchPresentation() {
    const res = await fetch(
      `/${process.env.NEXT_PUBLIC_ASSET_PREFIX}/api/presentation/${params?.pid}`,
    )
    const data = await res.json()

    dispatch(loadPages(data?.body?.pages))
    setPresentationName(() => data?.body?.name)
  }

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     // autosave
  //     // }, 120000)                 // 2 minutes
  //   }, 200)

  //   return () => clearInterval(interval)
  // }, [])

  useEffect(() => {
    fetchPresentation()
  }, [])

  return (
    <section className="min-h-screen bg-stone-900 text-stone-200">
      <Topbar presentationName={presentationName} />
      <Workspace />
    </section>
  )
}
