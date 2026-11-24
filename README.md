# RIGIS Website — Dream Team

> Sitio web apócrifo de la **Residencia Interdisciplinaria de Gestión Integral de la Información en Salud Pública (RIGIS)** del GCBA, con un carrito para armar un *Dream Team* de residentes.

Proyecto final del curso de **Front-End** de **Talento Tech**.

- **Repositorio:** https://github.com/LuisaBeccar/TalentTechFrontEnd
- **Sitio publicado (GitHub Pages):** https://luisabeccar.github.io/TalentTechFrontEnd/

---

## 1. Propósito del proyecto

El sitio presenta la RIGIS de forma clara y accesible: qué es la residencia, quiénes la integran, qué rotaciones realiza y cómo contactarla.

El componente de *e-commerce* pedido por la consigna se adaptó al contexto de la residencia. En lugar de productos con precio, el usuario elige **residentes** para su *Dream Team* (hasta 3), y en lugar de sumar precios, el carrito suma los **meses de experiencia** de cada residente en la RIGIS, calculados a partir de su fecha de ingreso.

| Concepto de la consigna | Equivalente en este proyecto |
|---|---|
| Producto | Residente |
| Precio | Meses de experiencia (calculados a la fecha actual) |
| Carrito de compras | Dream Team |
| Total de la compra | Suma de meses de experiencia del equipo |
| Finalizar compra | Página `ver_carrito.html` y botón «Llamar Dream Team» |

---

## 2. Estructura de archivos

```
TalentTechFrontEnd/
├── index.html              # Página principal
├── ver_carrito.html        # Resumen del Dream Team elegido
├── css/
│   └── style.css           # Hoja de estilos (metodología BEM)
├── js/
│   ├── lista_residentes.js # Datos: array de objetos "residentes"
│   ├── index.js            # Render de tarjetas, carrito y localStorage
│   └── ejercicios.js       # Ejercicios de práctica del curso
└── multimedia/             # Fotos, logo, programa (PDF), gracias.html, dream_team.jpg
```

---

## 3. Estructura HTML semántica

Ambas páginas se organizan con las etiquetas semánticas principales:

- `<nav>`: menú fijo (*sticky*) con enlaces a Inicio, Nosotrxs, Programa (PDF), Rotaciones, Contacto y Dream Team. El ícono de estrella del Dream Team muestra un contador con la cantidad de residentes seleccionados.
- `<header>`: logo y nombre completo de la residencia.
- `<main>`: presentación institucional (Canva embebido), sección **Quiénes somos** con las tarjetas de residentes y el carrito, tabla de **Rotaciones**, **formulario de contacto** y mapa.
- `<section>` y `<article>`: agrupan cada bloque de contenido.
- `<footer>`: enlace a Instagram, contacto con el desarrollador y derechos.

---

## 4. Estilos (CSS)

Archivo externo `css/style.css`, organizado por bloques con la metodología **BEM** (`bloque__elemento--modificador`).

- **Paleta de marca** definida como variables en `:root` (`--color-primario`, `--color-secundario`, `--color-acento`, `--color-blanco`).
- **Google Fonts:** *Nunito* para títulos y *Open Sans* para el cuerpo de texto.
- **Íconos:** Font Awesome.
- **Background:** color de fondo general, fondo de marca en el header, menú y footer con el color de acento, y fondos suaves en los ítems del carrito.
- Estilos aplicados a header, menú de navegación, tarjetas, tabla, formulario, carrito y footer.

---

## 5. Diseño responsivo (Flexbox, Grid y Media Queries)

- **Tarjetas de residentes:** contenedor con **Flexbox** y scroll horizontal (`overflow-x: auto` con `scroll-snap`), que muestra a todos los integrantes alineados dentro de los márgenes de la página.
- **Header y menú:** **Flexbox** para alinear el logo con el título y distribuir los enlaces.
- **Contacto:** **Grid** de dos columnas (formulario y mapa) que pasa a una sola columna en pantallas chicas.
- **Media Queries** (`max-width: 768px`) para ajustar tamaños de texto, imágenes, menú, tabla y formulario en celulares.

---

## 6. Contenido multimedia y navegación

- Logo y fotos de las residentes (con texto alternativo `alt`).
- Presentación institucional embebida desde **Canva** (`iframe`).
- Mapa embebido de **Google Maps** con la ubicación de la residencia.
- Programa de la residencia en PDF, que se abre desde el menú.
- Menú de navegación con lista desordenada (`<ul>`) y enlaces internos a cada sección.

---

## 7. Formulario de contacto

Formulario funcional que envía los datos a través de **Formspree**.

