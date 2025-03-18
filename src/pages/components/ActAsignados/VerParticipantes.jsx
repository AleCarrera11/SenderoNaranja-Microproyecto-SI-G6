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

const StatisticsCard = () => {
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
          <h2 className={styles.statsValue}>15</h2>
          <div className={styles.statsGrowth}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 17L10 5"
                stroke="#00AC4F"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M4.16663 10.0001L9.99996 4.16675L15.8333 10.0001"
                stroke="#00AC4F"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className={styles.growthText}>
              <strong>16%</strong> este mes
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

const Pagination = () => {
  return (
    <nav className={styles.pagination} aria-label="Pagination">
      <button className={styles.pageButton} aria-label="Previous page">
        &lt;
      </button>
      <button className={styles.pageButton + " " + styles.active}>1</button>
      <button className={styles.pageButton}>2</button>
      <span className={styles.ellipsis}>...</span>
      <button className={styles.pageButton}>3</button>
      <button className={styles.pageButton} aria-label="Next page">
        &gt;
      </button>
    </nav>
  );
};

const ParticipantsTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("Nuevos");

  const participants = [
    {
      name: "Jane Cooper",
      username: "user",
      phone: "(225) 555-0118",
      email: "user@correo.unimet.edu.ve",
      country: "United States",
    },
    {
      name: "Floyd Miles",
      username: "user",
      phone: "(205) 555-0100",
      email: "user@correo.unimet.edu.ve",
      country: "Kiribati",
    },
  ];

  return (
    <section className={styles.tableContainer}>
      <div className={styles.tableHeader}>
        <div className={styles.headerInfo}>
          <h2 className={styles.tableTitle}>Todos los Participantes</h2>
          <p className={styles.tableSubtitle}>Miembros activos</p>
        </div>
        <div className={styles.tableControls}>
          <div className={styles.searchContainer}>
            <svg
              width="24"
              height="22"
              viewBox="0 0 24 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11 16.751C15.4183 16.751 19 13.6565 19 9.83915C19 6.02181 15.4183 2.92725 11 2.92725C6.58172 2.92725 3 6.02181 3 9.83915C3 13.6565 6.58172 16.751 11 16.751Z"
                stroke="#7E7E7E"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M20.9999 18.479L16.6499 14.7207"
                stroke="#7E7E7E"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <input
              type="text"
              placeholder="Buscar"
              className={styles.searchInput}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className={styles.sortContainer}>
            <span className={styles.sortLabel}>Ordenar por : </span>
            <span className={styles.sortValue}>{sortBy}</span>
            <svg
              width="9"
              height="5"
              viewBox="0 0 9 5"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.23315 1.28149L4.31682 3.64121L7.40048 1.28149"
                stroke="#3D3C42"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Usuario</th>
              <th>Phone Number</th>
              <th>Email</th>
              <th>País</th>
            </tr>
          </thead>
          <tbody>
            {participants.map((participant, index) => (
              <tr key={index}>
                <td>{participant.name}</td>
                <td>{participant.username}</td>
                <td>{participant.phone}</td>
                <td>{participant.email}</td>
                <td>{participant.country}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination />
    </section>
  );
};

const VerParticipantes = ({ onClose }) => {
  return (
    <main className={styles.dashboardContainer}>
      <DashboardHeader title="Sabas Nieves" onClose={onClose} />
      <StatisticsCard />
      <ParticipantsTable />
    </main>
  );
};

export default VerParticipantes;
