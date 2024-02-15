"use client";

//https://nextjs.org/docs/app/building-your-application/optimizing/fonts#using-multiple-fonts


import { metadata } from "@/app/layout";
import styles from "@/app/styles/contact.module.css";
import { useTheme } from "@/app/context/themecontext";
import ContactForm from "./contactForm";
import Image from "next/image";



const Contact = () => {
  const { theme } = useTheme();

  return (
    <div>
    
     <title>{metadata.Contact.title}</title>
     <meta name="description" content={metadata.Contact.description}  />
     
    <div
      className={styles.pagecontact}
      style={{
        background: theme.background,
      }}
    >
      <div className={styles.imgformcontact}>
        <video
          autoPlay
          loop
          className={styles["bg-tablette"]}
          width={650}
          height={450}
        >
          <source src="/images/giphy.mp4" type="video/mp4" />
          Votre navigateur ne prend pas en charge la balise vidéo.
        </video>
        <Image
          priority={true}
          as="image"
          src="/images/tablet.webp"
          alt="tabletteContact"
          className={styles.tablettecontact}
          width={1289}
          height={934}
        />
        <ContactForm />
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
    </div>
  );
};

export default Contact;
