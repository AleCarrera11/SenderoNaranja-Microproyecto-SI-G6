import React from "react";
import styles from "./Page1.module.css";
import img1hp from '/Img1HP.png'
import img2hp from '/Img2HP.png'

export function Page1() {
  return (
    <div className={styles.pageContainer}> {/* Container principal para centrar todo */}
      <section className={styles.hero}>
        <div className={styles.content}>
          <div className={styles.textContent}>
            <h2 className={styles.heading}>
              CONOCE LAS MEJORES <span className={styles.highlight}>RUTAS</span>{" "}
              DE <br />
              EL ÁVILA
            </h2>
            <a href="/login" className={styles.ctaButton}>
              TOP RUTAS
            </a>
          </div>
          <div className={styles.imageContainer}>
            <img
              src= {img1hp}
              alt="El Ávila landscape"
              className={styles.heroImage}
            />
          </div>
        </div>
      </section>
      <section className={styles.mission}>
        <div className={styles.content}>
          <div className={styles.imageContainer}>
            <img
              src={img2hp}
              alt="Mission illustration"
              className={styles.missionImage}
            />
          </div>
          <div className={styles.textContent}>
            <h2 className={styles.heading}>NUESTRA MISIÓN</h2>
            <p className={styles.description}>
              En Sendero Naranja, creemos en el poder transformador de la
              naturaleza. Nuestra misión es conectar a las personas con la
              majestuosidad del Parque Nacional El Ávila, fomentando un amor
              profundo por la biodiversidad y el medio ambiente.
              <br />
              <br />
              Ofrecemos experiencias únicas y seguras, diseñadas para todos los
              niveles de excursionistas, desde principiantes hasta aventureros
              experimentados.
              <br />
              <br />
              Únete a nosotros para explorar senderos espectaculares, descubrir la
              rica fauna y flora, y disfrutar de momentos inolvidables en la
              cumbre de Caracas.
            </p>
          </div>
        </div>
        <p className={styles.callout}>
          ¡Embárcate en una aventura con nosotros y deja que El Ávila te inspire!
        </p>
      </section>
    </div>
  );
}