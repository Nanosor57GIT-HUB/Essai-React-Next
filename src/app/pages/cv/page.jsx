"use client";

import { useEffect, useState, useRef } from "react";
import { useTheme } from "@/app/context/themecontext";
import styles from "@/app/styles/cv.module.css";
import { Interfont } from "@/app/styles/style.font";
import Image from "next/image";



const CV = () => {
  const { theme } = useTheme();
  const [cvData, setCvData] = useState(null);
  const titleRefs = useRef([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/cv-data.json");
        const data = await response.json();
        setCvData(data);
      } catch (error) {
        console.error("Error fetching CV data:", error);
      }
    };
    fetchData();
  }, []);
  

  
useEffect(() => {

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const targetElement = entry.target;
          targetElement.classList.add(styles.activeTitle);
        observer.unobserve(targetElement);
      }
    });
  });

  titleRefs.current.forEach(ref => {
    if (ref) {
      observer.observe(ref);
    }
  });

  return () => {
    observer.disconnect();
  };
}, [cvData]);

  
  if (!cvData) {
    return <div className={styles.loadingCv}>Loading...</div>; 
  }

  return (
  
      <div 
        className={styles.pagecv}
        style={{
          background: theme.background,
        }}
      >
        <h1
          className={`${styles.title} ${Interfont.className}`}
          style={{
            color: theme.color,
          }}
        >
          Vous êtes sur la page CV
        </h1>
        <p className={styles.ok}>OK</p>
        <Image
          priority={true}
          as="image"
          src="/images/robots/robot2.webp"
          alt="robot2"
          className={styles.robot2}
          width={309}
          height={387}
        />
        {cvData.sections.map((section, index) => (
           <div key={index}>
            <div  className={styles.blocresumecv}>
              <div className={styles.containerTitleCv}>
                <Image
                  priority={true}
                  as="image"
                  src={section.image}
                  alt={section.imageAlt}
                  className={styles.robot7}
                  width={section.imageWidth}
                  height={section.imageHeight}
                  // layout='responsive'
                />
              
                <h2 
                  ref={(el) => {
                    titleRefs.current[index] = el;
                  }}
                  id={section.id}
                  className={`${styles.titleCvText}   ${Interfont.className}`}
                  style={{
                    color: theme.color2,
                  }}
                >
                  {section.title}
                </h2>
                </div>
              
              <p className={`${styles.textecv} ${Interfont.className}`}>
                {section.content}
              </p>
            </div>
            <div className={styles.blocresumecv}>
              <div className={styles.containerTitleCv}></div>
            </div>
          </div>
        ))}
      </div>

  );
};

export default CV;
