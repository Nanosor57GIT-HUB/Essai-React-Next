"use client";

import React, { useCallback, useEffect, useState } from "react";
import { metadata } from "@/app/layout";
import axios from "axios";
import { useTheme } from "@/app/context/themecontext";
import styles from "@/app/styles/secondApi.module.css";
import Image from "next/image";
import Link from "next/link";
import ModalStockExchange from "@/app/components/modalStockExchange";

const CarouselApi = () => {
  const { theme } = useTheme();

  const [cards, setCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [initCentered, setInitCentered] = useState(true);
  const [firstAnimLogo, setFirstAnimLogo] = useState(false);
  const [secondAnimLogo, setSecondAnimLogo] = useState(false);
  const [firstAnimRobot10, setFirstAnimRobot10] = useState(false);
  const [secondAnimRobot10, setSecondAnimRobot10] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [animationFinished, setAnimationFinished] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
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

  const nextCard = useCallback(() => {
    setFirstAnimLogo(false);
    setInitCentered(false);
    setSecondAnimLogo(false);
    setSecondAnimRobot10(false);
    setAnimationFinished(false);
    setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        Math.floor((prevIndex + 1) % cards.length)
      );
      setInitCentered(true);
      setSecondAnimLogo(true);
      setSecondAnimRobot10(true);
    }, 200);
  }, [cards]);

  const prevCard = () => {
    setFirstAnimLogo(false);
    setInitCentered(false);
    setSecondAnimLogo(false);
    setSecondAnimRobot10(false);
    setAnimationFinished(false);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => {
        const newCurrentIndex = Math.floor(
          (prevIndex - 1 + ((cards && cards.length) || 0)) %
            ((cards && cards.length) || 1)
        );
        return newCurrentIndex;
      });
      setInitCentered(true);
      setSecondAnimLogo(true);
      setSecondAnimRobot10(true);
    }, 200);
  };

  useEffect(() => {
    // Appel de nextCard lorsque les données (cards) ont été récupérées
    if (cards.length < 0) {
      nextCard();
      setInitCentered(true);
    } else {
      setFirstAnimLogo(true);
      setFirstAnimRobot10(true)
    }
  }, [cards, nextCard]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Initial width setup
    handleResize();

    // Event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Calculate radius based on window width
  const calculateRadius = () => {
    if (windowWidth <= 1200) {
      // Adjust these values based on your needs for smaller screens
      return {
        horizontalRadius: windowWidth * 0.35,
        verticalRadius: windowWidth * 0.2,
      };
    } else {
      // Default values for larger screens
      return {
        horizontalRadius: 430,
        verticalRadius: 200,
      };
    }
  };

  const { horizontalRadius, verticalRadius } = calculateRadius();

  const ellipseX = (angle, horizontalRadius) =>
    horizontalRadius * Math.cos(angle);

  const ellipseY = (angle, verticalRadius) => verticalRadius * Math.sin(angle);

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setShowModal(true);
    setInitCentered(true);
  };

  const handleAnimationEnd = () => {
    setAnimationFinished(initCentered);
  };

  return (
    <div>
       <title>{metadata.ExchangeV2.title}</title>
     <meta name="description" content={metadata.ExchangeV2.description}  />
    <div
      className={styles.pageoval}
      style={{
        background: theme.background,
      }}
    >
      <Link
        rel="preload"
        href="/pages/apiExchange/first-api"
        as="/pages/apiExchange/first-api"
        passHref
        className={styles.version2}
        //  prefetch={false}
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
            <div
              className={styles.containerCard}
              key={`${card.ticker}_${index}`}
            >
              <div
                key={card.ticker + "_" + index}
                className={`${styles.card} ${
                  currentIndex === index ? styles.selected : ""
                } ${
                  currentIndex === index && initCentered ? styles.centered : ""
                }`}
                onClick={() => {
                  if (currentIndex === index || (currentIndex === index && initCentered)) {
                    handleCardClick(card);
                  }
                }}
                onAnimationEnd={handleAnimationEnd}
                style={{
                  ...cardStyle,
                }}
              >
                {card.name}
              </div>
              
            </div>
          );
        })}
      </div>

      <div>
        <Image
          priority={true}
          as="image"
          src="/images/stock-Exchange3.png"
          alt="stockExchange_image"
          className={`${styles.exchange} ${
            firstAnimLogo ? styles.animationCentered : ""
          } ${secondAnimLogo ? styles.animationExchangeCentered : ""}`}
          width={716}
          height={323}
          style={{
             filter: theme.filterExchangeLogo,
          }}
        />

       {initCentered && (
          <Image
            priority={true}
            as="image"
            src="/images/robots/robot10.png"
            alt="robot-image"
            className={`${styles.robot10} ${
              firstAnimRobot10 ? styles.animation1Robot10 : ""
            } `}
            width={658}
            height={418}
          />
     )} 

        {animationFinished && (
          <div className={styles.containerImages}>
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
                style={{
                  filter: theme.filter,
                }}
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
                style={{
                  filter: theme.filter,
                }}
              />
            </div>
            <div className={styles.insciteclick}>
              <Image
                priority={true}
                as="image"
                src="/images/arrow-down.png"
                alt="fleche vers le bas"
                className={styles.arrowDown}
                width={512}
                height={512}
                style={{
                  filter: theme.filter,
                }}
              />
              <p
                className={styles.pointillésDescription}
                style={{
                  filter: theme.filter,
                }}
              >
                ~~~
              </p>
            </div>
          </div>
        )}
      </div>
      {selectedCard && showModal && (
        <ModalStockExchange
          selectedCard={selectedCard}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
    </div>
  );
};

export default CarouselApi;
