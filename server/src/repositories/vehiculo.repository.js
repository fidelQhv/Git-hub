const { pool } = require("../db");

async function listarDisponibles() {
    const [filas] = await pool.query(
        `SELECT id, marca, modelo, tipo, precio, anio, kilometraje, motor, transmision, imagen, descripcion
         FROM vehiculos WHERE disponible = 1 ORDER BY id`
    );
    return filas;
}

module.exports = { listarDisponibles };
