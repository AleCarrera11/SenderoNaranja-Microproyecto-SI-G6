import React from 'react';
import styles from './ReservationConfirmation.module.css';
import { useNavigate } from 'react-router';

const ReservationConfirmation = ({ onClose, formData, actividadInfo, selectedDay, selectedTime, nombreActividad }) => {
  const navigate = useNavigate();
  
  const handleClose = () => {
    onClose();
    navigate('/destinos');
  };

  const reservationDetails = [
    { label: 'Participante', value: `${formData.name} ${formData.lastName}` },
    { label: 'Email', value: formData.email },
    { label: 'Numero de telefono', value: formData.phone },
    { label: 'Día de la excursión', value: selectedDay },
    { label: 'Horarios', value: selectedTime },
    { label: 'Duración estimada', value: actividadInfo?.duracion },
    { label: 'Guía asignado', value: actividadInfo?.guia || 'Por asignar' },
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
          <p className={styles.identifier}>Identificador: SN{selectedDay.replace(/\D/g, '')}{selectedTime.replace(/\D/g, '')}</p>
          <h2 className={styles.trailName}>{nombreActividad}</h2>
          <p className={styles.activityType}>{actividadInfo?.tipo}</p>
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
              src={actividadInfo?.foto || "https://via.placeholder.com/400"}
              alt={`Imagen de ${nombreActividad}`}
              className={styles.trailImage}
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/400";
              }}
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