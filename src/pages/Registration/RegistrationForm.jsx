import React, { useState } from "react";
import styles from "./RegistrationForm.module.css";
import logoSI from "/logoSI.png";
import { app } from "../../credenciales";
import { getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, fetchSignInMethodsForEmail } from "firebase/auth";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const ButtonGroup = ({ handleGoogleSignIn }) => {
  return (
    <>
      <div className={styles.buttonRegister}>
        <button type="submit" className={styles.btnRegister}>
          Registrarse
        </button>
      </div>
      <div className={styles.socialButtons}>
        <button type="button" className={styles.btnGoogle} onClick={handleGoogleSignIn}>
          <i className="ti ti-brand-google" />
          <span>Usar Google</span>
        </button>
      </div>
    </>
  );
};

const FormHeader = () => {
  return (
    <header>
      <div className={styles.logo}>
        <img src={logoSI} alt="Sendero Naranja Logo" className={styles.img} />
      </div>
      <h1 className={styles.title}>Registra tu cuenta</h1>
    </header>
  );
};

const FormInput = ({ label, type, placeholder, value, onChange }) => {
  return (
    <div className={styles.formGroup}>
      <label className={styles.label}>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={styles.input}
      />
    </div>
  );
};

const RegistrationForm = () => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [confirmContraseña, setConfirmContraseña] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [generalError, setGeneralError] = useState(""); // Nuevo estado para errores generales
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const userEmail = result.user.email;

      // Validar que el correo sea del dominio correcto
      if (!userEmail.endsWith("@correo.unimet.edu.ve")) {
        setGeneralError("Solo se permiten correos @correo.unimet.edu.ve");
        return;
      }

      const signInMethods = await fetchSignInMethodsForEmail(auth, userEmail);

      if (signInMethods.length > 0) {
        setGeneralError("Usuario ya registrado. Por favor, inicia sesión.");
        navigate("/login");
      } else {
        console.log("Usuario registrado con Google:", userEmail);
        navigate("/login");
      }
    } catch (error) {
      console.error("Error al autenticar con Google:", error);
      setGeneralError("Error al autenticar con Google. Intenta nuevamente.");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setPasswordError("");
    setGeneralError(""); // Limpiar errores generales al intentar registrar

    if (contraseña !== confirmContraseña) {
      setPasswordError("Las contraseñas no coinciden.");
      return;
    }

    // Validación de correo
    if (!email.endsWith("@correo.unimet.edu.ve")) {
      setGeneralError("Por favor, usa un correo válido de @correo.unimet.edu.ve");
      return;
    }

    try {
      const signInMethods = await fetchSignInMethodsForEmail(auth, email);

      if (signInMethods.length > 0) {
        setGeneralError("Usuario ya registrado. Por favor, inicia sesión.");
        navigate("/login");
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(auth, email, contraseña);
      console.log("Usuario registrado:", userCredential.user.email);

      // Mostrar mensaje de éxito
      toast.success("¡Registro exitoso!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      // Limpiar los campos del formulario
      setNombre("");
      setApellido("");
      setEmail("");
      setTelefono("");
      setContraseña("");
      setConfirmContraseña("");

      // Redirigir a la página de destinos después de un pequeño retraso
      setTimeout(() => {
        navigate("/destinos");
      }, 3000);
    } catch (error) {
      console.error("Error al registrar:", error);
      setGeneralError("Error al registrar. Por favor, intenta de nuevo.");
    }
  };

  return (
    <>
      <main className={styles.container}>
        <section className={styles.content}>
          <FormHeader />
          <form className={styles.form} onSubmit={handleRegister}>
            <div className={styles.formRow}>
              <FormInput
                label="Nombre:"
                type="text"
                placeholder="Ingresa tu nombre..."
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
              <FormInput
                label="Apellido:"
                type="text"
                placeholder="Ingresa tu apellido..."
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
              />
            </div>
            <div className={styles.formRow}>
              <FormInput
                label="Email (institucional):"
                type="email"
                placeholder="info@correo.unimet.edu.ve"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <FormInput
                label="Número de teléfono:"
                type="tel"
                placeholder="+58 414-3686749"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
              />
            </div>
            <div className={styles.formRow}>
              <FormInput
                label="Contraseña:"
                type="password"
                placeholder="xxxxxxxxx"
                value={contraseña}
                onChange={(e) => setContraseña(e.target.value)}
              />
              <FormInput
                label="Confirma tu contraseña:"
                type="password"
                placeholder="xxxxxxxxx"
                value={confirmContraseña}
                onChange={(e) => setConfirmContraseña(e.target.value)}
              />
            </div>
            {passwordError && <p className={styles.error}>{passwordError}</p>}
            {generalError && <p className={styles.error}>{generalError}</p>} {/* Mostrar errores generales */}
            <ButtonGroup handleGoogleSignIn={handleGoogleSignIn} />
          </form>
        </section>
      </main>

      {/* Aquí se mostrará el popup de Toast */}
      <ToastContainer />
    </>
  );
};

export default RegistrationForm;
