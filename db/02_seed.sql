-- ============================================================
-- AutoMax / FydelMT  -  Datos de prueba (seeders)
-- Contraseñas de las cuentas demo (guardadas con bcrypt):
-- 1) admind@fydelmt.com ........ admind
-- 2) admind.ventas@fydelmt.com . admind456
-- 3) trabajador@fydelmt.com .... Trabajo123
-- 4) cliente@fydelmt.com ....... Cliente123
-- Solo para pruebas: cámbialas antes de un despliegue real.
-- ============================================================

SET NAMES utf8mb4;

INSERT INTO usuarios (nombre, correo, password_hash, rol) VALUES
    ('Administrador Principal', 'admind@fydelmt.com', '$2a$10$uolWbmcH/LGiGWMyjRhqZeXyN6Gin47VXE3y3FA1h.f7qltxO035G', 'Administrador'),
    ('Administrador Ventas', 'admind.ventas@fydelmt.com', '$2a$10$lqTVXbmKk1EEpOMV41GQXeQYeXb9DfEvThTVmx4I/dZJjt12.aap2', 'Administrador'),
    ('Trabajador FydelMT', 'trabajador@fydelmt.com', '$2a$10$j2PU41slfzX2VfwCLiQZR.3jk9go7wx1LgT4cCLF/gtRm8SnltPji', 'Trabajador'),
    ('Cliente Demo', 'cliente@fydelmt.com', '$2a$10$f7nKWFIE.628ySR37A7uyOdVePeoM.0hBxGg3D.QmDx6q4jUJpshO', 'Cliente');

