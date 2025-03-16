import React, { use} from "react";
import styles from "./TrailCard.module.css";
import { UserContext } from "../../../Context/UserContex"; // Importa el contexto
import { useNavigate } from "react-router";


export const TrailCard = ({destino}) => {
  
  const { profile } = use(UserContext); // Accede al contexto
  const isAdmin = profile?.tipoUser === "Administrador"; // Verifica si es administrador
  const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/destinos/${destino.nombreActividad}`);
    };

  return (
    <article className={styles.trailCard}>
      <img src={destino.foto} alt={destino.nombreActividad} className={styles.trailImage} />
      <div className={styles.trailInfo}>
        <div className={styles.trailHeader}>
          <div>
            <h2 className={styles.title} onClick={handleClick}>{destino.nombreActividad} </h2>
            <h3 className={styles.subtitle}>{destino.tipo}</h3>
          </div>
          <div className={styles.rating}>
            {isAdmin && (
              <>
                <button className={styles.modifyButton}>Modificar</button>
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/726c283faec5ec198eddb1043c800cdd28efbcf3"
                  alt="Settings"
                  className={styles.settingsIcon}
                />
              </>
            )}
            <span>{destino.rating}</span>
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.76663 29.3333L9.93329 19.9667L2.66663 13.6667L12.2666 12.8333L16 4L19.7333 12.8333L29.3333 13.6667L22.0666 19.9667L24.2333 29.3333L16 24.3667L7.76663 29.3333Z"
                fill="#FFD522"
              />
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
            <span>{destino.distancia} km</span>
          </p>
          <p className={styles.detail}>
            <span className={styles.label}>Duración estimada:</span>
            <span>{destino.duracion} h</span>
          </p>
        </div>
        {isAdmin && (
          <button className={styles.assignGuide}>
            Asignar guía a la actividad
          </button>
        )}
      </div>
    </article>
  );
};
