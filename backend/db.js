const { Pool } = require('pg');
require('dotenv').config();

const isProduction = process.env.NODE_ENV === 'production';

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: isProduction ? { rejectUnauthorized: false } : false, // ✅ SSL solo en producción
});

pool.connect()
  .then(() => console.log('✅ Conexión exitosa a PostgreSQL'))
  .catch(err => console.error('❌ Error de conexión a la base de datos:', err));

module.exports = pool;
