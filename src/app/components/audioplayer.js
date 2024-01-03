"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "@/app/styles/accueil.module.css"
import Image from "next/image";

const Audioplayer = () => {

  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState(false);
  const [currentAudioTitle, setCurrentAudioTitle] = useState("");
  const [musicEnded, setMusicEnded] = useState(false); // Nouvelle variable d'état
  const audioRef = useRef(null);
  const playButtonRef = useRef(null);

  const handlePlayOrPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleAudioError = () => {
    setError(true);
  };

  useEffect(() => {
    if (isPlaying) {
      const audioElement = audioRef.current;
      if (audioElement) {
        const sourceElement = audioElement.querySelector("source");
        if (sourceElement) {
          const audioTitle = sourceElement.getAttribute("title");
          setCurrentAudioTitle(audioTitle);
        //  console.log(audioTitle);
        }
      }
    }
  }, [isPlaying]);

  const handleAudioEnded = () => {
    setMusicEnded(true); // Indiquer que la musique est terminée
    setIsPlaying(false); // Arrêter la lecture
  };

  const handleButtonClick = () => {
    if (musicEnded) {
      // Réinitialiser l'état d'animation lorsque le bouton est cliqué après la fin de la musique
      playButtonRef.current.classList.remove("btnplayer-fade-out");
      setMusicEnded(false); // Réinitialiser l'état de musique terminée
    }
    handlePlayOrPause();
  };

  return (
    <div>
      {error ? (
        <p className={styles.errorplayer}>
          Votre navigateur ne supporte pas l&#39;élément audio.
        </p>
      ) : (
        <div className={styles.containeraudio}>
          <audio
            controls
            className={`${styles.nativeaudioplayer} ${
              isPlaying || musicEnded ? "" : styles['player-fade-out']
            }`}
            onError={() => handleAudioError()}
          //  onLoadedMetadata={() => handleAudioLoaded()}
            onEnded={() => handleAudioEnded()}
            ref={audioRef}
          >
            <source
              src="/audio/Daft_Punk-Horizon.mp3"
              type="audio/mpeg"
              title='Daft Punk "HORIZON".'
            />
          </audio>
          <button
            className={`${styles.btnplayer} ${musicEnded ? styles['btnplayer-fade-out'] : ""}`}
            onClick={() => handleButtonClick()}
            ref={playButtonRef}
          >
            {isPlaying ? "Pause ⏸️" : "Play ▶️"}
          </button>
          <div className={styles.robotcontainer}>
        <Image priority={true} src="/images/robots/robot1.webp" alt="robot1"  width={658} height={747} className={styles.robot1}
       />
      
          <div className={styles.containermarquee}>
            {currentAudioTitle && isPlaying && (
              <marquee behavior="scroll" direction="left">
                <h2>{currentAudioTitle}</h2>
              </marquee>
            )} 
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Audioplayer;

