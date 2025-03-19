"use client";
import * as React from "react";
import { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../../credenciales";
import styles from "./ActividadesReservadas.module.css";
import HistorialActividades from "./HistorialActividades";

const ActivityCard = ({
  imageSrc,
  title,
  date,
  hour,
  guide,
  localizador,
}) => {
  return (
    <article className={styles.activityCard}>
      <div className={styles.cardContent}>
        <div className={styles.imageColumn}>
          <img src={imageSrc} alt={title} className={styles.activityImage} />
        </div>
        <div className={styles.detailsColumn}>
          <div className={styles.detailsContent}>
            <h2 className={styles.activityTitle}>{title}</h2>
            <div className={styles.activityInfo}>
              Localizador: <span className={styles.lightText}>{localizador}</span>
              <br />
              Fecha pautada: <span className={styles.lightText}>{date}</span>
              <br />
              Hora: <span className={styles.lightText}>{hour}</span>
              <br />
              Guía asignado: <span className={styles.lightText}>{guide}</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

function ActividadesReservadas({ userId }) {
  const [reservedActivities, setReservedActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModal, setModal] = useState(false);

  useEffect(() => {
    const fetchReservedActivities = async () => {
      try {
        const reservasRef = collection(db, "reservaciones");
        const q = query(reservasRef, where("userId", "==", userId));
        const querySnapshot = await getDocs(q);

        const activities = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log(activities); // Agregar esta línea
        setReservedActivities(activities);
      } catch (error) {
        console.error("Error al cargar actividades reservadas:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchReservedActivities();
    }
  }, [userId]);

  if (loading) {
    return <div>Cargando actividades reservadas...</div>;
  }

  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <button className={styles.historyButton} onClick={() => setModal(true)}>Historial</button>
        <h1 className={styles.title}>Actividades reservadas</h1>
      </header>
      {reservedActivities.length === 0 ? (
        <p className={styles.noActivities}>No tienes actividades reservadas</p>
      ) : (
        reservedActivities.map((activity) => (
          <ActivityCard
            key={activity.id}
            imageSrc={activity.foto} 
            title={activity.nombreActividad}
            date={activity.fecha} 
            hour={activity.hora}
            guide={activity.guia}
            localizador={activity.identificador}
          />
        ))
      )}
      {isModal && (
        <div className={styles.overlay} onClick={() => setModal(false)}>
          <div onClick={(e) => e.stopPropagation()}>
            <HistorialActividades onClose={() => setModal(false)} />
          </div>
        </div>
      )}
    </section>
  );
}

export default ActividadesReservadas;