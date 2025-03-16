"use client";
import React, { useEffect, useState } from "react";
import styles from "./CrearActividad.module.css";
import { collection, onSnapshot, getFirestore, addDoc } from "firebase/firestore";
import { app } from "../../../credenciales";

const db = getFirestore(app)


const FormInput = ({ label, type = "text", ...props }) => {
  return (
    <div className={styles.inputContainer}>
      <label className={styles.label}>{label}</label>
      <input type={type} className={styles.input} {...props} />
    </div>
  );
};

const FormSelect = ({ label, options, ...props }) => { // Añade 'options' como prop
    return (
      <div className={styles.selectContainer}>
        <label className={styles.label}>{label}</label>
        <div className={styles.selectWrapper}>
          <select className={styles.select} {...props}>
            <option value="">{props.placeholder}</option>
            {options && options.map((option) => ( // Renderiza las opciones
              <option key={option.id} value={option.type}>
                {option.type}
              </option>
            ))}
          </select>
          <svg
            className={styles.arrow}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19.92 8.9502L13.4 15.4702C12.63 16.2402 11.37 16.2402 10.6 15.4702L4.07999 8.9502"
              stroke="#292D32"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    );
  };

const FormTextArea = ({ label, ...props }) => {
  return (
    <div className={styles.textareaContainer}>
      <label className={styles.label}>{label}</label>
      <textarea className={styles.textarea} {...props} />
    </div>
  );
};

const ButtonGroup = ({ buttons }) => {
  return (
    <div className={styles.buttonGroup}>
      {buttons.map((button, index) => (
        <button
          key={index}
          onClick={button.onClick}
          className={styles.button}
          type="button"
        >
          {button.text}
        </button>
      ))}
    </div>
  );
};

const DeleteIcon = () => (
    <svg
      width="21"
      height="20"
      viewBox="0 0 21 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M18.0937 2L2.7074 18" stroke="black" strokeWidth="5" />
      <path d="M2.00002 2.85646L19 17.3335" stroke="black" strokeWidth="5" />
    </svg>
  );


const CrearActividad =({ onClose })=> {
    const [tipos, setTipos] = useState([]);
    const [nombreActividad, setNombreActividad] = useState("");
    const [tipo, setTipo] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [dificultad, setDificultad] = useState("");
    const [distancia, setDistancia] = useState("");
    const [duracion, setDuracion] = useState("");
    const [foto, setFoto] = useState(null);
    const [ubicacionFoto, setUbicacionFoto] = useState(null);
    const [diasExcursion, setDiasExcursion] = useState("");
    const [horas, setHoras] = useState("");
    const [nota, setNota] = useState("");
    

    const handleFotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
          setFoto(file);
        }
      };
      
    const handleUbicacionChange = (e) => {
    const file = e.target.files[0];
    if (file) {
        setUbicacionFoto(file);
    }
    };

    
    const guardarActividad = async () => {
        try {


            await addDoc(collection(db, "destinos"), {
                nombreActividad,
                tipo,
                descripcion,
                dificultad,
                distancia,
                duracion,
                diasExcursion,
                horas,
                nota,

            });
            console.log("Actividad guardada con éxito");
            // Limpia los estados después de guardar
            setNombreActividad("");
            setTipo("");
            setDescripcion("");
            setDificultad("");
            setDistancia("");
            setDuracion("");
            setDiasExcursion("");
            setHoras("");
            setNota("");
            setFoto(null);
            setUbicacionFoto(null);
    } catch (error) {
        console.error("Error al guardar la actividad:", error);
    }
    };

    useEffect(() => {
      const unsubscribe = onSnapshot(collection(db, "activities"), (snapshot) => {
        const tiposList = snapshot.docs.map((doc) => ({
          id: doc.id,
          type: doc.data().type,
        }));
        setTipos(tiposList);
      });
  
      return () => unsubscribe();
    }, []);
  
    return (
      <main className={styles.container}>
      <div className={styles.wrapper}>
      <header className={styles.header}>{"Nueva Actividad"}
        <button
            className={styles.closeButton}
            aria-label="Close modal"
            onClick={onClose}
            >
            <DeleteIcon />
        </button>
      </header>
        <form className={styles.formContainer}>
          <div className={styles.twoColumnGrid}>
            <FormInput
              label="Nombre Actividad:"
              placeholder="Ingresa nombre..."
              type="text"
              value={nombreActividad}
              onChange={(e) => setNombreActividad(e.target.value)}
            />
            <FormSelect 
            label="Tipo:"
            placeholder="Selecciona tipo..."
            options={tipos}
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            />
          </div>

          <FormTextArea
            label="Descripción:"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            />
          <div className={styles.threeColumnGrid}>
          <FormSelect
            label="Dificultad:"
            placeholder="Selecciona dificultad..."
            options={Array.from({ length: 10 }, (_, i) => ({ id: i + 1, type: `${i + 1}/10` }))}
            value={dificultad}
            onChange={(e) => setDificultad(e.target.value)}
            />
            <FormInput
            label="Distancia (km):"
            placeholder="xxxxxxxxxx"
            type="text"
            value={distancia}
            onChange={(e) => setDistancia(e.target.value)}
            />
            <FormInput
            label="Duración:"
            placeholder="xxxxxxxxxx"
            type="text"
            value={duracion}
            onChange={(e) => setDuracion(e.target.value)}
            />
          </div>

          <ButtonGroup
            buttons={[
              { text: "Agregar foto", onClick: () => document.getElementById("fotoInput").click() },
              { text: "Ubicación ruta", onClick: () =>document.getElementById("ubicacionInput").click() },
            ]}
          />
          <input
                type="file"
                id="fotoInput"
                style={{ display: "none" }}
                onChange={handleFotoChange}
            />
            <input
                type="file"
                id="ubicacionInput"
                style={{ display: "none" }}
                onChange={handleUbicacionChange}
            />

          <div className={styles.twoColumnGrid}>
          <FormInput
            label="Dias de la excursión:"
            placeholder="Viernes,Sabado,Domingo"
            type="text"
            value={diasExcursion}
            onChange={(e) => setDiasExcursion(e.target.value)}
            />
            <FormInput
            label="Horas:"
            placeholder="8,10,14"
            type="text"
            value={horas}
            onChange={(e) => setHoras(e.target.value)}
            />
          </div>

          <div className={styles.formSection}>
          <FormInput
            label="Nota"
            placeholder="info@unimet.edu.ve"
            type="text"
            value={nota}
            onChange={(e) => setNota(e.target.value)}
            />
          </div>

          <div className={styles.submitContainer}>
          <button type="button" className={styles.submitButton} onClick={guardarActividad}>
            Agregar actividad
          </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default CrearActividad;
