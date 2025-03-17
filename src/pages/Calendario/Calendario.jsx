"use client";
import React, { useState } from "react";
import styles from "./Calendario.module.css";


const TimeSlot = ({ time, type, date, onSelect }) => {
  const getTimeSlotClass = () => {
    switch (type) {
      case "morning":
        return styles.morningSlot;
      case "midday":
        return styles.middaySlot;
      case "afternoon":
        return styles.afternoonSlot;
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

const DayCell = ({ day, isToday, isCurrentMonth = true }) => {
  const hasTimeSlots = [
    "1",
    "2",
    "7",
    "8",
    "9",
    "14",
    "15",
    "16",
    "21",
    "22",
    "23",
    "28",
    "1",
    "2",
  ].includes(day);

  return (
    <div className={`${styles.dayCell} ${isToday && isCurrentMonth ? styles.today : ''}`}>
      <div className={styles.dayNumber}>{day}</div>
      {hasTimeSlots && (
        <>
          <TimeSlot time="8:00am" type="morning" date={day} />
          {!["9", "16", "23", "2"].includes(day) && (
            <TimeSlot time="10:00am" type="midday" date={day} />
          )}
          {!["8", "15", "22", "1"].includes(day) && (
            <TimeSlot time="2:00pm" type="afternoon" date={day} />
          )}
        </>
      )}
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

const CalendarHeader = ({ selectedMonth, selectedYear, onMonthChange }) => {
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
            <a href="/sabasnieves" className={styles.navLink}>
              Sabas Nieves
            </a>
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
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedSlot, setSelectedSlot] = useState(null);

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

  return (
    <>
    <div className={styles.calendarContainer}>
      <div className={styles.calendarWrapper}>
        <CalendarHeader 
          selectedMonth={selectedMonth} 
          selectedYear={selectedYear}
          onMonthChange={handleMonthChange}
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
            />
          ))}
          {nextMonthDays.map((day) => (
            <DayCell 
              key={`next-${day}`} 
              day={day}
              isToday={false}
              isCurrentMonth={false}
            />
          ))}
        </div>
      </div>
    </div>
    </>
  );
};

export default Calendar;
