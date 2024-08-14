import { appleImg, bagImg, searchImg, menuImg, closeImg } from "../utils/index.js"
import { navLists } from "../constants/index.js"
import { NavLink } from "react-router-dom"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"


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

        timeline.from("#menu #close i", {
            opacity: 0,
        })

        timeline.pause()
    })

    return (
        <header className="w-full p-5 sm:py-10">
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
                <div id="full-menu" className="w-full h-[100vh] fixed hidden top-0 left-0 z-20" onClick={(e) => { e.stopPropagation(); timeline.reverse(); }}>
                    <div id="menu" className="w-[40%] max-sm:w-[80%] h-[100%] fixed top-0 -right-[100%] bg-gray/40 backdrop-blur-md p-10">

                        <div className="mb-24 flex justify-end">
                            <img className="cursor-pointer p-3 rounded-full w-14 bg-white" src={closeImg} alt="close" onClick={(e) => {  e.stopPropagation(); timeline.reverse(); }} />
                        </div>
                        <div className="overflow-x-hidden">
                            {navLists.map((nav, i) => (
                                <h4 className="menu-item" key={i}><a>{nav} </a></h4>
                            ))}
                            <h4 className="menu-item" onClick={(e) => {e.stopPropagation(); timeline.reverse() }}><NavLink
                                to="/model"
                            >Model</NavLink></h4>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Navbar