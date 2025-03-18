"use client";
import React from "react";
import { Footer } from "../components/Footer/Footer";
import styles from "./ConservationPage.module.css";

function ConservationPage() {
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Figtree:wght@300;400;600;700&family=Reddit+Sans:wght@400;500&display=swap"
        rel="stylesheet"
      />
      <main className={styles.pageContainer}>
        <section className={styles.mainContent}>
          <h2 className={styles.mainTitle}>IMPORTANCIA DE LA CONSERVACIÓN</h2>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/0f10f29d27c3b1d7006582e1dda73d7099aca50e"
            alt="Parque Nacional El Ávila"
            className={styles.heroImage}
          />
          <p className={styles.mainDescription}>
            La conservación del Parque Nacional El Ávila es vital para preservar su
            rica biodiversidad y garantizar la provisión de agua a Caracas. Su
            protección asegura un pulmón verde esencial y un espacio recreativo
            invaluable para las generaciones futuras.
          </p>
          <h3 className={styles.subTitle}>¿Cómo preservar nuestro parque?</h3>
          <div className={styles.preservationTips}>
            <p className={styles.tipItem}>
              <strong>No dejes rastro:</strong> Lleva contigo toda la basura que
              generes.
            </p>
            <p className={styles.tipItem}>
              <strong>Respeta las normas del parque:</strong> Sigue las indicaciones
              de los guardaparques y respeta las áreas restringidas.
            </p>
            <p className={styles.tipItem}>
              <strong>Apoya el turismo sostenible:</strong> Apoya a los negocios
              locales que promueven prácticas sostenibles.
            </p>
          </div>
        </section>
        <Footer />
      </main>
    </>
  );
}

export default ConservationPage;