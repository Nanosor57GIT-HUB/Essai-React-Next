"use client";

//https://nextjs.org/docs/app/building-your-application/optimizing/fonts#using-multiple-fonts
import { useTheme } from "@/app/context/themecontext";
import ContactForm from "./contactForm";
import Image from "next/image";

const Contact = () => {
  const { theme } = useTheme();

  return (
    <main className="mainpages">
      <div
        className="pagecontact"
        style={{
          background: theme.background,
        }}
      >
        <div className="imgformcontact">
          <video autoPlay loop className="bg-tablette" width={700} height={500}>
            <source src="/images/giphy.mp4" type="video/mp4" />
            Votre navigateur ne prend pas en charge la balise vidéo.
          </video>
          {/* <Image priority={true} src="/images/giphy.mov" alt="bg-tablette" className= "bg-tablette" width={480} height={480} /> */}
          <Image
            priority={true}
            src="/images/tablet.webp"
            alt="tabletteContact"
            className="tablettecontact"
            width={1841}
            height={1334}
          />
          <ContactForm />
          <h1
            className="titlecontact"
            style={{
              color: theme.color,
            }}
          >
            Installation formulaire de contact
          </h1>
          <Image
            priority={true}
            src="/images/robots/robot9.webp"
            alt="robot9"
            className="robot9"
            width={804}
            height={739}
          />
        </div>
      </div>
    </main>
  );
};

export default Contact;
