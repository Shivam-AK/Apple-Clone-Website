import React, { useCallback, useEffect } from 'react'

const Smoke = () => {

  useEffect(() => {
    const text = document.getElementById('text')
    console.log(text)
    
    let newText = ''
    text.textContent.split(" ").map((e) => {
      const span = document.createElement("span")
      span.className = 'inline-block'
      span.appendChild(document.createTextNode(e))
      newText += span.outerHTML + " "
    })

    text.innerHTML = newText

    // const letters = document.querySelectorAll('#text span')
    // letters.forEach(span => span.addEventListener('mouseover', () => {
    //   span.classList.add('text-animation')
    // }))
    text.classList.add('text-animation')
  }, [])


  return (
    <section className='bg-black'>
      <div className='screen-max-width'>
        <div className='w-full h-screen flex-center'>
          <div id='text' className='text-white text-3xl w-[400px] text-justify font-black '>Lorem ipsum dolor sit amet  elit. Atque  magni excepturi dolore. Lorem ipsum dolor sit, amet elit. Ab minima repellendus odio.  quae </div>
        </div>
      </div>
    </section>
  )
}

export default Smoke