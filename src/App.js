import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import bird1 from "./images/paret.webp";
import bird2 from "./images/paret2.webp";
import arrow from "./images/arrow.webp";
import spin from "./images/btn.png";
import bWheel from "./images/bwheel.svg"
import PopUp from './components/PopUp';
import bg from "./images/bg3.webp";
import startSound from './audio/start.mp3';
import winSound from './audio/win.mp3';
import loseSound from "./audio/lose.mp3"
function App() {
  const [clicks, setClicks] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [showPopUp, setShowPopUp] = useState(false);
  const [newOffsetAngle, setNewOffSetAngle] = useState(false);
  const [prizes, setPrizes] = useState({
    price1: 5,
    price2: 1568,
    price3: 1000,
    price4: 15,
    price5: 105,
    price6: 300,
  });
  const [winPrize, setWinPrize] = useState(null);
  const [winningSegment, setWinningSegment] = useState(null);

  const startAudioRef = useRef(null);
  const winAudioRef = useRef(null);
  const loseAudioRef = useRef(null);

  useEffect(() => {
    const storedPopUpShown = localStorage.getItem('popUpShown');
    const storedClicks = parseInt(localStorage.getItem('clicks'), 10);
    const storedWinPrize = localStorage.getItem('winPrize');

    if (storedPopUpShown === 'true') {
      setShowPopUp(true);
    }

    setClicks(storedClicks || 0);
    setWinPrize(storedWinPrize || null);
  }, []);

  const handleSpinClick = () => {
    if (clicks > 0) {
      return; // Prevent spinning if clicks are more than 0
    }

    setClicks(clicks => clicks + 1);
    const degreesPerSegment = 360 / 6;
    const chosenSegment = Math.floor(Math.random() * 6);
    const extraDegrees = 1080; // Ensures the wheel spins at least 3 times for visual effect
    const newRotation = rotation + extraDegrees + (chosenSegment * degreesPerSegment);
    setRotation(newRotation);
    setWinningSegment(chosenSegment);

    startAudioRef.current.play();

    setTimeout(() => {
      const finalRotation = newRotation % 360;
      const offsetAngle = (385 - finalRotation + 22.5) % 385;
      setNewOffSetAngle(offsetAngle)
      console.log(offsetAngle)
      const winningSector = Math.floor(offsetAngle / 40);
      let winningPrice;

      if (winningSector > 7) {
        winningPrice = prizes.price6;
      } else if (winningSector === 1) {
        winningPrice = prizes.price1;
      } else if (winningSector === 0) {
        winningPrice = prizes.price2;
      } else {
        winningPrice = prizes[`price${winningSector + 1}`];
      }

      localStorage.setItem('winPrize', winningPrice);
      setWinPrize(winningPrice);
      winningPrice === "Empty" ? loseAudioRef.current.play() : winAudioRef.current.play();

      localStorage.setItem('popUpShown', 'true');
      localStorage.setItem('clicks', '1');
      setShowPopUp(true);
    }, 5000);
  };



  const handleClaimBonus = () => {
    setShowPopUp(true);
    setClicks(1);
    localStorage.setItem('popUpShown', 'true');
    localStorage.setItem('clicks', '1');
  };

  const handleCloseBtn = () => {
    setShowPopUp(false);
    setClicks(0);
    localStorage.setItem('popUpShown', 'false');
    localStorage.setItem('clicks', '0');
    localStorage.removeItem('winPrize');
    setWinPrize(undefined);
  }


  return (
    <div className="App">
      <div className='birds'>
        <img className='bird-1' src={bird1} alt="Bird 1" />
        <img className='bird-2' src={bird2} alt="Bird 2" />
      </div>
      <div className='wheel'>
        <img src={bWheel} alt="" />
      </div>
      <div className="wheel-container">
        <div className='design'>
          <img src={bg} alt="Background" />
        </div>
        <div className="arrow">
          <img src={arrow} alt="Arrow" />
        </div>
        <div className='container' style={{ transform: `rotate(${rotation}deg)` }}>
          <div id="spin" onClick={handleSpinClick}>
            <img src={spin} alt="Spin" />
          </div>
          {Object.entries(prizes).map(([key, value], index) => (
            <div key={key} className={`segment segment-${index + 1}`}
              style={{ '--segment-rotation': `${(index + 1) * 60}deg` }}>
              <h1>{key === 'price1' ? `FS` : `R$`} <span>{value}</span></h1>
            </div>
          ))}
        </div>
      </div>

      {showPopUp && clicks > 0 && (
        <PopUp winPrize={winPrize} prizes={prizes} onClaimBonus={handleClaimBonus} newOffsetAngle={newOffsetAngle} handleCloseBtn={handleCloseBtn} />
      )}

      <audio ref={startAudioRef} src={startSound} preload="auto"></audio>
      <audio ref={winAudioRef} src={winSound} preload="auto"></audio>
      <audio ref={loseAudioRef} src={loseSound} preload="auto"></audio>
    </div>
  );
}

export default App;
