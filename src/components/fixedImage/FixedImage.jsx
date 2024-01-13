import React from 'react'
import circle from "../../images/btn.png"
import text from "../../images/battle.webp"
import './fixedImage.css'
const FixedImage = () => {
  return (
    <div className='fixed left-[0px] bottom-0 z-[999]'>
    <a
        href='https://basari.bet/register/?atp=&goto=sitereg&click_id=db0e6b614084ed125e69c0acdbe0155a&plid=18023&bnid=28892&lang=en&cc=DE&pid=75001&timestamp=1704818372.0174&refCode=mb_BQBnRgAA3HAAAPkkAQA.2024-01.10&uuid=2241693eef5ab9219d7c3219c3c69d9c789906dc'
        className='relative shrink flex justify-center items-center'
    >
        <img className='w-[50%]' src={circle} alt="" />
        <img className='w-[30%] absolute z-[999]' src={text} alt="" />
    </a>
</div>






  )
}

export default FixedImage