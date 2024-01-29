"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { useTheme } from "@/app/context/themecontext";
import ModaleReglementGames from "../modaleReglementGames";
import styles from "@/app/styles/lotogame.module.css";
import Image from "next/image";
import { Montserratfont } from "@/app/styles/style.font";

//import Link from "next/link";

// JSON.parse convertit en chaine de caractère dans un objet(tableau) pour le récupérrer avec getItem.
// parseInt  analyse une chaine de caractère et récupère un nombre entier avec getItem.
// parseFloat est utilisé pour les nombres à virgule (de la meme façon que parseInt).
// localStorage.setItem('selectedNumbers', JSON.stringify(selectedNumbers)); Convertit en chaines de caractères pour envoyer dans le storage

const LotoSystem = () => {
  const { theme } = useTheme();

  const [modalOpen, setModalOpen] = useState(false);

  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [selectionLocked, setSelectionLocked] = useState(false);
  const containerRef = useRef(null);
  const [drawnNumbers, setDrawnNumbers] = useState([]);
  const [result, setResult] = useState(0);
  const [dailyDrawCount, setDailyDrawCount] = useState(0);
  const [isDraw, setIsDraw] = useState(false);
  const [messages, setMessages] = useState({
    lotoMessage1: "",
    lotoMessage2: "",
    lotoMessage3: "",
  });

  // Fonction de réinitialisation du stockage local
  const resetStorage = () => {
    // Supprime les données associées au tirage quotidien
    localStorage.removeItem("dailyDrawCount");
    localStorage.removeItem("lastDrawNumbers");
    localStorage.removeItem("resultcorres");
    localStorage.removeItem("lastDrawTime");
    localStorage.removeItem("result");
    localStorage.removeItem("messages");
    localStorage.removeItem("selectedNumbers");
  };

  // Mise à jour des messages dans le stockage local
  const updateMessage = useCallback(
    (messageKey, newMessage) => {
      setMessages((prevMessages) => ({
        ...prevMessages,
        [messageKey]: newMessage,
      }));
      localStorage.setItem(
        "messages",
        JSON.stringify({ ...messages, [messageKey]: newMessage })
      );
    },
    [messages]
  );

  // Effet secondaire pour sauvegarder les numéros sélectionnés dans le stockage local
  useEffect(() => {
    if (selectedNumbers.length > 0) {
      localStorage.setItem("selectedNumbers", JSON.stringify(selectedNumbers));
    }
  }, [selectedNumbers]);

  // Fonction de sélection/désélection d'un numéro
  const selectNumber = (number) => {
    if (!isDraw && !selectionLocked) {
      if (selectedNumbers.includes(number)) {
        // Désélectionne le numéro
        const updatedNumbers = selectedNumbers.filter(
          (selected) => selected !== number
        );
        setSelectedNumbers(updatedNumbers);
        updateMessage("lotoMessage1", "");
      } else if (selectedNumbers.length < 6) {
          // Sélectionne le numéro si moins de 6 numéros sont déjà sélectionnés
        setSelectedNumbers([...selectedNumbers, number]);
        updateMessage("lotoMessage1", "");
      }
    }
  };

 // Effet secondaire pour gérer le message de gagné avec la correspondance
  useEffect(() => {
    // Initialisation du compteur de numéros correspondants
    let matchingNumbers = 0;
    selectedNumbers.forEach((number) => {
      // Vérification si le numéro sélectionné est présent dans les numéros tirés
      if (drawnNumbers.includes(number)) {
        matchingNumbers++;
      }
    });
    if (!isDraw && dailyDrawCount <= 3) {
      setResult(matchingNumbers);
      if (matchingNumbers >= 3) {
        setIsDraw(true);
        setSelectionLocked(true);
        updateMessage(
          "lotoMessage2",
          `Bravo ! Vous venez de gagner avec ${matchingNumbers} numéros.`
        );
        localStorage.setItem(
          "result",
          "gagné " + `${matchingNumbers}` + " numéros"
        );
      }
      if (dailyDrawCount > 0) {
        localStorage.setItem("resultcorres", matchingNumbers.toString());
        localStorage.setItem(
          "result",
          "perdu " + `${dailyDrawCount + 0}` + "x"
        );
      }
    }
  }, [dailyDrawCount, drawnNumbers, selectedNumbers, isDraw, updateMessage]);

// Effet secondaire pour ajuster la largeur du conteneur de la grille en fonction des numéros sélectionnés
  useEffect(() => {
    if (containerRef.current) {
      const containerWidth = 34 + selectedNumbers.length * 34;
      containerRef.current.style.width = `${containerWidth}px`;
    }
  }, [selectedNumbers]);

  /////////////////////////////////  Gestion countdown /////////////////////////
// Fonction pour calculer le temps écoulé depuis le dernier tirage
  const calculateTimeElapsed = useCallback(() => {
    const savedLastDrawTime = parseInt(localStorage.getItem("lastDrawTime"));
    const currentTime = Date.now();
    const TWO_MINUTES = 0.2 * 60 * 1000;
    const timeElapsed = currentTime - savedLastDrawTime;
    const remainingTime = TWO_MINUTES - timeElapsed;
    let hoursRemaining = Math.floor(remainingTime / (1000 * 60 * 60)); // Calcul des heures restantes
    let minutesRemaining = Math.floor(
      (remainingTime % (1000 * 60 * 60)) / (1000 * 60)
    ); // Calcul des minutes restantes
    const secondsRemaining = Math.floor((remainingTime % (1000 * 60)) / 1000); // Calcul des secondes restantes

    // Si on a 60 minutes, cela signifie qu'une heure entière est complète
    if (minutesRemaining === 60) {
      minutesRemaining = 0;
      hoursRemaining += 1;
    }
    /// Formater les minutes/secondes avec un zéro devant si besoin ///
    const formattedMinutes =
      minutesRemaining < 10
        ? `0${minutesRemaining}`
        : minutesRemaining.toString();
    const formattedSeconds =
      secondsRemaining < 10
        ? `0${secondsRemaining}`
        : secondsRemaining.toString();
    ////////////////////// fin formatter //////////////////////////////
    return {
      savedLastDrawTime,
      currentTime,
      TWO_MINUTES,
      timeElapsed,
      remainingTime,
      hoursRemaining,
      minutesRemaining,
      formattedMinutes,
      secondsRemaining,
      formattedSeconds,
    };
  }, []);
  ////////////////////////////// End gestion countdown ////////////////

// Fonction de tirage des numéros
  const drawNumbers = () => {
    if (!isDraw && dailyDrawCount <= 3) {
      // Vérification du nombre de numéros sélectionnés
      const missingNumbers = 6 - selectedNumbers.length;
      if (missingNumbers > 0) {
        // Affiche un message si des numéros manquent
        updateMessage(
          "lotoMessage1",
          `Veuillez sélectionner ${missingNumbers} numéro(s) de plus.`
        );
        return;
      }

      setSelectionLocked(true);

      // randomisation de numbers dans le tirage
      const numbers = [];
      while (numbers.length !== 6) {
        const randomNumber = Math.floor(Math.random() * 28) + 1;
        if (!numbers.includes(randomNumber)) {
          numbers.push(randomNumber);
        }
      }

      setDrawnNumbers(numbers);
      localStorage.setItem("lastDrawNumbers", JSON.stringify(numbers));

      const updatedDailyDrawCount = dailyDrawCount + 1;
      if (dailyDrawCount < 3) {
        setDailyDrawCount(updatedDailyDrawCount);
        localStorage.setItem("dailyDrawCount", updatedDailyDrawCount);
      }

      const { currentTime } = calculateTimeElapsed();
      localStorage.setItem("lastDrawTime", currentTime.toString());
    }
  };

 // Effet secondaire pour gérer le message "revenir plus tard"
  useEffect(() => {
    if (dailyDrawCount === 3 && result < 3) {
      setIsDraw(true);
      const updateMessageInterval = setInterval(() => {
        const {
          remainingTime,
          hoursRemaining,
          formattedMinutes,
          secondsRemaining,
          formattedSeconds,
        } = calculateTimeElapsed();
        const threshold = 1000;
        updateMessage(
          "lotoMessage3",
          `Vous venez d'effectuer vos 3 tirages. Vous devez attendre ${hoursRemaining}H\u00A0${formattedMinutes}Minutes\u00A0${formattedSeconds}S pour retenter votre chance.`
        );

        if (
          hoursRemaining <= 0 &&
          formattedMinutes <= 0 &&
          secondsRemaining <= 0
        ) {
          clearInterval(updateMessageInterval);
        }
        if (remainingTime <= threshold) {
          updateMessage("lotoMessage3", "");
          resetStorage();
          setSelectedNumbers([]);
          setDrawnNumbers([]);
          setSelectionLocked(false);
          setDailyDrawCount(null);
          setIsDraw(false);
        }
      }, 1000);
      return () => clearInterval(updateMessageInterval);
    }
  }, [dailyDrawCount, result, calculateTimeElapsed, updateMessage]);

  // Effet secondaire pour récupérer les éléments du stockage local au chargement de la page
  useEffect(() => {
    const savedSelectedNumbers = JSON.parse(
      localStorage.getItem("selectedNumbers")
    );

    const savedDailyDrawCount = parseInt(
      localStorage.getItem("dailyDrawCount")
    );

    const savedResultcorres = parseInt(localStorage.getItem("resultcorres"));

    const savedResult = parseInt(localStorage.getItem("result"));

    const savedMessages = JSON.parse(localStorage.getItem("messages"));

    const savedLastDrawNumbers = JSON.parse(
      localStorage.getItem("lastDrawNumbers")
    );

    if (savedSelectedNumbers) {
      setSelectedNumbers(savedSelectedNumbers);
    }

    if (!isNaN(savedDailyDrawCount)) {
      setDailyDrawCount(savedDailyDrawCount);
    }

    if (!isNaN(savedResultcorres)) {
      setResult(savedResultcorres);
    }

    if (savedLastDrawNumbers) {
      setDrawnNumbers(savedLastDrawNumbers);
    }

    if (savedResult) {
      setResult(savedResult);
    }

    if (savedMessages) {
      setMessages(savedMessages);
    }
  }, []);

  return (
    <div className={styles["loto-container"]}>
      {Object.entries(messages).map(([key, value]) => (
        <div
          key={key}
          className={`${styles["loto-message-container"]} ${
            value ? styles["fade-in-message"] : ""
          }`}
        >
          {value && <div className={styles["loto-message"]}   style={{
          background: theme.background2,
        }}>{value}</div>}
        </div>
      ))}
      <Image
        priority={true}
        as="image"
        src="/images/lotoGame.png"
        alt="loto game"
        className={styles.lotoBg}
        width={693}
        height={693}
      />
      <h2 className={`${styles.titlegameloto} ${Montserratfont.className}`}>
        Loto Système 6/28
      </h2>
      <div className={styles["wrapper-descript-lotosystem"]}>
        <h3>Joue à notre super loto et gagne ...</h3>
        <div className={styles["title-reglement"]}>
          <h4>Règlement:</h4>
          <p className={styles["reglement-text"]}>
            Selectionne 6 numéros, 3 tirages. Tu gagnes, envoie tes coordonnées.
            Tu perds, tu devras attendre 24 heures pour pouvoir rejouer. eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut
          </p>
        </div>
        <div className={styles["lottery-winnings"]}>
          <ul>
            <li>
              3 bons numéros ...
              <span className={styles.winning}>1 semaine d&#39;abonnement</span>
            </li>
            <li>
              4 bons numéros ...
              <span className={styles.winning}>1 mois d&#39;abonnement</span>
            </li>
            <li>
              5 bons numéros ...
              <span className={styles.winning}>6 mois d&#39;abonnement</span>
            </li>
            <li>
              6 bons numéros ...
              <span className={styles.winning}>1 an d&#39;abonnement</span>
            </li>
          </ul>
        </div>
        <h3 className={styles.titlematchresult}>
          Vous avez
          <span className={styles["result-correspondance"]}>{result}</span>
          bon numéro(s)
        </h3>
        {/* <Link
          href="/pages/reglement#loto"
          as="/pages/reglement#loto"
          passHref
          className={styles.linkReglement}
        >
          Règlement du jeu 👉
        </Link> */}
        <button className={styles.linkReglement} onClick={() => setModalOpen(true)}  style={{
            color: theme.color4,
          }}>Règlement du jeu 👉</button>
      </div>
      <ModaleReglementGames isOpen={modalOpen} onClose={() => setModalOpen(false)} gameType="loto" />
      <div className={styles["wrapper-lotogame"]}>
        <div>
          <h3>Votre sélection :</h3>
          <div className={styles["numberselect-container"]} ref={containerRef}>
            {selectedNumbers.length === 0 ? (
              <Image
                priority={true}
                as="image"
                src="/images/lotoBowl.png"
                alt="Image alternative"
                className={styles.lotoBowl}
                width={34}
                height={34}
              />
            ) : (
              ""
            )}
            {selectedNumbers.map((number) => (
              <span className={styles.numberselect} key={number}>
                {number}
              </span>
            ))}
          </div>
        </div>
        <div className={styles["wrapper-grid"]}>
          <h3 className={styles.selectnumbertitle}>
            Sélectionnez 6 numéros dans la grille
          </h3>
          <div className={styles["numberloto-container"]}>
            <div className={styles.blocknumbers}>
              {[...Array(28).keys()].map((number) => (
                <span
                  className={styles.spannumberloto}
                  key={number + 1}
                  onClick={() => selectNumber(number + 1)}
                  style={{
                    cursor:
                      selectedNumbers.length < 6 &&
                      !selectedNumbers.includes(number + 1)
                        ? "pointer"
                        : "not-allowed",
                    opacity: selectedNumbers.includes(number + 1) ? 0.9 : 1,
                    backgroundColor: selectedNumbers.includes(number + 1)
                      ? "#666666"
                      : "",
                    color: selectedNumbers.includes(number + 1)
                      ? "aquamarine"
                      : "",
                    border: selectedNumbers.includes(number + 1)
                      ? "2px solid #2c75ff"
                      : "",
                    boxShadow: selectedNumbers.includes(number + 1)
                      ? "inset -1px 2px 6px aquamarine"
                      : "",
                    textShadow: selectedNumbers.includes(number + 1)
                      ? " -1px 2px 2px #333333"
                      : "",
                  }}
                >
                  {number + 1}
                </span>
              ))}
            </div>
          </div>
        </div>
        <button
          className={styles.btntirage}
          onClick={drawNumbers}
          disabled={isDraw}
        >
          Tirage
        </button>
        <div className={styles["tirage-container"]}>
          <h3 className={styles.resulttitle}>Résultat du tirage :</h3>
          <div className={styles.resulttirage}>
            {drawnNumbers.map((number, index) => (
              <span
                className={styles.numloto}
                key={number}
                style={{ animationDelay: `${index * 0.5}s` }}
              >
                {number}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LotoSystem;
