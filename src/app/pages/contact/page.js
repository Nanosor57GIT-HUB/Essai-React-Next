"use client";

//https://nextjs.org/docs/app/building-your-application/optimizing/fonts#using-multiple-fonts

import styles from "@/app/styles/contact.module.css"
import { useTheme } from "@/app/context/themecontext";
import ContactForm from "./contactForm";
import Image from "next/image";

const Contact = () => {
  const { theme } = useTheme();

  return (
    <main className="mainpages">
      <div
        className={styles.pagecontact}
        style={{
          background: theme.background,
        }}
      >
        <div className={styles.imgformcontact}>
          <video autoPlay loop className={styles['bg-tablette']} width={700} height={500}>
            <source src="/images/giphy.mp4" type="video/mp4" />
            Votre navigateur ne prend pas en charge la balise vidéo.
          </video>
          {/* <Image priority={true} src="/images/giphy.mov" alt="bg-tablette" className= "bg-tablette" width={480} height={480} /> */}
          <Image
            priority={true}
            as="image"
            src="/images/tablet.webp"
            alt="tabletteContact"
            className={styles.tablettecontact}
            width={1841}
            height={1334}
          />
          <ContactForm />
          {/* <h1
            className={styles.titlecontact}
            style={{
              color: theme.color,
            }}
          >
            Installation formulaire de contact
          </h1> */}
          <Image
            priority={true}
            as="image"
            src="/images/robots/robot9.webp"
            alt="robot9"
            className={styles.robot9}
            width={804}
            height={739}
          />
        </div>
      </div>
    </main>
  );
};

export default Contact;
