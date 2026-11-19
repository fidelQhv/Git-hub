const jwt = require("jsonwebtoken");

const SECRETO = process.env.JWT_SECRET || "cambia-este-secreto-en-produccion";

function firmarToken(usuario) {
    return jwt.sign(
        { id: usuario.id, nombre: usuario.nombre, correo: usuario.correo, rol: usuario.rol },
        SECRETO,
        { expiresIn: process.env.JWT_EXPIRA || "8h" }
    );
}

function leerToken(req) {
    const cabecera = req.headers.authorization || "";
    if (!cabecera.startsWith("Bearer ")) return null;
    try {
        return jwt.verify(cabecera.slice(7), SECRETO);
    } catch (error) {
        return null;
    }
}

// Agrega req.usuario si hay un token válido, pero no bloquea la petición.
function autenticacionOpcional(req, res, next) {
    req.usuario = leerToken(req);
    next();
}

// Exige sesión iniciada.
function requiereSesion(req, res, next) {
    const usuario = leerToken(req);
    if (!usuario) return res.status(401).json({ error: "Debes iniciar sesión." });
    req.usuario = usuario;
    next();
}

module.exports = { firmarToken, autenticacionOpcional, requiereSesion };
