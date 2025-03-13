import React from "react";
import styles from "./Navigation.module.css";
import logoSI from '/logoSI.png';
import { Link, useLocation } from 'react-router'; // Importa Link y useLocation

function Navigation() {
  const location = useLocation(); // Obtiene la ubicación actual

  return (
    <nav className={styles.navigation}>
      <img src={logoSI} className={styles.logo} alt="SN logo" />
      <h1 className={styles.brand}>Sendero Naranja</h1>
      <ul className={styles.navLinks}>
        <li>
          <Link to="/destinos" className={styles.navLink}>
            Destinos
          </Link>
        </li>
        <li>
          <Link to="/about1" className={styles.navLink}>
            Sobre Nosotros
          </Link>
        </li>
        <li>
          <Link to="/gallery" className={styles.navLink}>
            Galeria
          </Link>
        </li>
        {location.pathname === "/perfil" ? (
          <li>
            <button className={styles.loginButton} onClick={() => {
              console.log("Cerrar sesión");
              window.location.href = "/";
            }}>
              Cerrar Sesión
            </button>
          </li>
        ) : (
          <li>
            <Link to="/perfil">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/1cba45b34d42aeba2e4dd2b7ba764ec3e19452406f2e1c69f3204903f6cddab5?placeholderIfAbsent=true&apiKey=2b87a35b18524de3a0e8a8f5cf91b8a5"
                alt="Menu"
                className={styles.menuIcon}
              />
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navigation;