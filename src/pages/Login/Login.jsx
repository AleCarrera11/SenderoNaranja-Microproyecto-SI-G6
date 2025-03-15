import React, { useState } from "react";
import styles from "./Login.module.css";
import logoSI from "/logoSI.png";
import { app } from "../../credenciales";
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from "react-router";
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

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

const InputField = ({ type, value, placeholder, iconType, onChange, togglePasswordVisibility, isPasswordVisible }) => {
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

const SocialButton = ({ platform, onClick }) => {
  return (
    <button
      className={`${styles.socialButton} ${
        platform === "google" ? styles.googleButton : styles.facebookButton
      }`}
      onClick={onClick}
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

  const handleLogin = async (e) => {
    e.preventDefault();
  
    if (!email.endsWith("@correo.unimet.edu.ve") && !email.endsWith("@unimet.edu.ve")) {
      setError("Debes usar un correo institucional (@unimet.edu.ve o @correo.unimet.edu.ve).");
      return;
    }
  
    try {
      await signInWithEmailAndPassword(auth, email, contraseña);
      navigate("/destinos");
    } catch (error) {
      setError("Correo no registrado o contraseña incorrecta.");
      console.error("Error al iniciar sesión", error);
    }
  };
  
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const userEmail = result.user.email;
  
      if (!userEmail.endsWith("@correo.unimet.edu.ve")) {
        setError("Debes usar un correo institucional (@correo.unimet.edu.ve).");
        await auth.signOut(); // Cierra sesión inmediatamente si el correo no es válido
        return;
      }
  
      navigate("/destinos");
    } catch (error) {
      setError("Error al iniciar sesión con Google.");
      console.error("Error con Google Sign-In", error);
    }
  };
  
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <form className={styles.loginForm} onSubmit={handleLogin}>
      <InputField
        type="email"
        placeholder="info@unimet.edu.ve"
        iconType="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <InputField
        type="password"
        placeholder="Ingresa tu contraseña"
        iconType="lock"
        value={contraseña}
        onChange={(e) => setContraseña(e.target.value)}
        togglePasswordVisibility={togglePasswordVisibility}
        isPasswordVisible={isPasswordVisible}
      />
      <button type="submit" className={styles.loginButton}>
        Inicia sesión
      </button>
      <SocialButton platform="google" onClick={handleGoogleLogin} />
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
    </div>
  );
};

export default LoginPage;
