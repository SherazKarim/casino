import React from 'react';
import circle from "../../images/btn.png";
import text from "../../images/battle.webp";
import './fixedImage.css';
import {Link} from "react-router-dom"

const FixedImage = () => {
    return (
        <div className='fixed left-[0px] bottom-0 z-[999]'>
            <Link to='https://basari.bet/register/...' className='relative image-container shrink flex justify-center items-center'>
                <img className='w-[50%] brightness-75 rotate' src={circle} alt="" />
                <img className='w-[40%] absolute z-[999] top-[-10px] left-[40px]' src={text} alt="" />
                <h1 className='go absolute flex justify-center'>Go!</h1>
            </Link>
        </div>
    );
}

export default FixedImage;
