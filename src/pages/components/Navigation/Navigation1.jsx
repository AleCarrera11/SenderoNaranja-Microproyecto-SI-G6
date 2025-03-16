import React, { use } from "react";
import { Link, Outlet, useLocation, useNavigate} from "react-router";
import styles from "./Navigation.module.css";
import logoSI from "/logoSI.png";
import { UserContext } from "../../../Context/UserContex";
import { getAuth, signOut } from "firebase/auth";
import { app } from "../../../credenciales";

const auth = getAuth(app);

export function Navigation1() {
  const { logged } = use(UserContext);
  const location = useLocation(); // Detecta la URL actual
  const navigate = useNavigate(); // Para redirigir después del logout

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/"); // Redirige a la página principal después de cerrar sesión
  };

  return (
    <>
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
            <Link to="/about" className={styles.navLink}>
              Sobre Nosotros
            </Link>
          </li>
          <li>
            <Link to="/gallery" className={styles.navLink}>
              Galería
            </Link>
          </li>

          {logged ? (
            location.pathname === "/perfil" ? (
              <li>
                <button className={styles.loginButton} onClick={handleLogout}>
                  Cerrar Sesión
                </button>
              </li>
            ) : (
              <li>
                <Link to="/perfil">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/1cba45b34d42aeba2e4dd2b7ba764ec3e19452406f2e1c69f3204903f6cddab5?placeholderIfAbsent=true&apiKey=2b87a35b18524de3a0e8a8f5cf91b8a5"
                    alt="Perfil"
                    className={styles.menuIcon}
                  />
                </Link>
              </li>
            )
          ) : (
            <>
              <li>
                <Link to="/register" className={styles.navLink}>
                  Registrarte
                </Link>
              </li>
              <li>
                <Link to="/login" className={styles.loginButton}>
                  Iniciar Sesión
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>

      <Outlet />
    </>
  );
}
