const catalogo = require("../services/catalogo.service");

async function listarVehiculos(req, res, next) {
    try {
        res.json(await catalogo.listarVehiculos());
    } catch (error) {
        next(error);
    }
}

async function listarServicios(req, res, next) {
    try {
        res.json(await catalogo.listarServicios());
    } catch (error) {
        next(error);
    }
}

module.exports = { listarVehiculos, listarServicios };
