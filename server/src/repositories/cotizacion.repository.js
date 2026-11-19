const { pool } = require("../db");

async function crear({ nombre, telefono, correo, vehiculoId, mensaje }) {
    const [resultado] = await pool.query(
        "INSERT INTO cotizaciones (nombre, telefono, correo, vehiculo_id, mensaje) VALUES (?, ?, ?, ?, ?)",
        [nombre, telefono, correo, vehiculoId, mensaje]
    );
    return resultado.insertId;
}

module.exports = { crear };
