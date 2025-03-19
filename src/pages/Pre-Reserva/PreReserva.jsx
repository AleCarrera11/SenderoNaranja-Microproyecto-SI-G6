import React, { useState, useEffect } from 'react';
import styles from './PreReserva.module.css';
import { useNavigate } from 'react-router';
import { db } from '../../credenciales';
import { collection, query, where, getDocs, doc, getDoc, onSnapshot } from 'firebase/firestore';

const PreReserva = ({ selectedDay, selectedSlot, nombreActividad, onClose, selectedMonth, selectedYear, quota }) => {
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
        const actividadSnapshot = await getDocs(actividadQuery)
          .catch(error => {
            console.error('Error al obtener el snapshot de la actividad:', error);
            setActividadInfo(null);
            setLoading(false);
            return null; // Importante retornar null para que el código no continue si hay un error
          });
        
        if (!actividadSnapshot?.empty) {
          const actividadDoc = actividadSnapshot.docs[0];
          const actividadData = actividadDoc.data();
          const actividadId = actividadDoc.id;
          
          // Obtener información del slot específico
          const slotId = `${selectedDay}-${selectedSlot.time}`;
          const slot = actividadData.availableSlots ? actividadData.availableSlots[slotId] : null;

          // Obtener la cantidad de cupos reservados
          const reservacionesRef = collection(db, 'reservaciones');
        
          // Construir la consulta para obtener las reservaciones con el formato de fecha actual
          const reservacionesQuery1 = query(
            reservacionesRef,
            where('actividadId', '==', actividadId),
            where('fecha', '==', selectedDay +"/"+ selectedMonth +"/"+ selectedYear),
            where('hora', '==', selectedSlot.time)
          );
        
          // Construir la consulta para obtener las reservaciones con el formato de fecha anterior
          const reservacionesQuery2 = query(
            reservacionesRef,
            where('actividadId', '==', actividadId),
            where('selectedDay', '==', selectedDay),
            where('hora', '==', selectedSlot.time)
          );
        
          // Ejecutar las consultas
          const reservacionesSnapshot1 = await getDocs(reservacionesQuery1)
            .catch(error => {
              console.error('Error al obtener las reservaciones (formato de fecha actual):', error);
              return null;
            });
        
          const reservacionesSnapshot2 = await getDocs(reservacionesQuery2)
            .catch(error => {
              console.error('Error al obtener las reservaciones (formato de fecha anterior):', error);
              return null;
            });
        
          // Contar los documentos que coinciden con las consultas
          const cuposReservados = (reservacionesSnapshot1?.size || 0) + (reservacionesSnapshot2?.size || 0);
        
          setActividadInfo({ ...actividadData, id: actividadId, slot: slot, cuposReservados: cuposReservados });

          // Agregar listener a la colección "reservaciones"
          const unsubscribe = onSnapshot(
            query(
              collection(db, 'reservaciones'),
              where('actividadId', '==', actividadId),
              where('fecha', '==', selectedDay +"/"+ selectedMonth +"/"+ selectedYear),
              where('hora', '==', selectedSlot.time)
            ),
            async (snapshot) => {
              let cuposReservados = 0;
              snapshot.forEach(() => {
                cuposReservados++;
              });
              
              // Obtener el documento de la actividad para obtener los cupos disponibles
              const actividadDoc = await getDoc(doc(db, 'destinos', actividadId));
              const actividadData = actividadDoc.data();
              const slotId = `${selectedDay}-${selectedSlot.time}`;
              const cuposDisponibles = actividadData.availableSlots[slotId]?.cuposDisponibles || 0;

              setActividadInfo(prevState => ({ 
                ...prevState, 
                cuposReservados: cuposReservados,
                slot: {
                  ...prevState.slot,
                  cuposDisponibles: cuposDisponibles
                }
              }));
            },
            (error) => {
              console.error('Error al obtener las reservaciones:', error);
            }
          );

          return () => unsubscribe();
        } else {
          console.log('No se encontró la actividad');
          setActividadInfo(null);
        }
      } catch (error) {
        console.error('Error al obtener la información de la actividad:', error);
        setActividadInfo(null);
      } finally {
        setLoading(false);
      }
    };
  
    fetchActividadInfo();
  }, [nombreActividad, selectedDay, selectedSlot, quota]);

  useEffect(() => {
    const fetchGuiaAsignado = async () => {
      console.log("ID de la actividad:", actividadInfo?.id);  // Verifica el ID
      if (!actividadInfo?.id) return;
  
      try {
        const guiasRef = collection(db, 'GuiasAsignados');
        const q = query(guiasRef, where('actividadId', '==', actividadInfo?.id));
        const querySnapshot = await getDocs(q)
          .catch(error => {
            console.error('Error al obtener el snapshot de guías asignados:', error);
            return null; // Importante retornar null para que el código no continue si hay un error
          });
  
        if (!querySnapshot?.empty) {
          // Accede al guiaId del primer documento encontrado
          const guiaAsignado = querySnapshot.docs[0].data();
          const guiaId = guiaAsignado.guiaId;  // Aquí usamos 'guiaId'
          console.log('ID del guía:', guiaId);  // Verifica si obtienes el ID correctamente
  
          if (guiaId) {
            const guiaDocRef = doc(db, 'users', guiaId);
            const guiaDocSnap = await getDoc(guiaDocRef)
              .catch(error => {
                console.error('Error al obtener el documento del guía:', error);
                return null; // Importante retornar null para que el código no continue si hay un error
              });
  
            if (guiaDocSnap?.exists()) {
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
        selectedDay: selectedDay +"/"+ selectedMonth +"/"+ selectedYear ,
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
        
<div className={styles.availableSpots} style={{
  fontSize: '1.2em',
  fontWeight: 'bold',
  color: '#ee9a12'
}}>
          CUPOS DISPONIBLES: <span style={{ color: '#000' }}> {actividadInfo?.cuposReservados || '0'}/{actividadInfo?.slot?.cuposDisponibles || '10'}</span>
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
