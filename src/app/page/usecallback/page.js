"use client";

import { useTheme } from "@/app/context/themecontext";
import React, { useState, useMemo, useCallback } from "react";
import Image from "next/image";

const SumCalculator = ({ numbers }) => {
  const { theme } = useTheme();

  // Utilisez le hook useState pour gérer l'état du tableau des nombres
  const [numberList, setNumberList] = useState(numbers || []);

  // Utilisez le hook useMemo pour mémoriser le résultat du calcul de la somme
  const sum = useMemo(() => {
    console.log("Calcul de la somme...");
    return numberList.reduce((acc, num) => acc + num, 0);
  }, [numberList]); // La dépendance de useMemo est le tableau numberList

  // Utilisez le hook useCallback pour mémoriser la fonction addNumber
  const addNumber = useCallback(
    (num) => {
      setNumberList((prevNumberList) => [...prevNumberList, num]);
    },
    [] // Pas de dépendance pour useCallback, car il n'utilise que l'état local
  );

  return (
    <main className="mainpages">
    <div className="pageusecallback"  style={{
      background: theme.background,
    }}>  
    <div className="blocknumberusecallback" style={{
      background: theme.background2,
    }}>       
    <Image priority={true} src="/images/robots/robot7.webp" alt="robot7" className="robot7" width={487} height={682} />
      <div
        className="usecallbacknumber"
        
      >

        <p className="titlesum">
          Liste des nombres:
          <span className="addnumber"> {numberList.join(" + ")}</span>
        </p>
        <p className="titlesum">
          Somme:<span className="sumnumber"> {sum}</span>
        </p>
      </div>
      </div>
      <button className="btnusecallback" onClick={() => addNumber(10)}>
        Ajouter 10 à la liste
      </button>
    </div>
    </main>
  );
};

export default SumCalculator;
