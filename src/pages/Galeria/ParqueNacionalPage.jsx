"use client";
import React from "react";
import { Footer } from "../components/Footer/Footer";
import "./style.css";

const SectionTitle = ({ children }) => {
  return <h2 className="section-title">{children}</h2>;
};

const PhotoGallery = () => {
  return (
    <section className="gallery-section">
      <SectionTitle>GALERÍA DE FOTOS</SectionTitle>
      <div className="photo-grid">
        <div>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/9956be633be4c72d978195fcc11ad5206e0aa29a"
            alt="Vista del parque"
            className="gallery-image"
          />
        </div>
        <div>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/92cc83f328b6b32fc0238a6b1f4722c13ce231d4"
            alt="Montañas"
            className="gallery-image"
          />
        </div>
        <div>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/726b8c8b4943b83b6a3a8ca1e7e4814aa35b7b2c"
            alt="Sendero"
            className="gallery-image"
          />
        </div>
        <div>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/25b440defa2c93ad817590fafa1abb5d8ecf108c"
            alt="Vista panorámica"
            className="gallery-image"
          />
        </div>
      </div>
      <div className="view-more">Ver más...</div>
    </section>
  );
};

const rutas = {
  "Parque Nacional El Ávila": "/parque-nacional-el-avila",
  "Importancia de la conservación": "/importancia-conservacion",
  "Tips para hacer senderismo": "/tips-senderismo",
};

const InfoCard = ({ image, title, description }) => {
  return (
    <article className="info-card">
      <img src={image} alt={title} className="card-image" />
      <div className="content">
        <a href={rutas[title] || "/"}>
          <h3 className="card-title">{title}</h3>
        </a>
        <p className="card-description">{description}</p>
      </div>
    </article>
  );
};

export const ParqueNacionalPage = () => {
  return (
    <main className="page-container">
      <PhotoGallery />

      <section className="info-section">
        <SectionTitle>SECCIÓN INFORMATIVA</SectionTitle>

        <InfoCard
          image="https://cdn.builder.io/api/v1/image/assets/TEMP/f678661c72355313b9f7560da300e9c0a57fa9ca"
          title="Parque Nacional El Ávila"
          description="El Ávila, conocido oficialmente como Parque Nacional Waraira Repano, es un verdadero paraíso natural en el corazón de Caracas. Este majestuoso parque ofrece una gran diversidad de flora y fauna, paisajes impresionantes y una rica historia cultural. Aquí podrás disfrutar de senderos exuberantes, vistas panorámicas de la ciudad y la tranquilidad de la naturaleza."
        />

        <InfoCard
          image="https://cdn.builder.io/api/v1/image/assets/TEMP/47bfb9ebfad7349c98eeee1782c227327aeb819f"
          title="Importancia de la conservación"
          description="El Ávila, conocido oficialmente como Parque Nacional Waraira Repano, es un verdadero paraíso natural en el corazón de Caracas. Este majestuoso parque ofrece una gran diversidad de flora y fauna, paisajes impresionantes y una rica historia cultural. Aquí podrás disfrutar de senderos exuberantes, vistas panorámicas de la ciudad y la tranquilidad de la naturaleza."
        />

        <InfoCard
          image="https://cdn.builder.io/api/v1/image/assets/TEMP/ff8fecb267b0869005ea2164c8a463912e1f8d53"
          title="Tips para hacer senderismo"
          description="El Ávila, conocido oficialmente como Parque Nacional Waraira Repano, es un verdadero paraíso natural en el corazón de Caracas. Este majestuoso parque offers a great diversity of flora and fauna, impressive landscapes and a rich cultural history. Here you can enjoy exuberant trails, panoramic views of the city and the tranquility of nature."
        />
      </section>
      <Footer />
    </main>
  );
};

export default ParqueNacionalPage;