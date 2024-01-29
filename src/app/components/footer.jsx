"use client"

import styles from "@/app/styles/footer.module.css"
import { useTheme } from "../context/themecontext";

const Footer = () => {
    const { theme } = useTheme();
    return (
        <>
        <div className={styles.footer}>
            <h3 className={styles.titlefooter}  style={{
            color: theme.color4,
          }}>Copyright &copy; MyPortfolioInline</h3>
            </div>
        </>
    );
};

export default Footer;