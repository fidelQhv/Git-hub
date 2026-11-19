// ============================================
// BASE DE DATOS DE SERVICIOS
// ============================================

// Los servicios ahora se leen de MySQL mediante GET /api/servicios
let servicios = [];

// MOSTRAR SERVICIOS

function mostrarServicios() {
    const contenedor = document.getElementById("servicios");
    if (!contenedor) {
        return;
    }
    contenedor.innerHTML = "";
    servicios.forEach(servicio => {
        const card = document.createElement("article");
        card.className = "service-card";
        card.innerHTML = `
            <div class="service-image">
                <img
                    src="${servicio.imagen}"
                    alt="${servicio.nombre}"
                    loading="lazy"
                >
            </div>
            <div class="service-content">
                <h3 class="service-name">
                    ${servicio.nombre}
                </h3>
                <p class="service-desc">
                    ${servicio.descripcion}
                </p>
                <div class="service-bottom">
                    <div class="service-price">
                        $${servicio.precio}
                        <small>
                            ${servicio.frecuencia}
                        </small>
                    </div>
                    <button
                        type="button"
                        class="btn-small"
                        data-servicio-id="${servicio.id}">
                        Agendar
                    </button>
                </div>
            </div>
        `;
        contenedor.appendChild(card);
    });
}

// ACTUALIZAR CONTADOR

function actualizarContador() {
    const contador = document.getElementById("service-count");
    if (!contador) {
        return;
    }
    contador.textContent = servicios.length;
}

// CARGAR SERVICIOS EN EL SELECT

function cargarServiciosSelect(idSeleccionado = null) {
    const select = document.getElementById("servicio");
    if (!select) {
        return;
    }
    select.innerHTML = `
        <option value="">
            Selecciona un servicio
        </option>
    `;
    servicios.forEach(servicio => {
        const option = document.createElement("option");
        option.value = servicio.id;
        option.textContent = servicio.nombre;
        if (idSeleccionado === servicio.id) {
            option.selected = true;
        }
        select.appendChild(option);
    });
}

// SELECCIONAR SERVICIO

function seleccionarServicio(id) {
    cargarServiciosSelect(id);
    const agenda = document.getElementById("agenda");
    if (agenda) {
        agenda.scrollIntoView({
            behavior: "smooth"
        });
    }
}

// BOTONES DE LAS TARJETAS

function configurarBotonesServicios() {
    const contenedor = document.getElementById("servicios");
    if (!contenedor) {
        return;
    }
    contenedor.addEventListener("click", event => {
        const boton = event.target.closest("[data-servicio-id]");
        if (!boton) {
            return;
        }
        const id = Number(boton.dataset.servicioId);
        seleccionarServicio(id);
    });
}

// FORMULARIO

function configurarFormulario() {
    const formulario = document.querySelector("#agenda form");
    if (!formulario) {
        return;
    }
    formulario.addEventListener("submit", event => {
        event.preventDefault();
        const nombre = document.getElementById("nombre").value;
        if (!nombre.trim()) {
            return;
        }
        apiFetch("/citas", {
            method: "POST",
            body: JSON.stringify({
                nombre,
                telefono: document.getElementById("telefono").value,
                correo: document.getElementById("email").value,
                servicioId: document.getElementById("servicio").value,
                mensaje: document.getElementById("mensaje").value
            })
        })
            .then(() => {
                alert(
                    `Gracias ${nombre}. Tu solicitud de cita fue recibida correctamente.`
                );
                formulario.reset();
            })
            .catch(error => alert(error.message));
    });
}

// INICIALIZACIÓN

async function iniciarServicios() {
    try {
        servicios = await apiFetch("/servicios");
    } catch (error) {
        alert("No se pudieron cargar los servicios. Intenta nuevamente.");
    }
    mostrarServicios();
    actualizarContador();
    cargarServiciosSelect();
    configurarBotonesServicios();
    configurarFormulario();
}

// EJECUTAR

document.addEventListener(
    "DOMContentLoaded",
    iniciarServicios
);
