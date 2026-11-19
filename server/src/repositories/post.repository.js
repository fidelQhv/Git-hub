const { pool } = require("../db");

async function listar() {
    const [filas] = await pool.query(
        `SELECT id, titulo, categoria, autor, fecha, imagen, resumen, contenido
         FROM posts ORDER BY fecha, id`
    );
    return filas;
}

async function existe(id) {
    const [filas] = await pool.query("SELECT id FROM posts WHERE id = ?", [id]);
    return filas.length > 0;
}

module.exports = { listar, existe };
