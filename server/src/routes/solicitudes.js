const express = require("express");
const controlador = require("../controllers/solicitudes.controller");

const router = express.Router();

router.post("/cotizaciones", controlador.crearCotizacion);
router.post("/citas", controlador.crearCita);

module.exports = router;
