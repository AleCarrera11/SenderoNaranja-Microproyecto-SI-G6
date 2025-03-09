import React, { useState } from "react";
import styles from "./RegistrationForm.module.css";
import logoSI from "/logoSI.png";
import { app } from "../../credenciales";
import { getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, fetchSignInMethodsForEmail } from "firebase/auth";
import { useNavigate } from "react-router";

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const ButtonGroup = ({ registroComo, setRegistroComo, handleGoogleSignIn }) => {
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
  const [registroComo, setRegistroComo] = useState("Estudiante");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [confirmContraseña, setConfirmContraseña] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const userEmail = result.user.email;
      
      const emailRegex = /^[a-zA-Z0-9._-]+@correo\.unimet\.edu\.ve$/;
      if (!emailRegex.test(userEmail)) {
        alert("Solo se permiten correos @correo.unimet.edu.ve");
        return;
      }

      // Verificar si el correo electrónico ya está registrado
      const signInMethods = await fetchSignInMethodsForEmail(auth, userEmail);
      
      if (signInMethods.length > 0) {
        // El correo ya está registrado, redirigir al inicio de sesión
        alert("Ya estás registrado. Por favor, inicia sesión.");
        navigate("/login");  // Redirigir a la página de login
      } else {
        // Si el correo no está registrado, proceder con el registro
        console.log("Usuario registrado con Google:", userEmail);
        navigate("/destinos");
      }
    } catch (error) {
      console.error("Error al autenticar con Google:", error);
      alert("Error al autenticar con Google. Intenta nuevamente.");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setPasswordError("");

    if (contraseña !== confirmContraseña) {
      setPasswordError("Las contraseñas no coinciden.");
      return;
    }

    const emailRegex =
      registroComo === "Estudiante"
        ? /^[a-zA-Z0-9._-]+@correo\.unimet\.edu\.ve$/
        : /^[a-zA-Z0-9._-]+@unimet\.edu\.ve$/;

    if (!emailRegex.test(email)) {
      alert(
        `Por favor, usa un correo válido de ${
          registroComo === "Estudiante"
            ? "@correo.unimet.edu.ve"
            : "@unimet.edu.ve"
        }`
      );
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, contraseña);
      console.log("Usuario registrado:", userCredential.user.email);

      setNombre("");
      setApellido("");
      setEmail("");
      setTelefono("");
      setContraseña("");
      setConfirmContraseña("");

      if (registroComo === "Estudiante") {
        navigate("/destinos");
      }
    } catch (error) {
      console.error("Error al registrar:", error);
      alert("Error al registrar. Por favor, intenta de nuevo.");
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
                placeholder="info@unimet.edu.ve"
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
            <ButtonGroup registroComo={registroComo} setRegistroComo={setRegistroComo} handleGoogleSignIn={handleGoogleSignIn} />
          </form>
        </section>
      </main>
    </>
  );
};

export default RegistrationForm;
