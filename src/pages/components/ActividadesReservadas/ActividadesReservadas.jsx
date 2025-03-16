"use client";
import * as React from "react";
import styles from "./ActividadesReservadas.module.css";

const ActivityCard = ({
  imageSrc,
  title,
  date,
  guide,
  participants,
  description,
}) => {
  return (
    <article className={styles.activityCard}>
      <div className={styles.cardContent}>
        <div className={styles.imageColumn}>
          <img src={imageSrc} alt={title} className={styles.activityImage} />
        </div>
        <div className={styles.detailsColumn}>
          <div className={styles.detailsContent}>
            <h2 className={styles.activityTitle}>{title}</h2>
            <div className={styles.activityInfo}>
              Fecha pautada: <span className={styles.lightText}>{date}</span>
              <br />
              Guía asignado: <span className={styles.lightText}>{guide}</span>
              <br />
              Participantes:{" "}
              <span className={styles.lightText}>{participants}</span>
            </div>
            <p className={styles.activityDescription}>{description}</p>
          </div>
        </div>
      </div>
    </article>
  );
};

function ActividadesReservadas() {
  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <button className={styles.historyButton}>Historial</button>
        <h1 className={styles.title}>Actividades reservadas</h1>
      </header>
      <ActivityCard
        imageSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/47e1d40c51f05d2d2ec1ed2ef693f0e52d589535e6773ff98eefbc7f60cbd80f?placeholderIfAbsent=true&apiKey=ed74dcfaa95a44a29728b63f96c1becf"
        title="Sabas Nieves"
        date="dentro de 2 días"
        guide="Nombre Apellido"
        participants="06/10"
        description="La ruta de Sabas Nieves es la compañera ideal para tus aventuras al aire libre. Con un recorrido diseñado para todos los niveles de condición física, podrás sumergirte en la belleza del Ávila sin complicaciones. ¡Anímate a explorar este sendero y descubre la magia de la montaña!"
      />
    </section>
  );
}

export default ActividadesReservadas;
