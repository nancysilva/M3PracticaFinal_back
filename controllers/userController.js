import poolPromise from '../config/db.js';
import sql from 'mssql';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const userController = {
    // Crear usuario (registro)
    crearUsuario: async (req, res) => {
        const { nombre, correo_electronico, contrasena, descripcion } = req.body;

        try {
            const hashedPassword = await bcrypt.hash(contrasena, 10);

            const pool = await poolPromise;
            const request = pool.request();

            request.input('nombre', sql.VarChar, nombre);
            request.input('correo_electronico', sql.VarChar, correo_electronico);
            request.input('contrasena', sql.VarChar, hashedPassword);
            request.input('descripcion', sql.VarChar, descripcion);

            const result = await request.query(`
                INSERT INTO usuariosNancy_new (nombre, correo_electronico, contrasena, descripcion)
                OUTPUT INSERTED.id
                VALUES (@nombre, @correo_electronico, @contrasena, @descripcion)
            `);

            const nuevoId = result.recordset[0].id;

            res.status(201).json({ mensaje: 'Usuario creado correctamente', id: nuevoId });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Error al crear usuario' });
        }
    },


    // Login
    login: async (req, res) => {
        const { correo_electronico, contrasena } = req.body;

        try {
            const pool = await poolPromise;
            const request = pool.request();
            request.input('correo_electronico', sql.VarChar, correo_electronico);

            const result = await request.query(`
                SELECT * FROM usuariosNancy_new WHERE correo_electronico = @correo_electronico
            `);

            const usuario = result.recordset[0];

            if (!usuario) {
                return res.status(401).json({ error: 'Credenciales inválidas' });
            }

            const isMatch = await bcrypt.compare(contrasena, usuario.contrasena);
            if (!isMatch) {
                return res.status(401).json({ error: 'Credenciales inválidas' });
            }

            const token = jwt.sign(
                { id: usuario.id, correo: usuario.correo_electronico },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );

            res.json({ mensaje: 'Login exitoso', token });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Error en el login' });
        }
    },

    // Leer todos los usuarios
    obtenerUsuarios: async (req, res) => {
        try {
            const result = await sql.query('SELECT * FROM usuariosNancy_new');
            res.json(result.recordset);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Error al obtener usuarios' });
        }
    },

    // Leer usuario por ID
    obtenerUsuarioPorId: async (req, res) => {
        const { id } = req.params;

        try {
            const pool = await poolPromise;
            const request = pool.request();

            request.input('id', sql.Int, id);

            const result = await request.query('SELECT * FROM usuariosNancy_new WHERE id = @id');
            const usuario = result.recordset[0];

            if (!usuario) {
                return res.status(404).json({ error: 'Usuario no encontrado' });
            }

            res.json(usuario);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Error al buscar usuario' });
        }
    },

    // Actualizar usuario
    actualizarUsuario: async (req, res) => {
        const { id } = req.params;
        const { nombre, correo_electronico, descripcion } = req.body;

        try {
            const pool = await poolPromise;
            const request = pool.request();

            request.input('id', sql.Int, id);
            request.input('nombre', sql.VarChar, nombre);
            request.input('correo_electronico', sql.VarChar, correo_electronico);
            request.input('descripcion', sql.VarChar, descripcion);

            await request.query(`
                UPDATE usuariosNancy_new
                SET nombre = @nombre, correo_electronico = @correo_electronico, descripcion = @descripcion
                WHERE id = @id
            `);

            res.json({ mensaje: 'Usuario actualizado correctamente' });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Error al actualizar usuario' });
        }
    },

    // Eliminar usuario
    eliminarUsuario: async (req, res) => {
        const { id } = req.params;

        try {
            const pool = await poolPromise;
            const request = pool.request();
            
            request.input('id', sql.Int, id);

            await request.query('DELETE FROM usuariosNancy_new WHERE id = @id');

            res.json({ mensaje: 'Usuario eliminado correctamente' });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Error al eliminar usuario' });
        }
    }
};

export default userController;
