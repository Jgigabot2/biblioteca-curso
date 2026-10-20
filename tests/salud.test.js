const { test } = require('node:test');
const assert = require('node:assert/strict');
const { iniciar, pedir } = require('./ayuda');

test('GET /api/salud responde { estado: "ok" }', async () => {
  const servidor = await iniciar();
  try {
    const r = await pedir(servidor, '/api/salud');
    assert.equal(r.estado, 200);
    assert.deepEqual(r.cuerpo, { estado: 'ok' });
  } finally {
    servidor.close();
  }
});
