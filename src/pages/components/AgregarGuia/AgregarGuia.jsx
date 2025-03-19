"use client";
import * as React from "react";
import styles from "./AgregarGuia.module.css";
import logoSI from "/logoSI.png";
import { useEffect, useState } from "react";
import { collection, query, where, getDocs, getFirestore, addDoc, getDoc, doc, deleteDoc } from "firebase/firestore";
import { app } from "../../../credenciales";

const db = getFirestore(app);

function TrailHeader({ logoSrc, title, onClose }) {
  return (
    <header className={styles.headerWrapper}>
      <div className={styles.headerContent}>
        <div className={styles.logoColumn}>
          <img src={logoSrc} alt="Trail logo" className={styles.logo} />
        </div>
        <div className={styles.titleColumn}>
          <h1 className={styles.title}>{title}</h1>
        </div>
        <button className={styles.closeButton} onClick={onClose} aria-label="Cerrar">
          x
        </button>
      </div>
    </header>
  );
}

function GuideProfile({ imageSrc, name, onAsignarClick }) {
  return (
    <article className={styles.guideProfile}>
      <img src={imageSrc} alt={`${name} profile picture`} className={styles.guideImage} />
      <div className={styles.guideInfo}>
        <span style={{ textAlign: "left" }}>{name}</span>
        <br />
        <button onClick={() => onAsignarClick(name)} className={styles.asignarButton}>
          Asignar
        </button>
      </div>
    </article>
  );
}

function AgregarGuia({ actividadId, onClose, onGuideAssigned }) { // Agrega onGuideAssigned como prop
  const [guias, setGuias] = useState([]);
  const [guiasAsignados, setGuiasAsignados] = useState([]);

  const handleAsignarClick = async (guiaId, guiaNombre) => { 
    try {
        // Buscar si ya existe un guía asignado a esta actividad
        const q = query(collection(db, "GuiasAsignados"), where("actividadId", "==", actividadId));
        const querySnapshot = await getDocs(q);

        // Si hay un guía asignado, eliminarlo
        if (!querySnapshot.empty) {
            const guiaAsignadoDoc = querySnapshot.docs[0]; // Se asume que solo hay un guía asignado por actividad
            await deleteDoc(doc(db, "GuiasAsignados", guiaAsignadoDoc.id));
        }

        // Asignar el nuevo guía
        await addDoc(collection(db, "GuiasAsignados"), {
            guiaId: guiaId,
            actividadId: actividadId,
        });

        // Obtener la información del guía asignado
        const guiaRef = doc(db, "users", guiaId);
        const guiaSnap = await getDoc(guiaRef);

        if (guiaSnap.exists()) {
            const guiaData = guiaSnap.data();
            onGuideAssigned(guiaData);  // Actualizar la UI con el nuevo guía asignado
            console.log(guiaData);
        } else {
            console.log("No se encontró el guía con ID:", guiaId);
        }

        fetchGuiasDisponibles();
        onClose(); 
    } catch (error) {
        console.error("Error al asignar guía:", error);
        alert("Error al asignar guía.");
    }
};
     

const fetchGuiasDisponibles = async () => {
  const qGuias = query(collection(db, "users"), where("tipoUser", "==", "Guía"));
  const querySnapshotGuias = await getDocs(qGuias);
  const guiasData = querySnapshotGuias.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  // Obtener todos los guías asignados
  const qTodosGuiasAsignados = await getDocs(collection(db, "GuiasAsignados"));
  const todosGuiasAsignadosData = qTodosGuiasAsignados.docs.map((doc) => doc.data().guiaId);

  // Filtrar los guías disponibles
  const guiasDisponibles = guiasData.filter((guia) => !todosGuiasAsignadosData.includes(guia.id));
  setGuias(guiasDisponibles);
};


  useEffect(() => {
    if (actividadId) {
      fetchGuiasDisponibles();
    }
  }, [actividadId]);

  return (
    <section className={styles.container}>
      <div className={styles.contentWrapper}>
        <TrailHeader logoSrc={logoSI} title="Asignación de Guía" onClose={onClose} />
        <div className={styles.guidesSection}>
          {guias.map((guia) => (
            <div key={guia.id} className={styles.guideWrapper}>
              <GuideProfile
                imageSrc={guia.foto_perfil || "/logoSI.png"}
                name={`${guia.nombre} ${guia.apellido}`}
                onAsignarClick={() => handleAsignarClick(guia.id, `${guia.nombre} ${guia.apellido}`)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AgregarGuia;