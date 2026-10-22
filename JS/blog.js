const CLAVE_COMENTARIOS = "automax_comentarios";
const CLAVE_SESION_BLOG = "automax_sesion";

const posts = [
    {
        id: 1,
        titulo: "5 señales de que tu auto necesita mantenimiento",
        categoria: "Mantenimiento",
        autor: "Equipo Técnico FydelMT",
        fecha: "2026-09-12",
        imagen: "../img/mantenimiento.jpg",
        resumen: "Ruidos, vibraciones o luces en el tablero: aprende a detectar a tiempo lo que tu vehículo intenta decirte.",
        contenido: [
            "Un vehículo casi siempre avisa antes de fallar. Prestar atención a esos avisos permite corregir el problema cuando todavía es pequeño y económico.",
            "Las señales más comunes son las luces encendidas en el tablero, los ruidos metálicos al frenar, las vibraciones en el volante, el aumento del consumo de combustible y los olores extraños dentro o fuera de la cabina.",
            "Si notas cualquiera de ellas, lo recomendable es realizar un diagnóstico completo en lugar de esperar a que la falla empeore. Revisar el manual del fabricante y respetar los intervalos de mantenimiento también ayuda a evitar sorpresas."
        ]
    },
    {
        id: 2,
        titulo: "Cómo elegir entre un auto nuevo y uno seminuevo",
        categoria: "Consejos",
        autor: "Asesoría Comercial",
        fecha: "2026-09-28",
        imagen: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=900&q=80",
        resumen: "Presupuesto, garantía y depreciación: los factores que debes comparar antes de decidir.",
        contenido: [
            "Elegir entre un auto nuevo y uno seminuevo depende de tu presupuesto, del uso que le darás y de cuánto valoras la garantía de fábrica.",
            "Un vehículo nuevo suele ofrecer garantía completa y la tecnología más reciente, pero pierde valor con mayor rapidez durante los primeros años. Uno seminuevo normalmente cuesta menos, aunque conviene revisar su historial de mantenimiento y su kilometraje.",
            "Antes de decidir, compara el costo total de propiedad: precio de compra, seguro, combustible y mantenimiento. Y si tienes dudas, solicita una cotización con uno de nuestros asesores."
        ]
    },
    {
        id: 3,
        titulo: "Guía rápida para cambiar el aceite a tiempo",
        categoria: "Mantenimiento",
        autor: "Equipo Técnico FydelMT",
        fecha: "2026-10-03",
        imagen: "../img/aceite.jpg",
        resumen: "Qué hace el aceite por tu motor, cada cuánto cambiarlo y qué tipo elegir.",
        contenido: [
            "El aceite lubrica, enfría y limpia las piezas internas del motor. Con el uso se degrada y pierde esas propiedades, por eso es importante cambiarlo junto con el filtro.",
            "El intervalo exacto depende del tipo de aceite, del motor y de las condiciones de manejo; el manual de tu vehículo indica el valor recomendado. En ciudad, con tráfico pesado y trayectos cortos, el desgaste suele ser mayor.",
            "Usar el aceite con la viscosidad que especifica el fabricante es más importante que elegir la marca más cara."
        ]
    },
    {
        id: 4,
        titulo: "Financiamiento vehicular: qué revisar antes de firmar",
        categoria: "Financiamiento",
        autor: "Asesoría Comercial",
        fecha: "2026-10-08",
        imagen: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=900&q=80",
        resumen: "Cuota inicial, tasa y costos adicionales: las preguntas clave antes de comprometerte.",
        contenido: [
            "Un financiamiento no se evalúa solo por la cuota mensual. Pregunta por la tasa de interés, el plazo, los seguros obligatorios y cualquier comisión adicional.",
            "Pide siempre el cronograma de pagos completo y verifica cuánto pagarás en total al terminar el crédito. Si tus ingresos están en soles y el vehículo está en dólares, considera también el efecto del tipo de cambio.",
            "Una cuota inicial mayor suele reducir los intereses totales. Compara al menos dos o tres propuestas antes de decidir."
        ]
    },
    {
        id: 5,
        titulo: "Frenos y llantas: la seguridad empieza por ahí",
        categoria: "Mantenimiento",
        autor: "Equipo Técnico FydelMT",
        fecha: "2026-10-14",
        imagen: "../img/frenos.jpg",
        resumen: "Cuándo revisar pastillas, discos y neumáticos para viajar con tranquilidad.",
        contenido: [
            "Frenos y llantas son los únicos puntos de contacto entre tu vehículo y la pista, por lo que su estado influye directamente en la seguridad.",
            "Revisa periódicamente el desgaste de las pastillas, el nivel del líquido de frenos y la profundidad del dibujo de las llantas. Una presión de inflado correcta también mejora el consumo y la duración del neumático.",
            "La alineación y el balanceo evitan desgastes irregulares y vibraciones. Si notas que el auto se va hacia un lado, es momento de revisarlo."
        ]
    },
    {
        id: 6,
        titulo: "Novedades: nuevos modelos disponibles en el catálogo",
        categoria: "Novedades",
        autor: "Equipo FydelMT",
        fecha: "2026-10-18",
        imagen: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=900&q=80",
        resumen: "Revisa los vehículos disponibles y filtra por marca, tipo y precio máximo.",
        contenido: [
            "Nuestro catálogo se actualiza con nuevas unidades de distintas marcas y tipos de carrocería: SUV, sedán, pickup y deportivos.",
            "Puedes filtrar por marca, tipo y precio máximo, y ver cada precio en dólares con su equivalente en soles.",
            "Si te interesa alguno, solicita una cotización desde la ficha del vehículo y un asesor se pondrá en contacto contigo."
        ]
    }
];

