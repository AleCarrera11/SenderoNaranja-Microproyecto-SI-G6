import React from 'react';
import styles from './ReservationConfirmation.module.css';
import { useNavigate } from 'react-router';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../../credenciales'; // Asegúrate de que la ruta sea correcta

const ReservationConfirmation = ({ onClose, formData, actividadInfo, selectedDay, selectedTime, nombreActividad, guia, userId}) => {
  const navigate = useNavigate();

  // Generar el identificador
  const generarIdentificador = () => {
    const inicialActividad = nombreActividad.charAt(0).toUpperCase();
    const numeroDia = selectedDay.replace(/\D/g, '');
    const numeroHora = selectedTime.replace(/\D/g, '');
    return `${inicialActividad}N${numeroDia}${numeroHora}`;
  };

  const identificador = generarIdentificador();
  
  const handleClose = async () => {
    try {
      // Crear el documento en la colección "reservaciones"
      await addDoc(collection(db, 'reservaciones'), {
        userId: userId, // Usar el userId pasado como prop
        actividadId: actividadInfo.id, // Usar el ID de la actividad
        nombreActividad: nombreActividad,
        fecha: selectedDay +"/"+ selectedMonth +"/"+ selectedYear,
        hora: selectedTime,
        participantes: `${formData.name} ${formData.lastName}`,
        email: formData.email,
        telefono: formData.phone,
        guia: guia || 'Por asignar',
        tipo: actividadInfo?.tipo,
        duracion: actividadInfo?.duracion,
        foto: actividadInfo?.foto,
        identificador: identificador,
      });

      console.log('Reserva creada con éxito');
      onClose();
      navigate('/destinos');
    } catch (error) {
      console.error('Error al crear la reserva:', error);
      // Manejar el error adecuadamente (mostrar un mensaje al usuario, etc.)
    }
  };

  const reservationDetails = [
    { label: 'Participante', value: `${formData.name} ${formData.lastName}` },
    { label: 'Email', value: formData.email },
    { label: 'Numero de telefono', value: formData.phone },
    { label: 'Día de la excursión', value: selectedDay },
    { label: 'Horarios', value: selectedTime },
    { label: 'Duración estimada', value: actividadInfo?.duracion },
    { label: 'Guía asignado', value: guia || 'Por asignar' },
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
          <p className={styles.identifier}>Identificador: {identificador}</p>
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
