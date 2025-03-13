"use client";
import React from "react";
import styles from "./Comentario.module.css";

const StarRating = ({ rating }) => {
  return (
    <div className={styles.starRating}>
      {[...Array(rating)].map((_, index) => (
        <img
          key={index}
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/af9501b3840757d6ca32944f8fe9c641d0ca15c3721bc0165797e288fad4afd4?placeholderIfAbsent=true&apiKey=ed74dcfaa95a44a29728b63f96c1becf"
          alt="star"
          className={styles.starIcon}
        />
      ))}
    </div>
  );
};

const ReviewCard = ({ avatarUrl, userName, rating, title, review }) => {
  return (
    <article className={styles.reviewCard}>
      <img
        src={avatarUrl}
        alt={`${userName} avatar`}
        className={styles.userAvatar}
      />
      <div className={styles.reviewContent}>
        <h3 className={styles.userName}>{userName}</h3>
        <StarRating rating={rating} />
        <h4 className={styles.reviewTitle}>{title}</h4>
        <p className={styles.reviewText}>{review}</p>
      </div>
    </article>
  );
};

const CommentInput = ({ avatarUrl }) => {
  return (
    <div className={styles.commentInputContainer}>
      <img src={avatarUrl} alt="User avatar" className={styles.userAvatar} />
      <input
        type="text"
        placeholder="Agregar Comentario...."
        className={styles.commentInput}
      />
    </div>
  );
};

const RatingSummary = ({ rating, totalReviews }) => {
  return (
    <header className={styles.ratingSummary}>
      <h2 className={styles.sectionTitle}>Comentarios</h2>
      <div className={styles.ratingContainer}>
        <span className={styles.ratingScore}>{rating}</span>
        <div className={styles.reviewsCount}>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/2546a29bd1d187d4c1bd35b3c2bebddb089d1a92ccec2fe79d1da5a6f6739eb9?placeholderIfAbsent=true&apiKey=ed74dcfaa95a44a29728b63f96c1becf"
            alt="Rating stars"
            className={styles.ratingStars}
          />
          <p className={styles.reviewsText}>{totalReviews} calificaciones</p>
        </div>
      </div>
    </header>
  );
};

const Comentarios = () => {
  return (
    <section className={styles.commentsContainer}>
      <div className={styles.divider} />
      <RatingSummary rating="4,6" totalReviews="2" />

      <div className={styles.reviewsList}>
        <ReviewCard
          avatarUrl="https://cdn.builder.io/api/v1/image/assets/TEMP/980495d11781124c2c66b3c060e8f393a2c8ed81dd9b8d7429b454160ea568b4?placeholderIfAbsent=true&apiKey=ed74dcfaa95a44a29728b63f96c1becf"
          userName="María Perez"
          rating={5}
          title="Increible"
          review="¡La subida a Sabas Nieves fue increíble! No solo disfruté de la naturaleza y el ejercicio, sino que también aprendí mucho sobre la flora y fauna del lugar gracias a nuestro guía."
        />

        <ReviewCard
          avatarUrl="https://cdn.builder.io/api/v1/image/assets/TEMP/980495d11781124c2c66b3c060e8f393a2c8ed81dd9b8d7429b454160ea568b4?placeholderIfAbsent=true&apiKey=ed74dcfaa95a44a29728b63f96c1becf"
          userName="María Perez"
          rating={5}
          title="Increible"
          review="¡La subida a Sabas Nieves fue increíble! No solo disfruté de la naturaleza y el ejercicio, sino que también aprendí mucho sobre la flora y fauna del lugar gracias a nuestro guía."
        />
      </div>

      <CommentInput avatarUrl="https://cdn.builder.io/api/v1/image/assets/TEMP/980495d11781124c2c66b3c060e8f393a2c8ed81dd9b8d7429b454160ea568b4?placeholderIfAbsent=true&apiKey=ed74dcfaa95a44a29728b63f96c1becf" />
    </section>
  );
};

export default Comentarios;
