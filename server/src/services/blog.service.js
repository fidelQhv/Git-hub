const posts = require("../repositories/post.repository");
const comentarios = require("../repositories/comentario.repository");
const { ErrorHttp } = require("../utils/errores");

// "contenido" se guarda como texto (párrafos separados por línea en blanco) y se devuelve como arreglo
async function listarPosts() {
    const filas = await posts.listar();
    return filas.map(p => ({
        ...p,
        contenido: String(p.contenido).split(/\n\s*\n/).map(t => t.trim()).filter(Boolean)
    }));
}

// Las fechas se guardan en UTC. "propio" indica si el comentario es del usuario que consulta
// (así no se expone el correo de los demás).
async function listarComentarios(postId, usuarioActual) {
    const filas = await comentarios.listarPorPost(postId);
    const idActual = usuarioActual ? usuarioActual.id : null;
    return filas.map(({ usuario_id, fecha, ...resto }) => ({
        ...resto,
        fecha: new Date(fecha.replace(" ", "T") + "Z").toISOString(),
        propio: idActual !== null && usuario_id === idActual
    }));
}

async function crearComentario(postId, usuario, textoEntrada) {
    const texto = String(textoEntrada || "").trim();
    if (texto.length < 3 || texto.length > 500) {
        throw new ErrorHttp(400, "El comentario debe tener entre 3 y 500 caracteres.");
    }
    if (!(await posts.existe(postId))) throw new ErrorHttp(404, "Artículo no encontrado.");

    const id = await comentarios.crear({ postId, usuarioId: usuario.id, texto });
    return { id };
}

// Puede eliminar el administrador o el autor del comentario
async function eliminarComentario(id, usuario) {
    const comentario = await comentarios.buscarPorId(id);
    if (!comentario) throw new ErrorHttp(404, "Comentario no encontrado.");

    const esAdmin = usuario.rol === "Administrador";
    if (!esAdmin && comentario.usuario_id !== usuario.id) {
        throw new ErrorHttp(403, "No puedes eliminar este comentario.");
    }
    await comentarios.eliminar(id);
}

module.exports = { listarPosts, listarComentarios, crearComentario, eliminarComentario };
