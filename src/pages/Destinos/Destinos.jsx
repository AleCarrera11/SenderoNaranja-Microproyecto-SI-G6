"use client";
import React, { use, useEffect, useState} from "react";
import styles from "./Destinos.module.css";
import SearchBar from "../components/Searchbar/Searchbar";
import { TrailCard } from "../components/TrailCard/TrailCard";
import { Pagination } from "../components/Pagination/Pagination";
import { Footer } from "../components/Footer/Footer";
import { UserContext } from "../../Context/UserContex";
import  CrearTipo  from "../components/CrearTipo/CrearTipo";
import CrearActividad from "../components/CrearActividad/CrearActividad";
import { collection, onSnapshot, getFirestore, deleteDoc, doc } from "firebase/firestore";
import { app } from "../../credenciales";

const db = getFirestore(app);

function Destinos() {
  const { profile } = use(UserContext); // Accede al perfil del usuario
  const isAdmin = profile?.tipoUser === "Administrador"; // Verifica si es Administrador
  const [isModalTipoOpen, setModalTipoOpen] = useState(false); // Estado para el modal de CrearTipo
  const [isModalActividadOpen, setModalActividadOpen] = useState(false); // Estado para el modal de CrearActividad
  const [destinos, setDestinos] = useState([]); // Estado para los destinos
  const [selectedActivityId, setSelectedActivityId] = useState(null); // State for selected activity

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "destinos"), (snapshot) => {
      const destinosList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDestinos(destinosList);
    });

    return () => unsubscribe();
  }, []);

  const handleDeleteActivity = async () => {
    if (selectedActivityId) {
      if (window.confirm("¿Seguro que quieres eliminar esta actividad?")) {
        try {
          await deleteDoc(doc(db, "destinos", selectedActivityId));
          console.log(`Activity with ID: ${selectedActivityId} deleted successfully`);
          // Reset the selected activity
          setSelectedActivityId(null);
        } catch (error) {
          console.error("Error deleting activity: ", error);
        }
      }
    } else {
      console.log('No activity selected');
    }
  };

  return (
    <main className={styles.homePage}>
      <SearchBar />
      
      {/* Solo muestra los botones si el usuario es Administrador */}
      {isAdmin && (
        <section className={styles.buttonContainer}>
          <button className={styles.actionButton} onClick={() => setModalTipoOpen(true)}>
            Crear tipo
          </button>
          <button className={styles.actionButton} onClick={() => setModalActividadOpen(true)}>
            Crear actividad
          </button>
          <button className={styles.actionButton} onClick={handleDeleteActivity}>
            Eliminar actividad
          </button>
        </section>
      )}

      <section className={styles.contentContainer}>
        {destinos.map((destino) => (
          <div key={destino.id}>
            {isAdmin && (
              <input
                type="radio"
                name="selectedActivity"
                value={destino.id}
                checked={selectedActivityId === destino.id}
                onChange={() => setSelectedActivityId(destino.id)}
              />
            )}
            <TrailCard destino={destino} />
          </div>
        ))}
      </section>
      <Footer />
      {isModalTipoOpen && (
        <div className={styles.overlay} onClick={() => setModalTipoOpen(false)}>
          <div onClick={(e) => e.stopPropagation()}>
            <CrearTipo onClose={() => setModalTipoOpen(false)} />
          </div>
        </div>
      )}
      {isModalActividadOpen && (
        <div className={styles.overlay} onClick={() => setModalActividadOpen(false)}>
          <div onClick={(e) => e.stopPropagation()}>
            <CrearActividad onClose={() => setModalActividadOpen(false)} />
          </div>
        </div>
      )}
    </main>
  );
}

export default Destinos;
