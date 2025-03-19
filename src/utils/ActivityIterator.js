// Implementación del patrón Iterator
class ActivityIterator {
  constructor(activities) {
    this.activities = activities;
    this.index = 0;
  }

  hasNext() {
    return this.index < this.activities.length;
  }

  next() {
    return this.hasNext() ? this.activities[this.index++] : null;
  }

  current() {
    return this.activities[this.index];
  }

  reset() {
    this.index = 0;
  }

  // Métodos específicos para filtrado
  filterByName(searchTerm) {
    const normalizedTerm = this.normalizeString(searchTerm);
    return new ActivityIterator(
      this.activities.filter(activity => 
        this.normalizeString(activity.nombreActividad).includes(normalizedTerm)
      )
    );
  }

  filterByType(type) {
    return new ActivityIterator(
      this.activities.filter(activity => activity.tipo === type)
    );
  }

  filterByRating(minRating) {
    return new ActivityIterator(
      this.activities.filter(activity => activity.rating >= minRating)
    );
  }

  // Método auxiliar para normalizar strings (eliminar tildes y mayúsculas)
  normalizeString(str) {
    return str.toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }

  sortByRating(order = 'desc') {
    const sorted = [...this.activities].sort((a, b) => {
      if (order === 'desc') {
        return (b.rating || 0) - (a.rating || 0); // Mayor a menor
      }
      return (a.rating || 0) - (b.rating || 0); // Menor a mayor
    });
    return new ActivityIterator(sorted);
  }

  sortByDistance(order = 'desc') {
    const sorted = [...this.activities].sort((a, b) => {
      const distA = parseFloat(a.distancia?.replace('km', '')) || 0;
      const distB = parseFloat(b.distancia?.replace('km', '')) || 0;
      if (order === 'desc') {
        return distB - distA; // Mayor a menor
      }
      return distA - distB; // Menor a mayor
    });
    return new ActivityIterator(sorted);
  }

  filterByDay(day) {
    return new ActivityIterator(
      this.activities.filter(activity => 
        activity.diasDisponibles?.includes(day)
      )
    );
  }

  sortByDifficulty(order = 'desc') {
    const difficultyOrder = ['Fácil', 'Moderado', 'Difícil'];
    const sorted = [...this.activities].sort((a, b) => {
      // Convertir dificultad numérica a texto si es necesario
      const getDifficultyText = (activity) => {
        if (typeof activity.dificultad === 'number' || activity.dificultad.includes('/')) {
          const num = parseFloat(activity.dificultad);
          if (num <= 3) return 'Fácil';
          if (num <= 7) return 'Moderado';
          return 'Difícil';
        }
        return activity.dificultad;
      };

      const diffA = getDifficultyText(a);
      const diffB = getDifficultyText(b);
      
      const indexA = difficultyOrder.indexOf(diffA);
      const indexB = difficultyOrder.indexOf(diffB);
      
      if (order === 'desc') {
        return indexB - indexA; // Mayor a menor
      }
      return indexA - indexB; // Menor a mayor
    });
    return new ActivityIterator(sorted);
  }
}

export default ActivityIterator; 