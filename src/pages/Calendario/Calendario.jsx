"use client";
import React from "react";
import styles from "./Calendario.module.css";


const TimeSlot = ({ time, type }) => {
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

  return <div className={getTimeSlotClass()}>{time}</div>;
};

const DayCell = ({ day }) => {
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
    <div className={styles.dayCell}>
      <div className={styles.dayNumber}>{day}</div>
      {hasTimeSlots && (
        <>
          <TimeSlot time="8:00am" type="morning" />
          {!["9", "16", "23", "2"].includes(day) && (
            <TimeSlot time="10:00am" type="midday" />
          )}
          {!["8", "15", "22", "1"].includes(day) && (
            <TimeSlot time="2:00pm" type="afternoon" />
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

const CalendarHeader = () => {
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
      <h1 className={styles.monthTitle}>Feb, 2025</h1>

    </>
  );
};

const Calendar = () => {
  const prevMonthDays = ["27", "28", "29", "30", "31"];
  const currentMonthDays = Array.from({ length: 28 }, (_, i) =>
    (i + 1).toString(),
  );
  const nextMonthDays = ["1", "2"];

  return (
    <>
    <div className={styles.calendarContainer}>
      <div className={styles.calendarWrapper}>
        <CalendarHeader />
        <div className={styles.calendarGrid}>
          <WeekdayHeader />
          {prevMonthDays.map((day) => (
            <div key={`prev-${day}`} className={styles.inactiveDayCell}>
              {day}
            </div>
          ))}
          {currentMonthDays.map((day) => (
            <DayCell key={`current-${day}`} day={day} />
          ))}
          {nextMonthDays.map((day) => (
            <DayCell key={`next-${day}`} day={day} />
          ))}
        </div>
      </div>
    </div>
    </>
  );
};

export default Calendar;
