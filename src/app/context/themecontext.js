"use client";
// Themecontext.js
import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const originalTheme = {
    background: "yellowgreen",
    border: "2px solid #2c75ff",
    color: "",
  };

  // Fonction pour mettre à jour le thème dans sessionStorage
  const updateSessionStorageTheme = (newTheme) => {
    sessionStorage.setItem("theme", JSON.stringify(newTheme));
  };

  const [theme, setTheme] = useState(originalTheme);
  const [isThemeReady, setIsThemeReady] = useState(false); // État pour gérer si le thème est prêt

  useEffect(() => {
    // Charger le thème depuis sessionStorage lors du montage du composant
    if (
      typeof window !== "undefined" &&
      typeof window.sessionStorage !== "undefined"
    ) {
      const storedTheme = JSON.parse(sessionStorage.getItem("theme"));
      if (storedTheme) {
        setTheme(storedTheme);
        setIsThemeReady(true); // Indique que le thème est prêt
      } else {
        setIsThemeReady(true); // Si aucun thème n'est stocké, indique quand même que le thème est prêt
      }
    } else {
      setIsThemeReady(true); // Si window ou sessionStorage ne sont pas disponibles, indique que le thème est prêt
    }
  }, []);

  // Fonction pour mettre à jour le thème
  const updateTheme = (newTheme) => {
    setTheme(newTheme);
    updateSessionStorageTheme(newTheme);
  };

  // Fonction pour réinitialiser le thème
  const resetTheme = () => {
    setTheme(originalTheme);
    updateSessionStorageTheme(originalTheme);
  };

  // Fonction pour basculer le thème
  const toggleTheme = () => {
    if (theme.color === originalTheme.color) {
      updateTheme({
        background: "#0F056B",
        background2: "yellowgreen",
        background3: "#333333",
        border: "2px solid #2c75ff",
        border2: "2px solid yellowgreen",
        borderTop: "2px solid #333333",
        textShadow: "1px 1px 1px aquamarine",
        textShadow2: "1px 1px 1px #2c75ff",
        textShadow3: "1px 1px 1px yellowgreen",
        textShadow4: "1px 1px 3px #333333",
        color: "aquamarine",
        color2: "Yellowgreen",
        color3: "#2c75ff",
        color4: "#1e51b2",
        color5: "#333333",
        active: "#aquamarine",
        fill: "yellowgreen",
        fill2: "#2c75ff",
        filter: "drop-shadow(1px 1px 3px #2c75ff)",
        filter2: "drop-shadow(1px 1px 3px yellowgreen)",
        filter3: "drop-shadow(1px 1px 3px aquamarine)",
        filter4: "drop-shadow(1px 1px 3px #333333)",
        filterExchangeLogo: " drop-shadow(1px 1px 0.01rem aquamarine) contrast(80%)",
      });
    } else {
      resetTheme();
    }
  };

  return (
    <ThemeContext.Provider
      value={{ theme, updateTheme, resetTheme, toggleTheme }}
    >
      {isThemeReady ? children : null}{" "}
      {/* Affiche les enfants uniquement lorsque le thème est prêt */}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  return useContext(ThemeContext);
};
