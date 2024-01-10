import React, { useState, useEffect, useRef } from "react";
import bird1 from "../../images/paret.webp";
import bird2 from "../../images/paret2.webp";
import arrow from "../../images/arrow.webp";
import btn from "../../images/btn.png";
import PopUp from '../../components/PopUp';
import "./Wheel.css"; // Import additional CSS file if needed

const Wheel = ({ prices }) => {
  const [clicks, setClicks] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [showPopUp, setShowPopUp] = useState(false);
  const [offset, setOffset] = useState(null);
  const [top, setTop] = useState(null);
  const [angle, setAngle] = useState(0);
  const [net, setNet] = useState(null);
  const [result, setResult] = useState(null);
  const [spinning, setSpinning] = useState(false);
  const [easeOut, setEaseOut] = useState(0);

  const wheelRef = useRef(null);

  useEffect(() => {
    renderWheel();
  }, []);

  const renderSector = (index, text, start, arc, color) => {
    let ctx = wheelRef.current.getContext("2d");
    let x = wheelRef.current.width / 2;
    let y = wheelRef.current.height / 2;
    let radius = 75;
    let startAngle = start;
    let endAngle = start + arc;
    let sectorAngle = index * arc;
    let baseSize = radius * 3.33;
    let textRadius = baseSize - 150;

    ctx.beginPath();
    ctx.arc(x, y, radius, startAngle, endAngle, false);
    ctx.lineWidth = radius * 2;
    ctx.strokeStyle = color;

    ctx.font = "17px Arial";
    ctx.fillStyle = "black";
    ctx.stroke();

    ctx.save();
    ctx.translate(
      baseSize + Math.cos(sectorAngle - arc / 2) * textRadius,
      baseSize + Math.sin(sectorAngle - arc / 2) * textRadius
    );
    ctx.rotate(sectorAngle - arc / 2 + Math.PI / 2);
    ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
    ctx.restore();
  };

  const renderWheel = () => {
    let numOptions = Object.keys(prices).length;
    let arcSize = (2 * Math.PI) / numOptions;

    setAngle(arcSize);

    topPosition(numOptions, arcSize);

    let sectorAngle = 0;
    for (let i = 0; i < numOptions; i++) {
      let text = prices[`price${i + 1}`];
      renderSector(i + 1, text, sectorAngle, arcSize, "transparent"); // Use transparent color
      sectorAngle += arcSize;
    }
  };

  const topPosition = (num, arc) => {
    let topSpot = null;
    let degreesOff = null;

    if (num === 9) {
      topSpot = 7;
      degreesOff = Math.PI / 2 - arc * 2;
    } else if (num === 8) {
      topSpot = 6;
      degreesOff = 0;
    } else if (num <= 7 && num > 4) {
      topSpot = num - 1;
      degreesOff = Math.PI / 2 - arc;
    } else if (num === 4) {
      topSpot = num - 1;
      degreesOff = 0;
    } else if (num <= 3) {
      topSpot = num;
      degreesOff = Math.PI / 2;
    }

    setTop(topSpot - 1);
    setOffset(degreesOff);
  };

  const spin = () => {
    let randomSpin = Math.floor(Math.random() * 900) + 500;
    setRotation(randomSpin);
    setEaseOut(2);
    setSpinning(true);

    setTimeout(() => {
      getResult(randomSpin);
    }, 2000);
  };

  const getResult = (spin) => {
    let netRotation = ((spin % 360) * Math.PI) / 180;
    let travel = netRotation + offset;
    let count = top + 1;

    while (travel > 0) {
      travel = travel - angle;
      count--;
    }

    let winningSector;
    if (count >= 0) {
      winningSector = count;
    } else {
      winningSector = Object.keys(prices).length + count;
    }

    setNet(netRotation);
    setResult(winningSector);
    setShowPopUp(true);
  };

  const reset = () => {
    setRotation(0);
    setEaseOut(0);
    setResult(null);
    setSpinning(false);
    setShowPopUp(false);
  };

  return (
    <div className="App">
      <button id="spin" onClick={spin}>
        <img src={btn} alt="Spin" />
      </button>
      <div className='birds'>
        <img className='bird-1' src={bird1} alt="Bird 1" />
        <img className='bird-2' src={bird2} alt="Bird 2" />
      </div>
      <span className="arrow">
        <img src={arrow} alt="Arrow" />
      </span>
      <div className="container">
        <canvas
          ref={wheelRef}
          id="wheel"
          width="500"
          height="500"
          style={{
            WebkitTransform: `rotate(${rotation}deg)`,
            WebkitTransition: `-webkit-transform 2s ease-out`,
          }}
        />
        {/* <div
          className="background-image"
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: "transform 2s ease-out",
          }}
        >
        </div> */}
      </div>
      {prices[`price${result + 1}`]}
      {showPopUp && clicks > 0 && (
        <PopUp
          setShowPopUp={setShowPopUp}
          setClicks={setClicks}
          winningPrice={prices[`price${result + 1}`]}
        />
      )}
    </div>
  );
};

export default Wheel;
