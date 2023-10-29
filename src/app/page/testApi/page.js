"use client";

import { useTheme } from "@/app/context/themecontext";
import { useEffect, useState } from "react";
import axios from "axios";
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
    <main className="mainpages">
      <div
        className="pageapi"
        style={{
          background: theme.background,
        }}
      >
        <h1 className="titleapi" style={{
          color: theme.color,
        }}>
          Mise en place d&#x27;API avec axios
        </h1>
        <div className="robot4container" style={{ display: loading || error ? 'none' : 'block' }}>
          <Image
            priority={true}
            src="/images/robots/robot4.webp" 
            alt="robot4"
            className="robot4"
            width={1229}
            height={1260}
          />
        </div> 
        <div>
        {loading ? (
            <p className="chargementencours">Chargement en cours ...</p>
          ) : error ? (
            <p className="erreurchargement">{error}</p>
          ) : (
            <ul className="ulapi" >
              {data &&
                data.map((item, index) => (
                  <li
                    className="liapi"
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
    </main>
  );
};

export default TestApi;
