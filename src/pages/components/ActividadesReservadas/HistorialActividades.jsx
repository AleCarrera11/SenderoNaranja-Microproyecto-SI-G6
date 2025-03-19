"use client";
import React from "react";
import styles from "./HistorialActividades.module.css";

// RatingDisplay Component
function RatingDisplay({ rating }) {
  return (
    <div className={styles.ratingSection}>
      <h3 className={styles.ratingTitle}>Tu calificación:</h3>
      <img
        src={rating}
        alt="Calificación con estrellas"
        className={styles.ratingStars}
      />
    </div>
  );
}

// ForumComment Component
function ForumComment({ comment }) {
  return (
    <div className={styles.forumSection}>
      <h3 className={styles.forumTitle}>Comentario:</h3>
      <div className={styles.commentContainer}>
        <div className={styles.commentContent}>
          <p className={styles.commentText}>"{comment}".</p>
        </div>
      </div>
    </div>
  );
}

// ActivityCard Component
function ActivityCard({
  name,
  date,
  guide,
  participants,
  rating,
  comment,
  image,
}) {
  return (
    <article className={styles.activityCard}>
      <div className={styles.cardContent}>
        <div className={styles.column}>
          <img
            src={image}
            alt={`Imagen de ${name}`}
            className={styles.activityImage}
          />
        </div>
        <div className={styles.detailsColumn}>
          <div className={styles.activityDetails}>
            <h2 className={styles.activityName}>{name}</h2>
            <p className={styles.activityInfo}>
              Fecha que se realizó:{" "}
              <span className={styles.lightText}>{date}</span>
              <br />
              Guía asignado: <span className={styles.lightText}>{guide}</span>
              <br />
              Participantes:{" "}
              <span className={styles.lightText}>{participants}</span>
            </p>
            <div className={styles.feedbackSection}>
              <div className={styles.ratingColumn}>
                <RatingDisplay rating={rating} />
              </div>
              <div className={styles.commentColumn}>
                <ForumComment comment={comment} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

// Main HistorialActividades Component
function HistorialActividades({onClose}) {
  const activities = [
    {
      id: 1,
      name: "Quebrada Quintero",
      date: "20/01/25",
      guide: "Antonio López",
      participants: "13/25",
      rating:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/15ac0b0fe6590c1d086dfcc00c8af2af497752608dba465ee631877ac130505f?placeholderIfAbsent=true&apiKey=b35c72053759436189f8972d183adf0c",
      comment:
        "La actividad me parecio divertida 😝 a pesar de los inconvenientes que tuvimos con la lluvia 😢 El paseo se me hizo ligero y la ruta era agradable, detalle varios tipos de plantas y animales",
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/9e90bc12aacc565515c9985f5a8a49b0187c73a510d308294d40a92124d47bed?placeholderIfAbsent=true&apiKey=b35c72053759436189f8972d183adf0c",
    },
    {
      id: 2,
      name: "Camino de los Españoles",
      date: "08/01/25",
      guide: "Germán Andrade",
      participants: "15/15",
      rating:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/e26facd9cd8ebf4f90cd283533feb6a3dd706a5fad2383363b6553bae60f0bf2?placeholderIfAbsent=true&apiKey=b35c72053759436189f8972d183adf0c",
      comment:
        "La ruta se me hizo muy complicada 😭 Pero pude completarla a pesar de los desafíos! Me gustó mucho el trasfondo cultural y todas las construcciones que se ven 🧐",
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/512c03f77ea39e043285d3994c7c754ba47dc342c43c79897229a83c3101e15f?placeholderIfAbsent=true&apiKey=b35c72053759436189f8972d183adf0c",
    },
  ];

  return (
    <section className={styles.historialactividades}>
      <header className={styles.header}>
        <h1 className={styles.historialdeactividades}>
          Historial de actividades
        </h1>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/f86d4e47ee3c75386ded66b978574b311788d76f2e80ca0bcc3a292c7fee4622?placeholderIfAbsent=true&apiKey=b35c72053759436189f8972d183adf0c"
          alt="Actividades icon"
          className={styles.headerIcon}
          onClick={onClose}
        />
      </header>

      {activities.map((activity) => (
        <ActivityCard
          key={activity.id}
          name={activity.name}
          date={activity.date}
          guide={activity.guide}
          participants={activity.participants}
          rating={activity.rating}
          comment={activity.comment}
          image={activity.image}
        />
      ))}
    </section>
  );
}

export default HistorialActividades;
