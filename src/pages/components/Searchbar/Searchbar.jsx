import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import styles from "./Searchbar.module.css";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../credenciales";
import ActivityIterator from "../../../utils/ActivityIterator";
import SearchTypes from "../SearchTypes/SearchTypes";

function SearchBar() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [activities, setActivities] = useState([]);
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSearchTypes, setShowSearchTypes] = useState(false);

  // Cargar actividades de Firebase
  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "destinos"));
        const activitiesList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setActivities(activitiesList);
      } catch (error) {
        console.error("Error fetching activities:", error);
      }
    };

    fetchActivities();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    setLoading(true);

    const iterator = new ActivityIterator(activities);
    const filtered = iterator.filterByName(searchTerm);
    const results = [];
    
    while (filtered.hasNext()) {
      results.push(filtered.next());
    }

    setFilteredActivities(results);
    setShowResults(true);
    setLoading(false);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    if (value === "") {
      setShowResults(false);
      setFilteredActivities([]);
    }
  };

  const handleItemClick = (activity) => {
    navigate(`/destinos/${activity.nombreActividad}`);
  };

  const handleOpenSearchTypes = () => {
    setShowSearchTypes(true);
  };

  const handleCloseSearchTypes = () => {
    setShowSearchTypes(false);
  };

  const handleSearchResults = (results) => {
    setFilteredActivities(results);
    setShowResults(true);
  };

  return (
    <div className={styles.searchContainer}>
      <form onSubmit={handleSearch} className={styles.searchbarContainer}>
        <div className={styles.stateLayer}>
          <button 
            type="button" 
            className={styles.leadingIcon}
            aria-label="Buscar"
            onClick={handleOpenSearchTypes}
          >
            <div className={styles.iconContainer}>
              <div className={styles.iconStateLayer}>
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/1c98230f4487733e737f2e098720dda9c7e7b48092cafb27532e51215042b5a1"
                  alt="Search"
                  className={styles.searchIcon}
                />
              </div>
            </div>
          </button>
          <input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            placeholder="Busca una actividad"
            className={styles.searchInput}
          />
          {searchTerm && (
            <button 
              type="submit"
              className={styles.trailingIcon}
              aria-label="Limpiar búsqueda"
            >
              <div className={styles.iconContainer}>
                <div className={styles.iconStateLayer}>
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/386207518883442a607ffd5068af0d6571abcc6654e219af2e8d84919581a2c5"
                    alt="Clear"
                    className={styles.clearIcon}
                  />
                </div>
              </div>
            </button>
          )}
        </div>
      </form>

      {showSearchTypes && (
        <div className={styles.searchTypesOverlay}>
          <div className={styles.searchTypesContainer}>
            <SearchTypes 
              onClose={() => setShowSearchTypes(false)}
              activities={activities}
              onSearchResults={handleSearchResults}
            />
          </div>
        </div>
      )}

      {/* Resultados de búsqueda */}
      {showResults && (
        <div className={styles.resultsContainer}>
          {loading ? (
            <p className={styles.message}>Buscando...</p>
          ) : filteredActivities.length > 0 ? (
            <ul className={styles.resultsList}>
              {filteredActivities.map((activity) => (
                <li 
                  key={activity.id} 
                  className={styles.resultItem}
                  onClick={() => handleItemClick(activity)}
                >
                  <h3>{activity.nombreActividad}</h3>
                  <p>{activity.tipo}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className={styles.message}>No se encontraron actividades con ese nombre</p>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
