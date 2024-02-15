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

  const {
    toggleBurger,
    burgerActive,
    isNavOpen,
    closeMenuBurger,
    menuContainerRef,
  } = useHeader();

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

      <button
        id={styles["menu-button"]}
        className={`${styles["burger-menu"]} ${
          burgerActive ? styles["burger-active"] : ""
        }`}
        onClick={toggleBurger}
      >
        &#9776;
      </button>

      <nav
        className={styles.navlinks}
        ref={menuContainerRef}
        style={{
          border: theme.border2,
          display: isNavOpen || burgerActive ? "flex" : "none",
        }}
      >
        <Link
          rel="preload"
          href="/"
          as="/"
          passHref
          className={`${styles.link} ${
            currentRoute === "/" ? styles.active : ""
          }`}
          style={{
            color: theme.color4,
          }}
          onClick={closeMenuBurger}
          //  prefetch={false}
        >
          Accueil
        </Link>
        <Link
          rel="preload"
          href="/pages/searchbar"
          as="/pages/searchbar"
          passHref
          className={`${styles.link} ${
            currentRoute === "/pages/searchbar" ? styles.active : ""
          }`}
          style={{
            color: theme.color4,
          }}
          onClick={closeMenuBurger}
          //  prefetch={false}
        >
          SearchBar
        </Link>
        <Link
          rel="preload"
          href="/pages/incrementation"
          as="/pages/incrementation"
          passHref
          className={`${styles.link} ${
            currentRoute === "/pages/incrementation" ? styles.active : ""
          }`}
          style={{
            color: theme.color4,
          }}
          onClick={closeMenuBurger}
          // prefetch={false}
        >
          Increment
        </Link>
        <Link
          rel="preload"
          href="/pages/apiExchange/first-api"
          as="/pages/apiExchange/first-api"
          passHref
          className={`${styles.link}  ${
            currentRoute.startsWith("/pages/apiExchange/first-api") ||
            currentRoute.startsWith("/pages/apiExchange/second-api")
              ? styles.active
              : ""
          }`}
          style={{
            color: theme.color4,
          }}
          onClick={closeMenuBurger}
          // prefetch={false}
        >
          Exchange
        </Link>
        <Link
          rel="preload"
          href="/pages/timer"
          as="/pages/timer"
          passHref
          className={`${styles.link} ${
            currentRoute === "/pages/timer" ? styles.active : ""
          }`}
          style={{
            color: theme.color4,
          }}
          onClick={closeMenuBurger}
          //  prefetch={false}
        >
          Chronomètre
        </Link>
        <DropdownMenu />
        <Link
          rel="preload"
          href="/pages/cv"
          as="/pages/cv"
          passHref
          className={`${styles.link} ${
            currentRoute === "/pages/cv" ? styles.active : ""
          }`}
          style={{
            color: theme.color4,
          }}
          onClick={closeMenuBurger}
          // prefetch={false}
        >
          CV
        </Link>
        <Link
          rel="preload"
          href="/pages/contact"
          as="/pages/contact"
          passHref
          className={`${styles.link} ${
            currentRoute === "/pages/contact" ? styles.active : ""
          }`}
          style={{
            color: theme.color4,
          }}
          onClick={closeMenuBurger}
          //  prefetch={false}
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
