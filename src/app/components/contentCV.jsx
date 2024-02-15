"use client"

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Interfont } from "@/app/styles/style.font";
import styles from "@/app/styles/cv.module.css"
import { useTheme } from '../context/themecontext';

const ContentCV = () => {

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
        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const targetElement = entry.target;
              targetElement.classList.add(styles.activeTitle);
              observer.unobserve(targetElement);
            }
          });
        });
    
        titleRefs.current.forEach((ref) => {
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
        <div className={styles["wrapper-content-cv"]}>
        {cvData.sections.map((section, index) => (
          <div key={index}>
            <div className={styles.blocresumecv}>
              <div className={styles.containerTitleCv}>
                <Image
                  priority={true}
                  as="image"
                  src={section.image}
                  alt={section.imageAlt}
                  className={styles.robot7}
                  width={section.imageWidth}
                  height={section.imageHeight}
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
  
              <p className={`${styles.textecv} ${Interfont.className}`} style={{     
                  color: theme.color3
                  }}>
                {section.content}
              </p>
            </div>
          </div>
        ))}
        </div>
    );
};

export default ContentCV;