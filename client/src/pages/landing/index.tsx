'use client'

import React from 'react'
import { Button } from '@/shadcn/ui/button'
import { useRouter } from 'next/router'
import { Center, Text, Stack } from '@chakra-ui/react'
import Bgimage from '../../images/backg-image.jpg'
// import './index.css'

export default function Landing() {
  const headerFont = { fontFamily: 'Montserrat' }
  const paraFont = { fontFamily: 'Merriweather' }
  // const router = useRouter()
  // const SERVER_DOMAIN =
  //   process.env.NEXT_PUBLIC_API_URL || `http://localhost:3000`
  // async function handleRegister() {
  //   router.push('/register')
  // }
  return (
    <>
      <div className="navbar-container">
        <div>
          <header>
            <h3>Present</h3>
          </header>
        </div>
        <div>
          <nav>
            <div>
              <ul className="nav-links">
                <li>Home</li>
                <li>About</li>
                <li>Contact</li>
              </ul>
            </div>
          </nav>
        </div>
        <div className="nav-buttons">
          {/* <Button className="button-style" onClick={handleRegister}> */}
          <Button className="button-style">Sign Up</Button>
          <Button className="button-style">Sign In</Button>
        </div>
      </div>
      <section>
        <p className="header-info" style={headerFont}>
          Present: Unleash Your Ideas, Craft Your Story, <br />
          Captivate Your Audience.
        </p>
        <div className="container style-container">
          <div className="row info-container">
            <div className="col-md-6">
              <div className="left-side">
                <p style={paraFont}>
                  Step into the world of Present, your gateway to effortless
                  elegance in presentations. Tailored for professionals,
                  business users, creative professionals, and remote teams,
                  Present offers a user-friendly experience reminiscent of
                  Google Slides, coupled with an exciting brand atmosphere that
                  brings joy to your creative process.
                </p>
                <p style={paraFont}>
                  Craft presentations effortlessly with our intuitive tools,
                  collaborate seamlessly with remote teams, and present with
                  style. Our platform is not just about conveying information;
                  it's about making a statement with every slide. Immerse
                  yourself in a brand that radiates happiness and excitement,
                  and let your presentations reflect that same effortless
                  elegance.
                </p>
                <div className="info-buttons">
                  <Button className="btn-style">Get Started</Button>
                  <Button className="btn-style">Learn More</Button>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="right-side">
                <Image src={Bgimage} alt="bgimage" className="image-styling" />
              </div>
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
