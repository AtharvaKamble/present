import React from 'react'
import Image from 'next/image'
import Bgimage from '../../images/backg-image.jpg'
import './index.css'
import { Button } from '@/shadcn/ui/button'

const LandingInfo = () => {
  const headerFont = { fontFamily: 'Montserrat' }
  const paraFont = { fontFamily: 'Merriweather' }
  return (
    <>
      <section className="text-stone-300">
        <p className="header-info text-stone-300">
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
                  its about making a statement with every slide. Immerse
                  yourself in a brand that radiates happiness and excitement,
                  and let your presentations reflect that same effortless
                  elegance.
                </p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="right-side">
                <Image src={Bgimage} alt="bgimage" className="image-styling" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default LandingInfo
