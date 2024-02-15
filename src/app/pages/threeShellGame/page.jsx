"use client";

import { metadata } from "@/app/layout";
import styles from "@/app/styles/threeshellgame.module.css";
import { useTheme } from "@/app/context/themecontext";
import Image from "next/image";
import Bonneteau from "@/app/components/bonneteau/bonneteauCopy";

const ThreeShell = () => {
  const { theme } = useTheme();

  return (

    <div>
       <title>{metadata.BonneteauGame.title}</title>
     <meta name="description" content={metadata.BonneteauGame.description}  />
    <div
      className={styles.pagebonneteau}
      style={{
        background: theme.background,
      }}
    >
      <Image
        priority={true}
        as="image"
        src="/images/threeshellbg.png"
        alt="bgbonneteau"
        width={1023}
        height={479}
        className={styles["threeshellgamebg"]}
      />
      <Image
        priority={true}
        as="image"
        src="/images/Dollar.webp"
        alt="dollar"
        width={407}
        height={399}
        className={styles["logo-dollar"]}
      />
      <Image
        priority={true}
        as="image"
        src="/images/Game-Gold-Coin.webp"
        alt="coin-gold"
        width={800}
        height={377}
        className={styles["coinsgold"]}
      />
      <Bonneteau />
    </div>
    </div>
  );
};

export default ThreeShell;
