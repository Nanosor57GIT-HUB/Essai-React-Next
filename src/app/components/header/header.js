"use client";

import { useHeader } from "@/app/context/headercontext";
import { useTheme } from "../../context/themecontext";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import DropdownMenu from "./dropdownmenu";
import { useEffect } from "react";


export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const { isMenuOpen, setIsMenuOpen, toggleBurger, burgerActive, isNavOpen, closeDropdownMenu, closeMenuBurger, menuContainerRef } = useHeader();

 

  const currentRoute = usePathname();

 

  return (
    <div className="header">
      <Image
        priority={true}
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
          href="/page/cv"
          passHref
          className="link"
          style={{
            color: theme.color4,
          }}
          onClick={closeMenuBurger}
        >
          <div className={currentRoute === "/page/cv" ? "active" : ""}>CV</div>
        </Link>
        <Link
          href="/page/incrementation"
          passHref
          className="link"
          style={{
            color: theme.color4,
          }}
          onClick={closeMenuBurger}
        >
          <div
            className={currentRoute === "/page/incrementation" ? "active" : ""}
          >
            Increment
          </div>
        </Link>
        <Link
          href="/page/testApi"
          passHref
          className="link"
          style={{
            color: theme.color4,
          }}
          onClick={closeMenuBurger}
        >
          <div className={currentRoute === "/page/testApi" ? "active" : ""}>
            Api
          </div>
        </Link>

        <Link
          href="/page/compteur"
          passHref
          className="link"
          style={{
            color: theme.color4,
          }}
          onClick={closeMenuBurger}
        >
          <div className={currentRoute === "/page/compteur" ? "active" : ""}>
            Compteur
          </div>
        </Link>
        <DropdownMenu
       //   isMenuOpen={isMenuOpen}
        //  closeMenu={closeDropdownMenu}
         // toggleMenu={() => setIsMenuOpen((prevState) => !prevState)}
        />
        <Link
          href="/page/searchbar"
          passHref
          className="link"
          style={{
            color: theme.color4,
          }}
          onClick={closeMenuBurger}
        >
          <div className={currentRoute === "/page/searchbar" ? "active" : ""}>
            SearchBar
          </div>
        </Link>
        <Link
          href="/page/contact"
          passHref
          className="link"
          style={{
            color: theme.color4,
          }}
          onClick={closeMenuBurger}
        >
          <div className={currentRoute === "/page/contact" ? "active" : ""}>
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
