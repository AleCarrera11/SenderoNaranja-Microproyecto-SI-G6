import React, { useState, useEffect, use } from "react";
import Perfil1 from "../Registration/Perfil1";
import ActAsignados from "../components/ActAsignados/ActAsignados";
import { Footer } from "../components/Footer/Footer";
import ActividadesReservadas from "../components/ActividadesReservadas/ActividadesReservadas";
import { auth } from "../../credenciales";
import styles from "./Perfil.module.css";
import { UserContext } from "../../Context/UserContex";

function Perfil() {
    const { profile } = use(UserContext); // Accede al perfil del usuario
    const isAdmin = profile?.tipoUser === "Administrador"; // Verifica si es Administrador

  return (
    <div className={styles.container}>
      <main className={styles.mainContent}>
        <div className={styles.profileSection}>
          <Perfil1 />
        </div>
        <div className={styles.activitiesSection}>
        {!isAdmin && ( // Condición simplificada usando isAdmin
            <>
              {profile?.tipoUser == "Estudiante" && <ActividadesReservadas userId={profile.uid} />}
              {profile?.tipoUser === "Guía" && <ActAsignados />}
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Perfil;
