"use client"; /* Pour la page client et tous ce qui demande une mise en mode serveur */

import { useTheme } from "./context/themecontext";
import Image from "next/image";
import Audioplayer from "./components/audioplayer";
import Bonneteau from "./components/bonneteau/bonneteau";
import { Montserratfont } from "./style.font";

// https://www.youtube.com/watch?v=843nec-IvW0    (nextjs full course 7h by dave gray)

//https://css-tricks.com/easy-dark-mode-and-multiple-color-themes-in-react/
export default function Home() {
 const { theme } = useTheme();

  return (
    <main className="mainpages">
      <div
        className="pageaccueil"
        style={{
            background: theme.background,
        }}
      >   
      <h2 className={`titlegame ${Montserratfont.className}`}>Three-Shell Game</h2> 
     <Bonneteau />
     
     <Image priority={true} src="/images/Dollar.webp" alt="dollar"  width={407} height={399} className="logo-dollar"
       />
       <Image priority={true} src="/images/Game-Gold-Coin.webp" alt="coin-gold" width={800} height={377} className="coinsgold" />
        <Audioplayer /> 
      </div>
    </main>
  );
}