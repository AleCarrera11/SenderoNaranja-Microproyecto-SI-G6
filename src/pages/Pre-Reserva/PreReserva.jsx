import React, { useState, useEffect } from 'react';
import styles from './PreReserva.module.css';
import { useNavigate } from 'react-router';
import { db } from '../../credenciales';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';

const PreReserva = ({ selectedDay, selectedSlot, nombreActividad, onClose, selectedMonth}) => {
  const navigate = useNavigate();
  const [actividadInfo, setActividadInfo] = useState(null);
  const [nombreGuia, setNombreGuia] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActividadInfo = async () => {
      try {
        console.log('Buscando actividad:', nombreActividad);
        const actividadQuery = query(
          collection(db, 'destinos'),
          where('nombreActividad', '==', nombreActividad)
        );
        const actividadSnapshot = await getDocs(actividadQuery);
        
        if (!actividadSnapshot.empty) {
          const actividadData = actividadSnapshot.docs[0].data();
          const actividadId = actividadSnapshot.docs[0].id;  // Obtén el id del documento
          console.log('Datos de la actividad:', actividadData);
          setActividadInfo({ ...actividadData, id: actividadId });  // Añade el id a los datos de la actividad
        } else {
          console.log('No se encontró la actividad');
        }
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener la información de la actividad:', error);
        setLoading(false);
      }
    };
  
    if (nombreActividad) {
      fetchActividadInfo();
    }
  }, [nombreActividad]);

  useEffect(() => {
    const fetchGuiaAsignado = async () => {
      console.log("ID de la actividad:", actividadInfo?.id);  // Verifica el ID
      if (!actividadInfo?.id) return;
  
      try {
        const guiasRef = collection(db, 'GuiasAsignados');
        const q = query(guiasRef, where('actividadId', '==', actividadInfo?.id));
        const querySnapshot = await getDocs(q);
  
        if (!querySnapshot.empty) {
          // Accede al guiaId del primer documento encontrado
          const guiaAsignado = querySnapshot.docs[0].data();
          const guiaId = guiaAsignado.guiaId;  // Aquí usamos 'guiaId'
          console.log('ID del guía:', guiaId);  // Verifica si obtienes el ID correctamente
  
          if (guiaId) {
            const guiaDocRef = doc(db, 'users', guiaId);
            const guiaDocSnap = await getDoc(guiaDocRef);
  
            if (guiaDocSnap.exists()) {
              const guiaData = guiaDocSnap.data();
              console.log('Datos del guía:', guiaData);  // Verifica los datos del guía
              setNombreGuia(`${guiaData.nombre} ${guiaData.apellido}`);
            }
          }
        } else {
          console.log("No se encontró ningún guía asignado para esta actividad.");
        }
      } catch (error) {
        console.error('Error al obtener el guía asignado:', error);
      }
    };
  
    fetchGuiaAsignado();
  }, [actividadInfo]);

  const handleReserveClick = () => {
    onClose();
    navigate('/reserva', { 
      state: { 
        selectedDay: selectedDay +"/"+ selectedMonth,
        selectedTime: selectedSlot.time,
        actividadInfo,
        nombreActividad,
        guia: nombreGuia  
      } 
    });
  };

  if (loading) {
    return <div className={styles.preReserva}>Cargando...</div>;
  }

  if (!actividadInfo) {
    return <div className={styles.preReserva}>No se encontró la información de la actividad</div>;
  }

  return (
    <div className={styles.preReserva}>
      <div className={styles.contentWrapper}>
        <div className={styles.title}>
          <span className={styles.boldOrange}>{nombreActividad}</span>
          <span className={styles.lightGray}>{actividadInfo?.tipo}</span>
          <button 
            className={styles.closeButton} 
            onClick={onClose} 
            aria-label="Cerrar"
          >
            x
          </button>
        </div>
        
        <div className={styles.flexContainer}>
          <div className={styles.leftColumn}>
            <div className={styles.textContent}>
              <div className={styles.description}>
                <span className={styles.boldBlack}>Día de la excursión</span>: {selectedDay +"/" +selectedMonth}
                <br />
                <span className={styles.boldBlack}>Horario:</span> {selectedSlot.time}
                <br />
                <span className={styles.boldBlack}>Duración estimada:</span> {actividadInfo.duracion}
                <br />
                <span className={styles.boldBlack}>Guía asignado:</span> {nombreGuia}
              </div>
            </div>
          </div>
          <div className={styles.rightColumn}>
            <div className={styles.imageContainer}>
              {actividadInfo.foto ? (
                <img
                  loading="lazy"
                  src={actividadInfo.foto}
                  className={styles.excursionImage}
                  alt={`Imagen de la excursión ${nombreActividad}`}
                  onError={(e) => {
                    console.error('Error al cargar la imagen:', e);
                    e.target.src = "https://via.placeholder.com/400";
                  }}
                />
              ) : (
                <img
                  loading="lazy"
                  src="https://via.placeholder.com/400"
                  className={styles.excursionImage}
                  alt="Imagen no disponible"
                />
              )}
            </div>
          </div>
        </div>
        
        <div className={styles.availableSpots}>
          CUPOS DISPONIBLES: <span style={{ color: '#000' }}> {actividadInfo.cuposDisponibles || '0'}/{actividadInfo.cuposMaximos || '10'}</span>
        </div>
        <button 
          className={styles.reserveButton}
          onClick={handleReserveClick}
        >
          Reserva Ahora
        </button>
      </div>
    </div>
  );
};

export default PreReserva;
