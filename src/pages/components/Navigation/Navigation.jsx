import React from "react";
import styles from "./Navigation.module.css";
import logoSI from '/logoSI.png'

function Navigation() {
    return (
        <nav className={styles.navigation}>
          <img
            src={logoSI} className={styles.logo} alt="SN logo" 
          />
          <h1 className={styles.brand}>Sendero Naranja</h1>
          <ul className={styles.navLinks}>
            <li>
              <a href="#destinations" className={styles.navLink}>
                Destinos
              </a>
            </li>
            <li>
              <a href="#about" className={styles.navLink}>
                Sobre Nosotros
              </a>
            </li>
            <li>
              <a href="#gallery" className={styles.navLink}>
                Galeria
              </a>
            </li>
                <a href="perfil">
                <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/1cba45b34d42aeba2e4dd2b7ba764ec3e19452406f2e1c69f3204903f6cddab5?placeholderIfAbsent=true&apiKey=2b87a35b18524de3a0e8a8f5cf91b8a5"
                    alt="Menu"
                    className={styles.menuIcon}
                />
                </a>
          </ul>
         
        </nav>
      );
  }
  
  export default Navigation;
