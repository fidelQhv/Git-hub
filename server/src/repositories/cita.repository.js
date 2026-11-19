const { pool } = require("../db");

async function crear({ nombre, telefono, correo, servicioId, mensaje }) {
    const [resultado] = await pool.query(
        "INSERT INTO citas (nombre, telefono, correo, servicio_id, mensaje) VALUES (?, ?, ?, ?, ?)",
        [nombre, telefono, correo, servicioId, mensaje]
    );
    return resultado.insertId;
}

module.exports = { crear };
