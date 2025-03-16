import { useState } from "react";
import styles from "./CrearTipo.module.css";

const EditIcon = () => (
  <img
    src="https://cdn.builder.io/api/v1/image/assets/TEMP/4f38529a1d67f093c97f2ca1f7fff0d1f9ccf1a3"
    alt="Edit"
    className={styles.editIcon}
  />
);

const CheckIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 12L10 17L20 7" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

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

const ActivityItem = ({
  type,
  description,
  isEditing,
  onChangeType,
  onChangeDescription,
  onSave,
  onEdit,
  onDelete,
}) => (
  <div className={styles.activityRow}>
    <div className={styles.activityInput}>
      {isEditing ? (
        <input
          type="text"
          value={type}
          onChange={(e) => onChangeType(e.target.value)}
          placeholder="Tipo"
        />
      ) : (
        type
      )}
    </div>
    <div className={styles.activityInput}>
      {isEditing ? (
        <input
          type="text"
          value={description}
          onChange={(e) => onChangeDescription(e.target.value)}
          placeholder="Descripción"
        />
      ) : (
        description
      )}
    </div>
    <div className={styles.activityActions}>
      {isEditing ? (
        <button className={styles.addButton} aria-label="Save activity" onClick={onSave}>
          <CheckIcon />
        </button>
      ) : (
        <>
          <button className={styles.addButton} aria-label="Edit activity" onClick={onEdit}>
            <EditIcon />
          </button>
          <button className={styles.deleteButton} aria-label="Delete activity" onClick={onDelete}>
            <DeleteIcon />
          </button>
        </>
      )}
    </div>
  </div>
);

function CrearTipo({ onClose }) {
  const [newType, setNewType] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [activities, setActivities] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  
  const handleAddActivity = () => {
    if (newType && newDescription) {
      setActivities([...activities, { type: newType, description: newDescription }]);
      setNewType(""); // Clear input after adding
      setNewDescription(""); // Clear input after adding
    }
  };

  const handleDeleteActivity = (indexToDelete) => {
    setActivities(activities.filter((_, index) => index !== indexToDelete));
  };

  const handleEditActivity = (index) => {
    setEditingIndex(index);
    setNewType(activities[index].type); // Set the input value to current type
    setNewDescription(activities[index].description); // Set the input value to current description
  };

  const handleSaveActivity = (index) => {
    const updatedActivities = [...activities];
    updatedActivities[index] = { type: newType, description: newDescription };
    setActivities(updatedActivities);
    setEditingIndex(null);
    setNewType(""); // Clear input after saving
    setNewDescription(""); // Clear input after saving
  };

  return (
    <main className={styles.container}>
      <div className={styles.modalContainer}>
        <header className={styles.header}>
          <h1 className={styles.title}>Gestión de tipos</h1>
          <button
            className={styles.closeButton}
            aria-label="Close modal"
            onClick={onClose}
          >
            <DeleteIcon />
          </button>
        </header>

        <section className={styles.content}>
          <h2 className={styles.contentTitle}>Tipos/Clasificación de actividades</h2>

          <div className={styles.activityList}>
            <div className={styles.listHeader}>
              <span>Tipo</span>
              <span>Descripción</span>
              <span></span>
            </div>

            <ActivityItem
              type={newType}
              description={newDescription}
              isEditing={true}
              onChangeType={setNewType}
              onChangeDescription={setNewDescription}
              onSave={handleAddActivity}
            />

            {activities.map((activity, index) => (
              <ActivityItem
                key={index}
                index={index}
                type={editingIndex === index ? newType : activity.type}
                description={editingIndex === index ? newDescription : activity.description}
                isEditing={editingIndex === index}
                onChangeType={setNewType}
                onChangeDescription={setNewDescription}
                onSave={() => handleSaveActivity(index)}
                onEdit={() => handleEditActivity(index)}
                onDelete={() => handleDeleteActivity(index)}
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

export default CrearTipo;