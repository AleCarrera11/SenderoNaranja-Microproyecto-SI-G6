"use client";
import React, { useEffect, useState } from "react";
import styles from "./EditarActividad.module.css";
import { collection, onSnapshot, getFirestore, doc, updateDoc, getDocs, query, where } from "firebase/firestore";
import { app } from "../../../credenciales";
import { uploadImage } from "../../../supabseCredentials";
import { useParams, useNavigate } from "react-router";

const db = getFirestore(app);

const EditField = ({ label, value, onChange, type = "text", options = null, isEditing, onSave, onCancel, fieldName, onEdit }) => {
  const [editValue, setEditValue] = useState(value);

  const handleSave = () => {
    onChange(editValue);
    onSave();
  };

  const handleCancel = () => {
    setEditValue(value);
    onCancel();
  };

  if (!isEditing) {
    return (
      <div className={styles.fieldContainer}>
        <label className={styles.label}>{label}</label>
        <div className={styles.valueContainer}>
          <span className={styles.value}>{value}</span>
          <button className={styles.editButton} onClick={() => onEdit(fieldName)}>
            Editar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.fieldContainer}>
      <label className={styles.label}>{label}</label>
      <div className={styles.editContainer}>
        {type === "select" ? (
          <select 
            className={styles.editInput} 
            value={editValue} 
            onChange={(e) => setEditValue(e.target.value)}
          >
            <option value="">Selecciona...</option>
            {options.map((option) => (
              <option key={option.id} value={option.type}>
                {option.type}
              </option>
            ))}
          </select>
        ) : type === "textarea" ? (
          <textarea 
            className={styles.editTextarea} 
            value={editValue} 
            onChange={(e) => setEditValue(e.target.value)}
          />
        ) : (
          <input 
            type={type} 
            className={styles.editInput} 
            value={editValue} 
            onChange={(e) => setEditValue(e.target.value)}
          />
        )}
        <div className={styles.editActions}>
          <button className={styles.saveButton} onClick={handleSave}>Guardar</button>
          <button className={styles.cancelButton} onClick={handleCancel}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

const ImageField = ({ label, imageUrl, onImageChange, isUploading }) => {
  const [previewUrl, setPreviewUrl] = useState(imageUrl);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);

    await onImageChange(file);
  };

  return (
    <div className={styles.fieldContainer}>
      <label className={styles.label}>{label}</label>
      <div className={styles.imageContainer}>
        {previewUrl && (
          <img src={previewUrl} alt={label} className={styles.imagePreview} />
        )}
        <div className={styles.imageActions}>
          <input
            type="file"
            id={`${label}Input`}
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: "none" }}
          />
          <button 
            className={styles.uploadButton}
            onClick={() => document.getElementById(`${label}Input`).click()}
            disabled={isUploading}
          >
            {isUploading ? "Subiendo..." : "Cambiar imagen"}
          </button>
        </div>
      </div>
    </div>
  );
};

