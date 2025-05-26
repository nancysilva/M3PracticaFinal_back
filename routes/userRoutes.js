import express from 'express';
import userController from '../controllers/userController.js';
import auth from '../middlewares/auth.js';

const router = express.Router();

// Rutas públicas
router.post('/registro', userController.crearUsuario);
router.post('/login', userController.login);

// Rutas protegidas
router.get('/', auth, userController.obtenerUsuarios);
router.get('/:id', auth, userController.obtenerUsuarioPorId);
router.put('/:id', auth, userController.actualizarUsuario);
router.delete('/:id', auth, userController.eliminarUsuario);

export default router;
