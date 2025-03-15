import React, { useState } from "react";
import styles from "./RegistrationForm.module.css";
import logoSI from "/logoSI.png";
import { app } from "../../credenciales";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider, 
  fetchSignInMethodsForEmail,
  sendEmailVerification,
  signOut
} from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

const ButtonGroup = ({ handleGoogleSignIn, isLoading }) => {
  return (
    <>
      <div className={styles.buttonRegister}>
        <button type="submit" className={styles.btnRegister} disabled={isLoading}>
          Registrarse
        </button>
      </div>
      <div className={styles.socialButtons}>
        <button type="button" className={styles.btnGoogle} onClick={handleGoogleSignIn} disabled={isLoading}>
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

const FormInput = ({ label, type, placeholder, value, onChange, disabled, required }) => {
  return (
    <div className={styles.formGroup}>
      <label className={styles.label}>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={styles.input}
        disabled={disabled}
        required={required}
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
  const [generalError, setGeneralError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validarContraseña = (password) => {
    if (password.length < 8) return "La contraseña debe tener al menos 8 caracteres";
    if (!/[A-Z]/.test(password)) return "La contraseña debe contener al menos una mayúscula";
    if (!/[a-z]/.test(password)) return "La contraseña debe contener al menos una minúscula";
    if (!/[0-9]/.test(password)) return "La contraseña debe contener al menos un número";
    return "";
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const userEmail = user.email;

      if (!userEmail.endsWith("@correo.unimet.edu.ve")) {
        toast.error("Solo se permiten correos @correo.unimet.edu.ve");
        await signOut(auth);
        setIsLoading(false);
        return;
      }

      // Guardar datos del usuario en Firestore
      await setDoc(doc(db, "users", user.uid), {
        nombre: user.displayName?.split(' ')[0] || '',
        apellido: user.displayName?.split(' ')[1] || '',
        email: userEmail,
        telefono: user.phoneNumber || '',
        fechaRegistro: new Date(),
        provider: 'google'
      });

      toast.success("¡Registro exitoso!");
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      console.error("Error al registrar con Google:", error);
      if (error.code === 'auth/popup-closed-by-user') {
        toast.error("Se canceló el registro con Google");
      } else {
        toast.error("Error al registrar con Google. Intenta nuevamente.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setPasswordError("");
    setGeneralError("");

    if (!nombre || !apellido || !email || !telefono || !contraseña || !confirmContraseña) {
      setGeneralError("Todos los campos son obligatorios");
      setIsLoading(false);
      return;
    }

    const errorContraseña = validarContraseña(contraseña);
    if (errorContraseña) {
      setPasswordError(errorContraseña);
      setIsLoading(false);
      return;
    }

    if (contraseña !== confirmContraseña) {
      setPasswordError("Las contraseñas no coinciden");
      setIsLoading(false);
      return;
    }

    if (!email.endsWith("@correo.unimet.edu.ve")) {
      setGeneralError("Por favor, usa un correo válido de @correo.unimet.edu.ve");
      setIsLoading(false);
      return;
    }

    try {
      // Crear usuario en Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, contraseña);
      const user = userCredential.user;

      // Guardar datos del usuario en Firestore
      await setDoc(doc(db, "users", user.uid), {
        nombre,
        apellido,
        email,
        telefono,
        fechaRegistro: new Date(),
        provider: 'email'
      });

      toast.success("¡Registro exitoso!");
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      console.error("Error al registrar:", error);
      switch (error.code) {
        case 'auth/email-already-in-use':
          setGeneralError("Este correo ya está registrado");
          break;
        case 'auth/invalid-email':
          setGeneralError("Correo electrónico inválido");
          break;
        case 'auth/operation-not-allowed':
          setGeneralError("El registro con email/contraseña no está habilitado");
          break;
        case 'auth/weak-password':
          setPasswordError("La contraseña es demasiado débil");
          break;
        default:
          setGeneralError("Error al registrar. Por favor, intenta de nuevo.");
      }
    } finally {
      setIsLoading(false);
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
                disabled={isLoading}
                required
              />
              <FormInput
                label="Apellido:"
                type="text"
                placeholder="Ingresa tu apellido..."
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>
            <div className={styles.formRow}>
              <FormInput
                label="Email (institucional):"
                type="email"
                placeholder="info@correo.unimet.edu.ve"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                required
              />
              <FormInput
                label="Número de teléfono:"
                type="tel"
                placeholder="+58 414-3686749"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>
            <div className={styles.formRow}>
              <FormInput
                label="Contraseña:"
                type="password"
                placeholder="Mínimo 8 caracteres"
                value={contraseña}
                onChange={(e) => setContraseña(e.target.value)}
                disabled={isLoading}
                required
              />
              <FormInput
                label="Confirma tu contraseña:"
                type="password"
                placeholder="Repite tu contraseña"
                value={confirmContraseña}
                onChange={(e) => setConfirmContraseña(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>
            {passwordError && <p className={styles.error}>{passwordError}</p>}
            {generalError && <p className={styles.error}>{generalError}</p>}
            <ButtonGroup 
              handleGoogleSignIn={handleGoogleSignIn}
              isLoading={isLoading}
            />
          </form>
        </section>
      </main>
      <ToastContainer />
    </>
  );
};

export default RegistrationForm;
