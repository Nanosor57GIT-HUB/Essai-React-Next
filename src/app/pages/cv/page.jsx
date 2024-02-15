"use client";

import { metadata } from "@/app/layout";
import { useTheme } from "@/app/context/themecontext";
import ContentCV from "@/app/components/contentCV";
import styles from "@/app/styles/cv.module.css";
import { Interfont } from "@/app/styles/style.font";
import Image from "next/image";


const CV = () => {
   const { theme } = useTheme();

  return (
    <div>
       <title>{metadata.Cv.title}</title>
     <meta name="description" content={metadata.Cv.description}  />
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
        Mon Curriculum Vitae
      </h1>
      {/* <p className={styles.ok}>OK</p> */}
      <Image
        priority={true}
        as="image"
        src="/images/robots/robot2.webp"
        alt="robot2"
        className={styles.robot2}
        width={309}
        height={387}
      />
      <ContentCV />
    </div>
    </div>
  );
};

export default CV;
