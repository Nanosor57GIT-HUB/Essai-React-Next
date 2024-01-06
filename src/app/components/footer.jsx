"use client"

import { useTheme } from "../context/themecontext";

const Footer = () => {
    const { theme } = useTheme();
  // const { theme, toggleTheme, isMenuOpen, setIsMenuOpen, closeMenu, toggleMenu } = useRoot(); // Utilisez useRoot
    return (
        <>
        <div className="footer">
            <h3 className='titlefooter'  style={{
            color: theme.color4,
          }}>Copyright &copy; MyPortfolioInline</h3>
            </div>
        </>
    );
};

export default Footer;