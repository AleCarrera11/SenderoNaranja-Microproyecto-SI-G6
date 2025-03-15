import React, { useState } from "react";
import styles from "./Login.module.css";
import logoSI from "/logoSI.png";
import { app } from "../../credenciales";
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, fetchSignInMethodsForEmail, signOut } from "firebase/auth";
import { useNavigate } from "react-router";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { getFirestore } from "firebase/firestore";
import toast, { Toaster } from 'react-hot-toast';
import { getDoc, doc, setDoc } from "firebase/firestore";

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);

const Header = () => {
  return (
    <header className={styles.header}>
      <p className={styles.registerText}>
        <span>¿Aún no tienes una cuenta?</span>
        <a href="/register" className={styles.registerLink}>Regístrate gratis</a>
      </p>
    </header>
  );
};

const InputField = ({ type, value, placeholder, iconType, onChange, togglePasswordVisibility, isPasswordVisible, disabled }) => {
  return (
    <div className={styles.formGroup}>
      <label className={styles.label}>
        {type === "email" ? "Email Id :" : "Contraseña"}
      </label>
      <div className={styles.inputContainer}>
        <input
          type={type === "password" && isPasswordVisible ? "text" : type}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          className={styles.inputField}
          disabled={disabled}
        />
        <div
          className={
            iconType === "email"
              ? styles.iconContaineremail
              : styles.iconContainerlock
          }
        >
          {iconType === "email" ? (
            <svg id="140:259" width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg" className="icon" style={{ width: 24, height: 24 }}>
              <g clipPath="url(#clip0_140_259)">
                <path d="M3.80257 3.48645L21.9776 3.48645C22.2454 3.48645 22.5023 3.59283 22.6916 3.78219C22.881 3.97155 22.9874 4.22838 22.9874 4.49618V20.6518C22.9874 20.9196 22.881 21.1764 22.6916 21.3658C22.5023 21.5551 22.2454 21.6615 21.9776 21.6615H3.80257C3.53478 21.6615 3.27795 21.5551 3.08859 21.3658C2.89923 21.1764 2.79285 20.9196 2.79285 20.6518L2.79285 4.49618C2.79285 4.22838 2.89923 3.97155 3.08859 3.78219C3.27795 3.59283 3.53478 3.48645 3.80257 3.48645ZM20.9679 7.76567L12.9628 14.9347L4.8123 7.74346L4.8123 19.6421H20.9679V7.76567ZM5.32827 5.5059L12.9517 12.2327L20.4651 5.5059L5.32827 5.5059Z" fill="white"></path>
              </g>
              <defs>
                <clipPath id="clip0_140_259">
                  <rect width="24.2334" height="24.2334" fill="white" transform="translate(0.773682 0.457275)"></rect>
                </clipPath>
              </defs>
            </svg>
          ) : (
            <div onClick={togglePasswordVisibility} className={styles.passwordToggleIcon}>
              {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const SocialButton = ({ platform, onClick, disabled }) => {
  return (
    <button
      className={`${styles.socialButton} ${platform === "google" ? styles.googleButton : styles.facebookButton}`}
      onClick={onClick}
      disabled={disabled}
    >
      {platform === "google" ? (
        <i className="ti ti-brand-google" />
      ) : (
        <i className="ti ti-brand-facebook" />
      )}
      <span>Usar {platform === "google" ? "Google" : "Facebook"}</span>
    </button>
  );
};

const LogoSection = () => {
  return (
    <div className={styles.logoSection}>
      <img
        src={logoSI}
        alt="Logo"
        className={styles.logo}
      />
      <h2 className={styles.brandName}>Sendero Naranja</h2>
    </div>
  );
};

const LoginForm = ({ email, setEmail, contraseña, setContraseña, setError }) => {
  const navigate = useNavigate();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (!email || !contraseña) {
      setError("Por favor, completa todos los campos");
      setIsLoading(false);
      return;
    }

    if (!email.endsWith("@correo.unimet.edu.ve")) {
      setError("Solo se permiten correos @correo.unimet.edu.ve");
      setIsLoading(false);
      return;
    }

    try {
      const signInMethods = await fetchSignInMethodsForEmail(auth, email);
      
      if (signInMethods.length === 0) {
        setError("Este correo no está registrado");
        setIsLoading(false);
        return;
      }

      if (signInMethods.includes('google.com')) {
        setError("Este correo está registrado con Google. Por favor, usa el botón de Google para iniciar sesión.");
        setIsLoading(false);
        return;
      }

      const userCredential = await signInWithEmailAndPassword(auth, email, contraseña);
      const user = userCredential.user;

      // Verificar si el usuario existe en Firestore
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (!userDoc.exists()) {
        // Si no existe en Firestore pero sí en Auth, crear el documento
        await setDoc(doc(db, "users", user.uid), {
          email: user.email,
          nombre: user.displayName?.split(' ')[0] || '',
          apellido: user.displayName?.split(' ')[1] || '',
          fechaRegistro: new Date(),
          provider: 'email'
        });
      }

      toast.success("¡Inicio de sesión exitoso!");
      navigate("/destinos");
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      switch (error.code) {
        case 'auth/wrong-password':
          setError("Contraseña incorrecta");
          break;
        case 'auth/too-many-requests':
          setError("Demasiados intentos fallidos. Por favor, intenta más tarde");
          break;
        default:
          setError("Error al iniciar sesión. Por favor, intenta de nuevo");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError("");
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

      // Verificar si el usuario existe en Firestore
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (!userDoc.exists()) {
        // Si no existe en Firestore, crear el documento
        await setDoc(doc(db, "users", user.uid), {
          email: userEmail,
          nombre: user.displayName?.split(' ')[0] || '',
          apellido: user.displayName?.split(' ')[1] || '',
          fechaRegistro: new Date(),
          provider: 'google'
        });
      }

      toast.success("¡Inicio de sesión exitoso!");
      navigate("/destinos");
    } catch (error) {
      console.error("Error al iniciar sesión con Google:", error);
      if (error.code === 'auth/popup-closed-by-user') {
        toast.error("Se canceló el inicio de sesión con Google");
      } else {
        toast.error("Error al iniciar sesión con Google. Intenta nuevamente.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <form className={styles.loginForm} onSubmit={handleLogin}>
      <InputField
        type="email"
        placeholder="info@correo.unimet.edu.ve"
        iconType="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={isLoading}
      />
      <InputField
        type="password"
        placeholder="Ingresa tu contraseña"
        iconType="lock"
        value={contraseña}
        onChange={(e) => setContraseña(e.target.value)}
        togglePasswordVisibility={togglePasswordVisibility}
        isPasswordVisible={isPasswordVisible}
        disabled={isLoading}
      />
      <button 
        type="submit" 
        className={styles.loginButton}
        disabled={isLoading}
      >
        {isLoading ? "Cargando..." : "Inicia sesión"}
      </button>
      <SocialButton 
        platform="google" 
        onClick={handleGoogleLogin}
        disabled={isLoading}
      />
    </form>
  );
};

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [error, setError] = useState("");

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.leftPanel}>
        <LogoSection />
      </div>
      <div className={styles.rightPanel}>
        <h2 className={styles.loginTitle}>Inicia sesión</h2>
        {error && <p className={styles.error}>{error}</p>}
        <LoginForm
          email={email}
          setEmail={setEmail}
          contraseña={contraseña}
          setContraseña={setContraseña}
          setError={setError}
        />
      </div>
      <Toaster position="top-right" />
    </div>
  );
};

export default LoginPage;
