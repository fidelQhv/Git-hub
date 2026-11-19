const express = require("express");
const controlador = require("../controllers/catalogo.controller");

const router = express.Router();

router.get("/vehiculos", controlador.listarVehiculos);
router.get("/servicios", controlador.listarServicios);

module.exports = router;
