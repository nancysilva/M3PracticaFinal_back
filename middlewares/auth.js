const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
    const authHeader = req.header('Authorization');

    if (!authHeader) {
        return res.status(403).json({ error: 'Acceso denegado. Token faltante.' });
    }

    // El header puede tener formato "Bearer <token>"
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.usuario = decoded;
        next();
    } catch (err) {
        res.status(401).json({ error: 'Token inválido.' });
    }
};
