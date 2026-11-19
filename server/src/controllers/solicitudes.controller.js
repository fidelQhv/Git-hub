const solicitudes = require("../services/solicitudes.service");

async function crearCotizacion(req, res, next) {
    try {
        res.status(201).json(await solicitudes.crearCotizacion(req.body));
    } catch (error) {
        next(error);
    }
}

async function crearCita(req, res, next) {
    try {
        res.status(201).json(await solicitudes.crearCita(req.body));
    } catch (error) {
        next(error);
    }
}

module.exports = { crearCotizacion, crearCita };
