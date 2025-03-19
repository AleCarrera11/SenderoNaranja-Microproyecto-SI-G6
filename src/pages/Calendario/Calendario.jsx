"use client";
import styles from "./Calendario.module.css";
import { db, auth } from "../../credenciales";
import { collection, addDoc, getDocs, query, where, doc, getDoc, deleteDoc, updateDoc, onSnapshot } from "firebase/firestore";
import PreReserva from '../Pre-Reserva/PreReserva';
import { Link, useParams } from "react-router";

const TimeSlot = ({ time, type, date, onSelect }) => {
  const getTimeSlotClass = () => {
    switch (type) {
      case "morning":
        return styles.morningSlot;
      case "midday":
        return styles.middaySlot;
      case "afternoon":
        return styles.afternoonSlot;
      case "evening":
        return styles.eveningSlot;
      default:
        return "";
    }
  };

  const handleClick = () => {
    onSelect({ time, date, type });
  };

  return (
    <div 
      className={`${getTimeSlotClass()} ${styles.clickableSlot}`}
      onClick={handleClick}
    >
      {time}
    </div>
  );
};

import React, { useState, useEffect } from "react";
const DayCell = ({ day, isToday, isCurrentMonth = true, isAdmin, onDeleteSlot, availableSlots, onTimeSlotSelect, setSelectedTimeSlot, setShowAddQuota }) => {
  const [showAddMenu, setShowAddMenu] = useState(false);

  const handleAddClick = () => {
    if (!isAdmin) return;
    setShowAddMenu(true);
  };

  const getSlotsForDay = () => {
    return Object.values(availableSlots).filter(slot => slot.date === day);
  };

  const daySlots = getSlotsForDay();

  return (
    <div className={`${styles.dayCell} ${isToday && isCurrentMonth ? styles.today : ''}`}>
      <div className={styles.dayNumber}>
        {day}
        {isAdmin && isCurrentMonth && (
          <button 
            className={styles.addSlotButton}
            onClick={handleAddClick}
          >
            +
          </button>
        )}
      </div>
      {showAddMenu && (
        <div className={styles.addSlotMenu} ref={addMenuRef}>
          <button onClick={() => {
            setSelectedTimeSlot({ day, time: "8:00am", type: "morning" });
            setShowAddQuota(true);
            setShowAddMenu(false);
          }}>
            Agregar 8:00am
          </button>
          <button onClick={() => {
            setSelectedTimeSlot({ day, time: "10:00am", type: "morning" });
            setShowAddQuota(true);
            setShowAddMenu(false);
          }}>
            Agregar 10:00am
          </button>
          <button onClick={() => {
            setSelectedTimeSlot({ day, time: "12:00pm", type: "midday" });
            setShowAddQuota(true);
            setShowAddMenu(false);
          }}>
            Agregar 12:00pm
          </button>
          <button onClick={() => {
            setSelectedTimeSlot({ day, time: "2:00pm", type: "afternoon" });
            setShowAddQuota(true);
            setShowAddMenu(false);
          }}>
            Agregar 2:00pm
          </button>
          <button onClick={() => {
            setSelectedTimeSlot({ day, time: "4:00pm", type: "afternoon" });
            setShowAddQuota(true);
            setShowAddMenu(false);
          }}>
            Agregar 4:00pm
          </button>
          <button onClick={() => {
            setSelectedTimeSlot({ day, time: "6:00pm", type: "evening" });
            setShowAddQuota(true);
            setShowAddMenu(false);
          }}>
            Agregar 6:00pm
          </button>
          <button onClick={() => {
            setSelectedTimeSlot({ day, time: "8:00pm", type: "evening" });
            setShowAddQuota(true);
            setShowAddMenu(false);
          }}>
            Agregar 8:00pm
          </button>
        </div>
      )}
      {daySlots.map((slot) => (
        <div key={`${slot.date}-${slot.time}`} className={styles.slotContainer}>
          <TimeSlot
            time={slot.time}
            type={slot.type}
            date={slot.date}
            onSelect={() => onTimeSlotSelect(slot)}
          />
          {isAdmin && (
            <button
              className={styles.deleteSlotButton}
              onClick={() => {
                const slotId = `${slot.date}-${slot.time}`;
                console.log('Slot a eliminar:', slotId);
                if (window.confirm("¿Seguro que quieres eliminar este horario?")) {
                  onDeleteSlot(slotId);
                }
              }}
            >
              ×
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

const WeekdayHeader = () => {
  const weekdays = [
    "LUNES",
    "MARTES",
    "MIERCOLES",
    "JUEVES",
    "VIERNES",
    "SABADO",
    "DOMINGO",
  ];

  return (
    <>
      {weekdays.map((day) => (
        <div key={day} className={styles.weekdayHeader}>
          {day}
        </div>
      ))}
    </>
  );
};

const CalendarHeader = ({ selectedMonth, selectedYear, onMonthChange, actividadName }) => {
  const months = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  return (
    <>
      <nav className={styles.breadcrumb} aria-label="breadcrumb">
        <ol>
          <li>
            <a href="/destinos" className={styles.navLink}>
              Destinos
            </a>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link to={`/destinos/${actividadName}`} className={styles.navLink}>
              {actividadName}
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page">Calendario</li>
        </ol>
      </nav>
      <div className={styles.calendarNav}>
        <button onClick={() => onMonthChange(-1)} className={styles.navButton}>
          <span>←</span>
        </button>
        <h1 className={styles.monthTitle}>{months[selectedMonth]}, {selectedYear}</h1>
        <button onClick={() => onMonthChange(1)} className={styles.navButton}>
          <span>→</span>
        </button>
      </div>
    </>
  );
};

const ReservationModal = ({ slot, onClose, onConfirm }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm({ name, email, ...slot });
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h2>Realizar Reserva</h2>
        <p>Fecha: {slot.date}</p>
        <p>Hora: {slot.time}</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className={styles.modalButtons}>
            <button type="button" onClick={onClose}>Cancelar</button>
            <button type="submit">Confirmar Reserva</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Calendar = () => {
  const { nombreActividad } = useParams();
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [availableSlots, setAvailableSlots] = useState({});
  const [showPreReserva, setShowPreReserva] = useState(false);
  const [showAddQuota, setShowAddQuota] = useState(false);
  const [newQuota, setNewQuota] = useState('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);

  useEffect(() => {
    const checkAdminStatus = async () => {
      const user = auth.currentUser;
      if (user) {
        if (user.email === "mperez@gmail.com") {
          setIsAdmin(true);
        } else {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          setIsAdmin(userDoc.exists() && userDoc.data().isAdmin === true);
        }
      }
    };

    const loadAvailableSlots = async () => {
      try {
        // Primero obtener el ID de la actividad
        const actividadQuery = query(
          collection(db, 'destinos'),
          where('nombreActividad', '==', nombreActividad)
        );
        const actividadSnapshot = await getDocs(actividadQuery);
        
        if (actividadSnapshot.empty) {
          console.error('No se encontró la actividad');
          return;
        }

        const actividadId = actividadSnapshot.docs[0].id;
        const actividadDoc = actividadSnapshot.docs[0];

        // Obtener los slots de la actividad
        const slots = actividadDoc.data().availableSlots || {};
        const filteredSlots = {};
        
        // Filtrar slots por mes y año seleccionados
        Object.entries(slots).forEach(([key, slot]) => {
          if (slot.month === selectedMonth && slot.year === selectedYear) {
            filteredSlots[key] = slot;
          }
        });
        
        setAvailableSlots(filteredSlots);
      } catch (error) {
        console.error("Error loading slots:", error);
      }
    };

    checkAdminStatus();
    loadAvailableSlots();
  }, [selectedMonth, selectedYear, nombreActividad]);

  const handleAddTimeSlotWithQuota = async (date, time, type, quota) => {
    if (!isAdmin) {
      alert('Solo los administradores pueden agregar horarios');
      return;
    }

    try {
      // Obtener el ID de la actividad
      const actividadQuery = query(
        collection(db, 'destinos'),
        where('nombreActividad', '==', nombreActividad)
      );
      const actividadSnapshot = await getDocs(actividadQuery);
  
      if (actividadSnapshot.empty) {
        console.error('No se encontró la actividad');
        return;
      }
  
      const actividadId = actividadSnapshot.docs[0].id;
        const actividadDoc = actividadSnapshot.docs[0];
        const currentSlots = actividadDoc.data().availableSlots || {};

        const slotData = {
          date,
          time,
          type,
          month: selectedMonth,
          year: selectedYear,
          createdAt: new Date(),
          available: true,
          id: `${date}-${time}`,
          quota: quota,
          cuposDisponibles: quota // Inicializar cupos disponibles con el valor de quota
        };

        const key = `${date}-${time}`;
        const updatedSlots = {
          ...currentSlots,
          [key]: slotData
        };
  
        // Actualizar el documento de la actividad con el nuevo slot
        await updateDoc(doc(db, 'destinos', actividadId), {
          availableSlots: updatedSlots
        });
  
        setAvailableSlots(prev => ({
          ...prev,
          [key]: slotData
        }));
      } catch (error) {
        console.error('Error adding time slot:', error);
        alert('Error al agregar el horario');
      }
    };

  const handleDeleteTimeSlot = async (slotId) => {
    if (!isAdmin) {
      alert('Solo los administradores pueden eliminar horarios');
      return;
    }

    try {
      // Obtener el ID de la actividad
      const actividadQuery = query(
        collection(db, 'destinos'),
        where('nombreActividad', '==', nombreActividad)
      );
      const actividadSnapshot = await getDocs(actividadQuery);
      
      if (actividadSnapshot.empty) {
        console.error('No se encontró la actividad');
        return;
      }

      const actividadId = actividadSnapshot.docs[0].id;
      const actividadDoc = actividadSnapshot.docs[0];
      const currentSlots = actividadDoc.data().availableSlots || {};

      // Eliminar el slot específico
      const updatedSlots = { ...currentSlots };
      delete updatedSlots[slotId];

      // Actualizar el documento de la actividad
      await updateDoc(doc(db, 'destinos', actividadId), {
        availableSlots: updatedSlots
      });

      // Actualizar el estado local
      setAvailableSlots(prev => {
        const newSlots = { ...prev };
        delete newSlots[slotId];
        return newSlots;
      });
    } catch (error) {
      console.error('Error deleting time slot:', error);
      alert('Error al eliminar el horario');
    }
  };

  useEffect(() => {
    // Forzar la actualización del componente al cambiar los slots
    setAvailableSlots(availableSlots);
  }, [availableSlots]);

  const handleMonthChange = (increment) => {
    let newMonth = selectedMonth + increment;
    let newYear = selectedYear;

    if (newMonth > 11) {
      newMonth = 0;
      newYear += 1;
    } else if (newMonth < 0) {
      newMonth = 11;
      newYear -= 1;
    }

    setSelectedMonth(newMonth);
    setSelectedYear(newYear);
  };

  // Obtener la fecha actual solo para comparar el día de hoy
  const today = new Date();
  const currentDate = today.getDate();
  const isCurrentMonth = today.getMonth() === selectedMonth && today.getFullYear() === selectedYear;
  
  // Usar selectedMonth y selectedYear en lugar de current
  const firstDayOfMonth = new Date(selectedYear, selectedMonth, 1);
  const lastDayOfMonth = new Date(selectedYear, selectedMonth + 1, 0);
  
  // Calcular días del mes anterior
  const firstDayWeekday = firstDayOfMonth.getDay() || 7;
  const prevMonthDays = Array.from({ length: firstDayWeekday - 1 }, (_, i) => {
    const day = new Date(selectedYear, selectedMonth, -i);
    return day.getDate().toString();
  }).reverse();
  
  // Generar días del mes actual
  const currentMonthDays = Array.from(
    { length: lastDayOfMonth.getDate() },
    (_, i) => (i + 1).toString()
  );
  
  // Calcular días del próximo mes
  const remainingDays = 42 - (prevMonthDays.length + currentMonthDays.length);
  const nextMonthDays = Array.from(
    { length: remainingDays },
    (_, i) => (i + 1).toString()
  );

  const handleTimeSlotSelect = (slot) => {
    if (!isAdmin) { // Solo para usuarios no administradores
      setSelectedSlot(slot);
      setShowPreReserva(true);
    }
  };

  const handleClosePreReserva = () => {
    setShowPreReserva(false);
    setSelectedSlot(null);
  };

  return (
    <>
    <div className={styles.calendarContainer}>
      <div className={styles.calendarWrapper}>
        <CalendarHeader 
          selectedMonth={selectedMonth} 
          selectedYear={selectedYear}
          onMonthChange={handleMonthChange}
          actividadName={nombreActividad}
        />
        <div className={styles.calendarGrid}>
          <WeekdayHeader />
          {prevMonthDays.map((day) => (
            <div key={`prev-${day}`} className={styles.inactiveDayCell}>
              {day}
            </div>
          ))}
          {currentMonthDays.map((day) => (
            <DayCell 
              key={`current-${day}`} 
              day={day} 
              isToday={parseInt(day) === currentDate && isCurrentMonth}
              isCurrentMonth={true}
              isAdmin={isAdmin}
              onDeleteSlot={handleDeleteTimeSlot}
              availableSlots={availableSlots}
              onTimeSlotSelect={handleTimeSlotSelect}
              setSelectedTimeSlot={setSelectedTimeSlot}
              setShowAddQuota={setShowAddQuota}
            />
          ))}
          {nextMonthDays.map((day) => (
            <DayCell
              key={`next-${day}`}
              day={day}
              isToday={false}
              isCurrentMonth={false}
              isAdmin={isAdmin}
              onDeleteSlot={handleDeleteTimeSlot}
              availableSlots={availableSlots}
              onTimeSlotSelect={handleTimeSlotSelect}
              setSelectedTimeSlot={setSelectedTimeSlot}
              setShowAddQuota={setShowAddQuota}
            />
          ))}
        </div>
      </div>
    </div>

    {showPreReserva && (
      <div className={styles.modalOverlay}>
        <div className={styles.modalContent}>
          <PreReserva 
            selectedDay={selectedSlot?.date} 
            selectedMonth={selectedMonth+1}
            selectedYear={selectedYear}
            selectedSlot={selectedSlot}
            nombreActividad={nombreActividad}
            onClose={handleClosePreReserva}
            quota={selectedTimeSlot?.quota}
          />
        </div>
      </div>
    )}

      {showAddQuota && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
<div style={{
  backgroundColor: '#ee9a12',
  borderRadius: '25px',
  padding: '20px',
  color: 'white'
}}>
  <h2 style={{ 
    backgroundColor: 'white', 
    color: '#ee9a12',
    borderRadius: '25px',
    padding: '10px',
    textAlign: 'center',
    fontSize: '1.2em',
    fontWeight: 'bold',
    border: '2px solid #ee9a12'
  }}>Ingrese la cantidad de cupos máximos</h2>
 <input
    type="text"
    placeholder="Cupos máximos"
    value={newQuota}
    onChange={(e) => {
      const value = e.target.value === '' ? '' : parseInt(e.target.value, 10);
      if (value === '' || (!isNaN(value) && value >= 0)) {
        setNewQuota(value);
      }
    }}
    style={{ MozAppearance: 'textfield' }}
  />
  {newQuota === 0 && (
    <p style={{ color: 'red' }}>
      El número de cupos debe ser mayor a 0.
    </p>
  )}
  <div className={styles.modalButtons}>
    <button onClick={() => {
      setShowAddQuota(false);
      setSelectedTimeSlot(null);
      setNewQuota('');
    }} style={{ backgroundColor: '#ee9a12', color: 'white' }}>Cancelar</button>
    <button onClick={async () => {
      if (selectedTimeSlot) {
        if (newQuota > 0) {
          await handleAddTimeSlotWithQuota(
            selectedTimeSlot.day,
            selectedTimeSlot.time,
            selectedTimeSlot.type,
            newQuota
          );
          setSelectedTimeSlot(null);
          setNewQuota('');
          setShowAddQuota(false);
        } else {
          alert('El número de cupos debe ser mayor a 0.');
        }
      }
    }}>
      Confirmar
    </button>
  </div>
</div>
          </div>
        </div>
      )}
    </>
  );
};

export default Calendar;
