"use client";

import { useEffect, useState } from "react";
import styles from "@/app/styles/testapi.module.css"
import { useTheme } from "@/app/context/themecontext";
import axios from "axios";
import { Montserratfont } from "@/app/styles/style.font";
import Image from "next/image";
import Link from "next/link";
import ModalStockExchange from "@/app/components/modalStockExchange";

const TestApi = () => {
  const { theme } = useTheme();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [highlightedIndex, setHighlightedIndex] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [showModal, setShowModal] = useState(false);


  useEffect(() => {
    //Je récupère les données
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://dumbstockapi.com/stock?countries=CA,US&ticker_search=BB" 
        );
        setData(response.data);
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
    const intervalId = setInterval(() => {
      // Changement aléatoire de l'index de la carte à mettre en surbrillance
      setHighlightedIndex(Math.floor(Math.random() * data.length));
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

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setShowModal(true); 
  };


  return ( 
      <div
        className={styles.pageapi}
        style={{
          background: theme.background,
        }}
      > 
        <Link
          href="/pages/oval"
          as="/pages/oval"
          passHref
          className={styles.version1}
          prefetch={false}
        >   
        V2
        </Link>
        <div className={styles.headerImageApi} style={{ display: loading || error ? 'none' : 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Image
            priority={true}
            as="image"
            src="/images/stock-Exchange.png" 
            alt="stockExchange_image"
            className={styles.exchange} 
            width={716}
            height={323}
          />
        </div> 
        <div className={styles.containerApi}>
        {loading ? (
            <p className={styles.chargementencours}>Chargement en cours ...</p>
          ) : error ? (
            <p className={styles.erreurchargement}>{error}</p>
          ) : (
            <ul className={styles.ulapi} >
              {data && 
                data.map((card, index) => (
                  <li
                  className={`${styles.liapi} ${Montserratfont.className} ${index === highlightedIndex ? styles.highlightedCard : ''}`}
                    style={{
                      background: theme.background2,
                    }}
                    key={card.ticker + '_' + index}
                    onClick={() => handleCardClick(card)}
                  >
                  {card.name}                 
                  </li>
                ))}
            </ul>
          )}
        </div>
        {selectedCard && showModal && (
         <ModalStockExchange selectedCard={selectedCard} onClose={() => setShowModal(false)}  />
        )} 
      </div>
  );
};

export default TestApi;
