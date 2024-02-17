"use client";

//import styles from "@/app/styles/searchbar.module.css"

import React, { useEffect, useState } from "react";
//import { metadata } from "@/app/layout";
import styles from "@/app/styles/searchbar.module.css";
import { useTheme } from "@/app/context/themecontext";
import Link from "next/link";
import Image from "next/image";
import SearchBar from "./searchbar";

const SearchPage = () => {
  const { theme } = useTheme();

  const [searchResults, setSearchResults] = useState([]);
  const [searchError, setSearchError] = useState("");

  useEffect(() => {
    // ...
  }, []);

  const handleSearch = async (query) => {
    try {
      const response = await fetch("/data.json");
      const data = await response.json();

      const matchingResults = data.page.filter((page) =>
        page.title.toLowerCase().includes(query.toLowerCase())
      );

      if (matchingResults.length === 0) {
        setSearchResults([]);
        setSearchError("Aucun résultat trouvé.");
      } else {
        setSearchResults(matchingResults);
        setSearchError("");
      }
    } catch (error) {
      console.error("Une erreur s'est produite :", error);
    }
  };

  return (

    <div>
       {/* <title>{metadata.BarreDeRecherche.title}</title>
     <meta name="description" content={metadata.BarreDeRecherche.description}  /> */}
    <div
      className={styles.pagesearchbar}
      style={{
        background: theme.background,
      }}
    >
      {/* ... */}
      <SearchBar onSearch={handleSearch} />
      <h2
        style={{
          color: theme.color,
        }}
      >
        Résultats de la recherche :
      </h2>
      {searchError ? (
        <p className={styles["error-message"]}>{searchError}</p>
      ) : (
        <ol type="I" className={styles.olsearch}>
          {searchResults.map((result, index) => (
            <li className={styles.lisearch} key={index}>
              <Link
               // priority={true}
                href={result.path === "/" ? "/" : `/pages/${result.path}`}
                as={result.path === "/" ? "/" : `/pages/${result.path}`}
             //   as={`/pages/${result.path}`}
                className={styles.linksearch}
              >
                <div className={styles.resultsearch}>{result.title}</div>
              </Link>
            </li>
          ))}
        </ol>
      )}
      <div className={styles.containerrobot8}>
        <Image
          priority={true}
          as="image"
          src="/images/robots/robot8.webp"
          alt="robot8"
          className={styles.robot8}
          width={670}
          height={600}
        />
      </div>
    </div>
    </div>
  );
};

export default SearchPage;
