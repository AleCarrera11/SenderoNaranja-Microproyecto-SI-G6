import React from 'react';
import styles from './PreReserva.module.css';
import { useNavigate } from 'react-router';

const PreReserva = ({ selectedDay, onClose }) => {
  const navigate = useNavigate();

  const handleReserveClick = () => {
    onClose();
    navigate('/reserva');
  };

  return (
    <div className={styles.preReserva}>
      <div className={styles.contentWrapper}>
        <div className={styles.flexContainer}>
          <div className={styles.leftColumn}>
            <div className={styles.textContent}>
              <div className={styles.title}>
                <span className={styles.boldOrange}>SABAS NIEVES</span>
                <br />
                <span className={styles.lightGray}>Senderismo</span>
              </div>
              <div className={styles.description}>
                <span className={styles.boldBlack}>Día de la excursión</span>: {selectedDay} FEB
                <br />
                <span className={styles.boldBlack}>Horarios:</span> 8am
                <br />
                <span className={styles.boldBlack}>Duración estimada:</span> 2 h
                <br />
                <span className={styles.boldBlack}>Guía asignado:</span> Pedro Perez
              </div>
            </div>
          </div>
          <div className={styles.rightColumn}>
            <div className={styles.imageContainer}>
              <button 
                className={styles.closeButton} 
                onClick={onClose} 
                aria-label="Cerrar"
              >
                x
              </button>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/50516b115249a3f6e370e41ac58cb9e5788b0d6e235595bc2d269b2cd3d4c230"
                className={styles.excursionImage}
                alt="Imagen de la excursión a Sabas Nieves"
              />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.availableSpots}>
        CUPOS DISPONIBLES: <span style={{ color: '#000' }}> 5/10</span>
      </div>
      <button 
        className={styles.reserveButton}
        onClick={handleReserveClick}
      >
        Reserva Ahora
      </button>
    </div>
  );
};

export default PreReserva;