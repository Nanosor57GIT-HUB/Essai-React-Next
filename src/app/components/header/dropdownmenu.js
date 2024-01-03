// DropdownMenu.js
import React, { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useTheme } from "@/app/context/themecontext";
import { useHeader } from "@/app/context/headercontext";
import { usePathname } from "next/navigation";


const DropdownMenu = () => {
    const { theme } = useTheme();
    const { isMenuOpen, closeMenuBurger, closeDropdownMenu, toggleMenu, dropdownMenuRef } = useHeader()
    
    const currentRoute = usePathname();

  const [isMenuToggleActive, setIsMenuToggleActive] = useState(false);

  
  const handleLinkClick = useCallback(() => {
    closeMenuBurger();
    closeDropdownMenu();
    setIsMenuToggleActive(true); // Activer le bouton de menu-toggle lorsque le lien est cliqué
  }, [closeMenuBurger, closeDropdownMenu]);

  useEffect(() => {
    // Désactive le bouton de menu-toggle lorsque la route change, à moins que ce ne soit un lien du menu
    if (!currentRoute.startsWith("/pages/lotoGame") && !currentRoute.startsWith("/page/threeShellGame")) {
      setIsMenuToggleActive(false);
    }
  }, [currentRoute]);


// Mettre à jour setIsMenuToggleActive en fonction de l'état du menu ou du lien actif
useEffect(() => {
  setIsMenuToggleActive(isMenuOpen || currentRoute.startsWith("/pages/lotoGame") || currentRoute.startsWith("/pages/threeShellGame"));
}, [isMenuOpen, currentRoute]);



    // Menu du déroulant
    const dropdownMenu = useMemo(() => {
      return isMenuOpen ? (
        <div
          className={`dropdown-menu show`}
          style={{
            border: theme.border2,
            borderTop: theme.borderTop,
          }}
        >
          <ul>
            <li className="limenu">
              <Link
                href="/pages/lotoGame"
                as="/pages/lotoGame"
                className="link"
                style={{
                  color: theme.color4,
                  transition: "color 0.5s",
                }}
                onClick={() => {
                  handleLinkClick()
                
                }}
              >
                <div
                  className={`linkmenu ${
                    currentRoute === "/pages/lotoGame" ? "active" : ""
                  }`}
                >
                  Loto
                </div>
              </Link>
            </li>
            <li className="limenu">
              <Link
                href="/pages/threeShellGame"
                as="/pages/threeShellGame"
                className="link"
                style={{
                  color: theme.color4,
                  transition: "color 0.5s",
                }}
                onClick={() => {
                  handleLinkClick()
                
                }}
              >
                <div
                  className={`linkmenu ${
                    currentRoute === "/pages/threeShellGame" ? "active" : ""
                  }`}
                >
                  Bonneteau
                </div>
              </Link>
            </li>
          </ul>
        </div>
      ) : null;
    }, [isMenuOpen, currentRoute, theme.color4, theme.border2, theme.borderTop, handleLinkClick]);

    
  
    const menuToggleClass = isMenuToggleActive ? "active" : "";
  

  

    return (
      <div className="menu-container" ref={dropdownMenuRef} >
        <div className={`menu-toggle ${menuToggleClass}`}  onClick={toggleMenu} style={{ color: theme.color4 }}>
          Games
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 320 512"
            className={`caretdropdown ${isMenuOpen ? "rotatecaretmenu" : ""}`}
            fill="yellowgreen"
            width={25}
            height={25}
            style={{
              fill: theme.fill2,
            }}
          >
            <path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z" />
          </svg>
        </div>
        {isMenuOpen && dropdownMenu}
      </div>
    );
  };

  export default DropdownMenu;