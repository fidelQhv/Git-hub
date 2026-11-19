const bcrypt = require("bcryptjs");
const usuarios = require("../repositories/usuario.repository");
const { firmarToken } = require("../middleware/auth");
const { ErrorHttp } = require("../utils/errores");

const REGEX_CORREO = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function crearSesion(usuario) {
    return {
        token: firmarToken(usuario),
        usuario: { nombre: usuario.nombre, correo: usuario.correo, rol: usuario.rol }
    };
}

async function login({ correo, password }) {
    const correoLimpio = String(correo || "").trim().toLowerCase();
    const usuario = await usuarios.buscarPorCorreo(correoLimpio);

    if (!usuario || !(await bcrypt.compare(String(password || ""), usuario.password_hash))) {
        throw new ErrorHttp(401, "Correo o contraseña incorrectos.");
    }
    return crearSesion(usuario);
}

async function registro({ nombre, correo, password }) {
    const nombreLimpio = String(nombre || "").trim();
    const correoLimpio = String(correo || "").trim().toLowerCase();
    const clave = String(password || "");

    if (nombreLimpio.length < 3) throw new ErrorHttp(400, "Ingresa tu nombre completo.");
    if (!REGEX_CORREO.test(correoLimpio)) throw new ErrorHttp(400, "Ingresa un correo válido.");
    if (clave.length < 6) throw new ErrorHttp(400, "La contraseña debe tener mínimo 6 caracteres.");

    if (await usuarios.buscarPorCorreo(correoLimpio)) {
        throw new ErrorHttp(409, "Ese correo ya está registrado.");
    }

    const passwordHash = await bcrypt.hash(clave, 10);
    const id = await usuarios.crear({
        nombre: nombreLimpio, correo: correoLimpio, passwordHash, rol: "Cliente"
    });
    return crearSesion({ id, nombre: nombreLimpio, correo: correoLimpio, rol: "Cliente" });
}

module.exports = { login, registro };
