"use client";

import { metadata } from "@/app/layout";
import styles from "@/app/styles/lotogame.module.css";
import { useTheme } from "@/app/context/themecontext";
import LotoSystem from "@/app/components/lotoSystem/lotosystem";

const Loto = () => {
  const { theme } = useTheme();
  return (

    <div>
       <title>{metadata.LotoGame.title}</title>
     <meta name="description" content={metadata.LotoGame.description}  />
    <div
      className={styles.pageloto}
      style={{
        background: theme.background,
      }}
    >
      <LotoSystem />
    </div>
    </div>
  );
};

export default Loto;
