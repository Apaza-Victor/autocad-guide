# AutoCAD Guía Completa

Guía interactiva de aprendizaje de AutoCAD, de cero a experto. Sitio web 100% estático con recursos didácticos: comandos, atajos de teclado, dimensionado, ejercicios prácticos, glosario y módulos por nivel, complementados con visualizaciones 3D interactivas en el navegador.

## ✨ Características

- **Módulos de aprendizaje**: 15 módulos organizados por nivel, desde fundamentos hasta automatización.
- **Referencia de comandos**: más de 250 comandos clasificados por categoría (dibujo, modificación, textos y cotas, capas, bloques, control de pantalla).
- **Dimensionado completo**: líneas, radiales, angulares y tablas de escalas.
- **Atajos esenciales**: teclas especiales (F1–F12) y combinaciones rápidas.
- **Ejercicios prácticos** y mini simuladores interactivos.
- **Glosario** de términos CAD.
- **Visualización 3D interactiva** en el navegador con Three.js y Babylon.js (rotar, zoom, wireframe, cambio de modelo).
- **Buscador de atajos** en tiempo real, acordeones FAQ y calculadora de escalas.
- **Diseño responsive** (mobile-first) con menú hamburguesa para móviles.

## 🚀 Cómo ejecutar

No requiere instalación ni compilación. Abre el archivo:

```
index.html
```

directamente en tu navegador. Para una experiencia recomendada (y los visuales 3D), puedes servir la carpeta con cualquier servidor estático:

```bash
# Python
python -m http.server 8080

# Node.js (con npx)
npx serve .

# PHP
php -S localhost:8080
```

Luego visita `http://localhost:8080`.

## 📁 Estructura del proyecto

```
autocad-guide/
├── index.html                    # Página principal (hero, 3D, ruta de aprendizaje)
├── assets/
│   ├── css/
│   │   ├── styles.css            # Estilos base y temas
│   │   ├── additional-styles.css # Secciones y componentes adicionales
│   │   └── responsive.css        # Media queries (mobile-first)
│   ├── js/
│   │   ├── app.js                # Lógica principal (menú, animaciones, simuladores)
│   │   ├── animations.js         # Animaciones con Anime.js
│   │   ├── 3d-scene.js           # Escena Three.js
│   │   ├── babylon-scene.js      # Escena Babylon.js
│   │   ├── 3d-background.js      # Fondo 3D de la página
│   │   ├── particles.js          # Sistema de partículas
│   │   └── dynamic-year.js       # Año dinámico en el pie de página
│   └── favicon.svg
└── pages/
    ├── que-es-cad.html           # Introducción al CAD
    ├── interfaz.html             # Diagrama de la interfaz de AutoCAD
    ├── comandos.html             # Referencia de comandos y atajos
    ├── dimensiones.html          # Dimensionado y escalas
    ├── ejercicios.html           # Ejercicios prácticos
    ├── glosario.html             # Glosario de términos
    ├── recursos.html             # Recursos externos
    ├── modulos.html              # Índice de módulos
    └── modulos/
        ├── modulo-01-fundamentos.html
        ├── modulo-02-interfaz.html
        ├── modulo-03-dibujo-2d.html
        ├── modulo-04-modificacion.html
        ├── modulo-05-capas.html
        ├── modulo-06-bloques.html
        ├── modulo-07-dimensionado.html
        ├── modulo-08-textos.html
        ├── modulo-09-impresion.html
        ├── modulo-10-modelado-3d.html
        ├── modulo-11-render.html
        └── modulo-12-automatizacion.html
```

## 🛠️ Tecnologías

- **HTML5**, **CSS3** (variables CSS, Flexbox, Grid, `backdrop-filter`)
- **JavaScript** (vanilla, IIFE)
- **[Anime.js](https://animejs.com/)** — animaciones de entrada y transiciones
- **[Three.js](https://threejs.org/)** — visualizador 3D
- **[Babylon.js](https://www.babylonjs.com/)** — modelado 3D interactivo
- **[Font Awesome](https://fontawesome.com/)** — iconografía
- **[Google Fonts](https://fonts.google.com/)** — Inter y Cascadia Code

## 🧭 Navegación

| Ruta | Contenido |
| --- | --- |
| `index.html` | Inicio, demos 3D y ruta de aprendizaje |
| `pages/que-es-cad.html` | ¿Qué es el CAD? |
| `pages/comandos.html` | Comandos y atajos |
| `pages/dimensiones.html` | Dimensionado y escalas |
| `pages/glosario.html` | Glosario |
| `pages/modulos.html` | Módulos de aprendizaje |
| `pages/recursos.html` | Recursos externos |

## 🤝 Contribuir

1. Haz un fork del repositorio.
2. Crea una rama con tu cambio: `git checkout -b mi-mejora`.
3. Confirma tus cambios y envía un pull request.

## 📄 Licencia

Este proyecto es un recurso educativo. Usa contenido e imágenes de terceros (referencias CAD) con fines didácticos. Consulta las atribuciones en la página de **Recursos**.
