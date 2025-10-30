const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const { Pool } = require("pg");

const authRoutes = require("./routes/authRoutes");

const productosRoutes = require("./routes/productosRoutes");
const personasRoutes = require('./routes/personaRoutes');

const clienteRoutes = require('./routes/clienteRoutes');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Conexión PostgreSQL
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

pool.connect()
  .then(() => console.log("✅ Conexión exitosa a PostgreSQL"))
  .catch((err) => console.error("❌ Error al conectar a PostgreSQL:", err));

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/productos", productosRoutes);

app.use("/api/personas", personasRoutes);
app.use("/api/clientes", clienteRoutes);


app.use("/facturas_pdf", express.static(path.join(__dirname, "facturas_pdf")));

app.get("/", (req, res) => {
  res.send("Servidor funcionando correctamente 🚀");
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});
