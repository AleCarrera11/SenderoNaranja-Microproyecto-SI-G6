"use client";
import React, { useContext, useEffect, useState } from "react";
import styles from "./Comentario.module.css";
import { collection, addDoc, onSnapshot, getFirestore } from "firebase/firestore";
import { app } from "../../../credenciales.js";
import { UserContext } from "../../../Context/UserContex";
import logoSI from "/logoSI.png";
import { Link, useParams } from "react-router";

const db = getFirestore(app);

const StarRating = ({ rating }) => {
  return (
    <div className={styles.starRating}>
      {[...Array(5)].map((_, index) => {
        const starValue = index + 1;
        return (
          <img
            key={index}
            src={
              starValue <= rating
                ? "https://cdn.builder.io/api/v1/image/assets/TEMP/af9501b3840757d6ca32944f8fe9c641d0ca15c3721bc0165797e288fad4afd4?placeholderIfAbsent=true&apiKey=ed74dcfaa95a44a29728b63f96c1becf"
                : "https://cdn.builder.io/api/v1/image/assets/TEMP/af9501b3840757d6ca32944f8fe9c641d0ca15c3721bc0165797e288fad4afd4?placeholderIfAbsent=true&apiKey=ed74dcfaa95a44a29728b63f96c1becf&color=grey"
            }
            alt="star"
            className={styles.starIcon}
          />
        );
      })}
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
  const [rating, setRating] = useState(0);

  const handleSubmit = () => {
    if (rating < 1 || rating > 5) {
      alert("Por favor, ingresa un número entre 1 y 5 para la calificación.");
      return;
    }
    onCommentSubmit(comentario, rating);
    setComentario("");
    setRating(0);
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
      <input
        type="number"
        min="1"
        max="5"
        placeholder="Calificación (1-5)"
        className={styles.ratingInput}
        value={rating}
        onChange={(e) => setRating(parseInt(e.target.value))}
      />
      <StarRating rating={rating} />
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
        <span className={styles.ratingScore}>{rating.toFixed(1)}</span>
        <div className={styles.reviewsCount}>
          <StarRating rating={Math.round(rating)} />
          <p className={styles.reviewsText}>{totalReviews} calificaciones</p>
        </div>
      </div>
    </header>
  );
};

const Comentarios = () => {
  const [comentarios, setComentarios] = useState([]);
  const [usuario, setUsuario] = useState("Usuario Anónimo");
  const [activity, setactivity] = useState("");
  const { profile } = useContext(UserContext); // Accede a la información del usuario
  const [actividad, setActividad] = useState(null);
  const { nombreActividad } = useParams();

  useEffect(() => {
      const fetchActividad = async () => {
        const q = query(collection(db, "destinos"), where("nombreActividad", "==", nombreActividad));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          setActividad(querySnapshot.docs[0].data());
        }
      };
  
      fetchActividad();
    }, [nombreActividad]);


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
  const handleAgregarComentario = async (comentario, rating) => {
    if (profile?.tipoUser === "Estudiante") {

      const title = "Comentario";
      if (comentario.trim() !== "") {
        try {
          await addDoc(collection(db, "comentarios"), {
            usuario: profile?.nombre && profile?.apellido
              ? `${profile.nombre} ${profile.apellido}`
              : "Usuario Anónimo",
            title: title,
            comentario: comentario,
            rating: rating,
            activity: nombreActividad,
            avatarUrl: profile?.foto_perfil || logoSI, // Usa la foto del usuario o un valor predeterminado
            fecha: new Date().toISOString(),
          });
        } catch (error) {
          console.error("Error al agregar el comentario: ", error);
        }
      }
    }
  };
  
  // Calcular el rating promedio
  const averageRating = comentarios.filter((comentario) => comentario.activity === nombreActividad).reduce((acc, curr) => acc + curr.rating, 0) / comentarios.filter((comentario) => comentario.activity === nombreActividad).length;

  const filtroActividad = comentarios.filter((comentario) => comentario.activity === nombreActividad);

  const comentarioslength = filtroActividad.length; 
  
  return (
    <section className={styles.commentsContainer}>
      <div className={styles.divider} />
      <RatingSummary rating={averageRating} totalReviews={comentarioslength} />

      <div className={styles.reviewsList}>
      {filtroActividad.map((comentario) => (
        <ReviewCard
          key={comentario.id}
          avatarUrl={comentario.avatarUrl}
          userName={comentario.usuario}
          rating={comentario.rating}
          title={comentario.title}
          review={comentario.comentario}
        />
      ))}
    </div>

      <CommentInput
        avatarUrl={profile?.foto_perfil || logoSI}
        onCommentSubmit={handleAgregarComentario}
      />
    </section>
  );
};

export default Comentarios;