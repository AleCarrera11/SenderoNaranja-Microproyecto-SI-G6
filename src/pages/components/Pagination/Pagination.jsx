import React from "react";
import styles from "./Pagination.module.css";

export const Pagination = () => {
  return (
    <nav className={styles.pagination} aria-label="Pagination">
      <button className={styles.pageBtnprev} aria-label="Previous page">
        &lt;
      </button>
      <button className={styles.pageBtnactive} aria-current="page">
        1
      </button>
      <button className={styles.pageBtn}>2</button>
      <span className={styles.dots}>...</span>
      <button className={styles.pageBtn}>3</button>
      <button className={styles.pageBtnnext} aria-label="Next page">
        &gt;
      </button>
    </nav>
  );
};
