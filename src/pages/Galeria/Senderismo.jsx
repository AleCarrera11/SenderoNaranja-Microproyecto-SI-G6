"use client";
import React from "react";
import { Footer } from "../components/Footer/Footer";
import styles from "./Senderismo.module.css";

function Senderismo() {
  return (
    <div className={styles.pageContainer}>
      <main className={styles.mainContent}>
        <h1 className={styles.mainTitle}>TIPS PARA HACER SENDERISMO</h1>
        <p className={styles.introduction}>
          El senderismo es una excelente manera de conectar con la naturaleza y
          mejorar tu salud. Prepárate bien, elige rutas adecuadas y disfruta del
          camino. ¡La aventura te espera!
        </p>
        <h2 className={styles.subtitle}>
          Sigue estos pasos para hacer senderismo de la mejor forma:
        </h2>
        <section className={styles.tipsList}>
          <article>
            <strong className={styles.tipTitle}>Planifica tu ruta:</strong>
            <span>
              Investiga la dificultad, la distancia y el tiempo estimado de la
              ruta. Asegúrate de que se adapte a tu nivel de experiencia y
              condición física.
            </span>
          </article>
          <article>
            <strong className={styles.tipTitle}>Lleva el equipo adecuado:</strong>
            <span>
              Usa calzado cómodo y resistente, ropa adecuada para el clima,
              protector solar, sombrero, agua y comida suficiente. No olvides un
              mapa o GPS y un botiquín de primeros auxilios.
            </span>
          </article>
          <article>
            <strong className={styles.tipTitle}>Respeta la naturaleza:</strong>
            <span>
              No dejes basura, no hagas ruido excesivo y no te salgas de los
              senderos marcados. Disfruta del entorno de forma responsable.
            </span>
          </article>
        </section>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/5c2754917fa67723214d779564639dcfbe8f095a"
          alt="Hiking"
          className={styles.hikingImage}
        />
      </main>
      <Footer />
    </div>
  );
}

export default Senderismo;