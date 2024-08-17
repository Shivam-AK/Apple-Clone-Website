import { useGSAP } from '@gsap/react'
import { animateWithGsap } from '../utils/animations'
import { explore1Img, explore2Img, exploreVideo } from '../utils'
import { useRef } from 'react'
import gsap from 'gsap'

const Features = () => {

  const videoRef = useRef()

  useGSAP(() => {

    gsap.to('#exploreVideo', {
      scrollTrigger: {
        trigger: '#exploreVideo',
        toggleActions: 'play pause reverse restart',
        start: '-10% bottom',
      },
      onComplete: () => {
        videoRef.current.play()
      }
    })

    animateWithGsap('#features_title', { opacity: 1, top: 0, delay: .5 })
    animateWithGsap('.g_grow', {scale: 1, opacity: 1, ease: 'power1'}, {scrub: 5.5})
    animateWithGsap('.g_text', {y: 0, opacity: 1, ease: 'power.inOut', duration: 1})
  })

  return (
    <section className='h-full common-padding bg-black overflow-hidden relative'>
      <div className='screen-max-width'>
        <div className='mb-12 w-full'>
          <h2 id='features_title' className='section-heading relative top-20'>Explore The Full Story.</h2>

          <div className='flex flex-col justify-center items-center overflow-hidden '>
            <div className='mb-24 mt-32 pl-24'>
              <h3 className='text-5xl lg:text-7xl font-semibold'>iPhone</h3>
              <h3 className='text-5xl lg:text-7xl font-semibold'>Forged in titanium.</h3>
            </div>

            <div className='flex-center flex-col sm:px-10'>
              <div className='flex flex-center relative h-96 w-full'>
                <video playsInline id='exploreVideo' className='w-full h-full object-cover object-center' preload='none' autoPlay muted ref={videoRef}>
                  <source src={exploreVideo} type='video/mp4' />
                </video>
              </div>

              <div className="flex flex-col w-full relative">
                <div className="feature-video-container">
                  <div className="overflow-hidden flex-1 h-96">
                    <img src={explore1Img} alt="titanium" className="feature-video g_grow" />
                  </div>
                  <div className="overflow-hidden flex-1 h-96">
                    <img src={explore2Img} alt="titanium 2" className="feature-video g_grow" />
                  </div>
                </div>

                <div className="feature-text-container">
                  <div className="flex-1 flex-center">
                    <p className="feature-text g_text">
                      iPhone 15 Pro is {' '}
                      <span className="text-white">
                        the first iPhone to feature an aerospace-grade titanium design
                      </span>,
                      using the same alloy that spacecrafts use for missions to Mars.
                    </p>
                  </div>

                  <div className="flex-1 flex-center">
                    <p className="feature-text g_text">
                      Titanium has one of the best strength-to-weight ratios of any metal, making these our {' '}
                      <span className="text-white">
                        lightest Pro models ever.
                      </span>
                      You'll notice the difference the moment you pick one up.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Features