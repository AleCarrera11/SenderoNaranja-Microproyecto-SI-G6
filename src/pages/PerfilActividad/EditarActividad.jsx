// ... existing code ...

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
  
    // ... rest of EditField component ...
  };
  
  const EditarActividad = ({ onClose }) => {
    // ... existing state and other code ...
  
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
  
  // ... rest of the file ...