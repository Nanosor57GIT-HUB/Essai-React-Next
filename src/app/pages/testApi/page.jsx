"use client";

import styles from "@/app/styles/testapi.module.css"
import { useTheme } from "@/app/context/themecontext";
import { useEffect, useState } from "react";
import axios from "axios";
import { Interfont } from "@/app/styles/style.font";
import Image from "next/image";

const TestApi = () => {
  const { theme } = useTheme();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    //Je récupère les données
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://dumbstockapi.com/stock?countries=CA,US&ticker_search=AA" 
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

  return (
   
      <div
        className={styles.pageapi}
        style={{
          background: theme.background,
        }}
      > 
        <h1 className={`${styles.titleapi} ${Interfont.className}`} style={{
          color: theme.color,
        }}>
          Mise en place d&#x27;API avec axios
        </h1>
        <div className={styles.robot4container} style={{ display: loading || error ? 'none' : 'block' }}>
          <Image
            priority={true}
            as="image"
            src="/images/robots/robot4.webp" 
            alt="robot4"
            className={styles.robot4}
            width={1229}
            height={1260}
          />
        </div> 
        <div>
        {loading ? (
            <p className={styles.chargementencours}>Chargement en cours ...</p>
          ) : error ? (
            <p className={styles.erreurchargement}>{error}</p>
          ) : (
            <ul className={styles.ulapi} >
              {data &&
                data.map((item, index) => (
                  <li
                    className={styles.liapi}
                    style={{
                      background: theme.background2,
                    }}
                    key={item.ticker + '_' + index}
                  >
                  {item.name}
                   
                  </li>
                ))}
            </ul>
          )}
        </div>
      </div>
   
  );
};

export default TestApi;
