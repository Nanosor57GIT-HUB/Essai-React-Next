"use client";

import styles from "@/app/styles/header.module.css";
import { useHeader } from "@/app/context/headercontext";
import { useTheme } from "../../context/themecontext";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import DropdownMenu from "./dropdownmenu";


export default function Header() {
  const { theme, toggleTheme } = useTheme();

  const { toggleBurger, burgerActive, isNavOpen, closeMenuBurger, menuContainerRef } = useHeader();

  const currentRoute = usePathname();

 // https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating

  return (
    <div className={styles.header}>
      <Image
        priority={true}
        as="image"
        src="/images/logo/logoPortfolio(360x180).webp"
        alt="logo_logoPortfolio"
        className={styles.logoPortfolio}
        width={360}
        height={180}
      />
      
     <button id={styles["menu-button"]} className={`${styles["burger-menu"]} ${burgerActive ? styles["burger-active"] : ""}` } onClick={toggleBurger}>
  &#9776;
</button>

      <nav
        className={styles.navlinks}
        ref={menuContainerRef}
        style={{
          border: theme.border2,
          display: isNavOpen || burgerActive  ? 'flex' : 'none',
        }}
      >
        <Link
          href="/"
          as="/"
          passHref
          className={`${styles.link} ${currentRoute === "/" ? styles.active : ""}`}
          style={{
            color: theme.color4,
          }}
          onClick={closeMenuBurger}
          prefetch={false}
        >
          Accueil
        </Link>
        <Link
          href="/pages/cv"
          as="/pages/cv"
          passHref
          className={`${styles.link} ${currentRoute === "/pages/cv" ? styles.active : ""}`}
          style={{
            color: theme.color4,
          }}
          onClick={closeMenuBurger}
          prefetch={false}
        >
         CV
        </Link>
        <Link
          href="/pages/incrementation"
          as="/pages/incrementation"
          passHref
          className={`${styles.link} ${currentRoute === "/pages/incrementation" ? styles.active : ""}`}
          style={{
            color: theme.color4,
          }}
          onClick={closeMenuBurger}
          prefetch={false}
        >
            Increment
        </Link>
        <Link
          href="/pages/testApi"
          as="/pages/testApi"
          passHref
          className={`${styles.link} ${currentRoute === "/pages/testApi" ? styles.active : ""}`}
          style={{
            color: theme.color4,
          }}
          onClick={closeMenuBurger}
          prefetch={false}
        >
            Api
        </Link>

        <Link
          href="/pages/compteur"
          as="/pages/compteur"
          passHref
          className={`${styles.link} ${currentRoute === "/pages/compteur" ? styles.active : ""}`}
          style={{
            color: theme.color4,
          }}
          onClick={closeMenuBurger}
          prefetch={false}
        >
            Compteur
        </Link>
        <DropdownMenu/>
        <Link
          href="/pages/searchbar"
          as="/pages/searchbar"
          passHref
          className={`${styles.link} ${currentRoute === "/pages/searchbar" ? styles.active : ""}`}
          style={{
            color: theme.color4,
          }}
          onClick={closeMenuBurger}
          prefetch={false}
        >
            SearchBar
        </Link>
        <Link
          href="/pages/contact"
          as="/pages/contact"
          passHref
          className={`${styles.link} ${currentRoute === "/pages/contact" ? styles.active : ""}`}
          style={{
            color: theme.color4,
          }}
          onClick={closeMenuBurger}
          prefetch={false}
        >
            Contact
        </Link>
      </nav>
      <button
        className={styles.btnswitch}
        onClick={toggleTheme}
        style={{
          color: theme.color2,
        }}
      >
        Switch color
      </button>
    </div>
  );
}
