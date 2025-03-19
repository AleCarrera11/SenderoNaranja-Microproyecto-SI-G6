import React from "react";
import styles from "./SobreNosotros.module.css";
import { Footer } from "../components/Footer/Footer";
import instagramlogo from '/instagramlogo.png'
import facebooklogo from '/facebooklogo.png'
import youtubelogo from '/youtubelogo.png'
import correologo from '/correologo.png'

const SobreNosotros = () => {
  return (
    <main>
       
      <section className={styles.visionSection}>
        <div className={styles.container}>
          <div className={styles.content}>
            <div className={styles.imageColumn}>
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/6ecffea7590711e20c832c648416bafbefbc5582eb5a3e12963aedc3094492f2?placeholderIfAbsent=true&apiKey=6a7d2e90de454ae2ae9f8761f3898725"
                alt="Vision illustration"
                className={styles.visionImage}
              />
            </div>
            <div className={styles.textColumn}>
              <h2 className={styles.title}>NUESTRA VISIÓN</h2>

              <article className={styles.visionItem}>
                <h3 className={styles.itemTitle}>Naturaleza Tecnológica</h3>
                <p className={styles.itemDescription}>
                  Buscamos consolidarnos como un referente en la integración de la
                  tecnológica con la naturaleza.
                </p>
              </article>

              <article className={styles.visionItem}>
                <h3 className={styles.itemTitle}>Estilo de Vida Saludable</h3>
                <p className={styles.itemDescription}>
                  Aspiramos a ser la plataforma preferida por la comunidad
                  unimetana, impulsando un estilo de vida saludable y sostenible.
                </p>
              </article>

              <article className={styles.visionItem}>
                <h3 className={styles.itemTitle}>Cuidar el Medio Ambiente</h3>
                <p className={styles.itemDescription}>
                  Disfrutar en armonía con el medio ambiente, mientras fomentamos
                  el disfrute y el respeto por nuestro invaluable patrimonio
                  natural.
                </p>
              </article>

              <article className={styles.visionItem}>
                <h3 className={styles.itemTitle}>Confiabilidad</h3>
                <p className={styles.itemDescription}>
                  Nos proyectamos como la herramienta digital más innovadora y
                  confiable para la gestión de actividades recreativas en el
                  Parque Nacional El Ávila.
                </p>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.aboutSection}>
        <h2 className={styles.aboutTitle}>QUIENES SOMOS</h2>
        <p className={styles.subtitle}>
          Sendero Naranja: Tu conexión con la naturaleza, nuestro compromiso con
          su conservación.
        </p>

        <div className={styles.aboutContent}>
          <div className={styles.textColumn}>
            <p className={styles.description}>
              Somos un proyecto de la Universidad Metropolitana en colaboración
              con Proyecto Ávila, que busca compartir la belleza del Parque
              Nacional El Ávila de manera responsable y sostenible.
              <br />
              <br />
              Cada paso que das con nosotros es un paso hacia la conservación de
              este invaluable ecosistema. Nuestros guías expertos te mostrarán la
              riqueza natural de El Ávila, mientras te inspiramos a ser parte del
              cambio y proteger nuestro patrimonio natural para las futuras
              generaciones.
            </p>
          </div>
          <div className={styles.aboutImageColumn}>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/ecaf0ca536b78d9fab5a634eed5642f80c8394ce51214314bf1caa5c9333cf1f?placeholderIfAbsent=true&apiKey=6a7d2e90de454ae2ae9f8761f3898725"
              alt="About Us illustration"
              className={styles.aboutImage}
            />
          </div>
        </div>
      </section>

      <section id="contacto" className={styles.contactSection}>
        <div className={styles.contactContent}>
          <div className={styles.contactImageColumn}>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/4f1f2700159ad3ff563d95023b6882d20756cb8d34e8a32b9913d1eeb5ae2a8e?placeholderIfAbsent=true&apiKey=6a7d2e90de454ae2ae9f8761f3898725"
              alt="Contact illustration"
              className={styles.contactImage}
            />
          </div>
          <div className={styles.contactInfo}>
            <h2 className={styles.contactTitle}>Contactanos</h2>
            <div className={styles.contactLinks}>
              <a
                href="mailto:senderonaranja@unimet.edu.ve"
                className={styles.contactLink}
              >
                <img
                  src={correologo}
                  alt="Email icon"
                  className={styles.icon}
                />
                <span>senderonaranja@unimet.edu.ve</span>
              </a>
              <a href="/youtube" className={styles.contactLink}>
                <img
                  src={youtubelogo}
                  alt="Youtube icon"
                  className={styles.icon}
                />
                <span>Sendero Naranja</span>
              </a>
              <a href="/facebook" className={styles.contactLink}>
                <img
                  src={facebooklogo}
                  alt="Facebook icon"
                  className={styles.icon}
                />
                <span>Sendero Naranja</span>
              </a>
              <a href="/instagram" className={styles.contactLink}>
                <img
                  src={instagramlogo}
                  alt="Instagram icon"
                  className={styles.icon}
                />
                <span>Sendero Naranja</span>
              </a>
            </div>
          </div>
        </div>
      </section>
      <Footer />   
    </main>
  );
};

export default SobreNosotros;