const { pool } = require("../db");

async function buscarPorCorreo(correo) {
    const [filas] = await pool.query(
        "SELECT id, nombre, correo, password_hash, rol FROM usuarios WHERE correo = ?",
        [correo]
    );
    return filas[0] || null;
}

async function crear({ nombre, correo, passwordHash, rol }) {
    const [resultado] = await pool.query(
        "INSERT INTO usuarios (nombre, correo, password_hash, rol) VALUES (?, ?, ?, ?)",
        [nombre, correo, passwordHash, rol]
    );
    return resultado.insertId;
}

module.exports = { buscarPorCorreo, crear };
