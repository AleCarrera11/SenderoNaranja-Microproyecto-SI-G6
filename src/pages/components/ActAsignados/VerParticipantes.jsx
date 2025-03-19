"use client";
import React, { useState } from "react";
import styles from "./VerParticipantes.module.css";

const DashboardHeader = ({ title, onClose }) => {
  return (
    <header className={styles.headerContainer}>
      <h1 className={styles.headerTitle}>{title}</h1>
      <button
        className={styles.closeButton}
        onClick={onClose}
        aria-label="Close dashboard"
      >
        <svg
          width="56"
          height="56"
          viewBox="0 0 56 56"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M49.5 4L6 52" stroke="white" strokeWidth="10" />
          <path
            d="M4.00008 6.56889L52.0625 50"
            stroke="white"
            strokeWidth="10"
          />
        </svg>
      </button>
    </header>
  );
};

const StatisticsCard = ({ totalParticipantes }) => {
  return (
    <section className={styles.statsCard}>
      <div className={styles.statsContent}>
        <div className={styles.iconContainer}>
          <svg
            width="84"
            height="84"
            viewBox="0 0 84 84"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="42" cy="42" r="42" fill="#EE9A12" fillOpacity="0.4" />
            <path
              d="M37.9778 41.293C37.8252 41.2799 37.6421 41.2799 37.4742 41.293C33.8425 41.1878 30.9585 38.6238 30.9585 35.4681C30.9585 32.2467 33.9798 29.6301 37.7336 29.6301C41.4722 29.6301 44.5088 32.2467 44.5088 35.4681C44.4935 38.6238 41.6095 41.1878 37.9778 41.293Z"
              stroke="#DA5702"
              strokeWidth="2.625"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M49.0403 32.2593C52.0006 32.2593 54.3811 34.3236 54.3811 36.8613C54.3811 39.3464 52.0922 41.3713 49.2387 41.4634C49.1166 41.4502 48.9793 41.4502 48.8419 41.4634"
              stroke="#DA5702"
              strokeWidth="2.625"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M30.3483 46.1443C26.6555 48.2743 26.6555 51.7456 30.3483 53.8625C34.5446 56.2819 41.4266 56.2819 45.6229 53.8625C49.3156 51.7324 49.3156 48.2612 45.6229 46.1443C41.4418 43.738 34.5599 43.738 30.3483 46.1443Z"
              stroke="#DA5702"
              strokeWidth="2.625"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M51.9854 53.2977C53.084 53.1004 54.1217 52.7191 54.9762 52.1537C57.3566 50.6153 57.3566 48.0776 54.9762 46.5392C54.1369 45.987 53.1145 45.6188 52.0311 45.4084"
              stroke="#DA5702"
              strokeWidth="2.625"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className={styles.statsInfo}>
          <span className={styles.statsLabel}>Total Participantes</span>
          <h2 className={styles.statsValue}>{totalParticipantes}</h2>
        </div>
      </div>
    </section>
  );
};

const VerParticipantes = ({ participantes, onClose }) => {
  return (
    <main className={styles.dashboardContainer}>
      <DashboardHeader title="Lista Participantes" onClose={onClose} />
      <StatisticsCard totalParticipantes={participantes.length} />
      {participantes.length === 0 ? (
        <p>No hay participantes registrados.</p>
      ) : (
        <section className={styles.tableContainer}>
      <div className={styles.tableHeader}>
        <div className={styles.headerInfo}>
          <h2 className={styles.tableTitle}>Participantes</h2>
        </div>
      </div>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Nombre Completo</th>
              <th>Telefono</th>
              <th>Correo</th>
              
            </tr>
          </thead>
          <tbody>
            {participantes.map((participant, index) => (
              <tr key={index}>
                <td>{participant.participantes}</td>
                <td>{participant.telefono}</td>
                <td>{participant.email}</td>
               
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
      )}
    </main>
  );
};

export default VerParticipantes;

