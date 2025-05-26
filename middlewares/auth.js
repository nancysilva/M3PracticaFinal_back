import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const auth = (req, res, next) => {
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
    console.error(err);
    res.status(401).json({ error: 'Token inválido.' });
  }
};

export default auth;
