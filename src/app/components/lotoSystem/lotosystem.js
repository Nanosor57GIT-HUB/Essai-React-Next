import React, { useState, useEffect, useRef } from "react";
import { Montserratfont } from "@/app/styles/style.font";
import { useCallback } from "react";

// JSON.parse convertit en chaine de caractère dans un objet(tableau) pour le récupérrer avec getItem.
// parseInt  analyse une chaine de caractère et récupère un nombre entier avec getItem.
// parseFloat est utilisé pour les nombres à virgule (de la meme façon que parseInt).
// localStorage.setItem('selectedNumbers', JSON.stringify(selectedNumbers)); Convertit en chaines de caractères pour envoyer dans le storage

const LotoSystem = () => {
  const [showEmoji, setShowEmoji] = useState(true);
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [selectionLocked, setSelectionLocked] = useState(false);
  const containerRef = useRef(null);
  const [drawnNumbers, setDrawnNumbers] = useState([]);
  const [result, setResult] = useState(0);
  const [dailyDrawCount, setDailyDrawCount] = useState(null);
  const [isDraw, setIsDraw] = useState(false);
  const [messages, setMessages] = useState({
    lotoMessage1: "",
    lotoMessage2: "",
    lotoMessage3: "",
  });
  //  const [resetLastDrawTime, setResetLastDrawTime] = useState(false);

  const resetStorage = () => {
    setResult(0);
    setSelectedNumbers([]);
    setMessages([]);
    setDailyDrawCount(null);
    setDrawnNumbers([]);
    localStorage.removeItem("selectedNumbers", "");
    localStorage.removeItem("dailyDrawCount");
    localStorage.removeItem("lastDrawNumbers");
    localStorage.removeItem("resultcorres");
    localStorage.removeItem("lastDrawTime");
    localStorage.removeItem("result");
    localStorage.removeItem("messages");
  };

  // Mise à jour des messages dans le storage
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
    [messages, setMessages]
  );

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

    const LastDrawTime = parseInt(localStorage.getItem("lastDrawTime"));
    console.log(LastDrawTime);

    if (savedSelectedNumbers) {
      setSelectedNumbers(savedSelectedNumbers);
    }

    if (!isNaN(savedDailyDrawCount)) {
      setDailyDrawCount(savedDailyDrawCount);
    }

    if (savedResultcorres) {
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

  const winnerCount = () => {
    let count = 0;
    selectedNumbers.forEach((number) => {
      if (drawnNumbers.includes(number)) {
        count++;
      }
    });
    if (count >= 2) {
      setIsDraw(true);
      setResult(`${count}`);
      updateMessage(
        "lotoMessage3",
        `Bravo ! Vous venez de gagner avec ${count} numéros.`
      );
      localStorage.setItem("result", "gagné " + `${count}` + " numéros");
    } else {
      setResult(`${count}`);
      localStorage.setItem("result", "perdu " + `${dailyDrawCount + 1}` + "x");
    }
    localStorage.setItem("resultcorres", count);
    return count;
  };

  useEffect(() => {
    if (selectedNumbers.length > 0) {
      localStorage.setItem("selectedNumbers", JSON.stringify(selectedNumbers));
    }
  }, [selectedNumbers]);

  const selectNumber = (number) => {
    if (!isDraw && !selectionLocked) {
      if (selectedNumbers.includes(number)) {
        const updatedNumbers = selectedNumbers.filter(
          (selected) => selected !== number
        );
        setSelectedNumbers(updatedNumbers);
        updateMessage("lotoMessage1", "");
      } else if (selectedNumbers.length < 6) {
        setSelectedNumbers([...selectedNumbers, number]);
        updateMessage("lotoMessage1", "");
      }
    }
    setShowEmoji(false);
  };

  useEffect(() => {
    if (containerRef.current) {
      const containerWidth = 34 + selectedNumbers.length * 34;
      containerRef.current.style.width = `${containerWidth}px`;
    }
  }, [selectedNumbers]);

  /////////////////////////////////  Gestion time /////////////////////////
  const calculateTimeElapsed = useCallback(() => {
    const savedLastDrawTime = parseInt(localStorage.getItem("lastDrawTime"));
    const currentTime = Date.now();
    const TWO_MINUTES = 1 * 60 * 1000;
    const timeElapsed = currentTime - savedLastDrawTime;
    console.log("timeelapsed test", timeElapsed);
    const remainingTime = TWO_MINUTES - timeElapsed;

    let hoursRemaining = Math.floor(remainingTime / (1000 * 60 * 60)); // Calcul des heures restantes
    let minutesRemaining = Math.floor(
      (remainingTime % (1000 * 60 * 60)) / (1000 * 60)
    ); // Calcul des minutes restantes
    let secondsRemaining = Math.floor((remainingTime % (1000 * 60)) / 1000); // Calcul des secondes restantes

    console.log("secondreaminning:", secondsRemaining);
    console.log("remainingTime:", remainingTime);
    console.log("hoursRemaining:", hoursRemaining);
    console.log("minutesRemaining:", minutesRemaining);

    // Si on a 60 minutes, cela signifie qu'une heure entière est complète
    if (minutesRemaining === 60) {
      minutesRemaining = 0;
      hoursRemaining += 1;
    }

    // Formater les minutes avec un zéro devant si nécessaire
    const formattedMinutes =
      minutesRemaining < 10
        ? `0${minutesRemaining}`
        : minutesRemaining.toString();
    const formattedSeconds =
      secondsRemaining < 10
        ? `0${secondsRemaining}`
        : secondsRemaining.toString();

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
  ////////////////////////////// End gestion time ////////////////

  // Vérification et conditions pour executer le tirage //
  const drawNumbers = () => {
    if (!isDraw && dailyDrawCount < 3) {
      // Vérification du nombre de numéros sélectionnés
      const missingNumbers = 6 - selectedNumbers.length;
      if (missingNumbers > 0) {
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

      winnerCount();

      const updatedDailyDrawCount = dailyDrawCount + 1;

      if (dailyDrawCount < 3) {
        setDailyDrawCount(updatedDailyDrawCount);
        localStorage.setItem("dailyDrawCount", updatedDailyDrawCount);
      }

      const count = winnerCount();

      const { currentTime } = calculateTimeElapsed();
      localStorage.setItem("lastDrawTime", currentTime.toString());

      if (updatedDailyDrawCount === 3) {
        setIsDraw(true);
        if (count < 2) {
          updateMessage("lotoMessage2", "");
        } else {
          const updateMessageInterval = setInterval(() => {
            const {
              hoursRemaining,
              formattedMinutes,
              secondsRemaining,
              formattedSeconds,
            } = calculateTimeElapsed();
            updateMessage(
              "lotoMessage2",
              `Vous venez d'effectuer vos 3 tirages. Vous devez attendre ${hoursRemaining}H\u00A0${formattedMinutes}Minutes\u00A0${formattedSeconds}S pour retenter votre chance.`
            );
            if (
              hoursRemaining <= 0 &&
              formattedMinutes <= 0 &&
              secondsRemaining <= 0
            ) {
              clearInterval(updateMessageInterval);
            }
          }, 1000);
          return () => clearInterval(updateMessageInterval);
        }
      }
    }
  };

  // useEffect(() => {
  //   const savedLastDrawTime = parseInt(localStorage.getItem("lastDrawTime"));
  //   if (!isNaN(savedLastDrawTime)) {
  //     const updateMessageInterval = setInterval(() => {
  //       const { hoursRemaining, formattedMinutes, secondsRemaining, formattedSeconds } = calculateTimeElapsed();
  //       updateMessage(
  //         "lotoMessage2",
  //         `Vous venez d'effectuer vos 3 tirages. Vous devez attendre ${hoursRemaining}H\u00A0${formattedMinutes}Minutes\u00A0${formattedSeconds}S pour retenter votre chance.`
  //       );
  //       if (hoursRemaining <= 0 && formattedMinutes <= 0 && secondsRemaining <= 0) {
  //         clearInterval(updateMessageInterval);
  //       }
  //       localStorage.setItem("timeElapsed", timeElapsed.toString());
  //     }, 1000);
  //     return () => clearInterval(updateMessageInterval);
  //   }
  // }, [updateMessage, calculateTimeElapsed]);
  

  useEffect(() => {
    const { remainingTime } = calculateTimeElapsed();
    const threshold = 1000;
    if (remainingTime <= threshold) {
      setSelectionLocked(true);
      // const messageTimeout = setTimeout(() => {
      resetStorage();
      setSelectionLocked(false);
      setIsDraw(false);
      // }, remainingTime);
      // return () => clearTimeout(messageTimeout);
    }
  }, [updateMessage, calculateTimeElapsed]);

  return (
    <div className="loto-container">
      {Object.entries(messages).map(([key, value]) => (
        <div
          key={key}
          className={`loto-message-container ${value ? "fade-in-message" : ""}`}
        >
          {value && <div className="loto-message">{value}</div>}
        </div>
      ))}
      <h2 className={`titlegameloto ${Montserratfont.className}`}>
        Loto Système 6/28
      </h2>
      <div className="wrapper-descript-lotosystem">
        <h3>Joue à notre super loto et gagne ...</h3>
        <div className="title-reglement">
          <h4>Règlement:</h4>
          <p className="reglement-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
        <div className="lottery-winnings">
          <ul>
            <li>
              4 bons numéros ...
              <span className="winning">1 mois d&#39;abonnement</span>
            </li>
            <li>
              5 bons numéros ...
              <span className="winning">6 mois d&#39;abonnement</span>
            </li>
            <li>
              6 bons numéros ...
              <span className="winning">1 an d&#39;abonnement</span>
            </li>
          </ul>
        </div>
        <h3 className="titlematchresult">
          Vous avez
          <span className="result-correspondence">{result}</span>
          bon numéro(s)
        </h3>
      </div>
      <div className="wrapper-lotogame">
        <div>
          <h2>Votre sélection :</h2>
          <div className="numberselect-container" ref={containerRef}>
            {selectedNumbers.length === 0 ? "👍" : ""}
            {selectedNumbers.map((number) => (
              <span className="numberselect" key={number}>
                {number}
              </span>
            ))}
          </div>
        </div>
        <div className="wrapper-grid">
          <h2 className="selectnumbertitle">
            Sélectionnez 6 numéros dans la grille
          </h2>
          <div className="numberloto-container">
            <div className="numberstotal">
              {[...Array(28).keys()].map((number) => (
                <span
                  className="spannumberloto"
                  key={number + 1}
                  onClick={() => selectNumber(number + 1)}
                  style={{
                    cursor:
                      selectedNumbers.length < 6 &&
                      !selectedNumbers.includes(number + 1)
                        ? "pointer"
                        : "not-allowed",
                    opacity: selectedNumbers.includes(number + 1) ? 0.7 : 1,
                    backgroundColor: selectedNumbers.includes(number + 1)
                      ? "yellowgreen"
                      : "",
                    border: selectedNumbers.includes(number + 1)
                      ? "2px solid #2c75ff"
                      : "",
                  }}
                >
                  {number + 1}
                </span>
              ))}
            </div>
          </div>
        </div>
        <button className="btntirage" onClick={drawNumbers} disabled={isDraw}>
          Tirage
        </button>
        <div className="tirage-container">
          <h2 className="resulttitle">Résultat du tirage :</h2>
          <div className="resulttirage">
            {drawnNumbers.map((number, index) => (
              <span
                className="numloto"
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
