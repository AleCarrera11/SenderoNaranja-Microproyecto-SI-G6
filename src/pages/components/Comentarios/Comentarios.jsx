"use client";
import React, { useEffect, useState } from "react";
import styles from "./Comentario.module.css";
import { collection, addDoc, onSnapshot, getFirestore } from "firebase/firestore";
import { app } from "../../../credenciales.js";
const db = getFirestore(app);

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
      <img src={avatarUrl} alt={`${userName} avatar`} className={styles.userAvatar} />
      <div className={styles.reviewContent}>
        <h3 className={styles.userName}>{userName}</h3>
        <StarRating rating={rating} />
        <h4 className={styles.reviewTitle}>{title}</h4>
        <p className={styles.reviewText}>{review}</p>
      </div>
    </article>
  );
};

const CommentInput = ({ avatarUrl, onCommentSubmit }) => {
  const [comentario, setComentario] = useState("");

  const handleSubmit = () => {
    onCommentSubmit(comentario);
    setComentario("");
  };

  return (
    <div className={styles.commentInputContainer}>
      <img src={avatarUrl} alt="User avatar" className={styles.userAvatar} />
      <input
        type="text"
        placeholder="Agregar Comentario...."
        className={styles.commentInput}
        value={comentario}
        onChange={(e) => setComentario(e.target.value)}
      />
      <button onClick={handleSubmit} className={styles.commentButton}>
        Enviar
      </button>
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
  const [comentarios, setComentarios] = useState([]);
  const [usuario, setUsuario] = useState("Usuario Anónimo");
  const [rating, setRating] = useState(0);
  const [activityid, setactivityid] = useState("");

  // Obtener comentarios de Firestore
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "comentarios"), (snapshot) => {
      const comentariosList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setComentarios(comentariosList);
    });
    return () => unsubscribe();
  }, []);

  // Función para agregar un comentario
  const handleAgregarComentario = async (comentario) => {
    
    //if ()         (agregar un filtro para que sea solo para estudiantes)
    const title="Comentario";
    if (comentario.trim() !== "") {
      try {
        await addDoc(collection(db, "comentarios"), {
          usuario: usuario,
          title: title,
          comentario: comentario,
          rating: rating,
          activityid: activityid,
          fecha: new Date().toISOString(),
        });
      } catch (error) {
        console.error("Error al agregar el comentario: ", error);
      }
    }
  };
  return (
    <section className={styles.commentsContainer}>
      <div className={styles.divider} />
      <RatingSummary rating="4,6" totalReviews={comentarios.length} />

      <div className={styles.reviewsList}>
        {comentarios.map((comentario) => (
          <ReviewCard
          //filtro de actividad
            key={comentario.id}
            avatarUrl="/logoSI.png" //imagen usuario (falta agregar)
            userName={comentario.usuario}
            rating={comentario.rating}
            title={comentario.title}
            review={comentario.comentario}
          />
        ))}
      </div>

      <CommentInput
        avatarUrl="/logoSI.png"
        onCommentSubmit={handleAgregarComentario}
      />
    </section>
  );
};

export default Comentarios;
