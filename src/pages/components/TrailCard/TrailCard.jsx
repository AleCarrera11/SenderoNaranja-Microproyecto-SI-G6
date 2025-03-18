import React, { useEffect, useState, useContext } from "react";
import styles from "./TrailCard.module.css";
import { UserContext } from "../../../Context/UserContex";
import { useNavigate } from "react-router";
import AgregarGuia from "../AgregarGuia/AgregarGuia";
import { collection, query, where, getDocs, getFirestore, doc, getDoc } from "firebase/firestore";
import { app } from "../../../credenciales";

const db = getFirestore(app);

export const TrailCard = ({ destino }) => {
  const { profile } = useContext(UserContext);
  const isAdmin = profile?.tipoUser === "Administrador";
  const [isModal, setModal] = useState(false);
  const [guiaAsignado, setGuiaAsignado] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGuiaAsignado = async () => {
      try {
        // Buscar si hay un guía asignado para esta actividad
        const q = query(collection(db, "GuiasAsignados"), where("actividadId", "==", destino.id));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const asignacion = querySnapshot.docs[0].data();
          const guiaId = asignacion.guiaId; 

          // Obtener el documento del guía directamente por su ID
          const guiaRef = doc(db, "users", guiaId);
          const guiaSnap = await getDoc(guiaRef);

          if (guiaSnap.exists()) {
            setGuiaAsignado(guiaSnap.data());
          }
        }
      } catch (error) {
        console.error("Error obteniendo el guía asignado:", error);
      }
    };

    fetchGuiaAsignado();
  }, [destino.id]);

  const handleClick = () => {
    navigate(`/destinos/${destino.nombreActividad}`);
  };

  const handleGuideAssigned = (guia) => {
    setGuiaAsignado(guia);
    setModal(false);
  };

  return (
    <article className={styles.trailCard}>
      <img src={destino.foto} alt={destino.nombreActividad} className={styles.trailImage} />
      <div className={styles.trailInfo}>
        <div className={styles.trailHeader}>
          <div>
            <h2 className={styles.title} onClick={handleClick}>{destino.nombreActividad}</h2>
            <h3 className={styles.subtitle}>{destino.tipo}</h3>
          </div>
          <div className={styles.rating}>
            <span>{destino.rating}</span>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.76663 29.3333L9.93329 19.9667L2.66663 13.6667L12.2666 12.8333L16 4L19.7333 12.8333L29.3333 13.6667L22.0666 19.9667L24.2333 29.3333L16 24.3667L7.76663 29.3333Z" fill="#FFD522" />
            </svg>
          </div>
        </div>
        <p className={styles.trailDescription}>{destino.descripcion}</p>
        <div className={styles.trailDetails}>
          <p className={styles.detail}>
            <span className={styles.label}>Dificultad</span>
            <span>: {destino.dificultad}</span>
          </p>
          <p className={styles.detail}>
            <span className={styles.label}>Distancia:</span>
            <span>{destino.distancia}</span>
          </p>
          <p className={styles.detail}>
            <span className={styles.label}>Duración estimada:</span>
            <span>{destino.duracion}</span>
          </p>
        </div>
        {isAdmin && (
          <button
            className={`${styles.assignGuide} ${guiaAsignado ? styles.guiaAsignado : ""}`}
            onClick={() => setModal(true)}
          >
            {guiaAsignado ? `Guía asignado: ${guiaAsignado.nombre} ${guiaAsignado.apellido}` : "Asignar guía a la actividad"}
          </button>
        )}
      </div>
      {isModal && (
        <div className={styles.overlay} onClick={() => setModal(false)}>
          <div onClick={(e) => e.stopPropagation()}>
            <AgregarGuia
              actividadId={destino.id}
              onClose={() => setModal(false)}
              onGuideAssigned={handleGuideAssigned}
            />
          </div>
        </div>
      )}
    </article>
  );
};
