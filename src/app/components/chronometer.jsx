"use client";

import React, { useState, useEffect } from "react";
import styles from "@/app/styles/chronometer.module.css";
import Image from "next/image";

const Chronometer = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  useEffect(() => {
    let intervalID;

    if (isRunning) {
      intervalID = setInterval(() => {
        setElapsedSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    }

    return () => clearInterval(intervalID);
  }, [isRunning]);

  // Fonction utilitaire pour formater le temps
const formatTime = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
};

  const startChronometer = () => {
    setIsRunning(true);
  };

  const stopChronometer = () => {
    setIsRunning(false);
  };

  const resetChronometer = () => {
    if (stopChronometer && !isRunning) {
      setIsRunning(false);
    setElapsedSeconds(0);
  }else{
    return;
  }
  };

  const getDegree = (unit, totalUnits) => (360 / totalUnits) * unit;

  const renderNumbers = (totalNumbers, radius) => {
    const numbers = [];
    const angleIncrement = (2 * Math.PI) / totalNumbers; // Utiliser radians plutôt que degrés
    for (let i = 1; i <= totalNumbers; i++) {
      const angle = -(Math.PI / 2) + angleIncrement * i; // Ajustement de l'angle de départ
      const x = 50 + radius * Math.cos(angle);
      const y = 50 + radius * Math.sin(angle);
      numbers.push(
        <div
          key={i}
          className={styles.number}
          style={{
            top: `${y}%`,
            left: `${x}%`,
          }}
        >
          {i}
        </div>
      );
    }
    return numbers;
  };

  return (
    <div className={styles["clock-container"]}>
      <div className={styles["clock-face"]}>
        <div className={styles["block-button"]}>
          <div className={styles["btn-btnPress"]} onClick={startChronometer}>
            Start
          </div>
          <div className={styles["btn-btnPress"]} onClick={resetChronometer}>
            Reset
          </div>
          <div className={styles["btn-btnPress"]} onClick={stopChronometer}>
            Stop
          </div>
        </div>
        <Image
          priority={true}
          as="image"
          src="/images/chronometer.png"
          alt="chronometer-image"
          className={styles.chronometerBg}
          width={1855}
          height={2400}
        />
           <Image
          priority={true}
          as="image"
          src="/images/logo/logoPortfolioName.webp"
          alt="logoPortfolio-image"
          className={styles.logoPortfolioName}
          width={1628}
          height={906}
        />
<div className={styles.centercercle}></div>  
        {/* Aiguille des secondes */}
        <div
          className={styles["second-hand"]}
          style={{
            transform: `rotate(${getDegree(
              elapsedSeconds % 60,
              60
            )}deg) translate(0, -50%)`,
          }}
        />
        {renderNumbers(60, 45)}
        {/* Aiguille des minutes */}
        <div
          className={styles["minute-hand"]}
          style={{
            transform: `rotate(${getDegree(
              Math.floor(elapsedSeconds / 60) % 60,
              60
            )}deg) translate(0, -50%)`,
          }}
        />
  
      </div>
       <div className={styles.containerheures}>
        <div className={styles["hour-circle"]} />
             {/* Aiguille des heures */}
             <div
          className={styles["hour-hand"]}
          style={{
            transform: `rotate(${getDegree(
              Math.floor(elapsedSeconds / 3600) % 12,
              12
            )}deg) translate(0, -50%)`,
          }}
        />
        <div className={styles.centercercleheures}></div>
        {renderNumbers(12, 35)}
      </div>
      <div className={styles["elapsed-time"]}>
        {formatTime(elapsedSeconds)}
      </div>
    </div>
  );
};

export default Chronometer;
