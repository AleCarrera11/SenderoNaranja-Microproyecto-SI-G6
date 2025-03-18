import React, { useState } from "react";
import styles from "./RegistrationForm.module.css";
import logoSI from '/logoSI.png';
import { get } from "firebase/database";
import { app } from "../credenciales";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const auth = getAuth(app);




const RegistrationForm = () => {
  const [registroComo, setRegistroComo] = useState("Estudiante"); // Estado para el valor seleccionado

  // Componente FormHeader condensado
  const FormHeader = () => {
    return (
      <header>
        <div className={styles.logo}>
          <img
            src={logoSI}
            alt="Sendero Naranja Logo"
            className={styles.img}
          />
        </div>
        <h1 className={styles.title}>Registra tu cuenta</h1>
      </header>
    );
  };

  
  // Componente FormInput condensado
  const FormInput = ({ label, type, placeholder, value }) => {
    return (
      <div className={styles.formGroup}>
        <label className={styles.label}>{label}</label>
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          className={styles.input}
        />
      </div>
    );
  };

  // Componente ButtonGroup modificado
  const ButtonGroup = () => {
    return (
      <>
        <div className={styles.registerAs}>
          <label className={styles.label}>Registrar como:</label>
          <select
            className={styles.select}
            value={registroComo}
            onChange={(e) => setRegistroComo(e.target.value)}
          >
            <option value="Estudiante">Estudiante</option>
            <option value="Guía">Guía</option>
          </select>
        </div>
        <div className={styles.buttonRegister}>
        <button type="submit" className={styles.btnRegister}>
          Registrarse
        </button>
        </div>
        <div className={styles.socialButtons}>
          <button type="button" className={styles.btnGoogle}>
            <i className="ti ti-brand-google" />
            <span>Usar Google</span>
          </button>
          <button type="button" className={styles.btnFacebook}>
            <i className="ti ti-brand-facebook" />
            <span>Usar Facebook</span>
          </button>
        </div>
      </>
    );
  };

  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/dist/tabler-icons.min.css"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap"
        rel="stylesheet"
      />
      <main className={styles.container}>
          <section className={styles.content}>
          <FormHeader />
          <form className={styles.form}>
            <div className={styles.formRow}>
              <FormInput
                label="Nombre:"
                type="text"
                placeholder="Ingresa tu nombre..."
              />
              <FormInput
                label="Apellido:"
                type="text"
                placeholder="Ingresa tu apellido..."
              />
            </div>
            <div className={styles.formRow}>
              <FormInput
                label="Email (institucional):"
                type="email"
                value="info@unimet.edu.ve"
              />
              <FormInput
                label="Número de teléfono:"
                type="tel"
                value="+58 414-3686749"
              />
            </div>
            <div className={styles.formRow}>
              <FormInput
                label="Contraseña:"
                type="password"
                value="xxxxxxxxx"
              />
              <FormInput
                label="Confirma tu contraseña:"
                type="password"
                value="xxxxxxxxx"
              />
            </div>
            <ButtonGroup />
          </form>
        </section>
      </main>
    </>
  );
};

export default RegistrationForm;