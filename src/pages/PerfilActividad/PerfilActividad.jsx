"use client";
import React, { useEffect, useState, useContext } from "react";
import styles from "./PerfilActividad.module.css";
import Comentarios from "../components/Comentarios/Comentarios";
import { Footer } from "../components/Footer/Footer";
import { Link, useParams } from "react-router";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { app } from "../../credenciales";
import { UserContext } from "../../Context/UserContex";
import EditarActividad from "../components/EditarActividad/EditarActividad";

const db = getFirestore(app);

const StarIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M7.7665 29.3333L9.93317 19.9667L2.6665 13.6667L12.2665 12.8333L15.9998 4L19.7332 12.8333L29.3332 13.6667L22.0665 19.9667L24.2332 29.3333L15.9998 24.3667L7.7665 29.3333Z"
      fill="#FFD522"
    />
  </svg>
);

const PerfilActividad = () => {
  const { nombreActividad } = useParams();
  const [actividad, setActividad] = useState(null);
  const { profile } = useContext(UserContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  if (!actividad) return <p>Cargando...</p>;

  return (
    <>
      <main className={styles.container}>
        <nav className={styles.breadcrumb} aria-label="breadcrumb">
          <ol>
            <li>
              <a href="/destinos" className={styles.navLink}>Destinos</a>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page">{actividad.nombreActividad}</li>
          </ol>
        </nav>

        <article className={styles.contentWrapper}>
          <header className={styles.header}>
            <div className={styles.titleWrapper}>
              <h1 className={styles.title}>{actividad.nombreActividad}</h1>
              <p className={styles.activity}>{actividad.tipo}</p>
            </div>
            <div className={styles.rating} aria-label="Rating 4.6 out of 5">
              <StarIcon />
              <span className={styles.ratingValue}>{actividad.rating}</span>
            </div>
          </header>

          <div className={styles.mainSection}>
            <div className={styles.imageWrapper}>
              <img src={actividad.foto} alt="Sabas Nieves Trail" className={styles.mainImage} />
              <div className={styles.trailStats}>
                <p className={styles.statItem}><strong>Dificultad</strong>: {actividad.dificultad}</p>
                <p className={styles.statItem}><strong>Distancia:</strong> {actividad.distancia}</p>
                <p className={styles.statItem}><strong>Duración estimada:</strong> {actividad.duracion}</p>
              </div>
            </div>
            <div className={styles.infoSection}>
              <p className={styles.description}>{actividad.descripcion}</p>
              <div className={styles.schedule}>
                <p className={styles.scheduleItem}><strong>Día de la excursión</strong>: {actividad.diasExcursion}</p>
                <p className={styles.scheduleItem}><strong>Horarios:</strong> {actividad.horas}</p>
              </div>
              <div className={styles.booking}>
                <p className={styles.bookingInfo}>Para asegurar tu cupo, realiza una colaboración a partir de 3$.</p>
                <p className={styles.bookingDescription}>
                  Tu aporte servirá para remunerar a nuestros guías expertos,
                  quienes te guiarán a través de la ruta y para seguir
                  organizando más aventuras.
                </p>
              </div>
              <div className={styles.buttonContainer}>
                {profile?.tipoUser === "Estudiante" && (
                  <Link to={`/calendario/${nombreActividad}`} className={styles.bookingButton}>
                    Ver disponibilidad
                  </Link>
                )}
                
                {console.log("Nombre de la actividad:", actividad.nombreActividad)} {/* Agrega esta línea */}
                {profile?.tipoUser === "Administrador" && (
                  <>
                    <Link to={`/calendario/${nombreActividad}`} className={styles.bookingButton}>
                      Ver disponibilidad
                    </Link>
                    <button 
                      className={styles.bookingButton}
                      onClick={() => setIsModalOpen(true)}
                    >
                      Editar
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className={styles.mapContainer}>
            <img src={actividad.ubicacionFoto} alt="Map of Sabas Nieves" className={styles.mapImage} />
          </div>
        </article>
      </main>
      <Comentarios />
      <Footer />
      {isModalOpen && (
        <div className={styles.overlay} onClick={() => setIsModalOpen(false)}>
          <div onClick={(e) => e.stopPropagation()}>
            <EditarActividad onClose={() => setIsModalOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
};

export default PerfilActividad;