- Campos: nombre, apellido, fecha de nacimiento, edad, género, país de origen, **correo electrónico**, **mensaje** y archivo adjunto opcional.
- Validación nativa de HTML5: `required`, `minlength` / `maxlength`, `type="email"`, `min` en la edad.
- Botones para enviar y para limpiar el formulario.


---

## 8. JavaScript

### Datos y renderizado de tarjetas

- `lista_residentes.js` contiene el array `residentes`. Cada objeto tiene `id`, `nombre`, `apellido`, `carrera_base`, `anio_ingreso`, `fecha_ingreso`, `nivel`, `foto` y `descripcion`.
- `mostrarResidentes()` genera dinámicamente una tarjeta por residente en el DOM, con foto (o un círculo con sus iniciales si no tiene foto), nombre, carrera, año de ingreso, nivel y botón «Agregar al dream team».

### Carrito (objeto `carrito`)

| Método | Función |
|---|---|
| `agregar(residente, boton)` | Agrega al residente, o lo quita si ya estaba. Limita el equipo a 3 y avisa con un `alert` si se supera. |
| `remover(residente, boton)` | Quita al residente y restaura el botón. |
| `vaciar()` | Elimina a todos los residentes del carrito. |
| `contiene(residente)` | Indica si el residente ya está seleccionado. |
| `totalMesesExperiencia()` | Devuelve la suma de meses de experiencia del equipo. |
| `actualizar()` | Guarda el carrito en `localStorage` y refresca la vista. |
| `cargar()` | Recupera el carrito desde `localStorage` al abrir la página. |

### Cálculo del «total»

- `calcularMesesDesde(fecha)` calcula los meses transcurridos desde la fecha de ingreso hasta hoy.
- `sumarMeses(lista)` suma los meses de todos los residentes seleccionados.

### Persistencia con localStorage

- El carrito se guarda bajo la clave `dreamTeam` como un array de `id` (`JSON.stringify` / `JSON.parse`). Los datos de cada residente se toman siempre de `lista_residentes.js`.
- El carrito se mantiene al recargar la página, al cerrarla y al pasar de `index.html` a `ver_carrito.html`.
- Al volver con el botón «Atrás» del navegador (evento `pageshow`) y cuando el carrito cambia en otra pestaña (evento `storage`), la página vuelve a leer el carrito y se actualiza.

### Actualización dinámica del DOM

- `refrescarVista()` detecta en qué página se está y actualiza lo que corresponde:
  - En `index.html`: tarjetas, estado de los botones y lista «Mi Selección».
  - En `ver_carrito.html`: lista de residentes con sus meses de experiencia y total del equipo.
- **Contador dinámico:** `actualizarContadorDreamTeam()` muestra la cantidad de residentes sobre la estrella del menú y lo oculta cuando el carrito está vacío.
- **Total dinámico:** se recalcula cada vez que se agrega o se quita un residente.
- Los botones de las tarjetas cambian de texto y de estilo («¡Agregado!») mediante una clase CSS.

### Mensajes al usuario

- Aviso al intentar elegir más de 3 residentes.
- Aviso al intentar finalizar la selección o llamar al Dream Team con el carrito vacío.

---

## 9. Flujo de uso

1. En **Quiénes somos**, el usuario agrega residentes con el botón de cada tarjeta (máximo 3). Vuelve a hacer clic para quitarlos.
2. La lista **Mi Selección** y el contador de la estrella se actualizan al instante.
3. Con **Vaciar Dream Team** se eliminan todos los residentes elegidos.
4. Con **Finalizar Selección** se abre `ver_carrito.html` en la misma pestaña, con el detalle de cada residente y la suma total de meses de experiencia.
5. Con **Llamar Dream Team** se muestra la imagen final del equipo.

---

## 10. Accesibilidad y SEO

- Texto alternativo (`alt`) en logo y fotos; `aria-hidden` en el círculo de iniciales decorativo.
- Etiquetas `<label>` asociadas a cada campo del formulario.
- Botones con `type="button"` y elementos interactivos navegables con teclado.
- `meta charset` y `meta viewport` en el `<head>`.

---

## 11. Tecnologías utilizadas

- HTML5
- CSS3 (Flexbox, Grid, Media Queries, variables CSS, BEM)
- JavaScript (DOM, eventos, `localStorage`, JSON)
- Google Fonts, Font Awesome
- Formspree, Canva, Google Maps
- Git, GitHub y GitHub Pages

---

## 12. Bonus Track

- En rama "rama_api" se usa una **API REST con `fetch`**, en lugar del array local.

---

© 2026 RIGIS Website · Proyecto Front-End · Talento Tech
