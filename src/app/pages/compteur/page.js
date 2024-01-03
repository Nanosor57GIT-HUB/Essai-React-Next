"use client";

import styles from '@/app/styles/compteur.module.css';
import { useTheme } from "@/app/context/themecontext";
import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";


const Counter = () => {
  const { theme } = useTheme();

  const [isStarted, setIsStarted] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isStopButtonVisible, setIsStopButtonVisible] = useState(false);
  const [isCountButtonDisabled, setIsCountButtonDisabled] = useState(false);
  const countRef = useRef(0);
 

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused) {
        countRef.current += 1;
        setElapsedTime((prevElapsedTime) => prevElapsedTime + 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const handlePause = () => {
    if (!isStarted) {
      setIsStarted(true);
    }
    setIsPaused((prevIsPaused) => !prevIsPaused);
    setIsStopButtonVisible(true);
  };

 

  let buttonText;
  if (!isStarted) {
    buttonText = "Démarrer";
  } else if (isPaused) {
    buttonText = "Reprendre";
  } else {
    buttonText = "Pause";
  }

  const handleStop = () => {
    setIsPaused(true);
    setIsStarted(false);
    setIsCountButtonDisabled(true); 
  };

  return (
    <main className="mainpages">
      <div
        className={styles.pagecompteur}
        style={{
          background: theme.background,
        }}
      >  <div className={styles['elapsed-time']}>
          Temps écoulé : {elapsedTime} secondes
        </div>
        <h1 className={styles.titlecompteur}>Compteur : <span className={styles.numbercompteur}>{countRef.current}</span></h1>
      
        <Image 
        priority={true} 
        as="image"
        src="/images/robots/robot5.webp" alt="robot5" className={styles.robot5} width={422} height={488} />
    <div className={styles.containerbtncount}>
        <button className={styles.btncount} onClick={handlePause} disabled={isCountButtonDisabled}>
          {buttonText}
        </button>
        {isStopButtonVisible && (
          <button className={styles.btnstop} onClick={handleStop}>
            Stop
          </button>
        )}
        </div>
      </div>       
     </main>
  );
};

export default Counter;

