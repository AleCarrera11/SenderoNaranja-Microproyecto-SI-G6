import React from "react";
import styles from "./SearchBar.module.css";

function SearchBar() {
  return (
    <div className={styles.searchbarContainer}>
      <div className={styles.stateLayer}>
        <div className={styles.leadingIcon}>
          <div className={styles.iconContainer}>
            <div className={styles.iconStateLayer}>
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/1c98230f4487733e737f2e098720dda9c7e7b48092cafb27532e51215042b5a1?placeholderIfAbsent=true&apiKey=2b87a35b18524de3a0e8a8f5cf91b8a5"
                alt="Search"
                className={styles.searchIcon}
              />
            </div>
          </div>
        </div>
        <input
          type="text"
          placeholder="Busca una actividad"
          className={styles.searchInput}
        />
        <div className={styles.trailingElements}>
          <div className={styles.trailingIcon}>
            <div className={styles.iconContainer}>
              <div className={styles.iconStateLayer}>
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/386207518883442a607ffd5068af0d6571abcc6654e219af2e8d84919581a2c5?placeholderIfAbsent=true&apiKey=2b87a35b18524de3a0e8a8f5cf91b8a5"
                  alt="Clear"
                  className={styles.clearIcon}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
