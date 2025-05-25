const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middlewares/auth');

// Rutas públicas
router.post('/registro', userController.crearUsuario);
router.post('/login', userController.login);

// Rutas protegidas
router.get('/', auth, userController.obtenerUsuarios);
router.get('/:id', auth, userController.obtenerUsuarioPorId);
router.put('/:id', auth, userController.actualizarUsuario);
router.delete('/:id', auth, userController.eliminarUsuario);

module.exports = router;
