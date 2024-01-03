"use client";

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

 

  return (
    <div className="header">
      <Image
        priority={true}
        as="image"
        src="/images/logo/logoPortfolio(360x180).webp"
        alt="logo_logoPortfolio"
        className="logoPortfolio"
        width={360}
        height={180}
      />
      
     <button id="menu-button" className={`burger-menu${burgerActive ? " burger-active" : ""}` } onClick={toggleBurger}>
  &#9776;
</button>

      <nav
        className="navlinks"
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
          className="link"
          style={{
            color: theme.color4,
          }}
          onClick={closeMenuBurger}
        >
          <div className={currentRoute === "/" ? "active" : ""}>Accueil</div>
        </Link>
        <Link
          href="/pages/cv"
          as="/pages/cv"
          passHref
          className="link"
          style={{
            color: theme.color4,
          }}
          onClick={closeMenuBurger}
        >
          <div className={currentRoute === "/pages/cv" ? "active" : ""}>CV</div>
        </Link>
        <Link
          href="/pages/incrementation"
          as="/pages/incrementation"
          passHref
          className="link"
          style={{
            color: theme.color4,
          }}
          onClick={closeMenuBurger}
        >
          <div
            className={currentRoute === "/pages/incrementation" ? "active" : ""}
          >
            Increment
          </div>
        </Link>
        <Link
          href="/pages/testApi"
          as="/pages/testApi"
          passHref
          className="link"
          style={{
            color: theme.color4,
          }}
          onClick={closeMenuBurger}
        >
          <div className={currentRoute === "/pages/testApi" ? "active" : ""}>
            Api
          </div>
        </Link>

        <Link
          href="/pages/compteur"
          as="/pages/compteur"
          passHref
          className="link"
          style={{
            color: theme.color4,
          }}
          onClick={closeMenuBurger}
        >
          <div className={currentRoute === "/pages/compteur" ? "active" : ""}>
            Compteur
          </div>
        </Link>
        <DropdownMenu/>
        <Link
          href="/pages/searchbar"
          as="/pages/searchbar"
          passHref
          className="link"
          style={{
            color: theme.color4,
          }}
          onClick={closeMenuBurger}
        >
          <div className={currentRoute === "/pages/searchbar" ? "active" : ""}>
            SearchBar
          </div>
        </Link>
        <Link
          href="/pages/contact"
          as="/pages/contact"
          passHref
          className="link"
          style={{
            color: theme.color4,
          }}
          onClick={closeMenuBurger}
        >
          <div className={currentRoute === "/pages/contact" ? "active" : ""}>
            Contact
          </div>
        </Link>
      </nav>
      <button
        className="btnswitch"
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
