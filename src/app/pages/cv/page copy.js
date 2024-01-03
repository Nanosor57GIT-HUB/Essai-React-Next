"use client";

import { useEffect, useState, useRef } from "react";
import styles from "@/app/styles/cv.module.css";
import { useTheme } from "@/app/context/themecontext";
import Image from "next/image";
import { Interfont } from "@/app/style.font";


const CV = () => {
  const { theme } = useTheme();

  const [cvData, setCvData] = useState(null);
 // const titleRefs = useRef({});


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


// useEffect(() => {
 
//   const observer = new IntersectionObserver(entries => { 
//     console.log(titleRefs);
//     if(entries[0].isIntersecting) {
//       titleRefs.current.classList.add("active");
//       observer.unobserve(titleRefs.current)
//     }
//   })
//   observer.observe(titleRefs.current)

// }, []);

// https://www.youtube.com/watch?v=WFw_SgVlXUY

// https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
// https://www.freecodecamp.org/news/reveal-on-scroll-in-react-using-the-intersection-observer-api/
 


// useEffect(() => {
//   if (cvData && cvData.sections) {
//     const options = {
//       root: null,
//       rootMargin: '0px',
//       threshold: 0.5 // La portion de l'élément qui doit être visible pour déclencher l'animation (50%)
//     };

//     const handleIntersection = (entries, observer) => {
//       entries.forEach((entry) => {
//         const { target, isIntersecting } = entry;
//         console.log(`${target.id} is intersecting: ${isIntersecting}`);
//         if (isIntersecting) {
        
//           // Ajoutez ici votre logique pour déclencher l'animation
//           entry.target.classList.add(styles.slideAndFade);
//           observer.unobserve(entry.target);
//         }
//       });
//     };

//     const observer = new IntersectionObserver(handleIntersection, options);

//    // Observer chaque élément correspondant à section.id
//    cvData.sections.forEach((section) => {
//     const titleElement = document.getElementById(section.id);
//     if (titleElement) {
//       observer.observe(titleElement);
//     }
//   });

//     // Fonction de nettoyage du observer
//     return () => {
//       cvData.sections.forEach((section) => {
//       //   const titleElement = document.getElementById(section.id);
//       //   if (titleElement) {
//       //     observer.unobserve(titleElement);
//       //   }
//       observer.disconnect()
//        });
//     };
//   }
// }, [cvData])

  
  if (!cvData) {
    return <div className={styles.loadingCv}>Loading...</div>; 
  }

  return (
    <main className="mainpages">
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
                />
                <h2
            //  ref={titleRefs.current[section.id]}
                  id={section.id}
                  className={`${styles.titlecv} ${styles.slideAndFade} ${Interfont.className}`}
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
    </main>
  );
};

export default CV;
