"use client";

import { useTheme } from "@/app/context/themecontext";
import { useEffect, useState } from "react";
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
        className="pageincrement"
        style={{
          background: theme.background,
        }}
      >
        <h1
          className="titleincrement"
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
          className="robot3"
          width={600}
          height={942}
        />
        <div className="blockincrement">
          <h2 className="numberlike">{number}</h2>
          <div className="blockbtn">
            <button
              className={`btnlike ${isButtonDisabled ? "disabled" : ""}`}
              onClick={() => increment()}
              disabled={isButtonDisabled}
            >
              Like moi !
            </button>
            <p className={`mercilike ${showMessage ? "show" : ""}`}>
              Merci pour ton like ! &#x1F44D;
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Like;



