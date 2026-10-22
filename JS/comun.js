const TIPO_CAMBIO_PEN = 3.6;

function formatearNumero(valor) {
    const numero = Math.round(Number(valor));
    if (!Number.isFinite(numero)) return "0";
    return numero.toLocaleString("en-US");
}

function formatearUSD(montoUSD) {
    return `$${formatearNumero(montoUSD)}`;
}

function convertirAPEN(montoUSD) {
    return Number(montoUSD) * TIPO_CAMBIO_PEN;
}

function formatearPEN(montoUSD) {
    return `S/ ${formatearNumero(convertirAPEN(montoUSD))}`;
}

function precioDualHTML(montoUSD) {
    return `${formatearUSD(montoUSD)}
        <small class="price-alt">≈ ${formatearPEN(montoUSD)}</small>`;
}

function hayModalAbierto() {
    return document.querySelector(".modal.active") !== null;
}

function abrirModal(id) {
    const modal = document.getElementById(id);
    if (!modal) return;
    modal.classList.add("active");
    document.body.classList.add("modal-open");
}

function cerrarModal(id) {
    const modal = document.getElementById(id);
    if (!modal) return;
    modal.classList.remove("active");
    if (!hayModalAbierto()) {
        document.body.classList.remove("modal-open");
    }
}

function configurarModales() {
    document.querySelectorAll(".modal").forEach(modal => {
        let empezoEnFondo = null;
        modal.addEventListener("pointerdown", event => {
            empezoEnFondo = event.target === modal;
        });
        modal.addEventListener("click", event => {
            if (event.target === modal && empezoEnFondo !== false) {
                cerrarModal(modal.id);
            }
            empezoEnFondo = null;
        });
    });
    document.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            document
                .querySelectorAll(".modal.active")
                .forEach(modal => cerrarModal(modal.id));
        }
    });
}

if (typeof document !== "undefined") {
    configurarModales();
}

if (typeof module !== "undefined" && module.exports) {
    module.exports = {
        TIPO_CAMBIO_PEN,
        formatearNumero,
        formatearUSD,
        formatearPEN,
        convertirAPEN,
        precioDualHTML
    };
}
