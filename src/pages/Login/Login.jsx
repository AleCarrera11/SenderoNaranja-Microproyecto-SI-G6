"use client";
import React from "react";
import styles from "./Login.module.css";
import logoSI from "/logoSI.png";

// Header component with registration text and home icon
const Header = () => {
  return (
    <header className={styles.header}>
      <p className={styles.registerText}>
        <span>¿Aún no tienes una cuenta?</span>
        <span className={styles.registerLink}>Registrate gratis</span>
      </p>
      <div className={styles.homeIcon}>
        <i className={styles.tiTiHome} />
      </div>
    </header>
  );
};

// Input field component with icon
const InputField = ({ type, value, placeholder, iconType }) => {
  return (
    <div className={styles.formGroup}>
      <label className={styles.label}>
        {type === "email" ? "Email Id :" : "Contraseña"}
      </label>
      <div className={styles.inputContainer}>
        <input
          type={type}
          value={value}
          placeholder={placeholder}
          className={styles.inputField}
        />
        <div
          className={
            iconType === "email"
              ? styles.iconContaineremail
              : styles.iconContainerlock
          }
        >
          <div>
            <div
              dangerouslySetInnerHTML={{
                __html:
                  iconType === "email"
                    ? "<svg id=&quot;140:259&quot; width=&quot;25&quot; height=&quot;25&quot; viewBox=&quot;0 0 25 25&quot; fill=&quot;none&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot; class=&quot;icon&quot; style=&quot;width: 24px; height: 24px&quot;> <g clip-path=&quot;url(#clip0_140_259)&quot;> <path d=&quot;M3.80257 3.48645L21.9776 3.48645C22.2454 3.48645 22.5023 3.59283 22.6916 3.78219C22.881 3.97155 22.9874 4.22838 22.9874 4.49618V20.6518C22.9874 20.9196 22.881 21.1764 22.6916 21.3658C22.5023 21.5551 22.2454 21.6615 21.9776 21.6615H3.80257C3.53478 21.6615 3.27795 21.5551 3.08859 21.3658C2.89923 21.1764 2.79285 20.9196 2.79285 20.6518L2.79285 4.49618C2.79285 4.22838 2.89923 3.97155 3.08859 3.78219C3.27795 3.59283 3.53478 3.48645 3.80257 3.48645ZM20.9679 7.76567L12.9628 14.9347L4.8123 7.74346L4.8123 19.6421H20.9679V7.76567ZM5.32827 5.5059L12.9517 12.2327L20.4651 5.5059L5.32827 5.5059Z&quot; fill=&quot;white&quot;></path> </g> <defs> <clipPath id=&quot;clip0_140_259&quot;> <rect width=&quot;24.2334&quot; height=&quot;24.2334&quot; fill=&quot;white&quot; transform=&quot;translate(0.773682 0.457275)&quot;></rect> </clipPath> </defs> </svg>"
                    : "<svg id=&quot;140:267&quot; width=&quot;25&quot; height=&quot;25&quot; viewBox=&quot;0 0 25 25&quot; fill=&quot;none&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot; class=&quot;icon&quot; style=&quot;width: 24px; height: 24px&quot;> <g clip-path=&quot;url(#clip0_140_267)&quot;> <path d=&quot;M19.9586 10.5544H20.9683C21.2361 10.5544 21.493 10.6608 21.6823 10.8501C21.8717 11.0395 21.9781 11.2963 21.9781 11.5641V21.6614C21.9781 21.9292 21.8717 22.186 21.6823 22.3753C21.493 22.5647 21.2361 22.6711 20.9683 22.6711H4.8127C4.54491 22.6711 4.28808 22.5647 4.09872 22.3753C3.90936 22.186 3.80298 21.9292 3.80298 21.6614L3.80298 11.5641C3.80298 11.2963 3.90936 11.0395 4.09872 10.8501C4.28808 10.6608 4.54491 10.5544 4.8127 10.5544H5.82243V9.54465C5.82243 8.61645 6.00525 7.69735 6.36046 6.83981C6.71566 5.98227 7.23629 5.20309 7.89262 4.54676C8.54896 3.89042 9.32814 3.36979 10.1857 3.01459C11.0432 2.65938 11.9623 2.47656 12.8905 2.47656C13.8187 2.47656 14.7378 2.65938 15.5954 3.01459C16.4529 3.36979 17.2321 3.89042 17.8884 4.54676C18.5447 5.20309 19.0654 5.98227 19.4206 6.83981C19.7758 7.69735 19.9586 8.61645 19.9586 9.54465V10.5544ZM5.82243 12.5738L5.82243 20.6516H19.9586V12.5738L5.82243 12.5738ZM11.8808 14.5933H13.9002L13.9002 18.6322H11.8808L11.8808 14.5933ZM17.9391 10.5544V9.54465C17.9391 8.20567 17.4072 6.92153 16.4604 5.97473C15.5136 5.02792 14.2295 4.49602 12.8905 4.49602C11.5515 4.49602 10.2674 5.02792 9.32059 5.97473C8.37379 6.92153 7.84188 8.20567 7.84188 9.54465L7.84188 10.5544H17.9391Z&quot; fill=&quot;white&quot;></path> </g> <defs> <clipPath id=&quot;clip0_140_267&quot;> <rect width=&quot;24.2334&quot; height=&quot;24.2334&quot; fill=&quot;white&quot; transform=&quot;translate(0.773926 0.457153)&quot;></rect> </clipPath> </defs> </svg>",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Social login button component
const SocialButton = ({ platform }) => {
  return (
    <button
        className={
          platform === "google" ? styles.googleButton : styles.facebookButton
      }
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

// Logo section component
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

// Login form component
const LoginForm = () => {
  return (
    <form className={styles.loginForm}>
      <InputField
        type="email"
        value="info@unimet.edu.ve"
        placeholder=""
        iconType="email"
      />
      <InputField
        type="password"
        value=""
        placeholder="Ingresa tu contraseña"
        iconType="lock"
      />
      <button type="submit" className={styles.loginButton}>
        Inicia sesión
      </button>
      <div className={styles.divider}>
        <span className={styles.line} />
        <span className={styles.orText}>O</span>
        <span className={styles.line} />
      </div>
      <SocialButton
        platform="google"
        iconUrl="https://cdn.builder.io/api/v1/image/assets/TEMP/59d4120b702658d179a0a8e1aae58ececa3e49f8"
      />
      <SocialButton
        platform="facebook"
        iconUrl="https://cdn.builder.io/api/v1/image/assets/TEMP/5d4d20f9c60b3b6b265e0b455227bab985f4f029"
      />
    </form>
  );
};

function Login() {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/dist/tabler-icons.min.css"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Poppins:wght@400;600&display=swap"
        rel="stylesheet"
      />
      <main className={styles.container}>
        <Header />
        <section className={styles.content}>
          <div className={styles.leftSide}>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/41007c487891c9396fd337d8ea04e94832186146"
              alt="Hikers on a trail"
              className={styles.hikingImage}
            />
          </div>
          <div className={styles.rightSide}>
            <LogoSection />
            <h1 className={styles.loginTitle}>Inicia sesión en tu cuenta</h1>
            <LoginForm />
          </div>
        </section>
      </main>
    </>
  );
}

export default Login;
