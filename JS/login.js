// ==========================================
// LOGIN / REGISTRO - AutoMax
// ==========================================

const CLAVE_USUARIOS = "automax_usuarios";
const CLAVE_SESION = "automax_sesion";

// Las cuentas (con contraseña cifrada) viven en la tabla "usuarios" de MySQL.
// El servidor devuelve un token JWT que se guarda junto con los datos de la sesión.

function guardarSesion(datos) {
    localStorage.setItem(CLAVE_TOKEN, datos.token);
    localStorage.setItem(CLAVE_SESION, JSON.stringify({
        nombre: datos.usuario.nombre,
        correo: datos.usuario.correo,
        rol: datos.usuario.rol || "Cliente"
    }));
}

// TABS

function cambiarTab(tab) {
    const esLogin = tab === "login";

    document.getElementById("tabLogin").classList.toggle("active", esLogin);
    document.getElementById("tabRegistro").classList.toggle("active", !esLogin);

    document.getElementById("formLogin").classList.toggle("active", esLogin);
    document.getElementById("formRegistro").classList.toggle("active", !esLogin);
}

// HELPERS DE VALIDACIÓN

function mostrarError(inputId, errorId, mensaje) {
    document.getElementById(inputId).classList.add("input-error");
    document.getElementById(errorId).textContent = mensaje;
}

function limpiarError(inputId, errorId) {
    document.getElementById(inputId).classList.remove("input-error");
    document.getElementById(errorId).textContent = "";
}

function validarCorreo(correo) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);
}

function mostrarToast(mensaje) {
    const toast = document.getElementById("toast");
    toast.textContent = mensaje;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 2800);
}

// LOGIN

document.getElementById("formLogin").addEventListener("submit", async function (e) {
    e.preventDefault();

    limpiarError("loginCorreo", "errorLoginCorreo");
    limpiarError("loginPassword", "errorLoginPassword");

    const correo = document.getElementById("loginCorreo").value.trim();
    const password = document.getElementById("loginPassword").value;

    let valido = true;

    if (!validarCorreo(correo)) {
        mostrarError("loginCorreo", "errorLoginCorreo", "Ingresa un correo válido.");
        valido = false;
    }

    if (password.length === 0) {
        mostrarError("loginPassword", "errorLoginPassword", "Ingresa tu contraseña.");
        valido = false;
    }

    if (!valido) return;

    let datos;
    try {
        datos = await apiFetch("/auth/login", {
            method: "POST",
            body: JSON.stringify({ correo, password })
        });
    } catch (error) {
        mostrarError("loginPassword", "errorLoginPassword", error.message);
        return;
    }

    guardarSesion(datos);

    mostrarToast(`¡Bienvenido, ${datos.usuario.nombre}! Rol: ${datos.usuario.rol || "Cliente"}`);

    setTimeout(() => {
        window.location.href = "index.html";
    }, 1200);
});

// REGISTRO

document.getElementById("formRegistro").addEventListener("submit", async function (e) {
    e.preventDefault();

    limpiarError("regNombre", "errorRegNombre");
    limpiarError("regCorreo", "errorRegCorreo");
    limpiarError("regPassword", "errorRegPassword");
    limpiarError("regPassword2", "errorRegPassword2");
    document.getElementById("errorRegTerminos").textContent = "";

    const nombre = document.getElementById("regNombre").value.trim();
    const correo = document.getElementById("regCorreo").value.trim();
    const password = document.getElementById("regPassword").value;
    const password2 = document.getElementById("regPassword2").value;
    const terminos = document.getElementById("regTerminos").checked;

    let valido = true;

    if (nombre.length < 3) {
        mostrarError("regNombre", "errorRegNombre", "Ingresa tu nombre completo.");
        valido = false;
    }

    if (!validarCorreo(correo)) {
        mostrarError("regCorreo", "errorRegCorreo", "Ingresa un correo válido.");
        valido = false;
    }

    if (password.length < 6) {
        mostrarError("regPassword", "errorRegPassword", "Mínimo 6 caracteres.");
        valido = false;
    }

    if (password2 !== password || password2.length === 0) {
        mostrarError("regPassword2", "errorRegPassword2", "Las contraseñas no coinciden.");
        valido = false;
    }

    if (!terminos) {
        document.getElementById("errorRegTerminos").textContent = "Debes aceptar los términos y condiciones.";
        valido = false;
    }

    if (!valido) return;

    try {
        await apiFetch("/auth/registro", {
            method: "POST",
            body: JSON.stringify({ nombre, correo, password })
        });
    } catch (error) {
        mostrarError("regCorreo", "errorRegCorreo", error.message);
        return;
    }

    mostrarToast("Cuenta creada correctamente. Ya puedes iniciar sesión.");

    document.getElementById("formRegistro").reset();
    cambiarTab("login");
    document.getElementById("loginCorreo").value = correo;
});
