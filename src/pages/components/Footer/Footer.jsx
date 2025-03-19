import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "../../../credenciales";
import styles from "./Footer.module.css";
import instagramlogo from '/instagramlogo.png'
import ProyectoAvila from '/ProyectoAvila.png'
import facebooklogo from '/facebooklogo.png'
import xlogo from '/xlogo.png'
import youtubelogo from '/youtubelogo.png'
import correologo from '/correologo.png'

export function Footer() {
  const [topDestinos, setTopDestinos] = useState([]);

  useEffect(() => {
    const fetchTopDestinos = async () => {
      try {
        // Obtener todos los documentos sin ordenamiento
        const querySnapshot = await getDocs(collection(db, "destinos"));
        const destinos = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        // Ordenar manualmente por rating si existe, si no existe usar 0
        const ordenados = destinos.sort((a, b) => 
          (b.rating || 0) - (a.rating || 0)
        ).slice(0, 4); // Tomar los primeros 4

        console.log("Destinos ordenados:", ordenados);
        setTopDestinos(ordenados);
      } catch (error) {
        console.error("Error fetching destinos:", error);
      }
    };

    fetchTopDestinos();
  }, []);

  // Agregar un console.log para ver el estado
  console.log("Estado actual de topDestinos:", topDestinos);

  return (
    <div className={styles.pageContainer}>
      <footer className={styles.footer}>
        <div className={styles.content}>
          <div className={styles.branding}>
            <img
              src={ProyectoAvila}
              alt="Footer logo"
              className={styles.logo}
            />
            <p className={styles.copyright}>
              Copyright © 2025 - Universidad Metropolitana.
              <br />
              Todos los derechos reservados.
            </p>
            <div className={styles.social}>
              <img
                src={facebooklogo}
                alt="Social icon"
                className={styles.socialIcon}
              />
              <img  
                src={instagramlogo}
                alt="Social icon"
                className={styles.socialIcon}
              />
              <img
                src={xlogo}
                alt="Social icon"
                className={styles.socialIcon}
              />
              <img
                src={correologo}
                className={styles.socialIcon}
              />
              <img
                src={youtubelogo}
                alt="Social icon"
                className={styles.socialIcon}
              />
            </div>
          </div>

          <div className={styles.links}>
            <div className={styles.linkColumn}>
              <h3 className={styles.columnTitle}>Destinos</h3>
              <ul className={styles.linkList}>
                {topDestinos.map((destino) => (
                  <li key={destino.id}>
                    <Link to={`/destinos/${destino.nombreActividad}`}>
                      {destino.nombreActividad}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.linkColumn}>
              <h3 className={styles.columnTitle}>Sección Informativa</h3>
              <ul className={styles.linkList}>
                <li>
                  <Link to="/galeria">Galeria</Link>
                </li>
                <li>
                  <Link to="/parque-nacional-el-avila">Parque Nacional El Ávila</Link>
                </li>
                <li>
                  <Link to="/importancia-conservacion">Importancia de la Conservación</Link>
                </li>
              </ul>
            </div>

            <div className={styles.linkColumn}>
              <h3 className={styles.columnTitle}>Sobre Nosotros</h3>
              <ul className={styles.linkList}>
                <li>
                  <Link to="/about">Misión y Visión</Link>
                </li>
                <li>
                  <a href="https://www.unimet.edu.ve/unimet-sustentable/" target="_blank" rel="noopener noreferrer">
                    UNIMET Sustentable
                  </a>
                </li>
                <li>
                  <a href="https://www.unimet.edu.ve/proyecto-avila/" target="_blank" rel="noopener noreferrer">
                    Proyecto Ávila
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}