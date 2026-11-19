const blog = require("../services/blog.service");

async function listarPosts(req, res, next) {
    try {
        res.json(await blog.listarPosts());
    } catch (error) {
        next(error);
    }
}

async function listarComentarios(req, res, next) {
    try {
        res.json(await blog.listarComentarios(req.params.id, req.usuario));
    } catch (error) {
        next(error);
    }
}

async function crearComentario(req, res, next) {
    try {
        res.status(201).json(await blog.crearComentario(req.params.id, req.usuario, req.body.texto));
    } catch (error) {
        next(error);
    }
}

async function eliminarComentario(req, res, next) {
    try {
        await blog.eliminarComentario(req.params.id, req.usuario);
        res.status(204).end();
    } catch (error) {
        next(error);
    }
}

module.exports = { listarPosts, listarComentarios, crearComentario, eliminarComentario };