let postActualId = null;

function actualizarHash(hash) {
    try {
        history.replaceState(null, "", hash || window.location.pathname);
    } catch (error) {
    }
}

function calcularTiempoLectura(post) {
    const palabras = post.contenido.join(" ").split(/\s+/).length;
    return Math.max(1, Math.ceil(palabras / 200));
}

function formatearFecha(iso) {
    return new Date(`${iso}T00:00:00`).toLocaleDateString("es-PE", {
        day: "numeric",
        month: "long",
        year: "numeric"
    });
}

function escaparHTML(texto) {
    const div = document.createElement("div");
    div.textContent = texto;
    return div.innerHTML;
}

function obtenerSesion() {
    try {
        return JSON.parse(localStorage.getItem(CLAVE_SESION_BLOG));
    } catch (error) {
        return null;
    }
}

function mostrarToastBlog(mensaje) {
    const toast = document.getElementById("toast");
    toast.textContent = mensaje;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 3000);
}

function mostrarPosts(lista = posts) {
    const grid = document.getElementById("blogGrid");
    const contador = document.getElementById("contadorPosts");
    const sinResultados = document.getElementById("sinPosts");
    grid.innerHTML = "";
    contador.textContent =
        `${lista.length} ${lista.length === 1 ? "artículo" : "artículos"}`;
    sinResultados.style.display = lista.length === 0 ? "block" : "none";
    lista.forEach(post => {
        const card = document.createElement("article");
        card.className = "vehicle-card blog-card";
        card.innerHTML = `
            <div class="vehicle-image">
                <img src="${post.imagen}" alt="${escaparHTML(post.titulo)}" loading="lazy">
                <span class="vehicle-status">${post.categoria.toUpperCase()}</span>
            </div>
            <div class="vehicle-info">
                <span class="blog-meta">
                    ${formatearFecha(post.fecha)} · ${calcularTiempoLectura(post)} min de lectura
                </span>
                <h3 class="vehicle-name">${post.titulo}</h3>
                <p class="blog-excerpt">${post.resumen}</p>
                <div class="vehicle-bottom">
                    <span class="blog-author">${post.autor}</span>
                    <button class="btn-small" type="button" data-post-id="${post.id}">
                        Leer más
                    </button>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

function filtrarPosts() {
    const texto = document.getElementById("buscarPost").value.trim().toLowerCase();
    const categoria = document.getElementById("categoriaPost").value;
    const resultados = posts.filter(post => {
        const coincideTexto =
            `${post.titulo} ${post.resumen} ${post.categoria}`
                .toLowerCase()
                .includes(texto);
        const coincideCategoria =
            categoria === "todas" || post.categoria === categoria;
        return coincideTexto && coincideCategoria;
    });
    mostrarPosts(resultados);
}

function cargarCategorias() {
    const select = document.getElementById("categoriaPost");
    [...new Set(posts.map(post => post.categoria))].forEach(categoria => {
        const option = document.createElement("option");
        option.value = categoria;
        option.textContent = categoria;
        select.appendChild(option);
    });
}

function verPost(id) {
    const post = posts.find(p => p.id === id);
    if (!post) return;
    postActualId = id;
    const relacionados = posts
        .filter(p => p.categoria === post.categoria && p.id !== post.id)
        .slice(0, 2);
    document.getElementById("detallePost").innerHTML = `
        <img class="detail-image" src="${post.imagen}" alt="${escaparHTML(post.titulo)}">
        <span class="section-tag">${post.categoria}</span>
        <h2 class="detail-title">${post.titulo}</h2>
        <p class="blog-meta">
            ${post.autor} · ${formatearFecha(post.fecha)} · ${calcularTiempoLectura(post)} min de lectura
        </p>
        ${post.contenido.map(p => `<p class="detail-description">${p}</p>`).join("")}
        ${relacionados.length ? `
            <div class="blog-related">
                <h4>Artículos relacionados</h4>
                ${relacionados.map(r => `
                    <button type="button" class="blog-related-link" data-post-id="${r.id}">
                        ${r.titulo}
                    </button>`).join("")}
            </div>` : ""}
        <section class="blog-comments" id="seccionComentarios"></section>
    `;
    renderizarComentarios();
    abrirModal("modalPost");
    document.querySelector("#modalPost .modal-content").scrollTop = 0;
    actualizarHash(`#post-${id}`);
}

function cerrarPost() {
    cerrarModal("modalPost");
    postActualId = null;
    actualizarHash();
}

function obtenerComentarios(postId) {
    try {
        const todos = JSON.parse(localStorage.getItem(CLAVE_COMENTARIOS)) || {};
        return todos[postId] || [];
    } catch (error) {
        return [];
    }
}

function guardarComentarios(postId, comentarios) {
    let todos = {};
    try {
        todos = JSON.parse(localStorage.getItem(CLAVE_COMENTARIOS)) || {};
    } catch (error) {
        todos = {};
    }
    todos[postId] = comentarios;
    localStorage.setItem(CLAVE_COMENTARIOS, JSON.stringify(todos));
}

function puedeEliminar(comentario, sesion) {
    return Boolean(sesion) &&
        (sesion.rol === "Administrador" || sesion.correo === comentario.correo);
}

function renderizarComentarios() {
    const contenedor = document.getElementById("seccionComentarios");
    if (!contenedor || postActualId === null) return;
    const sesion = obtenerSesion();
    const comentarios = obtenerComentarios(postActualId);
    contenedor.innerHTML = `
        <h4>Comentarios (${comentarios.length})</h4>
        <div class="blog-comment-list"></div>
        <div class="blog-comment-form"></div>
    `;
    const lista = contenedor.querySelector(".blog-comment-list");
    if (comentarios.length === 0) {
        lista.innerHTML = `<p class="blog-empty">Aún no hay comentarios. ¡Sé el primero!</p>`;
    }
    comentarios.forEach((comentario, indice) => {
        const item = document.createElement("div");
        item.className = "blog-comment";
        const cabecera = document.createElement("div");
        cabecera.className = "blog-comment-head";
        const autor = document.createElement("strong");
        autor.textContent = comentario.nombre;
        const fecha = document.createElement("span");
        fecha.textContent =
            `${comentario.rol} · ${new Date(comentario.fecha).toLocaleDateString("es-PE")}`;
        cabecera.append(autor, fecha);
        if (puedeEliminar(comentario, sesion)) {
            const borrar = document.createElement("button");
            borrar.type = "button";
            borrar.className = "blog-comment-delete";
            borrar.dataset.indice = indice;
            borrar.textContent = "Eliminar";
            cabecera.append(borrar);
        }
        const texto = document.createElement("p");
        texto.textContent = comentario.texto;
        item.append(cabecera, texto);
        lista.appendChild(item);
    });
    const zonaForm = contenedor.querySelector(".blog-comment-form");
    if (!sesion) {
        zonaForm.innerHTML = `
            <p class="blog-login-note">
                Para comentar necesitas
                <a href="login.html">iniciar sesión</a>.
            </p>`;
        return;
    }
    zonaForm.innerHTML = `
        <form id="formComentario">
            <label for="textoComentario">Comentar como ${escaparHTML(sesion.nombre)}</label>
            <textarea id="textoComentario" rows="3" maxlength="500"
                placeholder="Escribe tu comentario..." required></textarea>
            <button class="btn btn-primary full" type="submit">Publicar comentario</button>
        </form>`;

    document.getElementById("formComentario")
        .addEventListener("submit", publicarComentario);
}

function publicarComentario(event) {
    event.preventDefault();
    const sesion = obtenerSesion();
    if (!sesion) {
        renderizarComentarios();
        return;
    }
    const campo = document.getElementById("textoComentario");
    const texto = campo.value.trim();
    if (texto.length < 3) {
        mostrarToastBlog("Escribe un comentario de al menos 3 caracteres.");
        return;
    }
    const comentarios = obtenerComentarios(postActualId);
    comentarios.push({
        nombre: sesion.nombre,
        correo: sesion.correo,
        rol: sesion.rol || "Cliente",
        texto,
        fecha: new Date().toISOString()
    });
    guardarComentarios(postActualId, comentarios);
    renderizarComentarios();
    mostrarToastBlog("Comentario publicado.");
}

function eliminarComentario(indice) {
    const sesion = obtenerSesion();
    const comentarios = obtenerComentarios(postActualId);
    const comentario = comentarios[indice];
    if (!comentario || !puedeEliminar(comentario, sesion)) return;
    comentarios.splice(indice, 1);
    guardarComentarios(postActualId, comentarios);
    renderizarComentarios();
}

function iniciarBlog() {
    cargarCategorias();
    ["buscarPost", "categoriaPost"].forEach(id => {
        const campo = document.getElementById(id);
        campo.addEventListener("input", filtrarPosts);
        campo.addEventListener("change", filtrarPosts);
    });
    document.getElementById("blogGrid").addEventListener("click", event => {
        const boton = event.target.closest("[data-post-id]");
        if (boton) verPost(Number(boton.dataset.postId));
    });
    document.getElementById("detallePost").addEventListener("click", event => {
        const relacionado = event.target.closest(".blog-related-link");
        if (relacionado) {
            verPost(Number(relacionado.dataset.postId));
            return;
        }
        const borrar = event.target.closest(".blog-comment-delete");
        if (borrar) eliminarComentario(Number(borrar.dataset.indice));
    });
    document.getElementById("modalPost").addEventListener("click", event => {
        if (event.target.id === "modalPost") {
            postActualId = null;
            actualizarHash();
        }
    });
    document.addEventListener("keydown", event => {
        if (event.key === "Escape" && postActualId !== null) {
            postActualId = null;
            actualizarHash();
        }
    });
    filtrarPosts();
    const coincidencia = window.location.hash.match(/^#post-(\d+)$/);
    if (coincidencia) verPost(Number(coincidencia[1]));
}

iniciarBlog();
