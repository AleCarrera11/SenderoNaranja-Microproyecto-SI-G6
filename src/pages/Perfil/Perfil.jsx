import React, { useState, useEffect } from "react";
import Perfil1 from "../Registration/Perfil1";
import ActAsignados from "../components/ActAsignados/ActAsignados";
import { Footer } from "../components/Footer/Footer";
import ActividadesReservadas from "../components/ActividadesReservadas/ActividadesReservadas";
import { auth } from "../../credenciales";
import styles from "./Perfil.module.css";

function Perfil() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className={styles.container}>
      <main className={styles.mainContent}>
        <div className={styles.profileSection}>
          <Perfil1 />
        </div>
        <div className={styles.activitiesSection}>
          {currentUser && currentUser.tipoUser === "Estudiante" && <ActividadesReservadas />}
          {currentUser && currentUser.tipoUser === "Guía" && <ActAsignados />}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Perfil;
