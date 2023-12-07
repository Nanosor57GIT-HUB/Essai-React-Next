"use client"

import { useTheme } from "@/app/context/themecontext";
import Image from "next/image";
import NumbersListMemo from "./NumbersListMemo";

const App = () => {
    const { theme } = useTheme();

      // Déplacez les constantes numbers et multipliers ici
  const numbers = [1, 2, 3, 4, 5];
  const multipliers = [2, 3, 4];

  return (
    <main className="mainpages">
      <div
      className="pageusememo"
      style={{
        background: theme.background,
      }}
    >
      <Image priority={true} as="image" src="/images/robots/robot6.webp" alt="robot6" className="robot6" width={600} height={600} />
      <h1 style={{
          color: theme.color,
        }}>Exemple avec des nombres et des multiplicateurs</h1>
      <NumbersListMemo numbers={numbers} multipliers={multipliers} />
    </div>
    </main>
  );
};

export default App;