import React, { useState, useEffect } from 'react';
import styles from './PopUp.module.css';
import maper from "../images/maper.png";
const PopUp = ({ winPrize, onClaimBonus }) => {
  return (
    <div className={styles.container2}>
      <div className={`${styles.card} h-[450px] sm:w-[400px] w-[90%]`}>
        <div className={styles.prize}>
          {winPrize === "Empty" ? <h1>Better Luck Next Time!</h1> : <h1>Congratulations you <br /> <span className={styles.span1}>Won</span>
            <span>${winPrize} + 200</span></h1>}
        </div>
        <div className={styles.footer}>
          <img className={styles.btn_image} src={maper} alt="" />
          {winPrize === "Empty" ? "" : <a href='https://basari.bet/register/?atp=&goto=sitereg&click_id=db0e6b614084ed125e69c0acdbe0155a&plid=18023&bnid=28892&lang=en&cc=DE&pid=75001&timestamp=1704818372.0174&refCode=mb_BQBnRgAA3HAAAPkkAQA.2024-01.10&uuid=2241693eef5ab9219d7c3219c3c69d9c789906dc' className={styles.PopUpButton} onClick={onClaimBonus}>
            Claim Bonus
          </a>}
        </div>
      </div>
    </div>
  );
}

export default PopUp;
