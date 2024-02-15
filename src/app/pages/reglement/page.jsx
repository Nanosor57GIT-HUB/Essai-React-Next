import React from "react";
import { metadata } from "@/app/layout";
import styles from "@/app/styles/reglementGames.module.css";
import Reglement from "../../components/reglement";

const reglement = () => {
  return (

    <div>
       <title>{metadata.Reglement.title}</title>
     <meta name="description" content={metadata.Reglement.description}  />
    <div className={styles.pageReglement}>
      <Reglement />
    </div>
    </div>
  );
};

export default reglement;
