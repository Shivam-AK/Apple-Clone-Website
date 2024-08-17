import { pauseImg, playImg, replayImg } from '../utils/index.js'
import { videoSlides } from '../constants/index.js'
import { useRef, useState, useEffect } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from "gsap/all"
gsap.registerPlugin(ScrollTrigger)

const VideoCarousel = () => {

    const videoRef = useRef([])
    const videoSpanRef = useRef([])
    const videoDivRef = useRef([])

    const [video, setVideo] = useState({
        isEnd: false,
        startPlay: false,
        videoId: 0,
        isLastVideo: false,
        isPlaying: false,
    })

    const [loaderData, setLoaderData] = useState([])
    const { isEnd, startPlay, videoId, isLastVideo, isPlaying } = video

    useGSAP(() => {
        // slider animation to move the video out of the screen and bring the next video in
        console.log('video End', videoId)
        gsap.to('#slider', {
            transform: `translateX(${-100 * videoId}%)`,
            duration: 1.5,
            ease: 'power2.inOut' // show visualizer https://gsap.com/docs/v3/Eases
        })

        // video animation to play the video when it is in the view
        gsap.to('#video', {
            scrollTrigger: {
                trigger: '#video',
                toggleActions: 'restart none none none'
            },
            onComplete: () => {
                setVideo(prevVideo => ({
                    ...prevVideo, startPlay: true, isPlaying: true
                }))
            }
        })
    }, [isEnd, videoId])

    useEffect(() => {
        let currentProgress = 0
        let span = videoSpanRef.current

        if (span[videoId]) {
            // animate the progress of the video
            let anim = gsap.to(span[videoId], {
                onUpdate: () => {
                    // get the progress of the video
                    const progress = Math.ceil(anim.progress() * 100)

                    if (progress != currentProgress) {
                        currentProgress = progress
                        // set the width of the progress bar
                        gsap.to(videoDivRef.current[videoId], {
                            width: window.innerWidth < 768
                                ? '10vw' // mobile
                                : window.innerWidth < 1200
                                    ? '10vw' // tablet
                                    : '4vw'  // laptop
                        })

                        // set the background color of the progress bar
                        gsap.to(span[videoId], {
                            width: `${currentProgress}%`,
                            backgroundColor: 'white'
                        })
                    }
                },
                // when the video is ended, replace the progress bar with the indicator and change the background color
                onComplete: () => {
                    if (isPlaying) {
                        gsap.to(videoDivRef.current[videoId], {
                            width: '12px'
                        })
                        gsap.to(span[videoId], {
                            backgroundColor: '#afafaf'
                        })
                    }
                }
            })

            if (videoId == 0) {
                anim.restart()
            }

            // update the progress bar
            const animUpdate = () => {
                anim.progress(
                    videoRef?.current[videoId].currentTime / videoSlides[videoId].videoDuration
                )
            }

            if (isPlaying) {
                // ticker to update the progress bar
                gsap.ticker.add(animUpdate)
            } else {
                // remove the ticker when the video is paused (progress bar is stopped)
                gsap.ticker.remove(animUpdate)
            }

        }
    }, [videoId, startPlay])

    useEffect(() => {
        if (loaderData.length > 3) {
            if (!isPlaying) {
                videoRef.current[videoId].pause()
            } else {
                startPlay && videoRef.current[videoId].play()
            }
        }
    }, [startPlay, videoId, isPlaying, loaderData])

    // video id is the id for every video until id becomes number 3
    function handleProcess(type, i) {
        switch (type) {

            case 'video-end':
                setVideo(prevVideo => ({ ...prevVideo, isEnd: true, videoId: i + 1 }))
                console.log('video-end', i)
                break

            case 'video-last':
                setVideo(prevVideo => ({ ...prevVideo, isLastVideo: true }))
                break

            case 'video-reset':
                setVideo(prevVideo => ({ ...prevVideo, isLastVideo: false, videoId: 0 }))
                break

            case 'play':
                setVideo(prevVideo => ({ ...prevVideo, isPlaying: !prevVideo.isPlaying, }))
                break

            case 'pause':
                setVideo(prevVideo => ({ ...prevVideo, isPlaying: !prevVideo.isPlaying, }))
                break

            case 'replay':
                setVideo(prevVideo => ({
                    ...prevVideo,
                    isPlaying: !prevVideo.isPlaying,
                    videoId: i,
                    isLastVideo: false
                }))
                break

            default:
                return video
        }
    }

    const handleLoaderMeteData = (i, event) => setLoaderData(prev => [...prev, event])

    return (
        <>
            <div className='flex items-center'>
                {videoSlides.map((list, i) => (
                    <div key={list.id} id='slider' className='md:pr-20 sm:pr-10 xs:pr-8 xxs:pr-5'>
                        <div className='video-carousel_container'>
                            <div className='w-full h-full flex-center rounded-3xl overflow-hidden bg-black xxs:rounded-xl'>
                                <video
                                    id='video'
                                    className={`${list.id == 2 && 'translate-x-44'} pointer-events-none`}
                                    preload='auto'
                                    muted
                                    playsInline={true}
                                    ref={ref => videoRef.current[i] = ref}
                                    onPlay={() => 
                                        setVideo(prevVideo => ({
                                            ...prevVideo, isPlaying: true
                                        }))
                                    }
                                    onEnded={() => i !== 3
                                        ? handleProcess('video-end', i)
                                        : handleProcess('video-last')
                                    }
                                    onLoadedMetadata={event => handleLoaderMeteData(i, event)}
                                >
                                    <source src={list.video} type='video/mp4' />
                                </video>
                            </div>
                            <div className='absolute top-[5%] left-[5%] z-10'>
                                {list.textLists.map((text, i) => (
                                    <h4 key={i} className='text-xl md:text-2xl font-medium'>{text} </h4>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className='relative flex-center mt-6'>
                <div className='flex-center py-5 px-7 bg-gray-300 backdrop-blur rounded-full'>
                    {videoRef.current.map((_, i) => (
                        <span
                            key={i}
                            ref={ref => (videoDivRef.current[i] = ref)}
                            className='mx-2 w-3 h-3 bg-gray-200 rounded-3xl relative cursor-pointer'
                            onClick={async () => {
                                await handleProcess('pause')
                                await handleProcess('replay', i)
                            }}
                        >
                            <span
                                className='absolute w-full h-full rounded-3xl'
                                ref={ref => (videoSpanRef.current[i] = ref)}
                            />
                        </span>
                    ))}
                </div>
                <button
                    className='control-btn'
                    onClick={isLastVideo
                        ? () => handleProcess('video-reset')
                        : !isPlaying
                            ? () => handleProcess('play')
                            : () => handleProcess('pause')}>
                    <img
                        src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg}
                        alt={isLastVideo ? 'replay' : !isPlaying ? 'play' : 'pause'}
                    />
                </button>
            </div>
        </>
    )
}

export default VideoCarousel