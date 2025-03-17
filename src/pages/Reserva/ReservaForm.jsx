import React, { useState } from 'react';
import styles from './ReservationForm.module.css';

const ReservationForm = () => {
  const [formData, setFormData] = useState({
    name: 'Maria',
    lastName: 'Pérez',
    email: 'maria.perez@correo.unimet.edu.ve',
    phone: '+58 414-3686749'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const breadcrumbItems = ['Destinos', 'Sabas Nieves', 'Calendario', 'Reserva'];
  const tripDetails = [
    { label: 'Día de la excursión', value: 'Viernes 07 FEB' },
    { label: 'Horarios', value: '8am' },
    { label: 'Duración estimada', value: '2 h' },
    { label: 'Guía asignado', value: 'Pedro Perez' },
  ];
  const formFields = [
    { label: 'Nombre:', type: 'text', name: 'name', id: 'name' },
    { label: 'Apellido:', type: 'text', name: 'lastName', id: 'lastName' },
    { label: 'Email (institucional) :', type: 'email', name: 'email', id: 'email' },
    { label: 'Número de teléfono:', type: 'tel', name: 'phone', id: 'phone' },
  ];
  const tripInfo = [
    { label: 'Dificultad', value: 'Moderada' },
    { label: 'Distancia', value: '3.9km' },
  ];

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
          <h2 className={styles.destinationTitle}>SABAS NIEVES</h2>
          <p className={styles.activityType}>Senderismo</p>
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
          <form onSubmit={handleSubmit} className={styles.formGrid}>
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
        </section>
        <aside className={styles.imageSection}>
          <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/3cdf184df032abae184d8924fa29a18c23410d49" alt="Trip destination landscape" className={styles.tripImage} />
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
        <p className={styles.collaborationText}>
          Para asegurar tu reserva, debes realizar <span className={styles.boldText}>una colaboración de 3$.</span> Tu aporte servirá para remunerar a nuestros guías expertos, quienes te guiarán a través de la ruta y para seguir organizando más aventuras
        </p>
        <button className={styles.paymentButton} onClick={() => console.log('Payment initiated')}>
          Pagar con PayPal
        </button>
      </section>
    </div>
  );
};

export default ReservationForm;