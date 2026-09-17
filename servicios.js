// ============================================
// BASE DE DATOS DE SERVICIOS
// ============================================

const servicios = [
    {
        id: 1,
        imagen: "img/aceite.jpg",
        nombre: "Cambio de aceite y filtros",
        descripcion: "Cambio de aceite de motor y filtro, recomendado cada 5,000 km.",
        precio: 45,
        frecuencia: "Cada 5,000 km"
    },
    {
        id: 2,
        imagen: "img/diagnostico.jpg",
        nombre: "Diagnóstico computarizado",
        descripcion: "Escaneo electrónico completo para detectar fallas del motor y sensores.",
        precio: 35,
        frecuencia: "Bajo demanda"
    },
    {
        id: 3,
        imagen: "img/alineacion.jpg",
        nombre: "Alineación y balanceo",
        descripcion: "Mejora la estabilidad del vehículo y prolonga la vida útil de las llantas.",
        precio: 40,
        frecuencia: "Cada 10,000 km"
    },
    {
        id: 4,
        imagen: "img/frenos.jpg",
        nombre: "Revisión y cambio de frenos",
        descripcion: "Revisión de pastillas, discos y líquido de frenos.",
        precio: 80,
        frecuencia: "Cada 15,000 km"
    },
    {
        id: 5,
        imagen: "img/mantenimiento.jpg",
        nombre: "Mantenimiento preventivo",
        descripcion: "Revisión general del vehículo según su kilometraje.",
        precio: 120,
        frecuencia: "Según kilometraje"
    },
    {
        id: 6,
        imagen: "img/aire.jpg",
        nombre: "Aire acondicionado",
        descripcion: "Carga de gas refrigerante y revisión del sistema de A/C.",
        precio: 60,
        frecuencia: "1 vez al año"
    },
    {
        id: 7,
        imagen: "img/bateria.jpg",
        nombre: "Cambio de batería",
        descripcion: "Diagnóstico del sistema eléctrico y reemplazo de batería.",
        precio: 90,
        frecuencia: "Cada 2-3 años"
    },
    {
        id: 8,
        imagen: "img/llantas.jpg",
        nombre: "Cambio de llantas",
        descripcion: "Montaje, balanceo y desecho de llantas usadas incluido.",
        precio: 150,
        frecuencia: "Según desgaste"
    }
];

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
        alert(
            `Gracias ${nombre}. Tu solicitud de cita fue recibida correctamente.`
        );
        formulario.reset();
    });
}

// INICIALIZACIÓN

function iniciarServicios() {
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