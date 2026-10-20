// Utilidades para las pruebas: levantan la app en un puerto libre
// y hacen peticiones HTTP reales con fetch.
const { crearApp } = require('../backend/app');

function iniciar() {
  return new Promise((resolve) => {
    const servidor = crearApp().listen(0, () => resolve(servidor));
  });
}

async function pedir(servidor, ruta, opciones = {}) {
  const { port } = servidor.address();
  const respuesta = await fetch(`http://127.0.0.1:${port}${ruta}`, opciones);
  const texto = await respuesta.text();
  let cuerpo = null;
  try { cuerpo = JSON.parse(texto); } catch (e) { cuerpo = texto; }
  return { estado: respuesta.status, cuerpo };
}

function enviar(datos) {
  return {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datos)
  };
}

module.exports = { iniciar, pedir, enviar };
