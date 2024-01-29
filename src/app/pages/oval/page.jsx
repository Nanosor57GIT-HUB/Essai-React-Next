"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTheme } from "@/app/context/themecontext";
import styles from "@/app/styles/oval.module.css";
import Image from "next/image";
import Link from "next/link";
import ModalStockExchange from "@/app/components/modalStockExchange";


const OvalCarousel = () => {
  const { theme } = useTheme();

  const [cards, setCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [initCentered, setInitCentered] = useState(true);
  const [selectedCard, setSelectedCard] = useState(null);
  const [animationFinished, setAnimationFinished] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://dumbstockapi.com/stock?countries=CA&ticker_search=CC"
        );
        // Utilisez directement response.data car Axios s'occupe de la conversion JSON
        setCards(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des cartes :", error);
      }
    };

    fetchData();
  }, []);

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setShowModal(true); 
    setInitCentered(true);
  };

  const ellipseX = (angle, horizontalRadius) =>
    horizontalRadius * Math.cos(angle);

  const ellipseY = (angle, verticalRadius) => verticalRadius * Math.sin(angle);

  // Ajustez ces valeurs selon vos besoins
  const horizontalRadius = 450;
  const verticalRadius = 220;

  const nextCard = () => {
    setInitCentered(false);
    setAnimationFinished(false);
    setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        Math.floor((prevIndex + 1) % cards.length)
      );
      setInitCentered(true);
    }, 200);
  };

  const prevCard = () => {
    setInitCentered(false);
    setAnimationFinished(false);
    setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        Math.floor((prevIndex - 1 + cards.length) % cards.length)
      );
      setInitCentered(true);
    }, 200);
  };

  const handleAnimationEnd = () => {
    setAnimationFinished(initCentered);
  };


  return (
    <div
      className={styles.pageoval}
      style={{
        background: theme.background,
      }}
    >
        <Link
          href="/pages/testApi"
          as="/pages/testApi"
          passHref
          className={styles.version2} 
          prefetch={false}
        >
           Retour V1
        </Link>
      <div className={styles["oval-carousel"]}>
        {cards.map((card, index) => {
          // Calcul des coordonnées polaires
          const angle =
            ((currentIndex - index) * 2 * Math.PI) / cards.length - Math.PI / 2;
          const cardX = ellipseX(angle, horizontalRadius);
          const cardY = ellipseY(angle, verticalRadius);
          const cardStyle = {
            transform: `translate(${cardX}px, ${cardY}px)`,
          };

          return (
            <div className={styles.containerCard} key={`${card.ticker}_${index}`}>
           
              <div
                key={card.ticker + "_" + index}
                className={`${styles.card} ${
                  currentIndex === index ? styles.selected : ""
                } ${
                  currentIndex === index && initCentered ? styles.centered : ""
                }`}
                onClick={() => handleCardClick(card)}
                onAnimationEnd={handleAnimationEnd}
                style={{
                  background: theme.background2,
                  ...cardStyle,
                }}
              >
                {card.name}
              </div>
            </div>
          );
        })}
        {animationFinished && (
          <div className={styles.containerImages}>
          <Image
            priority={true}
            as="image"
            src="/images/robots/robot10.png"
            alt="robot-image"
            className={styles.robot10}
            width={658}
            height={418}
          />
          <div>
          <Image
            priority={true}
            as="image"
            src="/images/flecheBas.png"
            alt="fleche vers le bas"
            className={styles.arrowDown}
            width={512}
            height={512}
          />
         <p className={styles.pointillésDescription}>...</p>
          </div>
          </div>
        )}
      {selectedCard && showModal && (
         <ModalStockExchange selectedCard={selectedCard} onClose={() => setShowModal(false)}  />
        )} 
        <div className={styles.arrowCard}>
          <Image
            priority={true}
            as="image"
            src="/images/pointer-left-svgrepo-com.svg"
            alt="prev_element_button"
            className={styles.btnArrow}
            width={500}
            height={500}
            onClick={prevCard}
          />
          <Image
            priority={true}
            as="image"
            src="/images/pointer-right-svgrepo-com.svg"
            alt="next_elements_button"
            className={styles.btnArrow}
            width={500}
            height={500}
            onClick={nextCard}
          />
        </div>
      </div>
    </div>
  );
};

export default OvalCarousel;
