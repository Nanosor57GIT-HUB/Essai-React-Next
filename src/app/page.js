"use client"; /* Pour la page client et tous ce qui demande une mise en mode serveur */

import styles from "@/app/styles/accueil.module.css"
import { useTheme } from "./context/themecontext";
//import Image from "next/image";
import Audioplayer from "./components/audioplayer";
import AccueilDescriptionProject from "./components/accueilDescriptionProject";
//import Bonneteau from "./components/bonneteau/bonneteau";
//import LotoSystem from "./components/lotoSystem/lotosystem0312";
//import LotoSystem from "./components/lotoSystem/lotosystem";
//import LotoSystem from "./components/lotoSystem/lotosystem2";


// https://www.youtube.com/watch?v=843nec-IvW0    (nextjs full course 7h by dave gray)

//https://css-tricks.com/easy-dark-mode-and-multiple-color-themes-in-react/

//project deploy in vercel : https://essai-react-next.vercel.app/

export default function Home() {
  const { theme } = useTheme();


  return (
    <main className="mainpages">
      <div
        className={styles.pageaccueil}
        style={{
          background: theme.background,
        }}
      >
        <h1 className={styles.titlePage}>Description des pages avec React/Nextjs</h1>
        <p className={styles.ok}>OK</p>
      {/* <Bonneteau /> */}

        {/* <Image
          priority={true}
          as="image"
          src="/images/Dollar.webp"
          alt="dollar"
          width={407}
          height={399}
          className="logo-dollar"
        />
        <Image
          priority={true}
          as="image"
          src="/images/Game-Gold-Coin.webp"
          alt="coin-gold"
          width={800}
          height={377}
          className="coinsgold"
        /> */}
        {/* <LotoSystem /> */}
        <AccueilDescriptionProject />
        <Audioplayer />
      </div>
    </main>
  );
}
