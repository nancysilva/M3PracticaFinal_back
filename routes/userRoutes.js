import express from 'express';
import userController from '../controllers/userController.js';
import auth from '../middlewares/auth.js';

const router = express.Router();

/**
 * @swagger
 * /api/usuarios/registro:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Crear un nuevo usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: Suga
 *               correo_electronico:
 *                 type: string
 *                 example: suga@gmail.com
 *               contrasena:
 *                 type: string
 *                 example: suga123
 *               descripcion:
 *                 type: string
 *                 example: BTS
 *     responses:
 *       201:
 *         description: Usuario creado correctamente
 *       403:
 *         description: No autorizado, token inválido o faltante

 */
router.post('/registro', auth, userController.crearUsuario);

/**
 * @swagger
 * /api/usuarios/login:
 *   post:
 *     summary: Iniciar sesión
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               correo_electronico:
 *                 type: string
 *                 example: suga@gmail.com
 *               contrasena:
 *                 type: string
 *                 example: suga123
 *     responses:
 *       200:
 *         description: Login exitoso
 *       401:
 *         description: Credenciales inválidas
 */
router.post('/login', userController.login);

// Rutas protegidas (requieren token JWT)

/**
 * @swagger
 * /api/usuarios:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Obtener todos los usuarios
 *     tags: [Usuarios]
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida correctamente
 *       403:
 *         description: No autorizado, token inválido o faltante
 */


router.get('/', auth, userController.obtenerUsuarios);

/**
 * @swagger
 * /api/usuarios/{id}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Obtener un usuario por ID
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario a buscar
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *       403:
 *         description: No autorizado, token inválido o faltante
 *       404:
 *         description: Usuario no encontrado
 */

router.get('/:id', auth, userController.obtenerUsuarioPorId);

/**
 * @swagger
 * /api/usuarios/{id}:
 *   put:
 *     security:
 *       - bearerAuth: []
 *     summary: Actualizar un usuario por ID
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: AgustD
 *               correo_electronico:
 *                 type: string
 *                 example: AgustD@gmail.com
 *               descripcion:
 *                 type: string
 *                 example: Solitario
 *     responses:
 *       200:
 *         description: Usuario actualizado correctamente
 *       403:
 *         description: No autorizado, token inválido o faltante
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error del servidor al actualizar usuario
 */

router.put('/:id', auth, userController.actualizarUsuario);

/**
 * @swagger
 * /api/usuarios/{id}:
 *   delete:
 *     summary: Eliminar un usuario por ID
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario que se desea eliminar
 *     responses:
 *       200:
 *         description: Usuario eliminado correctamente
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error del servidor al eliminar usuario
 *       403:
 *         description: No autorizado, token inválido o faltante
 */



router.delete('/:id', auth, userController.eliminarUsuario);

export default router;
