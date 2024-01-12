import React from 'react'
import circle from "../../images/btn.png"
import text from "../../images/battle.webp"
const FixedImage = () => {
  return (
    <div className='fixed left-[0px] bottom-0 z-[999]'>
        <div className='relative flex justify-center items-center'>
            <img className='w-[50%]' src={circle} alt="" />
            <img className='w-[30%] absolute top%] y-[50%] z-[999]' src={text} alt="" />
        </div>
    </div>
  )
}

export default FixedImage