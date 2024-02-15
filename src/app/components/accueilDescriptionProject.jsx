"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "@/app/styles/accueil.module.css";
import { useTheme } from "../context/themecontext";

const AccueilDescriptionProject = () => {
  const { theme } = useTheme();
  const [data, setData] = useState("");

  const textRef = useRef([]);

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
            <p key={itemIndex}  ref={(el) => (textRef.current[index] = el)} style={{
              color: theme.color,
            }}>
              <span className={styles.titleDescription} style={{
                color: theme.color2,
              }}
              >{item.title} </span>
              {item.text}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
};

export default AccueilDescriptionProject;
