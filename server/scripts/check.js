// Revisa la sintaxis de todos los .js de src/ (funciona en Windows, Linux y macOS).
const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

function archivos(dir) {
    return fs.readdirSync(dir, { withFileTypes: true }).flatMap(e =>
        e.isDirectory() ? archivos(path.join(dir, e.name))
            : e.name.endsWith(".js") ? [path.join(dir, e.name)] : []
    );
}

let fallos = 0;
for (const archivo of archivos(path.join(__dirname, "..", "src"))) {
    const r = spawnSync(process.execPath, ["--check", archivo], { encoding: "utf8" });
    if (r.status !== 0) {
        fallos++;
        console.error(`FALLA: ${archivo}\n${r.stderr}`);
    }
}
console.log(fallos === 0 ? "Sintaxis correcta en todos los archivos." : `${fallos} archivo(s) con errores.`);
process.exit(fallos === 0 ? 0 : 1);
