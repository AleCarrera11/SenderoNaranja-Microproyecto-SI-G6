import React from "react";
import styles from "./Navigation.module.css";
import logoSI from '/logoSI.png'

export function Navigation1() {
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
        <li>
          <a href="#register" className={styles.navLink}>
            Registrarte
          </a>
        </li>
        <li>
        <button className={styles.loginButton}>Iniciar Sesión</button>
        </li>
      </ul>
     
    </nav>
  );
}
