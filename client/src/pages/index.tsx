'use client'

import React from 'react'
import { Button } from '@/shadcn/ui/button'
import { useRouter } from 'next/router'
import { Center, Text, Stack } from '@chakra-ui/react'
import Image from 'next/image'
import GradientDiv from '@/components/GradientDiv'

export default function Landing() {
  const router = useRouter()

  return (
    <GradientDiv className="bg-stone-900 w-screen h-screen flex justify-center content-center">
      <section className="text-stone-200 w-full h-screen flex flex-col ">
        <nav className=" w-full flex justify-between p-3 border-b-2 border-stone-200">
          <h2 className="my-auto font-heading ">PRESENT</h2>
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
        <div className="w-full h-full flex justify-center flex-col md:flex-row">
          <Center className="flex flex-col md:flex-row ">
            <div className="flex flex-col text-center p-10 w-1/2 min-w-full md:min-w-0">
              <Text className="text-2xl md:text-9xl font-heading">Present</Text>
              <Text className="mt-2">
                Unleash your ideas, craft your story, <br />
                captivate your audience
              </Text>
              <div className="mt-8 mx-auto flex justify-between gap-4 text-stone-300">
                <Button
                  className="hover:scale-105 transition"
                  variant="secondary"
                  onClick={() => router.push('/register')}
                >
                  Get started
                </Button>
                <Button
                  variant="link"
                  onClick={() => router.push('/login')}
                  className="text-stone-300 hover:scale-105 transition"
                >
                  I have an account
                </Button>
              </div>
            </div>
            <div className="w-full mx-4 md:w-1/2 md:mx-0">
              <Image
                src={`/${process.env.NEXT_PUBLIC_ASSET_PREFIX}/mypresentations-landing.png`}
                alt="Presentation app demo"
                width={900}
                height={900}
                className=" rounded shadow-xl shadow-gray-600/50 hover:scale-110 transform-gpu transition hover:-skew-y-2"
              />
            </div>
          </Center>
        </div>
      </section>
    </GradientDiv>
  )
}
