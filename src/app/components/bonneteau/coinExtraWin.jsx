"use client";

import styles from "@/app/styles/threeshellgame.module.css";
import Image from "next/image";

const CoinsExtraWin = ({ index, rowIndex }) => {
  const extrasCoins = [
    { id: 1, imageSrc: "/images/coin-extra-win/coinBronze.png" },
    { id: 2, imageSrc: "/images/coin-extra-win/coinSilver.png" },
    { id: 3, imageSrc: "/images/coin-extra-win/coinGolden.png" },
  ];

  const randomCoinId = Math.floor(Math.random() * 3) + 1;
  // Trouver la pièce correspondant à coinId
  const coin = extrasCoins.find((coin) => coin.id === randomCoinId);

  if (!coin) {
    return null; // Retourne null si la pièce n'est pas trouvée
  }

  const randomLeft = Math.random() * 100;
  const randomTop = Math.random() * -80 - 50;
  //   const animationDuration = 4 + Math.random() * 6;
  // Générez un ID de pièce aléatoire entre 1 et 3

  const coinsStyle = {
    left: `${randomLeft}vw`,
    top: `${randomTop}px`,
    //  animation: `rotate ${animationDuration}s linear infinite`,
  };

  const coinsSize = 50;

  const coinsSizeStyle = {
    width: `${coinsSize * (rowIndex % 2 === 0 && index ? 0.9 : 1)}px`,
    height: `${coinsSize * (rowIndex % 2 === 0 && index ? 0.9 : 1)}px`,
  };

  const animationDuration = 4 + Math.random() * 6;

  const animationStyle = {
    animation: `fall ${animationDuration}s linear infinite`,
  };

  return (
    <div className={styles.coin} style={{ ...coinsStyle, ...animationStyle }}>
      <Image
        priority={true}
        as="image"
        src={coin.imageSrc} // Utilisez l'image correspondante à la pièce
        alt={`Coin ${coin.id}`}
        className={styles.coin}
        width={coinsSize}
        height={coinsSize}
        style={coinsSizeStyle}
      />
    </div>
  );
};

export default CoinsExtraWin;
