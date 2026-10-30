# Rueda Libre

Sitio web estático para conocer los servicios de Rueda Libre, un proyecto de alquiler de bicicletas y recorridos guiados en Medellín.

## Funcionalidades

- Página de inicio con información de servicios, promociones y ubicación.
- Catálogo de bicicletas urbanas, de montaña y eléctricas.
- Carruseles interactivos para explorar bicicletas y promociones.
- Páginas de reservas, tarifas y recorridos, y contacto.
- Diseño adaptable a dispositivos móviles y de escritorio.
- Controles accesibles y soporte para la preferencia de movimiento reducido.

> **Nota:** Este proyecto es una demostración de interfaz. Los formularios no envían ni guardan datos; para recibir reservas o mensajes hace falta conectar un servidor o un servicio de formularios.

## Tecnologías

- HTML5
- CSS3
- JavaScript
- Bootstrap 5.3.8, cargado desde jsDelivr

## Cómo ejecutar el proyecto

No necesitas instalar dependencias. Puedes abrir `index.html` en un navegador o iniciar un servidor local desde la carpeta del proyecto:

```bash
python3 -m http.server 8000
```

Después, visita [http://localhost:8000](http://localhost:8000). Bootstrap se carga desde un CDN, por lo que algunas funciones de estilo requieren conexión a Internet.

## Páginas

- `index.html`: inicio, servicios, promociones e información del proyecto.
- `paginas/reservas.html`: formulario de ejemplo para seleccionar bicicletas y una fecha.
- `paginas/tarifas.html`: precios de alquiler y recorridos guiados.
- `paginas/contactanos.html`: formulario de contacto de demostración.

## Estructura

```text
.
├── index.html
├── bootstrap-theme.css
├── carousel.css
├── carousel.js
├── style.css
├── img/
└── paginas/
    ├── contactanos.html
    ├── reservas.html
    └── tarifas.html
```
