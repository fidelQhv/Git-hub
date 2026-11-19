const { pool } = require("../db");

async function listarActivos() {
    const [filas] = await pool.query(
        "SELECT id, imagen, nombre, descripcion, precio, frecuencia FROM servicios WHERE activo = 1 ORDER BY id"
    );
    return filas;
}

module.exports = { listarActivos };
