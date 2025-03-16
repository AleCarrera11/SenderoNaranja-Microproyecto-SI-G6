import React, { useState, useContext, use, useId } from "react";
import styles from "./RegistrationForm.module.css";
import { UserContext } from "../../Context/UserContex";
import { doc, getFirestore, updateDoc } from "firebase/firestore";
import { app } from "../../credenciales";

const FormInput = ({ label, type, placeholder, value, onChange, name }) => {
  return (
    <div className={styles.formGroup}>
      <label className={styles.label}>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        className={styles.input}
        onChange={onChange}
        name={name}
      />
    </div>
  );
};

const ProfileHeader = ({ email }) => {
  
  const { profile } = useContext(UserContext);  

  return (
    <header className={styles.profileHeader}>
      <h1 className={styles.welcomeTitle}>Bienvenid@, {profile.nombre}</h1>
      <div className={styles.profileInfo}>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/a12fbcf159d1ddc6a1e085c87c9da24a30d1b74e706207b3ae631e69563d7eae?placeholderIfAbsent=true&apiKey=33a69b4c6fa34f2ba1e9b1915119a1e2"
          alt="Profile"
          className={styles.profileImage}
        />
        <div className={styles.userInfo}>
          <h2 className={styles.userRole}>{profile.tipoUser}</h2>
          <p className={styles.userEmail}>{email}</p>
        </div>
      </div>
    </header>
  );
};

const Perfil1 = () => {

  const { profile, setProfile } = use(UserContext);  // Corregido: useContext en lugar de use
  const userEmail = profile?.email || "";  // Acceder al email de forma seguraa
  const db = getFirestore(app)

  const [nombre, setNombre] = useState(profile.nombre || "");
  const [apellido, setApellido] = useState(profile.apellido || "");
  const [telefono, setTelefono] = useState(profile.telefono || "");

  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [editedData, setEditedData] = useState({
    nombre: profile.nombre || "",
    apellido: profile.apellido || "",
    telefono: profile.telefono || "",
  });
  const [error, setError] = useState("");

  const handleEditClick = () => {
    setEditedData({
      nombre: profile.nombre || "",
      apellido: profile.apellido || "",
      telefono: profile.telefono || "",
    });
    setIsEditPopupOpen(true);
  };

  const handleInputChange = (e) => {
    setEditedData({ ...editedData, [e.target.name]: e.target.value });
  };

  const handleSaveClick = async () => {
    const telefonoRegex = /^\+?\d{1,3}[-.\s]?\d{1,14}$/;
    if (!telefonoRegex.test(editedData.telefono)) {
      setError("Número de teléfono inválido.");
      return;
    }

    try {
      // Obtén el UID del usuario autenticado
      const userUID = profile?.uid;
      if (!userUID) {
        console.error("No se encontró el UID del usuario.");
        return;
      }

      const userDocRef = doc(db, "users", userUID);
      await updateDoc(userDocRef, {
        nombre: editedData.nombre,
        apellido: editedData.apellido,
        telefono: editedData.telefono,
      });

      // Actualizar el contexto con los nuevos datos
      setProfile((prev) => ({
        ...prev,
        nombre: editedData.nombre,
        apellido: editedData.apellido,
        telefono: editedData.telefono,
      }));

      setIsEditPopupOpen(false);
      setError("");
    } catch (error) {
      console.error("Error al actualizar el perfil:", error);
      setError("Error al guardar los cambios.");
    }
  };


  return (
    <main className={styles.container1}>
      <section className={styles.content}>
        <div className={styles.headerContainer}>
          <ProfileHeader email={userEmail} />
          <button className={styles.editButton} onClick={handleEditClick}>
            Editar
          </button>
        </div>
        <form className={styles.form}>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Nombre:</label>
              <p className={styles.userData}>{profile.nombre}</p>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Apellido:</label>
              <p className={styles.userData}>{profile.apellido}</p>
            </div>
          </div>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Email:</label>
              <p className={styles.userData}>{profile.email}</p>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Número de teléfono:</label>
              <p className={styles.userData}>{profile.telefono}</p>
            </div>
          </div>
        </form>
      </section>

      {isEditPopupOpen && (
        <div className={styles.popup}>
          <div className={styles.popupContent}>
            <h2 className={styles.title}>Editar Perfil</h2>
            <FormInput
              label="Nombre:"
              type="text"
              value={editedData.nombre}
              onChange={handleInputChange}
              name="nombre"
            />
            <FormInput
              label="Apellido:"
              type="text"
              value={editedData.apellido}
              onChange={handleInputChange}
              name="apellido"
            />
            <FormInput
              label="Número de teléfono:"
              type="tel"
              value={editedData.telefono}
              onChange={handleInputChange}
              name="telefono"
            />
            {error && <p className={styles.error}>{error}</p>}
            <div className={styles.popupButtons}>
              <button className={styles.btnPrimary} onClick={handleSaveClick}>
                Guardar Cambios
              </button>
              <button
                className={styles.btnPrimary}
                onClick={() => setIsEditPopupOpen(false)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Perfil1;