INSERT INTO vehiculos (id, marca, modelo, tipo, precio, anio, kilometraje, motor, transmision, imagen, descripcion) VALUES
    (1, 'Toyota', 'RAV4 2026', 'SUV', 38900, 2026, '0 km', '2.5L Hybrid', 'Automática', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbve_ornMNxTk7NClqrY6g33VwgnJHvMyXAMqKXJkCdA&s=10', 'SUV moderna, eficiente y espaciosa. Ideal para ciudad y viajes familiares.'),
    (2, 'BMW', 'Serie 3', 'Sedán', 52900, 2026, '0 km', '2.0L Turbo', 'Automática', 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=900&q=80', 'Sedán premium con tecnología avanzada, excelente rendimiento y diseño deportivo.'),
    (3, 'Ford', 'Ranger', 'Pickup', 45900, 2025, '8,500 km', '3.0L Diesel', 'Automática', 'https://images.unsplash.com/photo-1551830820-330a71b99659?auto=format&fit=crop&w=900&q=80', 'Pickup robusta preparada para trabajo, aventura y conducción todoterreno.'),
    (4, 'Honda', 'Civic', 'Sedán', 31900, 2026, '0 km', '1.5L Turbo', 'CVT', 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=900&q=80', 'Sedán moderno con gran eficiencia de combustible y tecnología de seguridad.'),
    (5, 'Mercedes-Benz', 'GLC 300', 'SUV', 68900, 2026, '0 km', '2.0L Turbo', 'Automática', 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=900&q=80', 'SUV de lujo con interior premium, tecnología inteligente y gran confort.'),
    (6, 'Toyota', 'Supra GR', 'Deportivo', 59900, 2025, '3,200 km', '3.0L Turbo', 'Automática', 'https://images.unsplash.com/photo-1614200187524-dc4b892acf16?auto=format&fit=crop&w=900&q=80', 'Deportivo de alto rendimiento con diseño agresivo y excelente dinámica.');

INSERT INTO servicios (id, imagen, nombre, descripcion, precio, frecuencia) VALUES
    (1, '../img/aceite.jpg', 'Cambio de aceite y filtros', 'Cambio de aceite de motor y filtro, recomendado cada 5,000 km.', 45, 'Cada 5,000 km'),
    (2, '../img/diagnostico.jpg', 'Diagnóstico computarizado', 'Escaneo electrónico completo para detectar fallas del motor y sensores.', 35, 'Bajo demanda'),
    (3, '../img/alineacion.jpg', 'Alineación y balanceo', 'Mejora la estabilidad del vehículo y prolonga la vida útil de las llantas.', 40, 'Cada 10,000 km'),
    (4, '../img/frenos.jpg', 'Revisión y cambio de frenos', 'Revisión de pastillas, discos y líquido de frenos.', 80, 'Cada 15,000 km'),
    (5, '../img/mantenimiento.jpg', 'Mantenimiento preventivo', 'Revisión general del vehículo según su kilometraje.', 120, 'Según kilometraje'),
    (6, '../img/aire.jpg', 'Aire acondicionado', 'Carga de gas refrigerante y revisión del sistema de A/C.', 60, '1 vez al año'),
    (7, '../img/bateria.jpg', 'Cambio de batería', 'Diagnóstico del sistema eléctrico y reemplazo de batería.', 90, 'Cada 2-3 años'),
    (8, '../img/llantas.jpg', 'Cambio de llantas', 'Montaje, balanceo y desecho de llantas usadas incluido.', 150, 'Según desgaste');

INSERT INTO posts (id, titulo, categoria, autor, fecha, imagen, resumen, contenido) VALUES
    (1, '5 señales de que tu auto necesita mantenimiento', 'Mantenimiento', 'Equipo Técnico FydelMT', '2026-09-12', '../img/mantenimiento.jpg', 'Ruidos, vibraciones o luces en el tablero: aprende a detectar a tiempo lo que tu vehículo intenta decirte.', 'Un vehículo casi siempre avisa antes de fallar. Prestar atención a esos avisos permite corregir el problema cuando todavía es pequeño y económico.

Las señales más comunes son las luces encendidas en el tablero, los ruidos metálicos al frenar, las vibraciones en el volante, el aumento del consumo de combustible y los olores extraños dentro o fuera de la cabina.

Si notas cualquiera de ellas, lo recomendable es realizar un diagnóstico completo en lugar de esperar a que la falla empeore. Revisar el manual del fabricante y respetar los intervalos de mantenimiento también ayuda a evitar sorpresas.'),
    (2, 'Cómo elegir entre un auto nuevo y uno seminuevo', 'Consejos', 'Asesoría Comercial', '2026-09-28', 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=900&q=80', 'Presupuesto, garantía y depreciación: los factores que debes comparar antes de decidir.', 'Elegir entre un auto nuevo y uno seminuevo depende de tu presupuesto, del uso que le darás y de cuánto valoras la garantía de fábrica.

Un vehículo nuevo suele ofrecer garantía completa y la tecnología más reciente, pero pierde valor con mayor rapidez durante los primeros años. Uno seminuevo normalmente cuesta menos, aunque conviene revisar su historial de mantenimiento y su kilometraje.

Antes de decidir, compara el costo total de propiedad: precio de compra, seguro, combustible y mantenimiento. Y si tienes dudas, solicita una cotización con uno de nuestros asesores.'),
    (3, 'Guía rápida para cambiar el aceite a tiempo', 'Mantenimiento', 'Equipo Técnico FydelMT', '2026-10-03', '../img/aceite.jpg', 'Qué hace el aceite por tu motor, cada cuánto cambiarlo y qué tipo elegir.', 'El aceite lubrica, enfría y limpia las piezas internas del motor. Con el uso se degrada y pierde esas propiedades, por eso es importante cambiarlo junto con el filtro.

El intervalo exacto depende del tipo de aceite, del motor y de las condiciones de manejo; el manual de tu vehículo indica el valor recomendado. En ciudad, con tráfico pesado y trayectos cortos, el desgaste suele ser mayor.

Usar el aceite con la viscosidad que especifica el fabricante es más importante que elegir la marca más cara.'),
    (4, 'Financiamiento vehicular: qué revisar antes de firmar', 'Financiamiento', 'Asesoría Comercial', '2026-10-08', 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=900&q=80', 'Cuota inicial, tasa y costos adicionales: las preguntas clave antes de comprometerte.', 'Un financiamiento no se evalúa solo por la cuota mensual. Pregunta por la tasa de interés, el plazo, los seguros obligatorios y cualquier comisión adicional.

Pide siempre el cronograma de pagos completo y verifica cuánto pagarás en total al terminar el crédito. Si tus ingresos están en soles y el vehículo está en dólares, considera también el efecto del tipo de cambio.

Una cuota inicial mayor suele reducir los intereses totales. Compara al menos dos o tres propuestas antes de decidir.'),
    (5, 'Frenos y llantas: la seguridad empieza por ahí', 'Mantenimiento', 'Equipo Técnico FydelMT', '2026-10-14', '../img/frenos.jpg', 'Cuándo revisar pastillas, discos y neumáticos para viajar con tranquilidad.', 'Frenos y llantas son los únicos puntos de contacto entre tu vehículo y la pista, por lo que su estado influye directamente en la seguridad.

Revisa periódicamente el desgaste de las pastillas, el nivel del líquido de frenos y la profundidad del dibujo de las llantas. Una presión de inflado correcta también mejora el consumo y la duración del neumático.

La alineación y el balanceo evitan desgastes irregulares y vibraciones. Si notas que el auto se va hacia un lado, es momento de revisarlo.'),
    (6, 'Novedades: nuevos modelos disponibles en el catálogo', 'Novedades', 'Equipo FydelMT', '2026-10-18', 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=900&q=80', 'Revisa los vehículos disponibles y filtra por marca, tipo y precio máximo.', 'Nuestro catálogo se actualiza con nuevas unidades de distintas marcas y tipos de carrocería: SUV, sedán, pickup y deportivos.

Puedes filtrar por marca, tipo y precio máximo, y ver cada precio en dólares con su equivalente en soles.

Si te interesa alguno, solicita una cotización desde la ficha del vehículo y un asesor se pondrá en contacto contigo.');

INSERT INTO comentarios (post_id, usuario_id, texto) VALUES
    (1, 4, 'Muy útil, justo mi auto tenía vibraciones en el volante.'),
    (3, 3, 'Recuerden respetar la viscosidad que indica el manual del fabricante.');
