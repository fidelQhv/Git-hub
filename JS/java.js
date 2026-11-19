// ============================================
// BASE DE DATOS DE VEHÍCULOS
// ============================================

// ==========================================
// #BUG-02: Corrección del cierre de modal en móviles
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    const modalElement = document.querySelector('.modal, #modalAuto');
    const closeBtn = document.querySelector('.close-modal, .btn-cerrar');
    
    if (modalElement && closeBtn) {
        closeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            modalElement.style.display = 'none';
            // Asegurar limpieza de eventos táctiles en móviles
            document.body.classList.remove('modal-open');
        });
    }
});

// Los vehículos ahora se leen de MySQL mediante GET /api/vehiculos
let autos = [];


// ============================================
// MOSTRAR VEHÍCULOS
// ============================================

function mostrarAutos(lista = autos) {

    const catalogo = document.getElementById("catalogo");
    const contador = document.getElementById("contador");
    const sinResultados = document.getElementById("sinResultados");

    catalogo.innerHTML = "";

    contador.textContent =
        `${lista.length} ${lista.length === 1 ? "vehículo" : "vehículos"}`;

    if (lista.length === 0) {
        sinResultados.style.display = "block";
        return;
    }

    sinResultados.style.display = "none";

    lista.forEach(auto => {

        const card = document.createElement("article");

        card.className = "vehicle-card";

        card.innerHTML = `
            <div class="vehicle-image">

                <img src="${auto.imagen}" alt="${auto.marca} ${auto.modelo}">

                <span class="vehicle-status">
                    DISPONIBLE
                </span>

            </div>

            <div class="vehicle-info">

                <span class="vehicle-brand">
                    ${auto.marca}
                </span>

                <h3 class="vehicle-name">
                    ${auto.modelo}
                </h3>

                <div class="vehicle-specs">
                    <span>${auto.año}</span>
                    <span>${auto.kilometraje}</span>
                    <span>${auto.tipo}</span>
                </div>

                <div class="vehicle-bottom">

                    <div class="vehicle-price">
                        ${precioDualHTML(auto.precio)}
                        <small>Precio contado</small>
                    </div>

                    <button
                        class="btn-small"
                        onclick="verDetalle(${auto.id})">
                        Ver más
                    </button>

                </div>

            </div>
        `;

        catalogo.appendChild(card);
    });
}


// ============================================
// FILTROS
// ============================================

function filtrarAutos() {

    const texto =
        document.getElementById("buscar").value.toLowerCase();

    const marca =
        document.getElementById("marca").value;

    const tipo =
        document.getElementById("tipo").value;

    const precio =
        Number(document.getElementById("precio").value);

    const resultados = autos.filter(auto => {

        const coincideTexto =
            `${auto.marca} ${auto.modelo} ${auto.tipo}`
            .toLowerCase()
            .includes(texto);

        const coincideMarca =
            marca === "todos" || auto.marca === marca;

        const coincideTipo =
            tipo === "todos" || auto.tipo === tipo;

        const coincidePrecio =
            auto.precio <= precio;

        return (
            coincideTexto &&
            coincideMarca &&
            coincideTipo &&
            coincidePrecio
        );
    });

    mostrarAutos(resultados);
}


// ============================================
// DETALLE DEL VEHÍCULO
// ============================================

function verDetalle(id) {

    const auto = autos.find(a => a.id === id);

    if (!auto) return;

    const detalle = document.getElementById("detalleAuto");

    detalle.innerHTML = `

        <img
            class="detail-image"
            src="${auto.imagen}"
            alt="${auto.marca} ${auto.modelo}">

        <span class="section-tag">
            ${auto.marca}
        </span>

        <h2 class="detail-title">
            ${auto.modelo}
        </h2>

        <div class="detail-price">
            ${precioDualHTML(auto.precio)}
        </div>

        <div class="vehicle-specs">

            <span>
                Año: ${auto.año}
            </span>

            <span>
                ${auto.kilometraje}
            </span>

            <span>
                ${auto.tipo}
            </span>

        </div>

        <p class="detail-description">
            ${auto.descripcion}
        </p>

        <p class="detail-description">
            <strong>Motor:</strong> ${auto.motor}<br>
            <strong>Transmisión:</strong> ${auto.transmision}
        </p>

        <button
            class="btn btn-primary"
            onclick="cotizarAuto(${auto.id})">
            Solicitar cotización
        </button>
    `;

    abrirModal("modalDetalle");
}


