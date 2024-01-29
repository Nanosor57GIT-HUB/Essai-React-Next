"use client";

import { useState } from "react";
import { useTheme } from "@/app/context/themecontext";
import Image from "next/image";
import Chronometer from "@/app/components/chronometer";
import styles from "@/app/styles/chronometer.module.css"

const Counter = () => {
   const { theme } = useTheme();

  return ( 
      <div
        className={styles.pagecompteur}
        style={{
          background: theme.background,
        }}
      >  
      <Chronometer />
      <div className={styles.decomposition}>
      {[1, 2, 3, 4].map((index) => (
        <Image 
        key={index}
        priority={true} 
        as="image"
        src="/images/robots/robot5.webp" alt="robot5" className={styles.robot5} width={422} height={488} style={{
          transform: `scale(${1 - index * 0.1}) translateX(${index * 20}px)`,
        }} />
        ))}
        </div>
      </div>       
    
  );
};

export default Counter;

