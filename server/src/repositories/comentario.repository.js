const { pool } = require("../db");

async function listarPorPost(postId) {
    const [filas] = await pool.query(
        `SELECT c.id, c.texto, c.creado_en AS fecha, c.usuario_id, u.nombre, u.rol
         FROM comentarios c
         JOIN usuarios u ON u.id = c.usuario_id
         WHERE c.post_id = ?
         ORDER BY c.creado_en, c.id`,
        [postId]
    );
    return filas;
}

async function crear({ postId, usuarioId, texto }) {
    const [resultado] = await pool.query(
        "INSERT INTO comentarios (post_id, usuario_id, texto) VALUES (?, ?, ?)",
        [postId, usuarioId, texto]
    );
    return resultado.insertId;
}

async function buscarPorId(id) {
    const [filas] = await pool.query("SELECT id, usuario_id FROM comentarios WHERE id = ?", [id]);
    return filas[0] || null;
}

async function eliminar(id) {
    await pool.query("DELETE FROM comentarios WHERE id = ?", [id]);
}

module.exports = { listarPorPost, crear, buscarPorId, eliminar };
