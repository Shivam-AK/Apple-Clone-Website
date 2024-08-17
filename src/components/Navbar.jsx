import { appleImg, bagImg, searchImg, menuImg, closeImg } from "../utils/index.js"
import { navLists } from "../constants/index.js"
import { NavLink } from "react-router-dom"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { useEffect } from "react"


const Navbar = () => {

    const timeline = gsap.timeline()
    useGSAP(() => {

        timeline.to("#full-menu", {
            right: "-100%",
            duration: 0.1,
            display: 'block'
        })
        timeline.to("#menu", {
            right: 0,
            duration: 0.4,
            ease: "power2.inOut"
        })

        timeline.from("#menu h4", {
            x: 100,
            opacity: 0,
            duration: 0.3,
            stagger: 0.2
        })

        timeline.from("#menu #close", {
            opacity: 0,
        })

        timeline.pause()
    })

    useEffect(() => {
        document.getElementById('full-menu').addEventListener("click", e => {
            timeline.reverse()
        })

        document.getElementById('menu').addEventListener("click", e => {
            console.log("menu", e)
            e.stopPropagation() // Stop Bubbling
        })

        document.getElementById('menu-item').addEventListener("click", e => {
            console.log("menu-item", e)
            e.stopPropagation() // Stop Bubbling
        })
        document.getElementById('close').addEventListener("click", e => {
            e.preventDefault()
            timeline.reverse()
            e.stopPropagation() // Stop Bubbling
        });
    }, [])

    return (
        <header className="w-full p-5 sm:py-10 relative z-40">
            <nav className="flex w-full justify-between items-center screen-max-width">
                <NavLink to="/"><img src={appleImg} alt="Apple" width={14} height={18} /></NavLink>

                <div className="flex flex-1 justify-center max-sm:hidden gap-10">
                    {navLists.map((nav, i) => (
                        <a key={i} className="text-gray cursor-pointer hover:text-white transition-all">
                            {nav}
                        </a>
                    ))}
                    <NavLink
                        to="/model"
                        className={({ isActive }) => isActive ? 'text-white cursor-pointer hover:text-white transition-all' : 'text-gray cursor-pointer hover:text-white transition-all'}
                    >
                        Model
                    </NavLink>
                </div>
                <div className="flex items-baseline gap-10 max-sm:justify-end max-sm:flex-1">
                    <img src={searchImg} alt="Search" width={18} height={18} />
                    <img src={bagImg} alt="Bag" width={18} height={18} />
                    <img className="max-sm:block cursor-pointer" id="menuBtn" src={menuImg} alt="Bag" width={18} height={18} onClick={() => timeline.play()} />
                </div>

                {/* Mobile Menu */}
                <div id="full-menu" className="w-full h-[100vh] fixed hidden top-0 left-0 z-50" >
                    <div id="menu" className="w-[40%] max-sm:w-[80%] h-[100%] fixed top-0 -right-[100%] bg-gray/40 backdrop-blur-md p-10">

                        <div className="mb-24 flex justify-end">
                            <img
                                id="close"
                                className="cursor-pointer p-3 rounded-full w-14 bg-white"
                                src={closeImg}
                                alt="close"
                            />
                        </div>
                        <div id="menu-item" className="overflow-x-hidden">
                            {navLists.map((nav, i) => (
                                <h4 key={i} className="menu-item"><a className='inline-block w-full cursor-pointer'>{nav}</a></h4>
                            ))}
                            <h4 className="menu-item"><NavLink
                                to="/model"
                                className='inline-block w-full cursor-pointer'
                            >Model</NavLink></h4>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Navbar