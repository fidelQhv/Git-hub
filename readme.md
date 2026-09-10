🚗 AutoMax — Sistema Web de Concesionaria

Sistema web frontend para una concesionaria de vehículos, desarrollado con HTML, CSS y JavaScript puro.

El proyecto permite mostrar un catálogo de vehículos, realizar búsquedas y filtros, consultar información detallada de cada auto y enviar solicitudes de cotización.

 Características
 Página de inicio tipo concesionaria.
 Catálogo de vehículos.
 Buscador de vehículos.
 Filtro por marca.
 Filtro por tipo de vehículo.
 Filtro por precio máximo.
 Modal con información detallada del vehículo.
 Formulario de solicitud de cotización.
 Notificaciones de confirmación.
 Diseño responsive para celulares, tablets y computadoras.
 Interfaz moderna con estilo de concesionaria premium.
 No requiere frameworks ni backend.
 Tecnologías utilizadas
Tecnología	Uso
HTML5	Estructura de la página
CSS3	Diseño y responsive
JavaScript	Funcionalidad e interacción
Google Fonts	Tipografía
Unsplash	Imágenes de vehículos

 Estructura del proyecto
concesionaria/
│
├── index.html
├── style.css
├── script.js
└── README.md

index.html

Contiene la estructura principal de la aplicación:

Navbar
Página de inicio
Buscador
Catálogo
Sección "Nosotros"
Contacto
Footer
Modal de detalles
Modal de cotización
style.css

Contiene todos los estilos visuales:

Colores
Tipografías
Tarjetas de vehículos
Botones
Modales
Formularios
Animaciones
Diseño responsive
script.js

Contiene la lógica de la aplicación:

Base de datos temporal de vehículos
Renderizado del catálogo
Búsqueda
Filtros
Detalle de vehículos
Formulario de cotización
Modales
Notificaciones
 Instalación

No necesitas instalar dependencias.

1. Clonar el proyecto
git clone URL_DEL_REPOSITORIO

2. Entrar a la carpeta
cd concesionaria

3. Abrir el proyecto

Puedes abrir directamente:

index.html


en tu navegador.

También puedes utilizar Visual Studio Code con la extensión Live Server.

 Uso

Al ingresar al sistema encontrarás la página principal de AutoMax.

Desde el catálogo puedes:

Buscar un vehículo por nombre o marca.
Filtrar por marca.
Filtrar por tipo.
Filtrar por precio máximo.
Seleccionar "Ver más" para consultar los detalles.
Seleccionar "Solicitar cotización" para iniciar una solicitud.
 Vehículos incluidos

Actualmente el sistema utiliza datos de prueba almacenados directamente en script.js.

Ejemplo:

{
    id: 1,
    marca: "Toyota",
    modelo: "RAV4 2026",
    tipo: "SUV",
    precio: 38900,
    año: 2026,
    kilometraje: "0 km",
    motor: "2.5L Hybrid",
    transmision: "Automática"
}


Para agregar otro vehículo, puedes añadir un nuevo objeto dentro del arreglo autos.

 Estado del proyecto

Versión: 1.0.0

Estado: 🟢 Funcional — Frontend

Actualmente el proyecto funciona completamente del lado del cliente.

Incluido
 Página principal
 Catálogo
 Buscador
 Filtros
 Detalle de vehículos
 Cotizaciones
 Diseño responsive
 Modales
 Notificaciones
Pendiente para una versión empresarial
 Backend
 Base de datos
 Sistema de usuarios
 Login de administradores
 Panel administrativo
 CRUD de vehículos
 Gestión de clientes
 Gestión de ventas
 Gestión de cotizaciones
 Reportes
 Dashboard de estadísticas
 Control de inventario
 Autenticación y autorización
 Futuras mejoras

El proyecto puede evolucionar hasta convertirse en un sistema completo de gestión para una concesionaria.

Panel administrativo

Permitiría administrar:

Dashboard
│
├── Vehículos
│   ├── Registrar
│   ├── Editar
│   ├── Eliminar
│   └── Buscar
│
├── Clientes
│   ├── Registrar
│   ├── Editar
│   └── Historial
│
├── Ventas
│   ├── Registrar venta
│   ├── Consultar ventas
│   └── Detalle de venta
│
└── Cotizaciones
    ├── Pendientes
    ├── Atendidas
    └── Historial

 Backend recomendado

Para convertir el proyecto en un sistema real se puede implementar un backend utilizando, por ejemplo:

Frontend
HTML + CSS + JavaScript
        │
        ▼
      API
        │
        ▼
Backend
Node.js / Express
        │
        ▼
Base de datos
MySQL / PostgreSQL


Esto permitiría guardar permanentemente:

Vehículos
Clientes
Usuarios
Cotizaciones
Ventas
Pagos
Inventario
 Objetivo del proyecto

El objetivo de AutoMax es proporcionar una interfaz moderna y sencilla para que una concesionaria pueda presentar sus vehículos y facilitar el proceso inicial de compra mediante solicitudes de cotización.

 Autor

FidelitoMalo

Sistema web de concesionaria desarrollado con tecnologías frontend.

 Licencia

Este proyecto puede utilizarse como base educativa y puede ser adaptado para proyectos personales o comerciales.


