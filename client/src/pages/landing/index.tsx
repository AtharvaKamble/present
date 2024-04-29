'use client'

import React from 'react'
import { Button } from '@/shadcn/ui/button'
import { useRouter } from 'next/router'
import { Center, Text, Stack } from '@chakra-ui/react'
import Bgimage from '../../images/backg-image.jpg'
import Image from 'next/image'

export default function Landing() {
  const router = useRouter()

  return (
    <section className="text-stone-200 w-full h-screen flex flex-col bg-stone-900">
      <nav className=" w-full flex justify-between p-3 border-b-2 border-stone-200">
        <h2 className="my-auto font-heading">PRESENT</h2>
        <Stack spacing={4} direction="row" align="center" className="my-auto">
          {/* <ModeToggle /> */}
          <Button
            variant="link"
            onClick={() => router.push('/aboutus')}
            className="text-stone-200"
          >
            About us
          </Button>

          <Button
            variant="link"
            onClick={() => router.push('/contactus')}
            className="text-stone-200"
          >
            Contact us
          </Button>
          {/* <Button variant="link">Settings</Button> */}
        </Stack>
      </nav>
      <div className="w-full h-full flex justify-center">
        <Center className="flex">
          <div className="flex flex-col text-center p-10 w-1/2">
            <Text className="text-7xl font-heading">Present</Text>
            <Text className="mt-2">
              Unleash your ideas, craft your story, <br />
              captivate your audience
            </Text>
            <div className="mt-8 mx-auto flex gap-4 text-stone-300">
              <Button
                variant="secondary"
                onClick={() => router.push('/register')}
              >
                Get started
              </Button>
              <Button
                variant="link"
                onClick={() => router.push('/login')}
                className="text-stone-300"
              >
                I have an account
              </Button>
            </div>
          </div>
          <div className="w-1/2">
            <img
              src="/mypresentations-landing.png"
              alt="Supporting image"
              width={'100%'}
              className="image-styling rounded-xl border border-stone-300"
            />
          </div>
        </Center>
      </div>
    </section>
  )
}
