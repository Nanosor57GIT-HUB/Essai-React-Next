"use client"

import styles from "@/app/styles/threeshellgame.module.css"
import Image from "next/image";
import { useEffect, useState } from "react";

// Fonction pour calculer la taille de la pièce en fonction de la largeur de la fenêtre
const calculateCoinSize = (windowWidth, rowIndex, index) => {
  // Vous pouvez ajuster ces valeurs en fonction de vos besoins
  if (windowWidth >= 768) {
    // Version desktop
    return 60 * (rowIndex % 2 === 0 && index ? 0.8 : 1);
  } else {
    // Version mobile
    return 40 * (rowIndex % 2 === 0 && index ? 0.8 : 1);
  }
};

const Coin = ({ index, rowIndex }) => {
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    // Mettez à jour windowWidth lorsque la taille de la fenêtre change
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initialisez la valeur initiale

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const randomLeft = Math.random() * 100; // Entre 0% et 100% (pour la largeur du scale)
  const randomTop = Math.random() * -80 -50; // Entre -60px et -30px (pour éviter un chevauchement significatif)
  const animationDuration = 2 + Math.random() * 3;



  const coinStyle = {
    left: `${randomLeft}vw`,
    top: `${randomTop}px`,  
  };

  const coinSize = calculateCoinSize(windowWidth, rowIndex, index);

  const coinSizeStyle = {
    width: `${coinSize}px`,
    height: `${coinSize}px`,
  };
  

  const animationStyle = {
    animation: `fall ${animationDuration}s linear infinite`,
  };

  return (
    <div  className={styles.coin} style={{ ...coinStyle, ...animationStyle }}>
      <Image
      priority={true}
      as="image"
        src="/images/coin/Dollar-Gold.png" 
        alt="Coin"
        className={styles.coin}
        width={coinSize}
        height={coinSize}
        style={coinSizeStyle}
      />
    </div>
  );
};

export default Coin;