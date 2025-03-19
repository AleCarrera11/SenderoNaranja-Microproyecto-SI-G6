import React, { useState } from "react";
import styles from './SearchTypes.module.css';
import ActivityIterator from '../../../utils/ActivityIterator';

function SearchTypes({ onClose, activities, onSearchResults }) {
  const [selectedDays, setSelectedDays] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedValues, setSelectedValues] = useState({
    Dificultad: null,
    Distancia: null,
    Clasificación: null
  });

  const handleOptionToggle = (option) => {
    if (selectedOption === option) {
      // Si se hace clic en la misma opción, resetear todo
      setSelectedOption(null);
      setSelectedValues({
        Dificultad: null,
        Distancia: null,
        Clasificación: null
      });
      setSelectedDays([]);
    } else {
      // Si se selecciona una nueva opción, resetear valores anteriores y seleccionar la nueva
      setSelectedOption(option);
      setSelectedValues({
        Dificultad: null,
        Distancia: null,
        Clasificación: null
      });
      setSelectedDays([]);
    }
  };

  const handleValueChange = (option, value) => {
    setSelectedValues(prev => ({
      ...prev,
      [option]: prev[option] === value ? null : value // Toggle del valor
    }));
  };

  const handleDayToggle = (day) => {
    setSelectedDays(prevDays => {
      if (prevDays.includes(day)) {
        return prevDays.filter(d => d !== day);
      } else {
        return [day]; // Solo permite un día seleccionado
      }
    });
  };

  const handleAccept = () => {
    if (!selectedOption || (!selectedValues[selectedOption] && selectedDays.length === 0)) {
      console.log("No hay criterios de búsqueda seleccionados");
      onClose();
      return;
    }

    const iterator = new ActivityIterator(activities);
    let results = [];
    let order;

    switch (selectedOption) {
      case 'Dificultad':
        order = selectedValues.Dificultad === 'Mayor' ? 'desc' : 'asc';
        results = iterator.sortByDifficulty(order);
        break;

      case 'Distancia':
        order = selectedValues.Distancia === 'Mayor' ? 'desc' : 'asc';
        results = iterator.sortByDistance(order);
        break;

      case 'Días':
        if (selectedDays[0]) {
          results = iterator.filterByDay(selectedDays[0]);
        }
        break;

      case 'Clasificación':
        order = selectedValues.Clasificación === 'Mayor' ? 'desc' : 'asc';
        results = iterator.sortByRating(order);
        break;

      default:
        results = iterator;
    }

    // Convertir el iterator a array
    const finalResults = [];
    while (results.hasNext()) {
      finalResults.push(results.next());
    }

    onSearchResults(finalResults);
    onClose();
  };

  const renderOptionButtons = (option) => (
    <div className={styles.buttonGroup}>
      <button
        className={`${styles.optionButton} ${selectedValues[option] === 'Mayor' ? styles.selected : ''}`}
        onClick={() => handleValueChange(option, 'Mayor')}
      >
        Mayor
      </button>
      <button
        className={`${styles.optionButton} ${selectedValues[option] === 'Menor' ? styles.selected : ''}`}
        onClick={() => handleValueChange(option, 'Menor')}
      >
        Menor
      </button>
    </div>
  );

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <button 
          className={styles.closeButton} 
          aria-label="Close"
          onClick={onClose}
        >
          x
        </button>
        <h1 className={styles.title}>Tipos de Búsqueda</h1>
        <div className={styles.optionsList}>
          {/* Dificultad */}
          <div className={styles.optionItem}>
            <button 
              className={`${styles.optionText} ${selectedOption === 'Dificultad' ? styles.selectedOption : ''}`}
              onClick={() => handleOptionToggle('Dificultad')}
            >
              Dificultad
            </button>
            {selectedOption === 'Dificultad' && renderOptionButtons('Dificultad')}
          </div>

          {/* Distancia */}
          <div className={styles.optionItem}>
            <button 
              className={`${styles.optionText} ${selectedOption === 'Distancia' ? styles.selectedOption : ''}`}
              onClick={() => handleOptionToggle('Distancia')}
            >
              Distancia
            </button>
            {selectedOption === 'Distancia' && renderOptionButtons('Distancia')}
          </div>

          {/* Días disponibles */}
          <div className={styles.optionItem}>
            <button 
              className={`${styles.optionText} ${selectedOption === 'Días' ? styles.selectedOption : ''}`}
              onClick={() => handleOptionToggle('Días')}
            >
              Días disponibles
            </button>
            {selectedOption === 'Días' && (
              <div className={styles.buttonGroup}>
                {[
                  { key: 'L', label: 'L' },
                  { key: 'MA', label: 'M' },
                  { key: 'MI', label: 'M' },
                  { key: 'J', label: 'J' },
                  { key: 'V', label: 'V' },
                  { key: 'S', label: 'S' },
                  { key: 'D', label: 'D' }
                ].map((day) => (
                  <button
                    key={day.key}
                    className={`${styles.optionButton} ${selectedDays.includes(day.key) ? styles.selected : ''}`}
                    onClick={() => handleDayToggle(day.key)}
                  >
                    {day.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Clasificación */}
          <div className={styles.optionItem}>
            <button 
              className={`${styles.optionText} ${selectedOption === 'Clasificación' ? styles.selectedOption : ''}`}
              onClick={() => handleOptionToggle('Clasificación')}
            >
              Puntuación
            </button>
            {selectedOption === 'Clasificación' && renderOptionButtons('Clasificación')}
          </div>
        </div>
        <div className={styles.acceptButtonWrapper}>
          <button className={styles.acceptButton} onClick={handleAccept}>
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
}

export default SearchTypes;