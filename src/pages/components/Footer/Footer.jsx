import React from "react";
import styles from "./Footer.module.css";
import instagramlogo from '/instagramlogo.png'
import ProyectoAvila from '/ProyectoAvila.png'
import facebooklogo from '/facebooklogo.png'
import xlogo from '/xlogo.png'
import youtubelogo from '/youtubelogo.png'
import correologo from '/correologo.png'

export function Footer() {
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
                <li>
                  <a href="#sabas">Sabas Nieves</a>
                </li>
                <li>
                  <a href="#quebrada">Quebrada Quintero</a>
                </li>
                <li>
                  <a href="#lagunazo">El Lagunazo</a>
                </li>
                <li>
                  <a href="#naiguata">Pico Naiguata</a>
                </li>
                <li>
                  <a href="#vivero">Visita al vivero</a>
                </li>
              </ul>
            </div>

            <div className={styles.linkColumn}>
              <h3 className={styles.columnTitle}>Sección Informativa</h3>
              <ul className={styles.linkList}>
                <li>
                  <a href="#galeria">Galeria</a>
                </li>
                <li>
                  <a href="#parque">Parque Nacional Waraira Repano</a>
                </li>
                <li>
                  <a href="#preservacion">Preservación</a>
                </li>
              </ul>
            </div>

            <div className={styles.linkColumn}>
              <h3 className={styles.columnTitle}>Sobre Nosotros</h3>
              <ul className={styles.linkList}>
                <li>
                  <a href="#mision">Misión y Visión</a>
                </li>
                <li>
                  <a href="#proyecto">Proyecto Avila</a>
                </li>
                <li>
                  <a href="#unimet">UNIMET Sostenible</a>
                </li>
                <li>
                  <a href="#contactos">Contactos</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}