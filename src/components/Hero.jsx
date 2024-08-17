import { useState, useEffect } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { heroVideo, smallHeroVideo } from '../utils/index.js'

const Hero = () => {
    const [videoSrc, setVideoSrc] = useState(window.innerWidth < 768 ? smallHeroVideo : heroVideo)

    const handleVideoSrc = () => {
        setVideoSrc(window.innerWidth < 768 ? smallHeroVideo : heroVideo)
    }

    useEffect(() => {
        window.addEventListener('resize', handleVideoSrc)
        return () => window.removeEventListener('resize', handleVideoSrc)
    }, [])

    useGSAP(() => {
        gsap.to('.hero-title', { opacity: 1, delay: 1.5, })
        gsap.to('#cta', { opacity: 1, y: -50, delay: 1.5, })
    }, [])

    return (
        <section className='w-screen nav-height static bg-black'>
            <div className='h-5/6 screen-max-width flex-center flex-col relative z-10'>
                <h1 className='hero-title'>iPhone 15 Pro</h1>
                <div className='xl:w-[90%] lg:w-[80%] md:w-[75%] sm:w-[40%] xs:w-[90%] w-[90%] z-10'>
                    <video className='pointer-events-none z-10' autoPlay muted loop playsInline={true} key={videoSrc} >
                        <source src={videoSrc} type='video/mp4' />
                    </video>
                </div>
            </div>

            <div id='cta' className='flex flex-col items-center opacity-0 translate-y-20 relative z-20'>
                <a href="#highlights" className='btn'>Buy</a>
                <p className='text-xl'>From $199/month or $999</p>
            </div>
        </section>
    )
}

export default Hero