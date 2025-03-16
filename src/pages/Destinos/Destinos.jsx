"use client";
import React, { use, useState} from "react";
import styles from "./Destinos.module.css";
import SearchBar from "../components/Searchbar/Searchbar";
import { TrailCard } from "../components/TrailCard/TrailCard";
import { Pagination } from "../components/Pagination/Pagination";
import { Footer } from "../components/Footer/Footer";
import { UserContext } from "../../Context/UserContex";
import  CrearTipo  from "../components/CrearTipo/CrearTipo";


const trailsData = [
  {
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/20094328fca09a757e7cdb5d1295251a22c92dc0",
    title: "SABAS NIEVES",
    activity: "Senderismo",
    rating: "4,6",
    description:
      "La ruta de Sabas Nieves es la compañera ideal para tus aventuras al aire libre. Con un recorrido diseñado para todos los niveles de condición física, podrás sumergirte en la belleza del Ávila sin complicaciones. ¡Anímate a explorar este sendero y descubre la magia de la montaña!",
    difficulty: "Moderada",
    distance: " 3.9km",
    duration: " 2 h",
  },
  {
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/1cf643ee52ede351a709b7008ce57d2c0e3bf2f1",
    title: "Quebrada Quintero",
    activity: "Paseo",
    rating: "4,8",
    description:
      "La ruta de Quebrada Quintero, que inicia en Sabas Nieves I, es una excelente opción para disfrutar de la naturaleza sin grandes exigencias físicas. Su recorrido gradual y bien señalizado, con tramos planos y vistas panorámicas, la hacen ideal para principiantes y expertos. Al final del camino, te espera una impresionante cascada que te invitará a relajarte y conectar con la naturaleza.",
    difficulty: "Baja",
    distance: " 1 km",
    duration: " 30 min",
  },
];

function Destinos() {
  const { profile } = use(UserContext); // Accede al perfil del usuario
  const isAdmin = profile?.tipoUser === "Administrador"; // Verifica si es Administrador
  const [isModalOpen, setModalOpen] = useState(false); // Estado para el modal
  
  return (
    <main className={styles.homePage}>
      <SearchBar />
      
      {/* Solo muestra los botones si el usuario es Administrador */}
      {isAdmin && (
        <section className={styles.buttonContainer}>
          <button className={styles.actionButton} onClick={() => setModalOpen(true)}>
            Crear tipo
          </button>          
          <button className={styles.actionButton}>Crear actividad</button>
        </section>
      )}

      <section className={styles.contentContainer}>
        {trailsData.map((trail, index) => (
          <TrailCard key={index} {...trail} />
        ))}
      </section>

      <Pagination />
      <Footer />
       {/* Overlay */}
      {isModalOpen && (
        <div className={styles.overlay} onClick={() => setModalOpen(false)}>
          <div onClick={(e) => e.stopPropagation()}>
            <CrearTipo onClose={() => setModalOpen(false)} />
          </div>
        </div>
      )}
    
    </main>
  );
}

export default Destinos;

