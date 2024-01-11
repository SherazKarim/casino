import React, { useState, useEffect } from 'react';
import styles from './PopUp.module.css';
import maper from "../images/maper.png";
const PopUp = ({ winPrize, prizes, onClaimBonus, newOffsetAngle, handleCloseBtn }) => {
  // Initialize newWinPrize state with the value from localStorage if available
  const initialWinPrize = localStorage.getItem('newWinPrize');
  const [newWinPrize, setNewWinPrize] = useState(initialWinPrize);

  const { price1, price2, price3, price4, price5, price6 } = prizes;

  useEffect(() => {
    if (winPrize === price5) {
      setNewWinPrize(price3);
    } else if (newOffsetAngle === 227.5) {
      setNewWinPrize(price4);
    }
    else if (winPrize === price3) {
      setNewWinPrize(price2);
    } else if (winPrize === undefined) {
      setNewWinPrize(price5);
    } else if (winPrize === price4) {
      setNewWinPrize(price4);
    } else if (winPrize === price2) {
      setNewWinPrize(price1);
    } else if (winPrize === price6) {
      setNewWinPrize(price6);
    }
    // else if(newOffsetAngle === 227.5){
    //   setNewWinPrize(price4);
    // }
  }, [winPrize, price1, price2, price3, price4, price5, price6]);

  useEffect(() => {
    // Update localStorage when newWinPrize changes
    localStorage.setItem('newWinPrize', newWinPrize);
  }, [newWinPrize]);
  return (
    <div className={styles.container2}>
      <div className={styles.prize}>
        {winPrize === "Empty" ? <h1>Better Luck Next Time!</h1> : <h1>Congratulations you <br /> <span className={styles.span1}>Won</span>
          <span>${newWinPrize} + 200</span></h1>}
      </div>
      <div className={styles.footer}>
        <img className={styles.btn_image} src={maper} alt="" />
        {winPrize === "Empty" ? "" : <a href='https://basari.bet/register/?atp=&goto=sitereg&click_id=db0e6b614084ed125e69c0acdbe0155a&plid=18023&bnid=28892&lang=en&cc=DE&pid=75001&timestamp=1704818372.0174&refCode=mb_BQBnRgAA3HAAAPkkAQA.2024-01.10&uuid=2241693eef5ab9219d7c3219c3c69d9c789906dc' className={styles.PopUpButton} onClick={onClaimBonus}>
          Claim Bonus
        </a>}
      </div>
      <div className={styles.close}>
        <button onClick={handleCloseBtn}>close</button>
      </div>
    </div>
  );
}

export default PopUp;
