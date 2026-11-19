const CLAVE_SESION_BLOG = "automax_sesion";

// Los artículos ahora se leen de MySQL mediante GET /api/posts
let posts = [];

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

function puedeEliminar(comentario, sesion) {
    return Boolean(sesion) &&
        (sesion.rol === "Administrador" || comentario.propio === true);
}

async function renderizarComentarios() {
    const contenedor = document.getElementById("seccionComentarios");
    if (!contenedor || postActualId === null) return;
    const idSolicitado = postActualId;
    const sesion = obtenerSesion();
    let comentarios = [];
    try {
        comentarios = await apiFetch(`/posts/${idSolicitado}/comentarios`);
    } catch (error) {
        mostrarToastBlog("No se pudieron cargar los comentarios.");
    }
    if (postActualId !== idSolicitado) return;
    contenedor.innerHTML = `
        <h4>Comentarios (${comentarios.length})</h4>
        <div class="blog-comment-list"></div>
        <div class="blog-comment-form"></div>
    `;
    const lista = contenedor.querySelector(".blog-comment-list");
    if (comentarios.length === 0) {
        lista.innerHTML = `<p class="blog-empty">Aún no hay comentarios. ¡Sé el primero!</p>`;
    }
    comentarios.forEach(comentario => {
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
            borrar.dataset.id = comentario.id;
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

async function publicarComentario(event) {
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
    try {
        await apiFetch(`/posts/${postActualId}/comentarios`, {
            method: "POST",
            body: JSON.stringify({ texto })
        });
    } catch (error) {
        mostrarToastBlog(error.status === 401
            ? "Tu sesión expiró. Inicia sesión nuevamente."
            : error.message);
        return;
    }
    await renderizarComentarios();
    mostrarToastBlog("Comentario publicado.");
}

async function eliminarComentario(id) {
    try {
        await apiFetch(`/comentarios/${id}`, { method: "DELETE" });
    } catch (error) {
        mostrarToastBlog(error.message);
        return;
    }
    renderizarComentarios();
}

async function iniciarBlog() {
    try {
        posts = await apiFetch("/posts");
    } catch (error) {
        mostrarToastBlog("No se pudieron cargar los artículos.");
    }
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
        if (borrar) eliminarComentario(Number(borrar.dataset.id));
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
