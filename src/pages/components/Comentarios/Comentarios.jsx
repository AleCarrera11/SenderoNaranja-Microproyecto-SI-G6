"use client";
import React, { useContext, useEffect, useState } from "react";
import styles from "./Comentario.module.css";
import { collection, addDoc, onSnapshot, getFirestore, query, where, getDocs, updateDoc } from "firebase/firestore";
import { app } from "../../../credenciales.js";
import { UserContext } from "../../../Context/UserContex";
import logoSI from "/logoSI.png";
import { Link, useParams } from "react-router";
import { deleteDoc, doc } from "firebase/firestore";

const db = getFirestore(app);

const StarRating = ({ rating }) => {
  return (
    <div className={styles.starRating}>
      {[...Array(5)].map((_, index) => {
        const starValue = index + 1;
        return (
          <svg
            key={index}
            className={styles.starIcon}
            viewBox="0 0 24 24"
            fill={starValue <= rating ? "#ffc107" : "#ccc"}
          >
            <path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" />
          </svg>
        );
      })}
    </div>
  );
};

const ReviewCard = ({ comentario, avatarUrl, userName, rating, title, review, onDelete, profile }) => {
  const [respuesta, setRespuesta] = useState(comentario.respuesta || "");
  const [editando, setEditando] = useState(false);

  const handleResponder = async () => {
    if (respuesta.trim() !== "") {
      try {
        const comentarioRef = doc(db, "comentarios", comentario.id);
        await updateDoc(comentarioRef, { respuesta });
        setEditando(false);
      } catch (error) {
        console.error("Error al guardar la respuesta:", error);
      }
    }
  };

  return (
    <article className={styles.reviewCard}>
      <img src={avatarUrl} alt={`${userName} avatar`} className={styles.userAvatar} />
      <div className={styles.reviewContent}>
        <h3 className={styles.userName}>{userName}</h3>
        <StarRating rating={rating} />
        <h4 className={styles.reviewTitle}>{title}</h4>
        <p className={styles.reviewText}>{review}</p>

        {/* Mostrar respuesta si existe */}
        {comentario.respuesta && (
          <div className={styles.commentInputContainer}>
            <img src={avatarUrl} alt="User avatar" className={styles.userAvatar} />
            <div>
              <strong className={styles.reviewTitle}>
                Respuesta del Guía {profile?.nombre + " " + profile?.apellido}:
              </strong>
              <p className={styles.reviewText}>{comentario.respuesta}</p>
            </div>
          </div>
        )}

        {/* Área de respuesta para guías */}
        {profile?.tipoUser === "Guía" && (
          <div className={styles.commentInputContainer}>
            {editando ? (
              <>
                <input
                  type="text"
                  value={respuesta}
                  onChange={(e) => setRespuesta(e.target.value)}
                  className={styles.commentInput}
                  placeholder="Escribe una respuesta..."
                />
                <button onClick={handleResponder} className={styles.commentButton}>Responder</button>
                <button onClick={() => setEditando(false)} className={styles.commentButton}>Cancelar</button>
              </>
            ) : (
              <button onClick={() => setEditando(true)} className={styles.commentButton}>
                Responder
              </button>
            )}
          </div>
        )}
      </div>

      {profile?.tipoUser === "Administrador" && (
        <button className={styles.deleteButton} onClick={() => onDelete(comentario.id)}>Eliminar</button>
      )}
    </article>
  );
};

const CommentInput = ({ avatarUrl, onCommentSubmit }) => {
  const [comentario, setComentario] = useState("");
  const [rating, setRating] = useState(0);

  const handleSubmit = () => {
    if (rating === 0) {
      alert("Por favor, califica la actividad.");
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
      <div className={styles.starRating}>
        {[...Array(5)].map((_, index) => {
          const starValue = index + 1;
          return (
            <svg
              key={index}
              className={styles.starIcon}
              viewBox="0 0 24 24"
              fill={starValue <= rating ? "#ffc107" : "#ccc"}
              onClick={() => setRating(starValue)}
            >
              <path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" />
            </svg>
          );
        })}
      </div>
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

  

  const handleDeleteComment = async (commentId) => {
    try {
      await deleteDoc(doc(db, "comentarios", commentId));
      // Actualizar la lista de comentarios después de eliminar
      setComentarios(comentarios.filter((comentario) => comentario.id !== commentId));
    } catch (error) {
      console.error("Error al eliminar el comentario: ", error);
    }
  };

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
  
  useEffect(() => {
    const actualizarRatingDestino = async () => {
      if (!isNaN(averageRating)) {
        const q = query(collection(db, "destinos"), where("nombreActividad", "==", nombreActividad));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const destinoDoc = querySnapshot.docs[0];
          const destinoRef = doc(db, "destinos", destinoDoc.id);
          try {
            await updateDoc(destinoRef, { rating: averageRating });
            console.log("Rating actualizado en destinos");
          } catch (error) {
            console.error("Error al actualizar el rating en destinos:", error);
          }
        }
      }
    };
    actualizarRatingDestino();
  }, [averageRating, nombreActividad]);

  return (
    <section className={styles.commentsContainer}>
      <div className={styles.divider} />
      <RatingSummary rating={averageRating} totalReviews={comentarioslength} />

      <div className={styles.reviewsList}>
      {filtroActividad.map((comentario) => (
        <ReviewCard
          key={comentario.id}
          comentario={comentario}
          avatarUrl={comentario.avatarUrl}
          userName={comentario.usuario}
          rating={comentario.rating}
          title={comentario.title}
          review={comentario.comentario}
          onDelete={handleDeleteComment}
          profile={profile}
        />
      ))}
    </div>
     {/* Mostrar input solo si el usuario es estudiante */}
    {profile?.tipoUser === "Estudiante" && (
      <CommentInput
        avatarUrl={profile?.foto_perfil || logoSI}
        onCommentSubmit={handleAgregarComentario}
      />
    )}
    </section>
  );
};

export default Comentarios;
