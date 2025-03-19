"use client";
import React, { use, useEffect, useState } from "react";
import styles from "./ActAsignados.module.css";
import { useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "../../../credenciales";
import { UserContext } from "../../../Context/UserContex";
import VerParticipantes from "./VerParticipantes";

function ActAsignados() {
  const [actividadesAsignadas, setActividadesAsignadas] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const navigate = useNavigate();
  const { profile } = use(UserContext); // Accede al perfil del usuario
  const [isModal, setModal] = useState(false);

  useEffect(() => {
    const fetchActividadesAsignadas = async () => {
      if (!profile || !profile.uid) {
            console.error("Usuario no autenticado o datos incompletos.");
            return;
      }
      try {
        console.log("User:", profile.uid); // Log del usuario

        const guiasAsignadosRef = collection(db, "GuiasAsignados");
        const q = query(guiasAsignadosRef, where("guiaId", "==", profile.uid));
        const querySnapshot = await getDocs(q);

        console.log("Query Snapshot:", querySnapshot.docs.length); // Log del número de documentos encontrados

        const actividades = [];
        for (const documento of querySnapshot.docs) {
          const actividadAsignada = documento.data();
          const actividadId = actividadAsignada.actividadId;

          // Obtener datos de la actividad desde la colección "destinos"
          const actividadRef = doc(db, "destinos", actividadId);
          const actividadDoc = await getDoc(actividadRef);

          if (actividadDoc.exists()) {
            const actividadData = actividadDoc.data();
            console.log("Actividad encontrada:", actividadData);

            actividades.push({
              id: actividadId,
              ...actividadData,
              horarios: actividadData.availableSlots || {}, // Verifica que el campo existe
            });
          } else {
            console.warn(`Actividad con ID ${actividadId} no encontrada.`);
          }
        }
        console.log("Actividad:" , );
        setActividadesAsignadas(actividades);
        console.log("Actividades Asignadas:", actividades);
      } catch (error) {
        console.error("Error al cargar actividades asignadas:", error);
      }
    };

    fetchActividadesAsignadas();
  }, [profile]); // Se ejecuta cuando `profile` cambia

  const fetchParticipantes = async (actividadId, fecha, hora) => {
    try {
      const reservacionesRef = collection(db, "reservaciones");
      const q = query(
        reservacionesRef,
        where("actividadId", "==", actividadId),
        where("fecha", "==", fecha),
        where("hora", "==", hora)
      );
      
      const querySnapshot = await getDocs(q);
      const participantes = querySnapshot.docs.map(doc => doc.data());
  
      console.log("Participantes encontrados:", participantes);
      return participantes;
    } catch (error) {
      console.error("Error al obtener los participantes:", error);
      return [];
    }
  };
  
  const handleShowParticipants = async (activity, horario) => {
    const fecha = `${horario.date}/${horario.month + 1}/${horario.year}`;
    console.log("Actividad ID:", activity.id);
    console.log("Fecha:", horario.date + "/" + (horario.month + 1));
    console.log("Hora:", horario.time);
    const participantes = await fetchParticipantes(activity.id, fecha, horario.time);
    setSelectedActivity({ ...activity, participantes }); 
    setModal(true);
  };

  const ActividadCard = ({ imageUrl, nombreActividad, lugar, horarios, activity }) => {
    return (
      <section className={styles.content}>
        <article className={styles.imageCard}>
          <img src={activity.foto} alt="Activity" className={styles.trailImage} />
          <div className={styles.tagWrapper}>
            <span className={styles.activityTag}>{activity.tipo}</span>
          </div>
        </article>
        <article className={styles.details}>
          <h2 className={styles.locationTitle}>{activity.nombreActividad}</h2>
          <div className={styles.scheduleInfo}>
          {horarios && Object.entries(horarios).map(([horarioId, horario]) => (
            <p key={horarioId} className={styles.scheduleRow}>
              <div className={styles.scheduleItem}>
                <strong className={styles.label}>Día:</strong>
                <span className={styles.value}>{horario.date}/{horario.month + 1}/{horario.year}</span>
              </div>
              <div className={styles.scheduleItem}>
                <strong className={styles.label}>Horario:</strong>
                <span className={styles.value}>{horario.time}</span>
              </div>
              <div className={styles.buttonContainer}>
                <button className={styles.participantsButton} onClick={() => handleShowParticipants(activity, horario)}>
                  Ver Participantes
                </button>
              </div>
            </p>
          ))}
          </div>
        </article>
        {isModal && (
          <div className={styles.overlay} onClick={() => setModal(false)}>
            <div onClick={(e) => e.stopPropagation()}>
              <VerParticipantes onClose={() => setModal(false)} participantes={selectedActivity?.participantes || []} />
            </div>
          </div>
        )}
      </section>
    );
  };

  return (
    <main className={styles.container}>
      <link href="https://fonts.googleapis.com/css2?family=Figtree:wght@400;700&display=swap" rel="stylesheet" />
      <h1 className={styles.heading}>Actividades Asignadas</h1>
      {actividadesAsignadas.length === 0 ? (
        <p className={styles.noActivities}>Ninguna actividad asignada.</p>
      ) : (
        actividadesAsignadas.map((actividad) => (
          <ActividadCard key={actividad.id} {...actividad} activity={actividad} />
        ))
      )}
    </main>
  );
}

export default ActAsignados;