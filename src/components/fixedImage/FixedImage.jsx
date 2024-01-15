import React from 'react';
import circle from "../../images/btn.png";
import text from "../../images/battle.webp";
import './fixedImage.css';
import { Link } from "react-router-dom"

const FixedImage = () => {
    return (
        <div className='fixed sm:left-[0px] left-0 bottom-[10px] z-[999]'>
            <Link to='https://basari.bet/register/...' className='relative md:m-3 w-24 image-container shrink flex justify-center items-center'>
                <img className='w-[80%] md:w-[92%] brightness-75 rotate' src={circle} alt="" />
                <img className='w-[65%] md:w-[74%] absolute z-[999] md:top-[-8%]  top-[-12%] md:left-0 left-[5%]' src={text} alt="" />
                <h1 className='go absolute flex justify-center'>Go!</h1>
            </Link>
        </div>
    );
}

export default FixedImage;
