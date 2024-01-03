"use client"

import styles from "@/app/styles/lotogame.module.css"
import { useTheme } from "@/app/context/themecontext";
import LotoSystem from "@/app/components/lotoSystem/lotosystem2";



const Loto = () => {
    const { theme } = useTheme()
    return (
        <main className="mainpages">
        <div
        className={styles.pageloto}
        style={{
          background: theme.background,
        }}
      >
          <LotoSystem />
          </div>
        </main>
    );
};

export default Loto;