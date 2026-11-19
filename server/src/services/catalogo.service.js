const vehiculos = require("../repositories/vehiculo.repository");
const servicios = require("../repositories/servicio.repository");

// Mismo formato que el arreglo "autos" que antes vivía en java.js
async function listarVehiculos() {
    const filas = await vehiculos.listarDisponibles();
    return filas.map(({ anio, precio, ...resto }) => ({ ...resto, precio: Number(precio), "año": anio }));
}

// Mismo formato que el arreglo "servicios" de servicios.js
async function listarServicios() {
    const filas = await servicios.listarActivos();
    return filas.map(s => ({ ...s, precio: Number(s.precio) }));
}

module.exports = { listarVehiculos, listarServicios };