// ============================================
// COTIZACIÓN
// ============================================

function abrirCotizacion() {

    cargarVehiculosSelect();

    abrirModal("modalCotizacion");
}


function cotizarAuto(id) {

    cerrarModal("modalDetalle");

    cargarVehiculosSelect(id);

    abrirModal("modalCotizacion");
}


function cargarVehiculosSelect(idSeleccionado = null) {

    const select =
        document.getElementById("vehiculoInteres");

    select.innerHTML =
        `<option value="">Seleccionar vehículo</option>`;

    autos.forEach(auto => {

        const option = document.createElement("option");

        option.value = auto.id;

        option.textContent =
            `${auto.marca} ${auto.modelo}`;

        if (auto.id === idSeleccionado) {
            option.selected = true;
        }

        select.appendChild(option);
    });
}


// ============================================
// MODALES
// ============================================

function abrirModal(id) {

    document
        .getElementById(id)
        .classList.add("active");
}


function cerrarModal(id) {

    document
        .getElementById(id)
        .classList.remove("active");
}


window.addEventListener("click", event => {

    if (event.target.classList.contains("modal")) {

        event.target.classList.remove("active");

    }
});


// ============================================
// FORMULARIO
// ============================================

document
    .getElementById("formCotizacion")
    .addEventListener("submit", function(event) {

        event.preventDefault();

        const formulario = this;
        const nombre =
            document.getElementById("nombre").value;

        apiFetch("/cotizaciones", {
            method: "POST",
            body: JSON.stringify({
                nombre,
                telefono: document.getElementById("telefono").value,
                correo: document.getElementById("correo").value,
                vehiculoId: document.getElementById("vehiculoInteres").value,
                mensaje: document.getElementById("mensaje").value
            })
        })
            .then(() => {
                mostrarToast(
                    `Gracias ${nombre}. Tu solicitud fue enviada correctamente.`
                );
                formulario.reset();
                cerrarModal("modalCotizacion");
            })
            .catch(error => mostrarToast(error.message));
    });


// ============================================
// NOTIFICACIÓN
// ============================================

function mostrarToast(mensaje) {

    const toast =
        document.getElementById("toast");

    toast.textContent = mensaje;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 3500);
}


// ============================================
// SESIÓN DEL USUARIO
// ============================================

function mostrarUsuarioActivo() {

    const panel = document.getElementById("usuarioActivo");
    const enlaceLogin = document.getElementById("enlaceLogin");
    const datosSesion = localStorage.getItem("automax_sesion");

    if (!panel) return;

    if (!datosSesion) {
        panel.innerHTML = "";
        panel.classList.remove("show");
        if (enlaceLogin) enlaceLogin.style.display = "inline-flex";
        return;
    }

    const sesion = JSON.parse(datosSesion);

    panel.innerHTML = `
        <div class="user-panel-info">
            <span class="user-panel-label">USUARIO ACTIVO</span>
            <strong>${sesion.nombre}</strong>
            <span>${sesion.rol || "Cliente"}</span>
        </div>
        <button class="btn btn-outline user-logout" type="button" onclick="cerrarSesion()">
            Cerrar sesión
        </button>
    `;

    panel.classList.add("show");
    if (enlaceLogin) enlaceLogin.style.display = "none";
}

function cerrarSesion() {
    localStorage.removeItem("automax_sesion");
    localStorage.removeItem("automax_token");
    window.location.href = "login.html";
}

// ============================================
// EVENTOS DE FILTROS
// ============================================

function configurarFiltros() {
    document.querySelectorAll("#precio option").forEach(opcion => {
        const valor = Number(opcion.value);
        if (valor < 999999) {
            opcion.textContent =
                `${formatearUSD(valor)} (≈ ${formatearPEN(valor)})`;
        }
    });
    ["buscar", "marca", "tipo", "precio"].forEach(id => {
        const campo = document.getElementById(id);
        campo.addEventListener("input", filtrarAutos);
        campo.addEventListener("change", filtrarAutos);
    });
}

// ============================================
// INICIAR SISTEMA
// ============================================

async function iniciarCatalogo() {
    configurarFiltros();
    mostrarUsuarioActivo();

    try {
        autos = await apiFetch("/vehiculos");
    } catch (error) {
        mostrarToast("No se pudo cargar el catálogo. Intenta nuevamente.");
    }

    filtrarAutos();
}

iniciarCatalogo();
