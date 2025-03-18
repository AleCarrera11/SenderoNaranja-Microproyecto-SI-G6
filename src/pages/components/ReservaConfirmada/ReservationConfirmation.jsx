import React from 'react';
import styles from './ReservationConfirmation.module.css';
import { useNavigate } from 'react-router';

const ReservationConfirmation = ({ onClose }) => {
  const navigate = useNavigate();
  
  const handleClose = () => {
    onClose();
    navigate('/destinos');
  };

  const reservationDetails = [
    { label: 'Participante', value: 'María Perez' },
    { label: 'Email', value: 'maria.perez@correo.unimet.edu.ve' },
    { label: 'Numero de telefono', value: '+58 414-3686749' },
    { label: 'Día de la excursión', value: 'Viernes 07 FEB' },
    { label: 'Horarios', value: '8am' },
    { label: 'Duración estimada', value: '2 h' },
    { label: 'Guía asignado', value: 'Pedro Perez' },
  ];

  return (
    <>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/dist/tabler-icons.min.css" />
      <link href="https://fonts.googleapis.com/css2?family=Figtree:wght@300;400;700&family=Noto+Sans:wght@400&display=swap" rel="stylesheet" />
      <div className={styles.container}>
        <div className={styles.contentWrapper}>
          <button 
            className={styles.closeButton} 
            onClick={handleClose}
            aria-label="Cerrar"
          >
            x
          </button>
          <h1 className={styles.title}>¡Su reserva ha sido exitosa!</h1>
          <p className={styles.identifier}>Identificador: SN0702202586</p>
          <h2 className={styles.trailName}>SABAS NIEVES</h2>
          <p className={styles.activityType}>Senderismo</p>
          <div className={styles.infoContainer}>
            <div className={styles.detailsColumn}>
              {reservationDetails.map((detail, index) => (
                <div key={index} className={styles.detailItem}>
                  <span className={styles.detailLabel}>{detail.label}:</span>{' '}
                  <span className={styles.detailValue}>{detail.value}</span>
                </div>
              ))}
            </div>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/62a68402f59f85cd7214be7067fd25f18d8f7e13"
              alt="Imagen del sendero"
              className={styles.trailImage}
            />
          </div>
          <p className={styles.recommendations}>
            <span className={styles.recommendationsLabel}>Recomendaciones:</span>
            <span className={styles.recommendationsText}>
              Llevar agua, calzado adecuado, protector solar
            </span>
          </p>
          <p className={styles.farewell}>¡Te esperamos!</p>
        </div>
      </div>
    </>
  );
};

export default ReservationConfirmation;