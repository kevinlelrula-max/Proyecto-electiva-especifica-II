const express = require("express");
const router = express.Router();
const { registrar, login, cambiarPassword } = require("../controllers/authController");

// Ruta para registrar
router.post("/registro", registrar);

// Ruta para login
router.post("/login", login);

// Ruta para cambiar contraseña
router.put("/cambiar-password", cambiarPassword);

module.exports = router;
