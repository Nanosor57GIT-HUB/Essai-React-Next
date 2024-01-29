"use client";

import { useTheme } from "@/app/context/themecontext";
import React, { useEffect, useState } from "react";
import ModaleReglementGames from "../modaleReglementGames";
import styles from "@/app/styles/threeshellgame.module.css"
import { Montserratfont } from "@/app/styles/style.font";
import Coin from "./coinWin";
import CoinsExtraWin from "./coinExtraWin";
import Image from "next/image";
import FormBonneteau from "./formbonneteau";
import Link from "next/link";

const Bonneteau = () => {
  const { theme } = useTheme();

  const [modalOpen, setModalOpen] = useState(false);

  // Les données des gobelets.
  const gobelets = [
    {
      id: 1,
      imageSrc: "/images/gobelet-argenté.png",
      position: "Perdu1",
      gobeletId: 1,
    },
    {
      id: 2,
      imageSrc: "/images/gobelet-argenté.png",
      position: "Gagné",
      gobeletId: 2,
    },
    {
      id: 3,
      imageSrc: "/images/gobelet-argenté.png",
      position: "Perdu2",
      gobeletId: 3,
    },
  ];

  // Les données des boutons.
  const buttonsData = [
    {
      id: 1,
      position: "Perdu1",
      imageSrc: "",
      buttonId: 1,
    },
    {
      id: 2,
      position: "Gagné",
      imageSrc: "/images/Sphere2.png",
      buttonId: 2,
    },
    { id: 3, position: "Perdu2", imageSrc: "", buttonId: 3 },
  ];

  // Correspondance des gobelets et des boutons.
  const gameItems = [
    { buttonId: 1, gobeletId: 1 },
    { buttonId: 2, gobeletId: 2 },
    { buttonId: 3, gobeletId: 3 },
  ];

  // État pour l'ordre actuel des boutons.
  const [arrayOrder, setArrayOrder] = useState([0, 1, 2]);
  // État pour la gestion de l'animation des gobelets.
  const [positionGobelets, setPositionGobelets] = useState(false);
  // État pour la gestion sur la position finale des gobelets avant le mélange.
  const [gobeletFinale, setGobeletFinale] = useState(false);
  // État d'initialisation du jeu au lancement du jeu.
  const [initGame, setInitGame] = useState(false);
  // État pour suivre si le jeu est en cours.
  const [isPlaying, setIsPlaying] = useState(false);
  // État pour suivre l'index du bouton gagnant.
  const [winnerId, setWinnerId] = useState(null);
  // État pour suivre le gobelet cliqué.
  const [gobeletClicked, setGobeletClicked] = useState(false);
  // État pour suivre le nombre de victoires.
  const [winCount, setWinCount] = useState(getWinCount());
  // État pour déterminer si c'est "coin" ou "extrawin".
  const [animationType, setAnimationType] = useState("win");
  // État pour la gestion de la chute des pièces.
  const [displayFallingCoins, setDisplayFallingCoins] = useState(false);
  // État pour la gestion du bouton qui lance le jeu.
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  // État pour la gestion d'ouverture de la modal.
  const [showModal, setShowModal] = useState(false);
  // État pour la gestion du message si le joueur à déjà gagné.
  const [victoryMessage, setVictoryMessage] = useState("");

  // Effet pour vérifier l'état "gagné" du jeu depuis le localStorage.
  useEffect(() => {
    const savedResult = localStorage.getItem("bonneteauResult");
    if (savedResult === "Youpi !" || savedResult === "SuperWinner !") {
      setIsPlaying(false);
    }
  }, []);

  // Effet qui gère le mélange des boutons pendant le jeu.
  useEffect(() => {
    if (isPlaying) {
      setIsButtonDisabled(true); // Désactive le bouton "play game" pendant le mélange.

      // Interval entre chaque itération pour le mélange.
      const animationInterval = setInterval(() => {
        const newOrder = shuffleArray(arrayOrder);
      //  console.log(arrayOrder);
        setArrayOrder(newOrder);
      //  console.log(newOrder);
      }, 1000);
      return () => {
        clearInterval(animationInterval);
        setIsButtonDisabled(false); // Réactivation du bouton après le mélange.
      };
    }
  }, [isPlaying, arrayOrder, winnerId]);

  // Mise à jour de la fonction handleGobeletClick (gobelet cliqué).
  function handleGobeletClick(index, gobeletId) {
    if (initGame) {
      if (!isPlaying) {
        const updatedGobeletClicked = [gobeletClicked];
        updatedGobeletClicked[index] = true;
        setGobeletClicked(updatedGobeletClicked);

        if (gobeletId === winnerId) {
          // Logique de victoire.
          checkResult(gobeletId);
        } else {
          // Logique de défaite.
          setInitGame(true);
          console.log(initGame);
        }
      }
    }
  }

  // Fonction pour démarrer un nouveau jeu.
  function startGame() {
    if (!isPlaying) {
       setGobeletClicked(false)
      setIsButtonDisabled(true);
      setPositionGobelets(true);
      setWinnerId(2);
      setInitGame(true);

      // Délai avant de déclencher le mélange.
      setTimeout(() => {
        setPositionGobelets(false);
        setGobeletFinale(true);
        setIsPlaying(true);
        setGobeletClicked(false)

        // Après un certain délai, durée du mélange.
        setTimeout(() => {     
          setIsPlaying(false);
        }, 10000); // Durée de 3 secondes pour le mélange.
      }, 2000); // 2 secondes de délai avant le mélange.
    }
  }

  // Fonction pour démarrer un nouveau jeu.
  function nextRound() {
    if (!isPlaying) {
      setIsButtonDisabled(true); // Désactive le bouton "Play Game".

      // Délai avant de déclencher le mélange.
      setTimeout(() => {
        setIsPlaying(true);
        setGobeletClicked(false)

        // Après un certain délai, durée du mélange.
        setTimeout(() => {        
          setIsPlaying(false);
        }, 10000); // Durée de 3 secondes pour le mélange.
      }, 500); // 1/2 secondes de délai avant le mélange.
    }
  }

  // Fonction pour mélanger un tableau.
  function shuffleArray(array) {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  }

  // Fonction pour démarrer l'animation des pièces tombantes.
  function createFallingCoins() {
    setDisplayFallingCoins(true);
    // Réinitialisez l'état après la durée de l'animation.
    setTimeout(() => {
      setDisplayFallingCoins(false);
    }, 10000); // 10 secondes (durée de l'animation)
  }

  // Fonction pour obtenir le nombre de fois gagné depuis la session storage.
  function getWinCount() {
    if (typeof sessionStorage !== "undefined") {
      const count = sessionStorage.getItem("bonneteauWinCount");
      return count ? parseInt(count, 10) : 0;
    }
  }

  // Effet pour initialiser le nombre de victoires depuis le sessionStorage
  useEffect(() => {
    const savedWinCount = parseInt(
      sessionStorage.getItem("bonneteauWinCount"),
      10
    );
    if (!isNaN(savedWinCount)) {
      setWinCount(savedWinCount);
    }
  }, []);

  // Effet qui s'exécute lorsque le nombre de victoires change.
  useEffect(() => {
    if (winCount >= 2 && winCount % 3 === 0) {
      setAnimationType("extrawin");
      localStorage.setItem("bonneteauResult", "SuperWinner !");
      sessionStorage.setItem("bonneteauWinCount", "0");
    } else {
      setAnimationType("win");
    }
  }, [winCount]);

  // Fonction pour vérifier le résultat lorsque le joueur clique sur un gobelet.
  function checkResult(index) {
    if (initGame) {
      const matchingItem = gameItems.find((item) => item.buttonId === index);
      if (matchingItem && matchingItem.gobeletId === winnerId) {
        setShowModal(true);
        // Incrémente le nombre de victoires
        const newWinCount = winCount + 1;
        setWinCount(newWinCount);

        // Et met à jour le localStorage en fonction de la condition.
        if (newWinCount >= 2 && newWinCount % 3 === 0) {
          localStorage.setItem("bonneteauResult", "SuperWinner !");
          sessionStorage.setItem("bonneteauWinCount", "0");
        } else {
          localStorage.setItem("bonneteauResult", "Youpi !");
        }
        // Sauvegardez le nombre de victoires dans le sessionStorage
        sessionStorage.setItem("bonneteauWinCount", newWinCount.toString());

        setIsPlaying(false);

        setIsButtonDisabled(true); // désactive la possibilité de rejouer si gagné

        createFallingCoins();
      } else {
        return;
      }
    }
  }

  useEffect(() => {
    // Vérifiez si le jeu est en cours ou s'il y a un résultat précédent dans le localStorage.
    const previousResult = localStorage.getItem("bonneteauResult");
    if (previousResult === "Youpi !" || previousResult === "SuperWinner !") {
      // Si l'utilisateur a déjà gagné, retourne un message
      setVictoryMessage("Vous avez déjà joué ...");
      // Désactive le bouton
      setIsButtonDisabled(true);
    }
  }, [isPlaying]);


  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setShowModal(true);
  //   }, 1000); // Délai en millisecondes, ajustez-le selon vos besoins

  //   return () => clearTimeout(timer); // Nettoie le timer si le composant est démonté avant la fin du délai
  // }, []); // Le tableau vide [] assure que cet effet est exécuté uniquement après le montage initial du composant

  // Fonction pour fermer la modal
  const closeModal = () => {
    setShowModal(false);
  };

   return ( 
   <div className={styles['wrapper-bonneteau']}> 
    <div className={styles.blockbonneteau}>
      <div className={styles.emptybonneteau}></div>
      <div className={styles.containerbonneteau}>
        <h2 className={`${styles.titlegamebonneteau} ${Montserratfont.className}`}>
          Three-Shell Game 333
        </h2>
        <p className={styles.alertevictory} style={{ color: theme.color2 }}>
          {victoryMessage}
        </p>
        <div className={styles['block-button']}>
          <div className={styles['gobelet-container']}>
            {arrayOrder.map((index, idx) => (
            <div
            key={gobelets[index].id}
            className={`${styles.gobelets} ${styles['gobelet-' + gobelets[index].position]}
            ${
              positionGobelets ? `${styles['gobelets' + (index + 1) + '-animated']}` : ""
            }            
             ${gobeletFinale ? `${styles['gobelets' + (idx + 1) + '-positionFinale']}` : ""} 
            ${gobeletClicked[index] ? `${styles['gobelet-clicked' + (idx + 1)]}` : ""}`}
            onClick={() => {
              handleGobeletClick(index, gobelets[index].gobeletId);
            }}
          >
                {gobelets[index].imageSrc && (
                  <Image
                  priority={true}
                  as="image"
                  src={gobelets[index].imageSrc}
                  className={`${styles.gobelets} ${styles['gobelet-' + gobelets[index].position]}`}
                  alt="Gobelets du jeu"
                  width={1200}
                  height={1500}
                />
                
                )}
                <span className={styles.testgobelet}>{gobelets[index].position}</span>
              </div>
            ))}
          </div>

          <div className={styles['button-container']}>
            {arrayOrder.map((index) => (
              <button key={buttonsData[index].id} className={styles['winner-button']}>
                {buttonsData[index].imageSrc && (
                  <Image
                    src={buttonsData[index].imageSrc}
                    as="image"
                    alt="Boule gagnante"
                    width={1200}
                    height={1500}
                    className={styles['winner-button-img']}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.containerbtnplaygame}>
          <button
            className={styles.btngame2}
            onClick={nextRound}
            disabled={isButtonDisabled}
            style={{ opacity: isButtonDisabled ? 0.2 : 1 }}
          >
            {isPlaying ? "Blend..." : "Play Game"}
          </button>

          {!isPlaying && !localStorage.getItem("bonneteauResult") && (
            <button
              onClick={startGame}
              disabled={isButtonDisabled}
              className={styles.btngame}
              style={{ display: initGame ? "none" : "block" }}
            >
              {isPlaying ? "Blend..." : "Play Game"}
            </button>
          )}
        </div>
        <div
          className={`${styles['coin-container']} ${displayFallingCoins ? "visible" : ""}`}
        >
          {displayFallingCoins &&
            // 5 rangées de pièces
            Array.from({ length: 5 }).map((_, rowIndex) => (
              <div key={rowIndex} className='coin-row'>
                {/* contiennent chacune 8 pièces */}
                {Array.from({ length: 8 }).map((_, index) => (
                  <div key={`coin-${rowIndex}-${index}`} className='coin'>
                    {animationType === "extrawin" ? (
                      // Initialisation avec personnalisation du comportement en fonction de la position de la pièce dans la grille.
                      <CoinsExtraWin
                        key={`coin-${rowIndex}-${index}`}
                        index={index}
                        rowIndex={rowIndex}
                      />
                    ) : (
                      <Coin
                        key={`coin-${rowIndex}-${index}`}
                        index={index}
                        rowIndex={rowIndex}
                      />
                    )}
                  </div>
                ))}
              </div>
            ))}
        </div>
      </div>
      <div className={styles.blockdescriptiongame}>
        <h3>C&#39;est ton jour de chance !!!</h3>
        <h4>T&#39;es en veine, joue et tente de gagner un cadeau.</h4>
        <p>
          - Click sur le bouton &quot;Play game&quot;. Après le mélange, trouve
          la boule en cliquant sur un gobelet.  Tu as
          3 chances de gagner un lot. Mais ce n&#39;est pas tout. 1 gagnant sur trois aura la change d&#39;avoir un gros lot. Joue, Gagne
          et renvoie moi le formulaire. Après vérification, tu recevras un
          courriel indiquant les modalités de ton cadeau.
        </p>
        {/* <Link
          href="/pages/reglement#threeShell"
          as="/pages/reglement#threeShell"
          passHref
          className={styles.linkReglement}
          style={{
            color: theme.color4,
          }}
        >Règlement du jeu 👉</Link> */}
         <button className={styles.linkReglement} onClick={() => setModalOpen(true)}  style={{
            color: theme.color4,
          }}>Règlement du jeu 👉</button>
      </div>
      <ModaleReglementGames isOpen={modalOpen} onClose={() => setModalOpen(false)} gameType="bonneteau" />
      <FormBonneteau show={showModal} onClose={closeModal} />
    </div>
    </div>
  );
};

export default Bonneteau;
