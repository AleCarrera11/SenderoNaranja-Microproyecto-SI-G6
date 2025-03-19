import React, { useState, use } from 'react';
import styles from './ReservationForm.module.css';
import BotonPaypal from '../components/BotonPaypal/BotonPaypal';
import ReservationConfirmation from '../components/ReservaConfirmada/ReservationConfirmation';
import { UserContext } from '../../Context/UserContex';
import { useLocation } from 'react-router';

const ReservationForm = () => {

  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    email: '',
    phone: ''
  });

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [formError, setFormError] = useState('');
  const [showPaypal, setShowPaypal] = useState(false);
  const { profile } = use(UserContext);
  const { state } = useLocation();  // Extrae el estado pasado en la navegación
  const { selectedDay, selectedTime, actividadInfo, nombreActividad, guia } = state || {};  // Asignación de valores

  console.log(selectedDay, selectedTime, actividadInfo, nombreActividad, guia, profile.uid, actividadInfo.id);  // Verifica si los datos están disponibles
  // Inicializa el formulario con los datos del usuario
  React.useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.nombre || '',  // Se asegura de usar el nombre correcto
        lastName: profile.apellido || '',
        email: profile.email || '',
        phone: profile.telefono || ''
      });
    }
  }, [profile]);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    setFormError('');
  };

  const validateForm = () => {
    if (!formData.name || !formData.lastName || !formData.email || !formData.phone) {
      setFormError('Por favor, completa todos los campos del formulario.');
      return false;
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@correo\.unimet\.edu\.ve$/;
    if (!emailRegex.test(formData.email)) {
      setFormError('Por favor, usa un correo válido @correo.unimet.edu.ve');
      return false;
    }

    const phoneRegex = /^\+?\d{1,3}[-.\s]?\d{1,14}$/;
    if (!phoneRegex.test(formData.phone)) {
      setFormError('Por favor, ingresa un número de teléfono válido');
      return false;
    }

    const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    if (!nameRegex.test(formData.name) || !nameRegex.test(formData.lastName)) {
      setFormError('El nombre y apellido no deben contener números ni caracteres especiales');
      return false;
    }

    return true;
  };

  const handlePaypalClick = () => {
    if (!validateForm()) {
      return;
    }
    setShowPaypal(true);
  };

  const updateQuota = async () => {
    try {
      // Obtener referencia al documento de la actividad
      const actividadDocRef = doc(db, 'destinos', actividadInfo.id);

      // Obtener el slotId
      const slotId = `${selectedDay}-${selectedTime}`;

      // Actualizar el número de cupos disponibles de forma atómica
      await updateDoc(actividadDocRef, {
        [`availableSlots.${slotId}.cuposDisponibles`]: actividadInfo.slot.cuposDisponibles - 1
      });

      // Actualizar el estado local de actividadInfo
      setActividadInfo(prevState => ({
        ...prevState,
        slot: {
          ...prevState.slot,
          cuposDisponibles: prevState.slot.cuposDisponibles - 1
        }
      }));

      console.log('Cupos disponibles actualizados correctamente');
    } catch (error) {
      console.error('Error al actualizar los cupos disponibles:', error);
    }
  };

  const handlePaymentSuccess = () => {
    setShowConfirmation(true);
    updateQuota();
  };

  const breadcrumbItems = ['Destinos', actividadInfo?.nombreActividad, 'Calendario', 'Reserva'];
  // Mostrar los datos de la actividad dinámicamente
  const tripDetails = [
    { label: 'Día de la excursión', value: selectedDay || 'No disponible' },
    { label: 'Horarios', value: selectedTime || 'No disponible' },
    { label: 'Duración estimada', value: actividadInfo?.duracion || 'No disponible' },
    { label: 'Guía asignado', value: guia || 'No asignado' },
  ];
  const formFields = [
    { label: 'Nombre:', type: 'text', name: 'name', id: 'name' },
    { label: 'Apellido:', type: 'text', name: 'lastName', id: 'lastName' },
    { label: 'Email (institucional) :', type: 'email', name: 'email', id: 'email' },
    { label: 'Número de teléfono:', type: 'tel', name: 'phone', id: 'phone' },
  ];
  const tripInfo = [
    { label: 'Dificultad', value: actividadInfo?.dificultad || 'No especificada' },
    { label: 'Distancia', value: actividadInfo?.distancia || 'No especificada' },
  ];

  if (!actividadInfo) {
    return <div className={styles.container}>Cargando información...</div>;
  }

  return (
    <div className={styles.container}>
      <nav aria-label="Breadcrumb">
        <ol className={styles.breadcrumb}>
          {breadcrumbItems.map((item, index) => (
            <React.Fragment key={index}>
              {index > 0 && <li className={styles.breadcrumbSeparator} aria-hidden="true">/</li>}
              <li className={index === breadcrumbItems.length - 1 ? styles.currentPage : styles.breadcrumbItem}>
                {index === breadcrumbItems.length - 1 ? (
                  <span aria-current="page">{item}</span>
                ) : (
                  <a href="#">{item}</a>
                )}
              </li>
            </React.Fragment>
          ))}
        </ol>
      </nav>
      <h1 className={styles.pageTitle}>Reserva</h1>
      <div className={styles.contentWrapper}>
        <section className={styles.formSection}>
          <h2 className={styles.destinationTitle}>{actividadInfo?.nombreActividad}</h2>
          <p className={styles.activityType}>{actividadInfo?.tipo}</p>
          <div className={styles.ratingWrapper}>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M7.7665 29.3333L9.93317 19.9667L2.6665 13.6667L12.2665 12.8333L15.9998 4L19.7332 12.8333L29.3332 13.6667L22.0665 19.9667L24.2332 29.3333L15.9998 24.3667L7.7665 29.3333Z" fill="#FFD522" />
            </svg>
            <span className={styles.ratingScore}>4,6</span>
          </div>
          <div className={styles.tripDetails}>
            {tripDetails.map((detail, index) => (
              <p key={index}>
                <span className={styles.boldText}>{detail.label}</span>: {detail.value}
              </p>
            ))}
          </div>
          <h3 className={styles.formTitle}>Verifica tus datos:</h3>
          <form className={styles.formGrid}>
            {formFields.map((field) => (
              <div key={field.id} className={styles.formField}>
                <label htmlFor={field.id} className={styles.formLabel}>{field.label}</label>
                <input
                  type={field.type}
                  id={field.id}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleInputChange}
                  className={field.type === 'email' ? styles.formInputEmail : styles.formInput}
                  aria-label={field.label}
                  required
                />
              </div>
            ))}
          </form>
          {formError && <p className={styles.error}>{formError}</p>}
        </section>
        <aside className={styles.imageSection}>
          <img src={actividadInfo?.foto} />
          <div className={styles.tripInfo}>
            {tripInfo.map((info, index) => (
              <p key={index}>
                <span className={styles.boldText}>{info.label}</span>: {info.value}
              </p>
            ))}
          </div>
        </aside>
      </div>
      <section className={styles.collaborationSection}>
        <h3 className={styles.collaborationTitle}>Colaboración</h3>
        {profile?.tipoUser === "Estudiante" ? (
          <>
            <p className={styles.collaborationText}>
              Para asegurar tu reserva, debes realizar <span className={styles.boldText}>una colaboración de 3$.</span> Tu aporte servirá para remunerar a nuestros guías expertos, quienes te guiarán a través de la ruta y para seguir organizando más aventuras
            </p>
            {showPaypal ? (
              <BotonPaypal onSuccess={handlePaymentSuccess} />
            ) : (
              <button 
                className={styles.paymentButton}
                onClick={handlePaypalClick}
              >
                Pagar con PayPal
              </button>
            )}
          </>
        ) : (
          <p className={styles.collaborationText}>
            Acceso especial para {profile?.tipoUser}
          </p>
        )}
      </section>

      {showConfirmation && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <ReservationConfirmation 
              onClose={() => setShowConfirmation(false)}
              formData={formData}
              actividadInfo={actividadInfo}
              selectedDay={selectedDay}
              selectedTime={selectedTime}
              nombreActividad={nombreActividad}
              guia={guia}
              userId={profile.uid}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ReservationForm;
