-- ============================================================
-- AutoMax / FydelMT - Esquema de base de datos (MySQL 8)
-- Se ejecuta automáticamente la primera vez que arranca el contenedor
-- de MySQL (carpeta /docker-entrypoint-initdb.d), ya dentro de la base
-- indicada en MYSQL_DATABASE.
-- Uso manual: mysql -u root -p automax < db/01_schema.sql
-- ============================================================

SET NAMES utf8mb4;

CREATE TABLE IF NOT EXISTS usuarios (
    id            INT UNSIGNED  NOT NULL AUTO_INCREMENT,
    nombre        VARCHAR(100)  NOT NULL,
    correo        VARCHAR(120)  NOT NULL,
    password_hash VARCHAR(100)  NOT NULL,
    rol           ENUM('Administrador','Trabajador','Cliente') NOT NULL DEFAULT 'Cliente',
    creado_en     TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY uq_usuarios_correo (correo)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS vehiculos (
    id           INT UNSIGNED  NOT NULL AUTO_INCREMENT,
    marca        VARCHAR(50)   NOT NULL,
    modelo       VARCHAR(80)   NOT NULL,
    tipo         VARCHAR(30)   NOT NULL,
    precio       DECIMAL(10,2) NOT NULL,
    anio         SMALLINT      NOT NULL,
    kilometraje  VARCHAR(20)   NOT NULL,
    motor        VARCHAR(50)   NOT NULL,
    transmision  VARCHAR(30)   NOT NULL,
    imagen       VARCHAR(500)  NOT NULL,
    descripcion  TEXT          NOT NULL,
    disponible   TINYINT(1)    NOT NULL DEFAULT 1,
    PRIMARY KEY (id),
    KEY idx_vehiculos_marca (marca),
    KEY idx_vehiculos_precio (precio)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS servicios (
    id           INT UNSIGNED  NOT NULL AUTO_INCREMENT,
    imagen       VARCHAR(500)  NOT NULL,
    nombre       VARCHAR(100)  NOT NULL,
    descripcion  TEXT          NOT NULL,
    precio       DECIMAL(10,2) NOT NULL,
    frecuencia   VARCHAR(50)   NOT NULL,
    activo       TINYINT(1)    NOT NULL DEFAULT 1,
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS posts (
    id         INT UNSIGNED NOT NULL AUTO_INCREMENT,
    titulo     VARCHAR(200) NOT NULL,
    categoria  VARCHAR(50)  NOT NULL,
    autor      VARCHAR(100) NOT NULL,
    fecha      DATE         NOT NULL,
    imagen     VARCHAR(500) NOT NULL,
    resumen    VARCHAR(500) NOT NULL,
    contenido  TEXT         NOT NULL,
    PRIMARY KEY (id),
    KEY idx_posts_categoria (categoria)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS comentarios (
    id          INT UNSIGNED NOT NULL AUTO_INCREMENT,
    post_id     INT UNSIGNED NOT NULL,
    usuario_id  INT UNSIGNED NOT NULL,
    texto       VARCHAR(500) NOT NULL,
    creado_en   TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    KEY idx_comentarios_post (post_id),
    CONSTRAINT fk_comentarios_post    FOREIGN KEY (post_id)    REFERENCES posts (id)    ON DELETE CASCADE,
    CONSTRAINT fk_comentarios_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS cotizaciones (
    id           INT UNSIGNED NOT NULL AUTO_INCREMENT,
    nombre       VARCHAR(100) NOT NULL,
    telefono     VARCHAR(30)  NOT NULL,
    correo       VARCHAR(120) NOT NULL,
    vehiculo_id  INT UNSIGNED NULL,
    mensaje      TEXT         NULL,
    creado_en    TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    CONSTRAINT fk_cotizaciones_vehiculo FOREIGN KEY (vehiculo_id) REFERENCES vehiculos (id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS citas (
    id           INT UNSIGNED NOT NULL AUTO_INCREMENT,
    nombre       VARCHAR(100) NOT NULL,
    telefono     VARCHAR(30)  NOT NULL,
    correo       VARCHAR(120) NOT NULL,
    servicio_id  INT UNSIGNED NULL,
    mensaje      TEXT         NULL,
    creado_en    TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    CONSTRAINT fk_citas_servicio FOREIGN KEY (servicio_id) REFERENCES servicios (id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
