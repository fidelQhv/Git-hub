// ============================================
// SERVIDOR AutoMax / FydelMT
// Sirve el frontend estático y expone la API REST conectada a MySQL.
// ============================================
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", "..", ".env") });

const express = require("express");
const { pool, esperarBaseDeDatos } = require("./db");
const { ErrorHttp } = require("./utils/errores");

const app = express();
const RAIZ = path.join(__dirname, "..", ".."); // carpeta que contiene html/, css/, JS/ e img/

app.disable("x-powered-by");
app.use(express.json({ limit: "100kb" }));

// ---------- API ----------
app.get("/api/health", async (req, res) => {
    try {
        await pool.query("SELECT 1");
        res.json({ estado: "ok", baseDeDatos: "conectada" });
    } catch (error) {
        res.status(503).json({ estado: "error", baseDeDatos: "sin conexión" });
    }
});

app.use("/api/auth", require("./routes/auth"));
app.use("/api", require("./routes/catalogo"));
app.use("/api", require("./routes/blog"));
app.use("/api", require("./routes/solicitudes"));

app.use("/api", (req, res) => res.status(404).json({ error: "Ruta no encontrada." }));

// ---------- Frontend estático ----------
["html", "css", "JS", "img"].forEach(carpeta => {
    app.use(`/${carpeta}`, express.static(path.join(RAIZ, carpeta)));
});
app.get("/", (req, res) => res.redirect("/html/index.html"));

// ---------- Errores ----------
app.use((error, req, res, next) => {
    if (error instanceof ErrorHttp) {
        return res.status(error.estado).json({ error: error.message });
    }
    console.error("[error]", error);
    res.status(500).json({ error: "Error interno del servidor." });
});

const PUERTO = Number(process.env.PORT || 3000);

esperarBaseDeDatos()
    .then(() => {
        if (process.env.NODE_ENV === "production" && !process.env.JWT_SECRET) {
            console.warn("[seguridad] JWT_SECRET no está definido: define uno propio en producción.");
        }
        app.listen(PUERTO, () => console.log(`[app] AutoMax escuchando en http://localhost:${PUERTO}`));
    })
    .catch(error => {
        console.error(error.message);
        process.exit(1);
    });
