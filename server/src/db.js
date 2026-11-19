// ============================================
// CONEXIÓN A MYSQL (pool de conexiones)
// ============================================
const mysql = require("mysql2/promise");

// Soporta variables sueltas (DB_*) o una URL completa (DATABASE_URL / MYSQL_URL, típico en Railway).
function configuracion() {
    const base = {
        waitForConnections: true,
        connectionLimit: Number(process.env.DB_POOL_SIZE || 10),
        charset: "utf8mb4",
        dateStrings: true // las fechas llegan como "YYYY-MM-DD" y no como objetos Date
    };

    const url = process.env.DATABASE_URL || process.env.MYSQL_URL;
    if (url) return { ...base, uri: url };

    return {
        ...base,
        host: process.env.DB_HOST || "localhost",
        port: Number(process.env.DB_PORT || 3306),
        user: process.env.DB_USER || "automax",
        password: process.env.DB_PASSWORD || "",
        database: process.env.DB_NAME || "automax"
    };
}

const pool = mysql.createPool(configuracion());

// Cada conexión trabaja en UTC; el navegador convierte la fecha a la hora local de quien la ve.
pool.pool.on("connection", conexion => conexion.query("SET time_zone = '+00:00'"));

// Espera a que MySQL acepte conexiones (útil al levantar con docker compose).
async function esperarBaseDeDatos(intentos = 30, pausaMs = 2000) {
    for (let i = 1; i <= intentos; i++) {
        try {
            await pool.query("SELECT 1");
            console.log("[db] Conexión a MySQL establecida.");
            return;
        } catch (error) {
            console.log(`[db] MySQL no disponible (intento ${i}/${intentos}): ${error.code || error.message}`);
            await new Promise(resolve => setTimeout(resolve, pausaMs));
        }
    }
    throw new Error("No se pudo conectar a MySQL. Revisa las variables DB_* o DATABASE_URL.");
}

module.exports = { pool, esperarBaseDeDatos };
