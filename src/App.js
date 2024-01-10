import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import bird1 from "./images/paret.webp";
import bird2 from "./images/paret2.webp";
import star1 from "./images/star1.webp";
import star2 from "./images/star2.webp";
import arrow from "./images/arrow.webp";
import spin from "./images/btn.png";
import PopUp from './components/PopUp';
import bg from "./images/bg3.webp";
import startSound from './audio/start.mp3';
import winSound from './audio/win.mp3';
import loseSound  from "./audio/lose.mp3"
function App() {
  const [clicks, setClicks] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [showPopUp, setShowPopUp] = useState(false);
  const [prices, setPrices] = useState({
    price1: "Empty",
    price2: 400,
    price3: 1000,
    price4: 15,
    price5: "Empty",
    price6: 300,
    price7: 5000,
    price8: 600,
  });
  const [winPrize, setWinPrize] = useState();

  const startAudioRef = useRef(null);
  const winAudioRef = useRef(null);
const loseAudioRef = useRef(null)
  useEffect(() => {
    const popUpShown = localStorage.getItem('popUpShown') === 'true';
    const savedClicks = parseInt(localStorage.getItem('clicks'), 10) || 0;
    const savedWinPrize = localStorage.getItem('winPrize');
    setShowPopUp(popUpShown);
    setClicks(savedClicks);
    if (savedWinPrize) {
      setWinPrize(savedWinPrize);
    }
  }, []);

  const handleSpinClick = () => {
    if (clicks > 0) {
      return;
    }
    setClicks(1);
    localStorage.setItem('clicks', '1');

    const newRotation = rotation + 360 + Math.floor(Math.random() * 1000);
    // console.log(newRotation)
    setRotation(newRotation);
    startAudioRef.current.play();

    setTimeout(() => {
      const finalRotation = newRotation % 360;
      const offsetAngle = (385 - finalRotation + 22.5) % 360;
      console.log(offsetAngle)
      const winningSector = Math.floor(offsetAngle / 40);
      let winningPrice;

      if (winningSector > 7) {
        winningPrice = prices.price8;
      } else if (winningSector === 1) {
        winningPrice = prices.price1;
      } else if (winningSector === 0) {
        winningPrice = prices.price2;
      } else {
        winningPrice = prices[`price${winningSector + 1}`];
      }

      localStorage.setItem('winPrize', winningPrice);
      setWinPrize(winningPrice);
     {winningPrice === "Empty" ? loseAudioRef.current.play(): winAudioRef.current.play();}


      localStorage.setItem('popUpShown', 'true');
      setShowPopUp(true);
    }, 5000);
  };

  const handleClaimBonus = () => {
    setShowPopUp(true);
    setClicks(1);
    localStorage.setItem('popUpShown', 'true');
    localStorage.setItem('clicks', '1');
    // localStorage.removeItem('winPrize');
    // setWinPrize(undefined);
  };

  const handleCloseBtn = () =>{
    setShowPopUp(false);
    setClicks(0);
    localStorage.setItem('popUpShown', 'false');
    localStorage.setItem('clicks', '0');
    localStorage.removeItem('winPrize');
    setWinPrize(undefined);
  }


  return (
    <div className="App">
      <div id="spin" onClick={handleSpinClick}>
        <img src={spin} alt="Spin" />
      </div>
      <div className='birds'>
        <img className='bird-1' src={bird1} alt="Bird 1" />
        <img className='bird-2' src={bird2} alt="Bird 2" />
      </div>
      <div className='stars'>
        <img className='bird-1' src={star1} alt="Bird 1" />
        <img className='bird-2' src={star2} alt="Bird 2" />
      </div>
      <div className='design'>
        <img src={bg} width={500} height={500} alt="Background" />
      </div>
      <span className="arrow">
        <img src={arrow} alt="Arrow" />
      </span>
      <div className="container" style={{ transform: `rotate(${rotation}deg)` }}>
        <div className="one">{prices.price1}</div>
        <div className="eight">{prices.price2} Fs</div>
        <div className="two">${prices.price3}</div>
        <div className="three">{prices.price4} Fs</div>
        <div className="four">{prices.price5}</div>
        <div className="five">${prices.price6}</div>
        <div className="six">{prices.price7} Fs</div>
        <div className="seven">${prices.price8}</div>
      </div>
      {showPopUp && clicks > 0 && (
        <PopUp winPrize={winPrize} onClaimBonus={handleClaimBonus} handleCloseBtn={handleCloseBtn}/>
      )}

      <audio ref={startAudioRef} src={startSound} preload="auto"></audio>
      <audio ref={winAudioRef} src={winSound} preload="auto"></audio>
      <audio ref={loseAudioRef} src={loseSound} preload="auto"></audio>
    </div>
  );
}

export default App;
