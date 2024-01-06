"use client"

import styles from "@/app/styles/lotogame.module.css"
import { useTheme } from "@/app/context/themecontext";
import LotoSystem from "@/app/components/lotoSystem/lotosystem2";



const Loto = () => {
    const { theme } = useTheme()
    return (
       
        <div
        className={styles.pageloto}
        style={{
          background: theme.background,
        }}
      >
          <LotoSystem />
          </div>
      
    );
};

export default Loto;