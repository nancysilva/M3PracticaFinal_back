const sql = require('mssql');
require('dotenv').config();

const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    options: {
        encrypt: true, // o false, según tu configuración
        trustServerCertificate: true
    }
};

sql.connect(dbConfig).then(() => {
    console.log('Conectado a SQL Server');
}).catch(err => {
    console.error('Error al conectar a la base de datos', err);
});

module.exports = sql;
