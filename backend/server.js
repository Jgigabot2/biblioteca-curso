const { crearApp } = require('./app');

const PUERTO = process.env.PORT || 3000;

crearApp().listen(PUERTO, () => {
  console.log(`Biblioteca en http://localhost:${PUERTO}`);
});
