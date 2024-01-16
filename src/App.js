import React, { useState, useRef, useEffect } from "react";
import "./App.css";
import styled, { keyframes } from 'styled-components';
import bird1 from "./images/paret.webp";
import bird2 from "./images/paret2.webp";
import arrow from "./images/arrow.webp";
import spin from "./images/spinbg.png";
import bWheel from "./images/bwheel.svg"
import PopUp from './components/PopUp';
import bg from "./images/bg3.webp";
import startSound from './audio/start.mp3';
import winSound from './audio/win.mp3';
import loseSound from "./audio/lose.mp3"
import Footer from './components/footer/Footer';
import { Wrapper } from "./components/wrapper/Wrapper";
import footer_logo from "./images/footer-logo.svg"
import Logo from "./components/logos/Logo"
import FixedImage from "./components/fixedImage/FixedImage";

const rotateWheel = keyframes`
  0% {
    transform: rotate(3deg);
  }
  50% {
    transform: rotate(-2deg); // Adjust the rotation angle
  }
  100% {
    transform: rotate(3deg);
  }
`;

const StyledWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .container2 {
    animation: ${rotateWheel} 3s linear infinite; // Adjust duration as needed
  }
`;


function App() {
  const [clicks, setClicks] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [showPopUp, setShowPopUp] = useState(false);
  const [newOffsetAngle, setNewOffSetAngle] = useState(false);
  const [prizes, setPrizes] = useState({
    price1: 10,
    price2: 1568,
    price3: 1000,
    price4: 5,
    price5: 105,
    price6: 300,
  });
  const [winPrize, setWinPrize] = useState(null);
  const [winningSegment, setWinningSegment] = useState(null);

  const startAudioRef = useRef(null);
  const winAudioRef = useRef(null);
  const loseAudioRef = useRef(null);

  useEffect(() => {
    const storedPopUpShown = localStorage.getItem("popUpShown");
    const storedClicks = parseInt(localStorage.getItem("clicks"), 10);
    const storedWinPrize = localStorage.getItem("winPrize");


    if (storedPopUpShown === "true") {
      setShowPopUp(true);
    }

    setClicks(storedClicks || 0);
    setWinPrize(storedWinPrize || null);
  }, []);

  const handleSpinClick = () => {
    if (clicks > 0) {
      return; // Prevent spinning if clicks are more than 0
    }

    setClicks((clicks) => clicks + 1);
    const degreesPerSegment = 360 / 6;
    const chosenSegment = Math.floor(prizes.price1 * 6);
    // console.log("choosen segment",chosenSegment)

    const extraDegrees = 360;
    const newRotation =
      rotation + extraDegrees + chosenSegment * degreesPerSegment;
    setRotation(newRotation);
    setWinningSegment(chosenSegment);

    // startAudioRef.current.play();
    console.log("start date", new Date())

    setTimeout(() => {
      console.log("timeout start", new Date())
      // winAudioRef.current.play();
      playWinAudio()
        .then(() => {
          const finalRotation = newRotation % 360;
          const offsetAngle = (385 - finalRotation + 22.5) % 385;
          setNewOffSetAngle(offsetAngle);
          const winningSector = Math.floor(offsetAngle / 40);
          let winningPrice;
          localStorage.setItem("winPrize", winningPrice);
          setWinPrize(winningPrice);

          // console.log("winningPrice",winningPrice)

          localStorage.setItem("popUpShown", "true");
          localStorage.setItem("clicks", "1");
          setShowPopUp(true);
        })
        .catch((error) => {
          console.error("Error playing audio:", error);
        });


    }, 5000);
  };

  const playWinAudio = () => {
    return new Promise((resolve, reject) => {
      try {
        winAudioRef.current.play();
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  };
  const handleClaimBonus = () => {
    setShowPopUp(true);
    setClicks(1);
    localStorage.setItem("popUpShown", "true");
    localStorage.setItem("clicks", "1");
  };

  const handleCloseBtn = () => {
    setShowPopUp(false);
    setClicks(0);
    localStorage.setItem("popUpShown", "false");
    localStorage.setItem("clicks", "0");
    localStorage.removeItem("winPrize");
    setWinPrize(undefined);
  };

  return (
    <div className="App overflow-x-hidden">
      <div className="wheel flex flex-col justify-center items-center sm:mb-32 mb-28 mt-12">
        <img className="w-[150px]" src={footer_logo} alt="" />
        <h1 className="text-white text-[2rem] mt-5 font-[600] flex flex-col justify-center items-center">
          Spin the Wheel
          <span>And get the free Bonus</span>
        </h1>
      </div>
      <StyledWrapper className="wheel-container k relative w-[100%] flex justify-center items-center">
        <div className="absolute sm:top-[-22%] top-[-20%] z-[999]   ">
          <img className="sm:w-[200px] w-[120px]" src={bWheel} alt="" />
        </div>
        <div className='absolute sm:top-[-52%] top-[-60%] z-[999]"> '>
          <img className="rotate-[190deg] sm:w-[700px] w-[90%]" src={bg} alt="Background" />
        </div>
        <div className="birds absolute top-[-15%] z-50 flex sm:justify-evenly justify-around w-full">
          <img className="sm:w-[200px] w-[120px]" src={bird1} alt="Bird 1" />
          <img className="sm:w-[200px] w-[120px]" src={bird2} alt="Bird 2" />
        </div>
        <div className="arrow absolute left-[49.8%] z-[80] sm:top-[-5%] top-[-12%] -translate-x-[50%]">
          <img src={arrow} alt="Arrow" />
        </div>
        <div id="spin" onClick={handleSpinClick}>
          <img src={spin} alt="Spin" />
          <h1 className="absolute z-[999] text-2xl text-white hover:text-orange-900">SpinxO</h1>
        </div>
        <div className='border-[14px] border-[#934425]/[0.3]  rounded-full p-[7px] container2'>
          <div className="border-[4px] border-[#934425]/[0.3] p-[0.19em] rounded-full">
            <div className={`container`} style={{ transform: `rotate(${rotation}deg)` }}>

              {Object.entries(prizes).map(([key, value], index) => (
                <div
                  key={key}
                  className={`segment segment-${index + 1}`}
                  style={{ "--segment-rotation": `${(index + 1) * 60}deg` }}
                >
                  <h1>
                    {key === "price1" ? `FS` : `R$`} <span>{value}</span>
                  </h1>
                </div>
              ))}
            </div>
          </div>
        </div>
      </StyledWrapper>
      <FixedImage />
      {/* <Logo /> */}
      <Footer />
      {showPopUp && clicks > 0 && (
        <PopUp
          winPrize={winPrize}
          prizes={prizes}
          onClaimBonus={handleClaimBonus}
          newOffsetAngle={newOffsetAngle}
          handleCloseBtn={handleCloseBtn}
        />
      )}

      <audio ref={startAudioRef} src={startSound} preload="auto"></audio>
      <audio ref={winAudioRef} src={winSound} preload="auto"></audio>


    </div>
  );
}

export default App;
