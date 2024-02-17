"use client";

import { useEffect, useState } from "react";
//import { metadata } from "@/app/layout";
import styles from "@/app/styles/firstApi.module.css";
import { useTheme } from "@/app/context/themecontext";
import axios from "axios";
import { Montserratfont } from "@/app/styles/style.font";
import Image from "next/image";
import Link from "next/link";
import ModalStockExchange from "@/app/components/modalStockExchange";

const FirstApi = () => {
  const { theme } = useTheme();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [highlightedIndex, setHighlightedIndex] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    let sortedData = [];
    let uniqueCardNames = new Set();
    //Je récupère les données
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://dumbstockapi.com/stock?countries=CA,US&ticker_search=BB"
        );

        // Stocke les noms de cartes dans l'ensemble pour garantir l'unicité
        response.data.forEach((card) => {
          uniqueCardNames.add(card.name.toLowerCase()); // Ignorer la casse lors de la comparaison
        });

        // Trie les noms de cartes en ignorant la casse
        const sortedCardNames = Array.from(uniqueCardNames).sort((a, b) =>
          a.localeCompare(b, undefined, { sensitivity: "base" })
        );

        // Crée un tableau trié de données en utilisant les noms triés
        sortedData = sortedCardNames.map((cardName) =>
          response.data.find((card) => card.name.toLowerCase() === cardName)
        );

        setData(sortedData);

        setLoading(false);
      } catch (error) {
        // console.log(error);
        setLoading(false);
        setError("Une erreur s'est produite lors du chargement.");
      }
    };

    fetchData(); //j'execute fetchData

    return () => {
      //Nettoyage au démontage du composant ou
      // cancelRequest()  - correspond à l'annulation de l'appel - ou
      // Fermer une connexion
    };
  }, []);

  useEffect(() => {
    let currentIndex = 0;
    const intervalId = setInterval(() => {
      // Changement aléatoire de l'index de la carte à mettre en surbrillance
      // setHighlightedIndex(Math.floor(Math.random() * data.length));

      setHighlightedIndex(currentIndex);
      if (data && data.length) {
        currentIndex = (currentIndex + 1) % data.length;
      }
    }, 800); // Change toutes les 0.3 secondes

    return () => {
      clearInterval(intervalId);
    };
  }, [data]);

  useEffect(() => {
    // Réinitialiser l'index de la carte après chaque intervalle
    const timeoutId = setTimeout(() => {
      setHighlightedIndex(null);
    }, 800);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [highlightedIndex]);

  const handleMouseEnter = (index) => {
    setIsHovered(index);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setShowModal(true);
  };

  return (
    <div>
      {/* <title>{metadata.ExchangeV1.title}</title>
     <meta name="description" content={metadata.ExchangeV1.description}  /> */}
    <div
      className={styles.pageapi}
      style={{
        background: theme.background,
      }}
    >
      <Link
        rel="preload"
        href="/pages/apiExchange/second-api"
        as="/pages/apiExchange/second-api"
        passHref
        className={styles.version1}
        // prefetch={false}
      >
        Voir V2
      </Link>
      <div
        className={styles.headerImageApi}
        style={{
          display: loading || error ? "none" : "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          priority={true}
          as="image"
          src="/images/robots/robot10.png"
          alt="robot-image"
          className={styles.robot10}
          width={658}
          height={418}
        />
        <Image
          priority={true}
          as="image"
          src="/images/stock-Exchange3.png"
          alt="stockExchange_image"
          className={styles.exchange}
          width={716}
          height={323}
          style={{
            filter: theme.filterExchangeLogo,
         }}
        />
      </div>
      <div className={styles.containerApi}>
        {loading ? (
          <p className={styles.chargementencours}>Chargement en cours ...</p>
        ) : error ? (
          <p className={styles.erreurchargement}>{error}</p>
        ) : (
          <ul className={styles.ulapi}>
            {data &&
              data.map((card, index) => (
                <li
                  className={`${styles.liapi} ${Montserratfont.className} ${
                    index === highlightedIndex ? styles.highlightedCard : ""
                  }`}
                  style={{
                    background:
                      isHovered === index
                        ? theme.background3
                        : theme.background2,
                  }}
                  key={card.ticker + "_" + index}
                  onClick={() => handleCardClick(card)}
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                >
                  {card.name}
                </li>
              ))}
          </ul>
        )}
      </div>
      {showModal && (
        <ModalStockExchange
          selectedCard={selectedCard}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
    </div>
  );
};

export default FirstApi;
