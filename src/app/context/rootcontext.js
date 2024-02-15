// RootContext.js
"use client";

import React, { createContext, useContext } from "react";
import { ThemeProvider } from "./themecontext";
import { HeaderProvider } from "./headercontext";

const RootContext = createContext();

export const RootProvider = ({ children }) => {
  // Créez un objet contenant les fournisseurs de contexte
  const contextValue = {
    ThemeProvider,
    HeaderProvider,
    // Ajoutez d'autres valeurs si nécessaire
  };

  return (
    <RootContext.Provider value={contextValue}>
      <ThemeProvider>
        <HeaderProvider>{children}</HeaderProvider>
      </ThemeProvider>
    </RootContext.Provider>
  );
};

export const useRoot = () => {
  return useContext(RootContext);
};
