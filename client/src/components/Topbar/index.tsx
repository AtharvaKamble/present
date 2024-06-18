import { Stack, Tooltip, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import store from 'store2'

import { addPage } from '@/redux/editor/editorSlice'
import { useParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { ModeToggle } from '../utils/ModeToggle'
import { Button } from '@/shadcn/ui/button'
import { Input } from '@/shadcn/ui/input'
import { AlertDialog } from '@/shadcn/ui/alert-dialog'

export interface TopbarProps {
  presentationName: string
}

export default React.memo(function Topbar({ presentationName }: TopbarProps) {
  const router = useRouter()
  const toast = useToast()
  const params = useParams()

  const [fileName, setFileName] = useState<string>(presentationName || 'yeeh')
  const [copiedCounter, setCopiedCounter] = useState<boolean>(false)
  const { pages } = useSelector((state: any) => state.editor)
  const dispatch = useDispatch()

  async function sendPresentation() {
    // if (pages?.length === 0) return
    const res = await fetch(
      `/${process.env.NEXT_PUBLIC_ASSET_PREFIX}/api/presentation/edit`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          _id: params?.pid,
          name: `${fileName}.ppt`,
          user_uid: store('user_id'),
          pages,
        }),
      },
    )
  }

  function handleClick(
    operation: 'add' | 'delete' | 'save' | 'preview' | 'download' | 'copy',
  ) {
    switch (operation) {
      case 'add':
        dispatch(addPage())
        toast({
          title: 'New slide added',
          colorScheme: 'linkedin',
          position: 'bottom-right',
        })
        break
      case 'save':
        sendPresentation()
        toast({
          title: 'Presentation saved',
          colorScheme: 'teal',
          position: 'bottom-right',
        })
        break
      case 'preview':
        break
      case 'copy':
        toast({
          title: 'Share link copied to clipboard',
          colorScheme: 'orange',
          position: 'bottom-right',
        })

        navigator.clipboard.writeText(
          `${window?.location?.origin}/${process.env.NEXT_PUBLIC_ASSET_PREFIX}/play/${params?.pid}`,
        )

        setCopiedCounter(true)

        setTimeout(() => {
          setCopiedCounter(false)
        }, 4000)

        break
    }
  }

  useEffect(() => {
    setFileName(() => presentationName.split('.')[0])
  }, [presentationName])

  function handleLogout() {
    store.remove('user_id')
    store.remove('user_name')

    router.push('/login')
  }

  return (
    <nav className="flex justify-between p-6 border-b">
      <div className="flex">
        <Input
          value={fileName}
          onChange={(e) => setFileName(() => e.target.value)}
        />
        <span className="my-auto">.ppt</span>
      </div>
      <div className="flex gap-5">
        <Tooltip label="create a new slide">
          <Button onClick={() => handleClick('add')}>new slide</Button>
        </Tooltip>
        {/* <Tooltip label="share it with a friend">
          <Button onClick={() => handleClick('delete')}>share</Button>
        </Tooltip> */}
        <Tooltip label="save presentation">
          <Button
            onClick={() => handleClick('save')}
            variant="ghost"
            className="bg-teal-700 hover:bg-teal-800 hover:text-white rounded-sm"
          >
            save
          </Button>
        </Tooltip>
        <Tooltip label="preview this presentation">
          <a
            href={`/${process.env.NEXT_PUBLIC_ASSET_PREFIX}/play/${params?.pid}`}
            target="_blank"
          >
            <Button
              onClick={() => handleClick('preview')}
              variant="ghost"
              className="bg-sky-700 hover:bg-sky-800 hover:text-white rounded-sm"
            >
              preview
            </Button>
          </a>
        </Tooltip>
        <Tooltip label="share this presentation">
          <Button
            onClick={() => handleClick('copy')}
            variant="ghost"
            className="bg-amber-700 hover:bg-amber-800 text-white rounded-sm"
          >
            {copiedCounter ? 'copied!' : 'copy share link'}
          </Button>
        </Tooltip>
        {/* <Tooltip label="download this presentation">
        <a href={fileName} download={fileName} target="_blank">
            <Button
              onClick={() => handleClick('download')}
              variant="ghost"
              colorScheme="messenger"
              className="bg-blue-700 hover:bg-blue-800"
            >
              download
            </Button>
          </a>
        </Tooltip> */}
      </div>
      <div>
        <Stack spacing={4} direction="row" align="center">
          {/* <ModeToggle /> */}
          <Button
            variant="link"
            onClick={() => router.push('/home')}
            className="text-stone-200"
          >
            Home
          </Button>
          {/* <Button variant="link">Settings</Button> */}
          <Button
            variant="link"
            className="text-stone-200"
            onClick={() => handleLogout()}
          >
            Logout
          </Button>
        </Stack>
      </div>
    </nav>
  )
})