const EditarActividad = ({ onClose }) => {
  const { nombreActividad } = useParams();
  const navigate = useNavigate();
  const [tipos, setTipos] = useState([]);
  const [actividad, setActividad] = useState(null);
  const [actividadId, setActividadId] = useState(null);
  const [editingField, setEditingField] = useState(null);
  const [isUploadingFoto, setIsUploadingFoto] = useState(false);
  const [isUploadingUbicacion, setIsUploadingUbicacion] = useState(false);

  useEffect(() => {
    const fetchActividad = async () => {
      const q = query(collection(db, "destinos"), where("nombreActividad", "==", nombreActividad));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        setActividadId(querySnapshot.docs[0].id);
        setActividad(querySnapshot.docs[0].data());
      }
    };

    const fetchTipos = async () => {
      const unsubscribe = onSnapshot(collection(db, "activities"), (snapshot) => {
        const tiposList = snapshot.docs.map((doc) => ({
          id: doc.id,
          type: doc.data().type,
        }));
        setTipos(tiposList);
      });

      return () => unsubscribe();
    };

    fetchActividad();
    fetchTipos();
  }, [nombreActividad]);

  const handleFieldUpdate = async (field, value) => {
    try {
      await updateDoc(doc(db, "destinos", actividadId), {
        [field]: value
      });
      setActividad(prev => ({ ...prev, [field]: value }));
      setEditingField(null);
    } catch (error) {
      console.error("Error al actualizar el campo:", error);
      alert("Error al actualizar el campo");
    }
  };

  const handleImageUpload = async (file, field) => {
    try {
      if (field === "foto") {
        setIsUploadingFoto(true);
      } else {
        setIsUploadingUbicacion(true);
      }

      const imageUrl = await uploadImage(file, "actividad-fotos", actividad.nombreActividad);
      await handleFieldUpdate(field, imageUrl);
    } catch (error) {
      console.error("Error al subir la imagen:", error);
      alert("Error al subir la imagen");
    } finally {
      if (field === "foto") {
        setIsUploadingFoto(false);
      } else {
        setIsUploadingUbicacion(false);
      }
    }
  };

  if (!actividad) return <div className={styles.loading}>Cargando...</div>;

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <header className={styles.header}>
          <h2>Editar Actividad</h2>
          <button className={styles.closeButton} onClick={onClose}>×</button>
        </header>

        <div className={styles.content}>
          <EditField
            label="Nombre de la actividad"
            value={actividad.nombreActividad}
            onChange={(value) => handleFieldUpdate("nombreActividad", value)}
            isEditing={editingField === "nombreActividad"}
            onSave={() => setEditingField(null)}
            onCancel={() => setEditingField(null)}
            fieldName="nombreActividad"
            onEdit={setEditingField}
          />

          <EditField
            label="Tipo"
            value={actividad.tipo}
            onChange={(value) => handleFieldUpdate("tipo", value)}
            type="select"
            options={tipos}
            isEditing={editingField === "tipo"}
            onSave={() => setEditingField(null)}
            onCancel={() => setEditingField(null)}
            fieldName="tipo"
            onEdit={setEditingField}
          />

          <EditField
            label="Descripción"
            value={actividad.descripcion}
            onChange={(value) => handleFieldUpdate("descripcion", value)}
            type="textarea"
            isEditing={editingField === "descripcion"}
            onSave={() => setEditingField(null)}
            onCancel={() => setEditingField(null)}
            fieldName="descripcion"
            onEdit={setEditingField}
          />

          <div className={styles.grid}>
            <EditField
              label="Dificultad"
              value={actividad.dificultad}
              onChange={(value) => handleFieldUpdate("dificultad", value)}
              type="select"
              options={Array.from({ length: 10 }, (_, i) => ({ id: i + 1, type: `${i + 1}/10` }))}
              isEditing={editingField === "dificultad"}
              onSave={() => setEditingField(null)}
              onCancel={() => setEditingField(null)}
              fieldName="dificultad"
              onEdit={setEditingField}
            />

            <EditField
              label="Distancia (km)"
              value={actividad.distancia}
              onChange={(value) => handleFieldUpdate("distancia", value)}
              isEditing={editingField === "distancia"}
              onSave={() => setEditingField(null)}
              onCancel={() => setEditingField(null)}
              fieldName="distancia"
              onEdit={setEditingField}
            />

            <EditField
              label="Duración"
              value={actividad.duracion}
              onChange={(value) => handleFieldUpdate("duracion", value)}
              isEditing={editingField === "duracion"}
              onSave={() => setEditingField(null)}
              onCancel={() => setEditingField(null)}
              fieldName="duracion"
              onEdit={setEditingField}
            />
          </div>

          <ImageField
            label="Foto principal"
            imageUrl={actividad.foto}
            onImageChange={(file) => handleImageUpload(file, "foto")}
            isUploading={isUploadingFoto}
          />

          <ImageField
            label="Foto de ubicación"
            imageUrl={actividad.ubicacionFoto}
            onImageChange={(file) => handleImageUpload(file, "ubicacionFoto")}
            isUploading={isUploadingUbicacion}
          />

          <div className={styles.grid}>
            <EditField
              label="Días de excursión"
              value={actividad.diasExcursion}
              onChange={(value) => handleFieldUpdate("diasExcursion", value)}
              isEditing={editingField === "diasExcursion"}
              onSave={() => setEditingField(null)}
              onCancel={() => setEditingField(null)}
              fieldName="diasExcursion"
              onEdit={setEditingField}
            />

            <EditField
              label="Horas"
              value={actividad.horas}
              onChange={(value) => handleFieldUpdate("horas", value)}
              isEditing={editingField === "horas"}
              onSave={() => setEditingField(null)}
              onCancel={() => setEditingField(null)}
              fieldName="horas"
              onEdit={setEditingField}
            />
          </div>

          <EditField
            label="Nota"
            value={actividad.nota}
            onChange={(value) => handleFieldUpdate("nota", value)}
            isEditing={editingField === "nota"}
            onSave={() => setEditingField(null)}
            onCancel={() => setEditingField(null)}
            fieldName="nota"
            onEdit={setEditingField}
          />
        </div>
      </div>
    </div>
  );
};

export default EditarActividad; 