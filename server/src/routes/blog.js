const express = require("express");
const controlador = require("../controllers/blog.controller");
const { autenticacionOpcional, requiereSesion } = require("../middleware/auth");

const router = express.Router();

router.get("/posts", controlador.listarPosts);
router.get("/posts/:id/comentarios", autenticacionOpcional, controlador.listarComentarios);
router.post("/posts/:id/comentarios", requiereSesion, controlador.crearComentario);
router.delete("/comentarios/:id", requiereSesion, controlador.eliminarComentario);

module.exports = router;
