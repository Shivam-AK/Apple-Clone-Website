import React from 'react'
import { footerLinks } from '../constants'

const Footer = () => {
  return (
    <footer className="py-7 sm:px-10 px-5">
      <div className="screen-max-width">
        <div>
          <p className="font-semibold text-gray-200 text-base">
            More ways to shop: {' '}
            <span className="underline text-blue">
              Find an Apple Store {' '}
            </span>
            or {' '}
            <span className="underline text-blue">
              other retailer
            </span>{' '}
            near you.
          </p>
          <p className="font-semibold text-gray-200 text-base">
            Or call 000800-040-1966
          </p>
        </div>

        <div className="bg-neutral-700 my-5 h-[1px] w-full" />

        <div className="flex md:flex-row flex-col items-center gap-5 justify-between">
          <p className="font-semibold text-gray-200 text-center md:text-nowrap text-base">Copyright @ 2024 Apple Inc. All rights reserved. <br /> Create by <a className='hover:text-white' href="https://github.com/Shivam-AK/" target='_blank'>Shivam Kumar</a> </p>
          <div className="flex flex-wrap gap-y-1 justify-center">
            {footerLinks.map((link, i) => (
              <p key={link} className="font-semibold text-gray-200 text-base">
                {link}{i !== footerLinks.length - 1 && (<span className="mx-2">|</span>)}
              </p>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer