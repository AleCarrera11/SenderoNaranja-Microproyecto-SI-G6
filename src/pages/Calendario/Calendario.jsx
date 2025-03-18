"use client";
import React, { useState, useEffect } from "react";
import styles from "./Calendario.module.css";
import { db, auth } from "../../credenciales";
import { collection, addDoc, getDocs, query, where, doc, getDoc, deleteDoc, updateDoc } from "firebase/firestore";
import PreReserva from '../Pre-Reserva/PreReserva';
import { useParams } from "react-router-dom";


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

const DayCell = ({ day, isToday, isCurrentMonth = true, isAdmin, onAddSlot, onDeleteSlot, availableSlots, onTimeSlotSelect }) => {
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
        <div className={styles.addSlotMenu}>
          <button onClick={() => {
            onAddSlot(day, "8:00am", "morning");
            setShowAddMenu(false);
          }}>
            Agregar 8:00am
          </button>
          <button onClick={() => {
            onAddSlot(day, "10:00am", "morning");
            setShowAddMenu(false);
          }}>
            Agregar 10:00am
          </button>
          <button onClick={() => {
            onAddSlot(day, "12:00pm", "midday");
            setShowAddMenu(false);
          }}>
            Agregar 12:00pm
          </button>
          <button onClick={() => {
            onAddSlot(day, "2:00pm", "afternoon");
            setShowAddMenu(false);
          }}>
            Agregar 2:00pm
          </button>
          <button onClick={() => {
            onAddSlot(day, "4:00pm", "afternoon");
            setShowAddMenu(false);
          }}>
            Agregar 4:00pm
          </button>
          <button onClick={() => {
            onAddSlot(day, "6:00pm", "evening");
            setShowAddMenu(false);
          }}>
            Agregar 6:00pm
          </button>
          <button onClick={() => {
            onAddSlot(day, "8:00pm", "evening");
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
                console.log('Slot a eliminar:', slot); // Para depuración
                onDeleteSlot(slot.id);
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
            {actividadName}
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

  const handleAddTimeSlot = async (date, time, type) => {
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
        available: true
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
              onAddSlot={handleAddTimeSlot}
              onDeleteSlot={handleDeleteTimeSlot}
              availableSlots={availableSlots}
              onTimeSlotSelect={handleTimeSlotSelect}
            />
          ))}
          {nextMonthDays.map((day) => (
            <DayCell 
              key={`next-${day}`} 
              day={day}
              isToday={false}
              isCurrentMonth={false}
              isAdmin={isAdmin}
              onAddSlot={handleAddTimeSlot}
              onDeleteSlot={handleDeleteTimeSlot}
              availableSlots={availableSlots}
              onTimeSlotSelect={handleTimeSlotSelect}
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
            selectedSlot={selectedSlot}
            nombreActividad={nombreActividad}
            onClose={handleClosePreReserva}
          />
        </div>
      </div>
    )}
    </>
  );
};

export default Calendar;
