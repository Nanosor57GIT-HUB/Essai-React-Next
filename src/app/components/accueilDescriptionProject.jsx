"use client"

import React, { useEffect, useRef, useState } from "react";
import styles from "@/app/styles/accueil.module.css"

const AccueilDescriptionProject = () => {

  const [data, setData] = useState('')

  const textRef = useRef([]);

  // useEffect(() => {
  //   const textElement = textRef.current;
  //   if (textElement) {
  //     if (textElement.scrollHeight > textElement.clientHeight) {
  //       textElement.classList.add(styles.scroller);
  //     } else {
  //       textElement.classList.remove(styles.scroller);
  //     }
  //   }
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/description-project.json");
        const fetchedData = await response.json();
        setData(fetchedData);
      } catch (error) {
        console.error("Error fetching description data:", error);
      }
    };
    fetchData();
  }, []);

  if (!data) {
    return <div className={styles.loadingCv}>Loading...</div>; 
  }


  return (
    <div className={styles.desciptionProject}>
  {data.descriptions.map((section, index) => (  
<div key={index} className={styles.blockTextDescriptionProject}>
{section.data.map((item, itemIndex) => (
<p key={itemIndex}  ref={(el) => (textRef.current[index] = el)} >  
        <span className={styles.titleDescription}>{item.title} </span>{item.text}
      </p>   
))}    
      </div> 
      ))}
    </div>
  );
};

export default AccueilDescriptionProject;
