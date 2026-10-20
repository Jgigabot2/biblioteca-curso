// ─────────────────────────────────────────────────────────────
// Biblioteca del Curso · lógica de la página (equipo frontend)
// Cada sección marcada con TODO es la tarea de una subrama:
//   fe/catalogo · fe/buscador · fe/prestamo · fe/conexion-api
// ─────────────────────────────────────────────────────────────

// ── Configuración ────────────────────────────────────────────
// true: la página usa los datos de prueba de abajo.
// false: la página habla con el backend (tarea fe/conexion-api).
const USAR_MOCK = true;

// ── Datos de prueba, copiados de contrato.md ─────────────────
const MOCK_LIBROS = [
  { id: 1, titulo: 'Cien años de soledad', autor: 'Gabriel García Márquez', anio: 1967, disponible: true },
  { id: 2, titulo: 'Clean Code', autor: 'Robert C. Martin', anio: 2008, disponible: true },
  { id: 3, titulo: 'El principito', autor: 'Antoine de Saint-Exupéry', anio: 1943, disponible: false },
  { id: 4, titulo: 'Head First Java', autor: 'Kathy Sierra y Bert Bates', anio: 2005, disponible: true },
  { id: 5, titulo: 'La vorágine', autor: 'José Eustasio Rivera', anio: 1924, disponible: true },
  { id: 6, titulo: 'Breve historia del tiempo', autor: 'Stephen Hawking', anio: 1988, disponible: true },
  { id: 7, titulo: 'Patrones de diseño', autor: 'Gamma, Helm, Johnson y Vlissides', anio: 1994, disponible: true },
  { id: 8, titulo: 'Cosmos', autor: 'Carl Sagan', anio: 1980, disponible: false }
];
const mockPrestamos = [];

// ── Comunicación con la API ──────────────────────────────────
// En modo de prueba responde igual que el contrato, incluidos los errores.
function prestamoDePrueba(libroId, estudiante) {
  if (!libroId || !estudiante) throw new Error('Faltan datos: libroId y estudiante');
  const libro = MOCK_LIBROS.find((l) => l.id === libroId);
  if (!libro) throw new Error('Libro no encontrado');
  if (!libro.disponible) throw new Error('El libro ya está prestado');
  libro.disponible = false;
  const prestamo = { id: mockPrestamos.length + 1, libroId, estudiante, fecha: new Date().toISOString() };
  mockPrestamos.push(prestamo);
  return prestamo;
}

async function obtenerLibros() {
  if (USAR_MOCK) return MOCK_LIBROS.map((l) => ({ ...l }));
  // TODO fe/conexion-api: pedir los libros a GET /api/libros
  throw new Error('Falta conectar con la API');
}

async function obtenerPrestamos() {
  if (USAR_MOCK) return mockPrestamos.slice();
  // TODO fe/conexion-api: pedir los préstamos a GET /api/prestamos
  throw new Error('Falta conectar con la API');
}

async function crearPrestamo(libroId, estudiante) {
  if (USAR_MOCK) return prestamoDePrueba(libroId, estudiante);
  // TODO fe/conexion-api: enviar el préstamo a POST /api/prestamos
  throw new Error('Falta conectar con la API');
}

// ── Elementos de la página ───────────────────────────────────
const catalogo = document.getElementById('catalogo');
const listaPrestamos = document.getElementById('lista-prestamos');
const buscador = document.getElementById('buscador');
const resumen = document.getElementById('resumen');
const modo = document.getElementById('modo');
const aviso = document.getElementById('aviso');
let libros = [];

// Evita que un texto escrito por el usuario se interprete como HTML
function escapar(texto) {
  return String(texto).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function avisar(mensaje, esError) {
  aviso.textContent = mensaje;
  aviso.className = esError ? 'aviso error' : 'aviso';
  aviso.hidden = false;
  clearTimeout(avisar.temporizador);
  avisar.temporizador = setTimeout(() => { aviso.hidden = true; }, 3500);
}

// ── Catálogo ─────────────────────────────────────────────────
function pintarLibros(lista) {
  // TODO fe/catalogo: crear una ficha por cada libro de la lista
  resumen.textContent = `${lista.length} libros recibidos`;
  catalogo.innerHTML = '<p class="vacio">El catálogo todavía no se pinta. Es la tarea <b>fe/catalogo</b>.</p>';
}

// ── Buscador ─────────────────────────────────────────────────
function librosFiltrados() {
  // TODO fe/buscador: devolver solo los libros cuyo título o autor contengan el texto buscado
  return libros;
}

// ── Préstamos ────────────────────────────────────────────────
function pintarPrestamos(lista) {
  // TODO fe/prestamo: mostrar la lista de préstamos activos
  listaPrestamos.innerHTML = '<li>La lista de préstamos es la tarea <b>fe/prestamo</b>.</li>';
}

// TODO fe/prestamo: al pulsar «Prestar», pedir el nombre y llamar a crearPrestamo()

// ── Inicio ───────────────────────────────────────────────────
async function cargar() {
  modo.textContent = USAR_MOCK ? 'Modo: datos de prueba' : 'Modo: conectado a la API';
  modo.classList.toggle('api', !USAR_MOCK);
  try {
    libros = await obtenerLibros();
    pintarLibros(librosFiltrados());
    pintarPrestamos(await obtenerPrestamos());
  } catch (error) {
    catalogo.innerHTML = `<p class="vacio">No se pudieron cargar los libros: ${escapar(error.message)}</p>`;
  }
}

cargar();
