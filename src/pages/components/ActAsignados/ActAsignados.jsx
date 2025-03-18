"use client";
import React from "react";
import styles from "./ActAsignados.module.css";

function ActAsignados() {
  const actividades = [
    {
      imageUrl:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/46a72c382f60145d3e04c544190d51fdd05b956c",
      actividad: "Senderismo",
      lugar: "Sabas Nieves",
      fecha: "10/02/2025",
      hora: "10:00 am",
    },
    {
      imageUrl:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/46a72c382f60145d3e04c544190d51fdd05b956c",
      actividad: "Ciclismo",
      lugar: "El Ávila",
      fecha: "15/03/2025",
      hora: "08:00 am",
    },
    // Agrega más actividades aquí
  ];

  const ActividadCard = ({ imageUrl, actividad, lugar, fecha, hora }) => {
    return (
      <section className={styles.content}>
        <article className={styles.imageCard}>
          <img src={imageUrl} alt="Activity" className={styles.trailImage} />
          <div className={styles.tagWrapper}>
            <span className={styles.activityTag}>{actividad}</span>
          </div>
        </article>
        <article className={styles.details}>
          <h2 className={styles.locationTitle}>{lugar}</h2>
          <div className={styles.scheduleInfo}>
            <p className={styles.scheduleRow}>
              <strong className={styles.label}>Fecha pautada:</strong>
              <span className={styles.value}>{fecha}</span>
            </p>
            <p className={styles.scheduleRow}>
              <strong className={styles.label}>Hora:</strong>
              <span className={styles.value}>{hora}</span>
            </p>
          </div>
          <div className={styles.buttonContainer}>
            <button className={styles.participantsButton}>
              Ver Participantes
            </button>
          </div>
        </article>
      </section>
    );
  };

  return (
    <main className={styles.container}>
      <link
        href="https://fonts.googleapis.com/css2?family=Figtree:wght@400;700&display=swap"
        rel="stylesheet"
      />
      <h1 className={styles.heading}>Actividades Asignadas</h1>
      {actividades.map((actividad, index) => (
        <ActividadCard key={index} {...actividad} />
      ))}
    </main>
  );
}

export default ActAsignados;