const path = require('path');
const { crearServidor } = require('./mini-express');
const { librosIniciales } = require('./datos');

// crearApp() arma una aplicación nueva con sus propios datos en memoria.
// server.js la pone a escuchar; las pruebas crean una nueva en cada test.
function crearApp() {
  const libros = librosIniciales();
  const prestamos = [];

  // Además de las rutas /api, sirve la página del equipo frontend
  const app = crearServidor(path.join(__dirname, '..', 'frontend'));

  app.get('/api/salud', (req, res) => {
    res.json({ estado: 'ok' });
  });

  // Rutas del contrato (ver contrato.md). Cada bloque es la tarea de una subrama.

  // ── TODO be/libros: GET /api/libros y GET /api/libros/:id

  // ─────────────────────────────────────────────────────────
  //  Deja este separador: evita que las dos tareas choquen.
  // ─────────────────────────────────────────────────────────

  // ── TODO be/prestamos: POST /api/prestamos y GET /api/prestamos

  return app;
}

module.exports = { crearApp };
