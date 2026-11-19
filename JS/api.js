// ============================================
// CLIENTE DE LA API (AutoMax / FydelMT)
// Todas las páginas hablan con el backend Node/Express, que usa MySQL.
// ============================================

const API_BASE = "/api";
const CLAVE_TOKEN = "automax_token";

async function apiFetch(ruta, opciones = {}) {
    const headers = { "Content-Type": "application/json", ...(opciones.headers || {}) };
    const token = localStorage.getItem(CLAVE_TOKEN);
    if (token) headers.Authorization = `Bearer ${token}`;

    const respuesta = await fetch(API_BASE + ruta, { ...opciones, headers });

    let datos = null;
    try {
        datos = await respuesta.json();
    } catch (error) {
        datos = null;
    }

    if (!respuesta.ok) {
        const falla = new Error((datos && datos.error) || "No se pudo completar la solicitud.");
        falla.status = respuesta.status;
        throw falla;
    }
    return datos;
}
