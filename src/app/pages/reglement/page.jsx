import React from 'react';
import styles from "@/app/styles/reglementGames.module.css";
import Reglement from './reglement';

const reglement = () => {
    return (
    
        <div className={styles.pageReglement}>
            <Reglement />
        </div>
      
    );
};

export default reglement;