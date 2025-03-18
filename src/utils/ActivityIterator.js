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
}

export default ActivityIterator; 