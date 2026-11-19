const express = require("express");
const controlador = require("../controllers/auth.controller");

const router = express.Router();

router.post("/login", controlador.login);
router.post("/registro", controlador.registro);

module.exports = router;
