"use client"

import React, { useState, useEffect } from 'react';
import styles from "@/app/styles/chronometer.module.css";
import Image from 'next/image';


const Chronometer = () => {
    const [time, setTime] = useState(new Date());

    const [isRunning, setIsRunning] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
  
    useEffect(() => {
      let intervalID;
  
      if (isRunning) {
        intervalID = setInterval(() => {
          setElapsedTime((prevTime) => prevTime + 1);
        }, 1000);
      }
  
      return () => clearInterval(intervalID);
    }, [isRunning]);
  
    // Fonction pour démarrer le chronomètre
    const startChronometer = () => {
      setIsRunning(true);
    };
  
    // Fonction pour arrêter le chronomètre
    const stopChronometer = () => {
      setIsRunning(false);
    };
  
    // Fonction pour réinitialiser le chronomètre
    const resetChronometer = () => {
      setIsRunning(false);
      setElapsedTime(0);
    };
  
    const getDegree = (unit, totalUnits) => (360 / totalUnits) * unit;
  
    const renderTickMarks = (totalTicks, interval, isHourly = false) => {
      const tickMarks = [];
      for (let i = 0; i < totalTicks; i++) {
        tickMarks.push(
          <div
            key={i}
            className={`${styles['tick-mark']} ${isHourly ? styles['hourly'] : ''}`}
            style={{
              width: isHourly ? '2px' : '1px',
              height: isHourly ? '10px' : '5px', 
              transform: `rotate(${getDegree((i * interval) + (isHourly ? 0 : interval/2), totalTicks)}deg) translate(-50%, -50%)`,
              transformOrigin: '50% 50%',
            }}
          />
        );
      }
      return tickMarks;
    };
    
    
    
  
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
      <div className={styles['clock-container']}> 
     
        {/* Cercle du compteur */}
        <div className={styles["clock-face"]} />
   <div className={styles['block-button']}>
  <div className={styles['btn-btnPress']} onClick={startChronometer}>Start</div>
  <div className={styles['btn-btnPress']} onClick={resetChronometer}>Reset</div>
  <div className={styles['btn-btnPress']} onClick={stopChronometer}>Stop</div>
  </div>
      <Image 
        priority={true} 
        as="image"
        src="/images/chronometer.png" alt="chronometer-image" className={styles.chronometerBg} width={1855} height={2400} />
        {/* Marques pour les secondes (toutes les 15 secondes) */}
        {renderTickMarks(60, 15)}
  
        {/* Marques pour les heures (toutes les heures) */}
        {renderTickMarks(12, 5, true)}
  
        {/* Marques pour les minutes (toutes les 5 minutes) */}
        {renderTickMarks(12, 5)}
  
        {/* Aiguille des secondes */}
        <div
          className={styles['second-hand']}
          style={{
            transform: `rotate(${getDegree(time.getSeconds(), 60)}deg) translate(-50%, -65%)`,
            transformOrigin: '50% 50%',
          }}
        />
  
        {/* Aiguille des minutes */}
        <div
          className={styles['minute-hand']}
          style={{
            transform: `rotate(${getDegree(time.getMinutes(), 60)}deg) translate(-50%, -65%)`,
            transformOrigin: '50% 50%',
          }}
        />
  
        {/* Aiguille des heures */}
        <div
          className={styles['hour-hand']}
          style={{
            transform: `rotate(${getDegree(time.getHours() % 12, 12)}deg) translate(-50%, -78%)`,
            transformOrigin: '50% 50%',
          }}
        />
  
        {/* Chiffres pour les heures */}
        {renderNumbers(12, 40)}
  
        {/* Traits pour les minutes */}
        {renderTickMarks(60, 1)}       
  </div>
    );
  };
  
    

export default Chronometer;