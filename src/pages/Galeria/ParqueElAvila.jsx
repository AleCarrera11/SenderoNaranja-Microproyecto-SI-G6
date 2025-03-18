"use client";
import React from "react";
import { Footer } from "../components/Footer/Footer";
import styles from "./ParqueElAvila.module.css";

// Feature item component for the checkmark features
const FeatureItem = ({ icon, title, description }) => {
  return (
    <div className={styles.featureItem}>
      <div className={styles.featureIcon}>{icon}</div>
      <div className={styles.featureContent}>
        <span className={styles.featureTitle}>{title}</span>
        <span className={styles.featureDescription}>{description}</span>
      </div>
    </div>
  );
};

// Main content component with park information
const MainContent = () => {
  const checkIcon = (
    <svg
      width="29"
      height="27"
      viewBox="0 0 29 27"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_308_4672)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M28.2482 2.31112C29.13 2.98963 29.2543 4.20524 28.5254 5.02629L11.8712 23.7898L11.8661 23.7954C11.4873 24.219 11.0119 24.5586 10.4744 24.7894C9.93691 25.0205 9.35091 25.137 8.759 25.1306C8.15739 25.1236 7.56343 24.9898 7.02529 24.7393C6.48896 24.4897 6.02011 24.1304 5.6537 23.6886L0.436437 17.4433C-0.265922 16.6026 -0.103244 15.3909 0.799789 14.737C1.70282 14.0831 3.00426 14.2345 3.70662 15.0753L8.80973 21.184L25.3318 2.56924C26.0606 1.74819 27.3664 1.63263 28.2482 2.31112Z"
          fill="#EE9A12"
        ></path>
      </g>
      <defs>
        <clipPath id="clip0_308_4672">
          <rect width="29" height="27" fill="white"></rect>
        </clipPath>
      </defs>
    </svg>
  );

  return (
    <main className={styles.mainContent}>
      <h2 className={styles.parkTitle}>PARQUE NACIONAL EL ÁVILA</h2>
      <h3 className={styles.parkSubtitle}>Descubre la Naturaleza de El Ávila</h3>
      <p className={styles.parkDescription}>
        El Ávila, conocido oficialmente como Parque Nacional Waraira Repano, es un
        verdadero paraíso natural en el corazón de Caracas. Este majestuoso
        parque ofrece una gran diversidad de flora y fauna, paisajes
        impresionantes y una rica historia cultural. Aquí podrás disfrutar de
        senderos exuberantes, vistas panorámicas de la ciudad y la tranquilidad
        de la naturaleza.
      </p>
      <h3 className={styles.featuresTitle}>¿Qué hace a El Ávila tan especial?</h3>

      <FeatureItem
        icon={checkIcon}
        title="Ubicación privilegiada:"
        description="El Ávila se alza majestuoso al norte de Caracas, ofreciendo vistas panorámicas de la ciudad y el mar Caribe. Su presencia imponente define el paisaje de la capital venezolana."
      />

      <FeatureItem
        icon={checkIcon}
        title="Biodiversidad exuberante:"
        description="El parque alberga una gran variedad de flora y fauna, con especies únicas que solo se encuentran en esta región. Desde orquídeas y bromelias hasta monos araguatos y aves coloridas, la vida silvestre de El Ávila te sorprenderá."
      />

      <FeatureItem
        icon={checkIcon}
        title="Senderismo para todos los niveles:"
        description="El Ávila ofrece una amplia red de senderos que se adaptan a diferentes niveles de experiencia y condición física. Desde caminatas suaves hasta rutas exigentes, hay una opción para cada aventurero."
      />

      <div className={styles.imageGallery}>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/f538bc450efb5a88900acbfe188da7c2a11bb9f0"
          alt="Vista del Parque Nacional El Ávila"
          className={styles.galleryImage}
        />
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/03f4adb3e0b20847615778d8d7b40afed11f1136"
          alt="Sendero en El Ávila"
          className={styles.galleryImage}
        />
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/586401eb8cd829b38fc4843a654ffac73814059a"
          alt="Paisaje de El Ávila"
          className={styles.galleryImage}
        />
      </div>
      <Footer />
    </main>
  );
};

// Main component that combines all sections
function ParqueElAvila() {
  return (
    <div className={styles.container}>
      <MainContent />
    </div>
  );
}

export default ParqueElAvila;