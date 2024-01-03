"use client";

import styles from "@/app/styles/incrementation.module.css"
import { useTheme } from "@/app/context/themecontext";
import { useEffect, useState } from "react";
import { Interfont } from "@/app/style.font";
import Image from "next/image";

const Like = () => {
  const { theme } = useTheme();

  const storedNumber = sessionStorage.getItem("number");
  const initialNumber = storedNumber ? parseInt(storedNumber) : Math.floor(Math.random() * 100);

  const storedIsButtonDisabled = sessionStorage.getItem("isButtonDisabled");
  const initialIsButtonDisabled = storedIsButtonDisabled === "true";

  const [number, setNumber] = useState(initialNumber);
  const [isButtonDisabled, setIsButtonDisabled] = useState(initialIsButtonDisabled);
  const [showMessage, setShowMessage] = useState(false);

  const increment = () => {
    const newNumber = number + 1;
    setNumber(newNumber);
    setIsButtonDisabled(true);
    setShowMessage(true);

    // Stockez l'état du bouton dans sessionStorage
    sessionStorage.setItem("isButtonDisabled", "true");
  };

  useEffect(() => {
    // Restaurez l'état du bouton à partir de sessionStorage
    const storedIsButtonDisabled = sessionStorage.getItem("isButtonDisabled");
    if (storedIsButtonDisabled === "true") {
      setIsButtonDisabled(true);
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem("number", number.toString());
    sessionStorage.setItem("isButtonDisabled", isButtonDisabled.toString());
    sessionStorage.setItem("showMessage", showMessage.toString());
  }, [number, isButtonDisabled, showMessage]);

  useEffect(() => {
    if (number > 0 && showMessage) {
      setTimeout(() => {
        setShowMessage(false);
      }, 2000);
    }
  }, [number, showMessage]);

  return (
    <main className="mainpages">
      <div
        className={styles.pageincrement}
        style={{
          background: theme.background,
        }}
      >
        <h1
        className={`${styles.titleincrement} ${Interfont.className}`}
          style={{
            color: theme.color,
          }}
        >
          Vous êtes sur la page d&#39;incrémentation
        </h1>
        <Image
          priority={true}
          as="image"
          src="/images/robots/robot3.webp"
          alt="robot3"
          className={styles.robot3}
          width={600}
          height={942}
        />
        <div className={styles.blockincrement}>
          <h2 className={styles.numberlike}>{number}</h2>
          <div className={styles.blockbtn}>
            <button
              className={`${styles.btnlike} ${isButtonDisabled ? styles.disabled : ""} ${Interfont.className}`}
              onClick={() => increment()}
              disabled={isButtonDisabled}
            >
              Like moi !
            </button>
            <p className={`${styles.mercilike} ${showMessage ? styles.show : ""}`}>
              Merci pour ton like ! &#x1F44D;
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Like;



