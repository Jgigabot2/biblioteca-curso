// Libros iniciales de la biblioteca.
// Cada vez que se crea la app se entrega una copia nueva,
// así las pruebas no se afectan entre sí.
function librosIniciales() {
  return [
    { id: 1, titulo: 'Cien años de soledad', autor: 'Gabriel García Márquez', anio: 1967, disponible: true },
    { id: 2, titulo: 'Clean Code', autor: 'Robert C. Martin', anio: 2008, disponible: true },
    { id: 3, titulo: 'El principito', autor: 'Antoine de Saint-Exupéry', anio: 1943, disponible: false },
    { id: 4, titulo: 'Head First Java', autor: 'Kathy Sierra y Bert Bates', anio: 2005, disponible: true },
    { id: 5, titulo: 'La vorágine', autor: 'José Eustasio Rivera', anio: 1924, disponible: true },
    { id: 6, titulo: 'Breve historia del tiempo', autor: 'Stephen Hawking', anio: 1988, disponible: true },
    { id: 7, titulo: 'Patrones de diseño', autor: 'Gamma, Helm, Johnson y Vlissides', anio: 1994, disponible: true },
    { id: 8, titulo: 'Cosmos', autor: 'Carl Sagan', anio: 1980, disponible: false }
  ];
}

module.exports = { librosIniciales };
