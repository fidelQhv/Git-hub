// Error con código HTTP. Los servicios lo lanzan y app.js lo convierte en respuesta JSON.
class ErrorHttp extends Error {
    constructor(estado, mensaje) {
        super(mensaje);
        this.estado = estado;
    }
}

module.exports = { ErrorHttp };
