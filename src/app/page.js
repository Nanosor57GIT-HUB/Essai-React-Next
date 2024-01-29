"use client"; /* Pour la page client et tous ce qui demande une mise en mode serveur */

import styles from "@/app/styles/accueil.module.css"
import { useTheme } from "./context/themecontext";
import AccueilDescriptionProject from "./components/accueilDescriptionProject";
import Audioplayer from "./components/audioplayer";
import Head from "next/head";

// https://www.youtube.com/watch?v=843nec-IvW0    (nextjs full course 7h by dave gray)

//https://css-tricks.com/easy-dark-mode-and-multiple-color-themes-in-react/

//project deploy in vercel : https://essai-react-next.vercel.app/

export default function Home() {
  const { theme } = useTheme();


  return (
    <div>
    <Head>
      <title>Accueil</title>
    </Head>
  
      <div
        className={styles.pageaccueil}
        style={{
          background: theme.background,
        }}
      >
        <h1 className={styles.titlePage}>Description des pages avec React/Nextjs</h1>
        <p className={styles.ok}>OK</p>
        <AccueilDescriptionProject />
        <Audioplayer />
      </div>
    </div>
  );
}
