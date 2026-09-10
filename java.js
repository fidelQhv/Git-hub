// ============================================
// BASE DE DATOS DE VEHÍCULOS
// ============================================

const autos = [
    {
        id: 1,
        marca: "Toyota",
        modelo: "RAV4 2026",
        tipo: "SUV",
        precio: 38900,
        año: 2026,
        kilometraje: "0 km",
        motor: "2.5L Hybrid",
        transmision: "Automática",
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbve_ornMNxTk7NClqrY6g33VwgnJHvMyXAMqKXJkCdA&s=10",
        descripcion: "SUV moderna, eficiente y espaciosa. Ideal para ciudad y viajes familiares."
    },

    {
        id: 2,
        marca: "BMW",
        modelo: "Serie 3",
        tipo: "Sedán",
        precio: 52900,
        año: 2026,
        kilometraje: "0 km",
        motor: "2.0L Turbo",
        transmision: "Automática",
        imagen: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=900&q=80",
        descripcion: "Sedán premium con tecnología avanzada, excelente rendimiento y diseño deportivo."
    },

    {
        id: 3,
        marca: "Ford",
        modelo: "Ranger",
        tipo: "Pickup",
        precio: 45900,
        año: 2025,
        kilometraje: "8,500 km",
        motor: "3.0L Diesel",
        transmision: "Automática",
        imagen: "https://images.unsplash.com/photo-1551830820-330a71b99659?auto=format&fit=crop&w=900&q=80",
        descripcion: "Pickup robusta preparada para trabajo, aventura y conducción todoterreno."
    },

    {
        id: 4,
        marca: "Honda",
        modelo: "Civic",
        tipo: "Sedán",
        precio: 31900,
        año: 2026,
        kilometraje: "0 km",
        motor: "1.5L Turbo",
        transmision: "CVT",
        imagen: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=900&q=80",
        descripcion: "Sedán moderno con gran eficiencia de combustible y tecnología de seguridad."
    },

    {
        id: 5,
        marca: "Mercedes-Benz",
        modelo: "GLC 300",
        tipo: "SUV",
        precio: 68900,
        año: 2026,
        kilometraje: "0 km",
        motor: "2.0L Turbo",
        transmision: "Automática",
        imagen: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=900&q=80",
        descripcion: "SUV de lujo con interior premium, tecnología inteligente y gran confort."
    },

    {
        id: 6,
        marca: "Toyota",
        modelo: "Supra GR",
        tipo: "Deportivo",
        precio: 59900,
        año: 2025,
        kilometraje: "3,200 km",
        motor: "3.0L Turbo",
        transmision: "Automática",
        imagen: "https://images.unsplash.com/photo-1614200187524-dc4b892acf16?auto=format&fit=crop&w=900&q=80",
        descripcion: "Deportivo de alto rendimiento con diseño agresivo y excelente dinámica."
    }
];


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
                        $${auto.precio.toLocaleString()}
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
            $${auto.precio.toLocaleString()}
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

        const nombre =
            document.getElementById("nombre").value;

        mostrarToast(
            `Gracias ${nombre}. Tu solicitud fue enviada correctamente.`
        );

        this.reset();

        cerrarModal("modalCotizacion");
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
// INICIAR SISTEMA
// ============================================

mostrarAutos();
