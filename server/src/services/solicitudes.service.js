const cotizaciones = require("../repositories/cotizacion.repository");
const citas = require("../repositories/cita.repository");
const { ErrorHttp } = require("../utils/errores");

const REGEX_CORREO = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function limpiar(valor, max) {
    return String(valor || "").trim().slice(0, max);
}

function validarContacto(datos) {
    const contacto = {
        nombre: limpiar(datos.nombre, 100),
        telefono: limpiar(datos.telefono, 30),
        correo: limpiar(datos.correo, 120).toLowerCase(),
        mensaje: limpiar(datos.mensaje, 1000) || null
    };
    if (contacto.nombre.length < 2 || contacto.telefono.length < 6 || !REGEX_CORREO.test(contacto.correo)) {
        throw new ErrorHttp(400, "Completa nombre, teléfono y un correo válido.");
    }
    return contacto;
}

async function crearCotizacion(datos) {
    const contacto = validarContacto(datos);
    try {
        const id = await cotizaciones.crear({ ...contacto, vehiculoId: Number(datos.vehiculoId) || null });
        return { id };
    } catch (error) {
        if (error.code === "ER_NO_REFERENCED_ROW_2") throw new ErrorHttp(400, "El vehículo seleccionado no existe.");
        throw error;
    }
}

async function crearCita(datos) {
    const contacto = validarContacto(datos);
    try {
        const id = await citas.crear({ ...contacto, servicioId: Number(datos.servicioId) || null });
        return { id };
    } catch (error) {
        if (error.code === "ER_NO_REFERENCED_ROW_2") throw new ErrorHttp(400, "El servicio seleccionado no existe.");
        throw error;
    }
}

module.exports = { crearCotizacion, crearCita };
