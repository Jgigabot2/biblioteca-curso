// ─────────────────────────────────────────────────────────────
// mini-express: una versión mínima de Express hecha solo con Node.
// Así el proyecto no necesita "npm install".
// La forma de escribir rutas es la misma de Express:
//     app.get('/api/libros', (req, res) => res.json(libros));
//     app.post('/api/prestamos', (req, res) => res.status(201).json(nuevo));
// Disponibles: req.params, req.query, req.body, res.status(), res.json()
// NO EDITAR este archivo: no pertenece a ningún equipo.
// ─────────────────────────────────────────────────────────────
const http = require('http');
const fs = require('fs');
const path = require('path');

const TIPOS = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png', '.ico': 'image/x-icon' };

function crearRespuesta(res) {
  res.status = function (codigo) { res.statusCode = codigo; return res; };
  res.json = function (datos) {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.end(JSON.stringify(datos));
    return res;
  };
  return res;
}

function coincide(patron, ruta) {
  const a = patron.split('/').filter(Boolean), b = ruta.split('/').filter(Boolean);
  if (a.length !== b.length) return null;
  const params = {};
  for (let i = 0; i < a.length; i++) {
    if (a[i].startsWith(':')) params[a[i].slice(1)] = decodeURIComponent(b[i]);
    else if (a[i] !== b[i]) return null;
  }
  return params;
}

function leerCuerpo(req) {
  return new Promise((resolve) => {
    let texto = '';
    req.on('data', (parte) => { texto += parte; });
    req.on('end', () => {
      if (!texto) return resolve({});
      try { resolve(JSON.parse(texto)); } catch (e) { resolve(null); }
    });
  });
}

function servirArchivo(carpeta, ruta, res) {
  const relativa = ruta === '/' ? 'index.html' : decodeURIComponent(ruta).replace(/^\/+/, '');
  const archivo = path.resolve(carpeta, relativa);
  if (!archivo.startsWith(path.resolve(carpeta))) return false;
  if (!fs.existsSync(archivo) || !fs.statSync(archivo).isFile()) return false;
  res.setHeader('Content-Type', TIPOS[path.extname(archivo)] || 'application/octet-stream');
  fs.createReadStream(archivo).pipe(res);
  return true;
}

function crearServidor(carpetaEstatica) {
  const rutas = [];
  const app = {
    get: (patron, manejar) => rutas.push({ metodo: 'GET', patron, manejar }),
    post: (patron, manejar) => rutas.push({ metodo: 'POST', patron, manejar }),
    put: (patron, manejar) => rutas.push({ metodo: 'PUT', patron, manejar }),
    delete: (patron, manejar) => rutas.push({ metodo: 'DELETE', patron, manejar }),
    listen: (puerto, alListo) => http.createServer(atender).listen(puerto, alListo)
  };

  async function atender(req, res) {
    crearRespuesta(res);
    const url = new URL(req.url, 'http://localhost');
    req.query = Object.fromEntries(url.searchParams);
    try {
      for (const r of rutas) {
        if (r.metodo !== req.method) continue;
        const params = coincide(r.patron, url.pathname);
        if (!params) continue;
        req.params = params;
        req.body = ['POST', 'PUT'].includes(req.method) ? await leerCuerpo(req) : {};
        if (req.body === null) return res.status(400).json({ error: 'El cuerpo no es un JSON válido' });
        return await r.manejar(req, res);
      }
      if (req.method === 'GET' && carpetaEstatica && servirArchivo(carpetaEstatica, url.pathname, res)) return;
      res.status(404).json({ error: 'Ruta no encontrada' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }
  return app;
}

module.exports = { crearServidor };
