"use client";

import { useTheme } from "@/app/context/themecontext";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Coin from "./coinWin";
import CoinsExtraWin from "./coinExtraWin";
import Image from "next/image";
import { Montserratfont } from "@/app/style.font";



const Bonneteau = () => { 
  const { theme } = useTheme();

  const gobelets = [
    { id: 1, position: "Perdu", gobeletId: 1 },
    { id: 2, position: "Gagné", gobeletId: 2 },
    { id: 3, position: "Perdu", gobeletId: 3 },
  ];


  // Les données des boutons
  const buttonsData = [
    {
      id: 1, text: "", buttonId: 1},
    { id: 2, imageSrc: "/images/bg-buttons/goldenbackground.webp", text: "Gagné", buttonId: 2 },
    { id: 3, text: "", buttonId: 3 },
  ];

  // const buttonGobeletPairs = [
  //   { buttonId: 1, gobeletId: 1 },
  //   { buttonId: 2, gobeletId: 2 },
  //   { buttonId: 3, gobeletId: 3 },
  // ];

  // État pour l'ordre actuel des boutons
  const [buttonOrder, setButtonOrder] = useState([0, 1, 2]);
// État pour la gestion de l'animation des gobelets
  const [animateGobelets, setAnimateGobelets] = useState(false)
  // État d'initialisation du jeu au lancement du jeu
  const [firstClick, setFirstClick] = useState(false);
  // État pour suivre si le jeu est en cours
  const [isPlaying, setIsPlaying] = useState(false);
  // État pour suivre l'index du bouton gagnant
  const [winnerId, setWinnerId] = useState(null);
    // État pour suivre le nombre de victoires
    const [winCount, setWinCount] = useState(getWinCount());
  // État pour déterminer si c'est "coin" ou "extrawin"
  const [animationType, setAnimationType] = useState("win");
  // État pour la gestion de la chute des pièces
  const [afficherPiecesTombantes, setAfficherPiecesTombantes] = useState(false);
// État pour la gestion du bouton qui lance le jeu
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  // État pour la gestion du message si le joueur à déjà gagné
  const [victoryMessage, setVictoryMessage] = useState("");



// Effet pour vérifier et restaurer l'état gagné du jeu depuis le localStorage
useEffect(() => {
  const savedResult = localStorage.getItem("bonneteauResult");
  if (savedResult === "Youpi !" || savedResult === "SuperWinner !") {
    setIsPlaying(false);
  }
}, []);
  


  // Effet qui gère le mélange des boutons pendant le jeu
  useEffect(() => {
    if (isPlaying) {
      setIsButtonDisabled(true); // Désactive le bouton après le mélange terminé
      // Interval entre chaque itération pour le mélange
      const animationInterval = setInterval(() => {
        const newOrder = shuffleArray(buttonOrder);
        setButtonOrder(newOrder);
      }, 200); // 0.2 secondes

      return () => {
         clearInterval(animationInterval);
        setIsButtonDisabled(false); // Réactiver le bouton après le mélange terminé
      };
    }
  }, [isPlaying, buttonOrder, winnerId]);

  const [gobeletPositions, setGobeletPositions] = useState([
    { x: 0, y: 0, deg: 0 },
    { x: 0, y: 0, deg: 0 },
    { x: 0, y: 0, deg: 0 },
  ]);


  // Fonction pour démarrer un nouveau jeu
  function startGame() {
    if (!isPlaying) {
   
      setAnimateGobelets(true); // Active l'animation des gobelets
     // setIsButtonDisabled(true); // Désactive le bouton "Play Game"
    /******************************** */
    // Mettez à jour les positions finales des gobelets
    const finalPositions = [
      { x: 123, y: 135, deg: 30 },  // Gobelet 1
      { x: 225, y: 135, deg: 30 },  // Gobelet 2
      { x: 328, y: 135, deg: 30 },  // Gobelet 3
    ]
    setGobeletPositions(finalPositions);
    /*************************** */
     // Mélangez les boutons et les gobelets
    const shuffledButtonOrder = shuffleArray(buttonOrder);  
    setButtonOrder(shuffledButtonOrder);

    const shuffledGobelets = shuffleArray(gobelets);
//setGobelets(shuffledGobelets);
console.log(shuffledGobelets);
    // Mélangez également les paires de bouton-gobelet
   // const shuffledPairs = shuffleArray(buttonGobeletPairs);

    // Stockez l'ID du gobelet gagnant
  //const winningPair = shuffledPairs.find((pair) => pair.buttonId === 2);
  //setWinnerId(2);
    
  
      // Délai avant de déclencher le mélange des boutons
      setTimeout(() => {  
  
        // Mélangez le tableau en utilisant l'algorithme de Fisher-Yates
        const shuffledOrder = shuffleArray(buttonOrder, 5);
        setButtonOrder(shuffledOrder); // Mettez à jour le tableau buttonOrder
  //console.log(shuffledOrder); //donne l'ordre du mélange


setAnimateGobelets(false)
 
     // Stockez l'ID du bouton gagnant
setWinnerId(2);

       // Enregistrez d'abord que le jeu est en cours
        setIsPlaying(true); 
  
         // Après un certain délai, terminez le jeu
        setTimeout(() => {
        
          setIsPlaying(false);
        
          setFirstClick(true); // Marquer le premier clic ici
          localStorage.setItem("bonneteauResult", "Game en cours");
         
        }, 3000); // Durée de 3 secondes pour le mélange
      }, 2000); // 2 seconde de délai avant le mélange des boutons
    }
  }
  


  // Fonction pour mélanger un tableau
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



  // Fonction pour démarrer l'animation des pièces tombantes
  function createFallingCoins() {
    setAfficherPiecesTombantes(true);

    // Réinitialisez l'état après la durée de l'animation
    setTimeout(() => {
      setAfficherPiecesTombantes(false);
    }, 10000); // 12 secondes (durée de l'animation)
  }

  // Fonction pour obtenir le nombre de fois gagné depuis la session storage
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



  // Effet qui s'exécute lorsque le nombre de victoires change
  useEffect(() => {
    if (winCount >= 2 && winCount % 3 === 0) {
      setAnimationType("extrawin");
      localStorage.setItem("bonneteauResult", "SuperWinner !");
      sessionStorage.setItem("bonneteauWinCount", "0");
    } else {
      setAnimationType("win");
    }
  }, [winCount]);


  // Fonction pour vérifier le résultat lorsque le joueur clique sur un bouton
  function checkResult(index) {
    if (firstClick) {
      setFirstClick(false); // Bloquer les clics après le premier clic

//       const clickedPair = buttonGobeletPairs.find((pair) => pair.buttonId === index);
     

//       if (clickedPair && clickedPair.gobeletId === winnerId) {
//  console.log(clickedPair.gobeletId);

        setFirstClick(false);   
        // Incrémente le nombre de victoires
        const newWinCount = winCount + 1;
        setWinCount(newWinCount);
         // Et met à jour le localStorage en fonction de la condition
      if (newWinCount >= 2 && newWinCount % 3 === 0) {
        localStorage.setItem("bonneteauResult", "SuperWinner !");
        sessionStorage.setItem("bonneteauWinCount", "0");
      } else {
        localStorage.setItem("bonneteauResult", "Youpi !");
      };
        // Sauvegardez le nombre de victoires dans le sessionStorage
        sessionStorage.setItem("bonneteauWinCount", newWinCount.toString());

      setIsPlaying(false);

        // désactive la possibilité de rejouer si gagné
        setIsButtonDisabled(true);

          createFallingCoins();
          
      // }
    }
  }

useEffect(() => {
  // Vérifiez si le jeu est en cours ou s'il y a un résultat précédent dans le localStorage
  const previousResult = localStorage.getItem("bonneteauResult");
  
  if (previousResult === "Youpi !" || previousResult === "SuperWinner !") {
    // Si l'utilisateur a déjà gagné, retourne un message
    setVictoryMessage("Vous avez déjà gagné !");
    // Désactive le bouton
    setIsButtonDisabled(true);
  }
}, [isPlaying]);
 

return (
  <div className="containerbonneteau">
    <h2 className={`titlegame ${Montserratfont.className}`}>Three-Shell Game</h2>
    <p className="alertevictory" style={{ color: theme.color2 }}>
      {victoryMessage}
    </p>
    <div className="block-button">
    <div className="gobelet-container">
    {buttonOrder.map((index, idx) => (    
     <div
     key={gobelets[index].id}
     className={`gobelet gobelet-${gobelets[index]} ${
       animateGobelets ? `gobelet${idx + 1}-animated` : ""
      } `}
      
     style={{
      transform: `translateX(${gobeletPositions[idx].x}px) translateY(${gobeletPositions[idx].y}px) rotate(${gobeletPositions[idx].deg}deg)`,
    }}
    onClick={() => checkResult(gobelets[index].id)}
   >
    {/*placer dans classename si besoin ${gobelets[index].position === "Perdu" ? "perdu" : "gagne"} */}
        <Image
          src={`/images/gobelet-argenté.png`}
          className={`gobelet gobelet-${gobelets[index]}`}
          alt={`gobelet-${gobelets[index]}`}
          width={1200}
          height={1500}
        />
        <span className="testgobelet">{gobelets[index].position}</span>
      </div>
    ))}
    </div>
    
    <div className="button-container" >
    {buttonOrder.map((index, idx) => (    
      <button
      key={buttonsData[index].id}  
      className="winner-button" 
      // remplacer si besoin className={`winner-button ${buttonsData[buttonsData[index].id] === winnerId ? "winner" : ""}`}
      // onClick={() => checkResult(buttonsData[index].id)}
    >
       {buttonsData[index].imageSrc && (
      <Image
        src={buttonsData[index].imageSrc}
        alt={buttonsData[index].text}
        width={180}
        height={180}
        className="winner-button-img"
      />
    )}
          <span
            className="winner-button-text"
            style={{
              color: theme.color3,
              textShadow: theme.textShadow,
            }}
          >
           {buttonsData[index].text}
          </span>
        </button>
      ))}
    </div>
   
    </div>
   
      <div className="containerbtngame">
      <button className="startanimationgobelets" onClick={setPositionGobelets} >Play Game</button>
        <button
          onClick={startGame}
          disabled={isButtonDisabled}
        //  disabled={isButtonDisabled}
          className="btngame"
        >
          {isPlaying ? "Playing..." : "Play Game"}
        </button>
      </div>
      <div
        className={`coin-container ${afficherPiecesTombantes ? "visible" : ""}`}
      >
        {afficherPiecesTombantes &&
          // 5 rangées de pièces
          Array.from({ length: 5 }).map((_, rowIndex) => (
            <div key={rowIndex} className="coin-row">
              {/* contiennent chacune 8 pièces */}
              {Array.from({ length: 8 }).map((_, index) => (
                <div key={`coin-${rowIndex}-${index}`} className="coin">
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
  );
};

export default Bonneteau;

