import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { rightImg, watchImg } from '../utils'
import VideoCarousel from './VideoCarousel'

const Highlights = () => {

    useGSAP(() => {
        gsap.to('#title', { opacity: 1, y: 0 })
        gsap.to('.link', { opacity: 1, y: 0, duration: .5, stagger: .25 })
    })

    return (
        <section id='highlights' className='w-screen h-full common-padding overflow-hidden bg-zinc'>
            <div className='screen-max-width'>
                <div className='mb-10 w-full items-center justify-between md:flex'>
                    <h2 id='title' className='section-heading'>Get the Highlights</h2>

                    <div className='flex flex-wrap items-end gap-5'>
                        <p className='link'>Watch the Film <img src={watchImg} alt="watch" className='ml-2' /></p>
                        <p className='link'>Watch the Events <img src={rightImg} alt="Right" className='ml-2' /></p>
                    </div>
                </div>
                <VideoCarousel />
            </div>
        </section>
    )
}

export default Highlights