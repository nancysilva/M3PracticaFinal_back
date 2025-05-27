// tests/login.test.js
import request from 'supertest';
import app from '../app.js';

describe('POST /api/usuarios/login', () => {
  it('debería fallar con credenciales inválidas', async () => {
    const res = await request(app)
      .post('/api/usuarios/login')
      .send({
        correo_electronico: 'usuario@noexiste.com',
        contrasena: 'invalida123'
      });

    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty('error', 'Credenciales inválidas');
  });

  // Si quieres probar login exitoso, primero asegúrate de que ese usuario existe
  it('debería iniciar sesión con credenciales válidas', async () => {
    const res = await request(app)
    .post('/api/usuarios/login')
    .send({
        correo_electronico: 'nancysilva2000@hotmail.com',
        contrasena: '12345'
    });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
});
});
