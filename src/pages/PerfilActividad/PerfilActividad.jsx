"use client";
import React from "react";
import styles from "./PerfilActividad.module.css";
import Comentarios from "../components/Comentarios/Comentarios";
import {Footer} from "../components/Footer/Footer";
import { Link } from "react-router";

const StarIcon = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.7665 29.3333L9.93317 19.9667L2.6665 13.6667L12.2665 12.8333L15.9998 4L19.7332 12.8333L29.3332 13.6667L22.0665 19.9667L24.2332 29.3333L15.9998 24.3667L7.7665 29.3333Z"
      fill="#FFD522"
    />
  </svg>
);

const PerfilActividad = () => {
  return (
    <>
      
      <main className={styles.container}>
        <nav className={styles.breadcrumb} aria-label="breadcrumb">
          <ol>
            <li>
              <a href="/destinos" className={styles.navLink}>
                Destinos
              </a>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page">Sabas Nieves</li>
          </ol>
        </nav>

        <article className={styles.contentWrapper}>
          <header className={styles.header}>
            <div className={styles.titleWrapper}>
              <h1 className={styles.title}>SABAS NIEVES</h1>
              <p className={styles.activity}>Senderismo</p>
            </div>
            <div className={styles.rating} aria-label="Rating 4.6 out of 5">
              <StarIcon />
              <span className={styles.ratingValue}>4,6</span>
            </div>
          </header>

          <div className={styles.mainSection}>
            <div className={styles.imageWrapper}>
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/5276e846d46e1a320d4332468165f3f7cc654303"
                alt="Sabas Nieves Trail"
                className={styles.mainImage}
              />
              <div className={styles.trailStats}>
                <p className={styles.statItem}>
                  <strong>Dificultad</strong>: Moderada
                </p>
                <p className={styles.statItem}>
                  <strong>Distancia:</strong> 3.9km
                </p>
                <p className={styles.statItem}>
                  <strong>Duración estimada:</strong> 2 h
                </p>
              </div>
            </div>
            <div className={styles.infoSection}>
              <p className={styles.description}>
                La ruta de Sabas Nieves es la compañera ideal para tus aventuras
                al aire libre. Con un recorrido diseñado para todos los niveles
                de condición física, podrás sumergirte en la belleza del Ávila
                sin complicaciones. ¡Anímate a explorar este sendero y descubre
                la magia de la montaña!
              </p>

              <div className={styles.schedule}>
                <p className={styles.scheduleItem}>
                  <strong>Día de la excursión</strong>: Viernes, Sabado y Domingo
                </p>
                <p className={styles.scheduleItem}>
                  <strong>Horarios:</strong> 8am, 10am y 2pm
                </p>
              </div>

              <div className={styles.booking}>
                <p className={styles.bookingInfo}>
                  Para asegurar tu cupo, realiza una colaboración a partir de
                  3$.
                </p>
                <p className={styles.bookingDescription}>
                  Tu aporte servirán para remunerar a nuestros guías expertos,
                  quienes te guiarán a través de la ruta y para seguir
                  organizando más aventuras
                </p>
              </div>

              <div className={styles.buttonContainer}>
                <Link to="/calendario" className={styles.bookingButton}>
                Ver disponibilidad
                </Link>
              </div>
            </div>
          </div>

          <div className={styles.mapContainer}>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/b2396fb1bc86b727dbb7bc2cfcec303853c634ed"
              alt="Map of Sabas Nieves"
              className={styles.mapImage}
            />
          </div>
        </article>
      </main>
      <Comentarios/>
      <Footer/>
    </>
  );
};

export default PerfilActividad;