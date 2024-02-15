//headercontext.js
"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  useRef,
} from "react";
import styles from "@/app/styles/header.module.css";
/**
 * Contexte global du composant HeaderProvider.
 * Ce contexte gère l'état du menu, du burger, et de la barre de navigation principale.
 */

const HeaderContext = createContext();

/**
 * Un hook personnalisé pour accéder au contexte HeaderProvider.
 * Ce hook permet aux composants enfants d'accéder aux états et fonctions de gestion du menu, du burger, et de la barre de navigation.
 * @returns {Object} Un objet contenant les valeurs du contexte.
 */

export const HeaderProvider = ({ children }) => {
  //Hook pour gestion du menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  //Hook pour gestion du burger nav
  const [burgerActive, setBurgerActive] = useState(false);
  //Hook pour gestion du toggle entre la nav principal et la nav du burger
  //  const [isNavOpen, setIsNavOpen] = useState(window.innerWidth >= 800);
  // Vérification de la disponibilité de localStorage
  const [isNavOpen, setIsNavOpen] = useState(window.innerWidth >= 801);

  const menuContainerRef = useRef(null);
  const dropdownMenuRef = useRef(null);

  // gestion du menu déroulant **************************************
  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  const closeDropdownMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  const toggleBurger = () => {
    setBurgerActive((prevBurgerActive) => !prevBurgerActive);
  };

  /**
   * Gère la fermeture du menu lorsque l'utilisateur clique en dehors de celui-ci.
   * Si le menu est déjà fermé, cette fonction ne fait rien.
   * Si l'utilisateur clique en dehors du menu (détecté par la classe "menu-container"),
   * elle appelle la fonction closeDropdownMenu pour fermer le menu.
   * @param {MouseEvent} e - L'événement de clic de la souris.
   */

  // Gestionnaire de clic pour fermer le menu lorsqu'on clique à l'extérieur
  const handleClickOutside = useCallback(
    (e) => {
      if (!isMenuOpen) return;

      if (
        dropdownMenuRef.current &&
        !dropdownMenuRef.current.contains(e.target)
      ) {
        closeDropdownMenu();
      }
    },
    [isMenuOpen, closeDropdownMenu]
  );
  // fin de gestion du menu déroulant***************************************

  /**
   * Gère le redimensionnement de la fenêtre et met à jour les états du burger et de la barre de navigation principale en conséquence.
   */

  // gestion de suppression du menu burger si sup. à 800px
  const handleWindowResize = useCallback(() => {
    const newWindowWidth = window.innerWidth;
    if (newWindowWidth >= 801) {
      setBurgerActive(false);
      setIsNavOpen(true);
    } else {
      setIsNavOpen(false);
    }
  }, [setBurgerActive, setIsNavOpen]);

  useEffect(() => {
    // Ajoutez des classes conditionnelles à la balise nav en fonction de burgerActive
    if (menuContainerRef.current) {
      if (burgerActive) {
        menuContainerRef.current.classList.add(styles["burger-active-nav"]);
      } else {
        menuContainerRef.current.classList.remove(styles["burger-active-nav"]);
      }
    }
  }, [burgerActive]);

  const closeMenuBurger = useCallback(() => {
    setBurgerActive(false);
  }, []);

  useEffect(() => {
    // Ajoutez l'écouteur de redimensionnement de la fenêtre lorsque le composant est monté
    window.addEventListener("resize", handleWindowResize);
    document.addEventListener("mousedown", handleClickOutside);
    // Nettoyez l'écouteur lorsque le composant est démonté
    return () => {
      window.removeEventListener("resize", handleWindowResize);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleWindowResize, handleClickOutside]);

  //fin de gestion d'ouverture et fermeture du burger menu et de la barre de navigation principale**************************************************

  return (
    <HeaderContext.Provider
      value={{
        isMenuOpen,
        setIsMenuOpen,
        toggleMenu,
        toggleBurger,
        burgerActive,
        isNavOpen,
        setBurgerActive,
        closeMenuBurger,
        closeDropdownMenu,
        dropdownMenuRef,
        menuContainerRef,
      }}
    >
      {children}
    </HeaderContext.Provider>
  );
};
export const useHeader = () => {
  return useContext(HeaderContext);
};
