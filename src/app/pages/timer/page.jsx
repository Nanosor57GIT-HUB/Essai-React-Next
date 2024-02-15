"use client";

import { useTheme } from "@/app/context/themecontext";
import Image from "next/image";
import Chronometer from "@/app/components/chronometer";
import styles from "@/app/styles/chronometer.module.css";

const Counter = () => {
  const { theme } = useTheme();

  return (
    <div
      className={styles.pagecompteur}
      style={{
        background: theme.background,
      }}
    > 
    <div className={styles.wrapper}>
      <Chronometer />
      <div className={styles.decomposition}>
      <h3 className={styles.stopWatchTitle}>StopWatch</h3>
      <div className={styles["block-robot5"]}>
        {[1, 2, 3].map((index) => (
          <Image
            key={index}
            priority={true}
            as="image"
            src="/images/robots/robot5.webp"
            alt="robot5"
            className={styles.robot5}
            width={422}
            height={488}
            style={{
              transform: `scale(${1 - index * 0.1})`,
            }}
          />
        ))}
      </div>
      </div>
      </div>
    </div>
  );
};

export default Counter;
