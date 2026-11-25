# RIGIS Website — Dream Team

> Sitio web apócrifo de la **Residencia Interdisciplinaria de Gestión Integral de la Información en Salud Pública (RIGIS)** del GCBA, con un carrito para armar un *Dream Team* de residentes.

Proyecto final del curso de **Front-End** de **Talento Tech**.

- **Repositorio:** https://github.com/LuisaBeccar/TalentTechFrontEnd
- **Sitio publicado (GitHub Pages):** https://luisabeccar.github.io/TalentTechFrontEnd/
- **Rama actual:** `rama_api`. Agrega una segunda tienda, **Emprendimiento Lui**, que trae sus productos desde una **API REST con `fetch`**.

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

Además, para cubrir el consumo de una API, la rama `rama_api` agrega **Emprendimiento Lui** (`emprendimiento_lui.html`): una tienda ficticia con productos traídos desde [Fake Store API](https://fakestoreapi.com/products), con precios, cantidades y checkout.

---

## 2. Estructura de archivos

```
TalentTechFrontEnd/
├── index.html              # Página principal
├── ver_carrito.html        # Resumen del Dream Team elegido
├── emprendimiento_lui.html # Tienda con productos traídos por API (rama_api)
├── how_to_ramas.txt        # Apuntes para trabajar con ramas de Git
├── css/
│   └── style.css           # Hoja de estilos (BEM + estilos de la tienda)
├── js/
│   ├── lista_residentes.js # Datos: array de objetos "residentes"
│   ├── index.js            # Render de tarjetas, carrito y localStorage (Dream Team)
│   ├── productos.js        # fetch a la API y render de productos (tienda)
│   ├── carrito.js          # Funciones del carrito de la tienda y localStorage
│   ├── finalizar.js        # Resumen del carrito y confirmación de compra
│   └── ejercicios.js       # Ejercicios de práctica del curso
└── multimedia/             # Fotos, logo, programa (PDF), gracias.html, dream_team.jpg
```

En `emprendimiento_lui.html` el orden de los scripts importa: primero va `carrito.js`, porque `productos.js` y `finalizar.js` usan sus funciones.

---

## 3. Estructura HTML semántica

Las páginas se organizan con las etiquetas semánticas principales:

- `<nav>`: menú fijo (*sticky*) con enlaces a Inicio, Nosotrxs, Programa (PDF), Rotaciones, Contacto, Dream Team y **Emprendimiento Lui**. En la tienda, el menú tiene un solo enlace para volver al sitio de la RIGIS. El ícono de estrella del Dream Team muestra un contador con la cantidad de residentes seleccionados.
- `<header>`: logo y nombre completo de la residencia (en `index.html`) o título y descripción de la tienda (en `emprendimiento_lui.html`). `ver_carrito.html` ya no lleva header.
- `<main>`: presentación institucional (Canva embebido), sección **Quiénes somos** con las tarjetas de residentes y el carrito, tabla de **Rotaciones**, **formulario de contacto** y mapa. En la tienda: grilla de productos y bloque de checkout.
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
- **Tienda:** estilos propios para las tarjetas de producto (`.card`, con efecto *hover*), etiqueta de categoría, precio, ítems del carrito, total y botones para vaciar el carrito y confirmar la compra.

---

## 5. Diseño responsivo (Flexbox, Grid y Media Queries)

- **Tarjetas de residentes:** contenedor con **Flexbox** y scroll horizontal (`overflow-x: auto` con `scroll-snap`), que muestra a todos los integrantes alineados dentro de los márgenes de la página.
- **Header y menú:** **Flexbox** para alinear el logo con el título y distribuir los enlaces.
- **Tienda, productos:** grilla con **Flexbox** y `flex-wrap`, que acomoda las tarjetas en filas según el ancho de la pantalla.
- **Tienda, checkout:** dos columnas con **Flexbox** (carrito y datos del comprador) que se apilan en pantallas chicas.
- **Header de la tienda:** **Grid** para centrar el título y la descripción.
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

## 9. Tienda «Emprendimiento Lui» (consumo de API)

### Pedido a la API (`productos.js`)

- `cargarProductos()` hace un `fetch` a `https://fakestoreapi.com/products`, controla `respuesta.ok`, convierte la respuesta con `.json()` y pasa los campos al español con `map` (`title` → `nombre`, `price` → `precio`, `image` → `imagen`, `category` → `categoria`, `description` → `descripcion`).
- Mientras espera, `mostrarCargando()` muestra un spinner. Si la API falla, `mostrarError()` muestra un mensaje y el error se registra en la consola (`.catch`).
- `mostrarProductos()` dibuja una tarjeta por producto con imagen, categoría, nombre, descripción, precio y botón «Agregar al carrito».

### Carrito de la tienda (`carrito.js`)

| Función | Qué hace |
|---|---|
| `obtenerCarrito()` / `guardarCarrito()` | Leen y guardan el carrito en `localStorage` bajo la clave `carrito`. |
| `agregarProducto(id)` | Agrega el producto, o le suma 1 a la cantidad si ya estaba. Muestra un *toast* de SweetAlert2. |
| `eliminarProducto(id)` | Quita el producto con todas sus unidades. |
| `vaciarCarrito()` | Deja el carrito vacío. |
| `calcularTotal()` | Suma precio × cantidad de cada producto. |
| `contarProductos()` / `actualizarContador()` | Cuentan las unidades y actualizan el numerito rojo sobre el ícono «Carrito» del menú (se oculta si el carrito está vacío). |
| `formatearPrecio(numero)` | Da formato de moneda argentina (`$1.109,50`) con `toLocaleString("es-AR")`. |

### Checkout (`finalizar.js`)

- `mostrarCarrito()` lista cada producto con su cantidad, su subtotal y un botón para quitarlo, y muestra el total. Si el carrito está vacío, muestra un mensaje con un enlace a los productos.
- `finalizarCompra()` comprueba que haya productos y que estén completos el nombre y el email. Si está todo bien, guarda el total, vacía el carrito y muestra un cartel de agradecimiento con **SweetAlert2**.

---

## 10. Flujo de uso

**En el sitio de la RIGIS:**


1. En **Quiénes somos**, el usuario agrega residentes con el botón de cada tarjeta (máximo 3). Vuelve a hacer clic para quitarlos.
2. La lista **Mi Selección** y el contador de la estrella se actualizan al instante.
3. Con **Vaciar Dream Team** se eliminan todos los residentes elegidos.
4. Con **Finalizar Selección** se abre `ver_carrito.html` en la misma pestaña, con el detalle de cada residente y la suma total de meses de experiencia.
5. Con **Llamar Dream Team** se muestra la imagen final del equipo.

**En Emprendimiento Lui:**

1. Se entra desde el enlace **Emprendimiento Lui** del menú. Los productos se cargan desde la API.
2. Con **Agregar al carrito** se suma el producto (o una unidad más) y el resumen de abajo se actualiza.
3. En **Finalizar compra** se pueden quitar productos o vaciar el carrito.
4. Se completan el nombre y el email y se pulsa **Confirmar compra**.

---

## 11. Accesibilidad y SEO

- Texto alternativo (`alt`) en logo y fotos; `aria-hidden` en el círculo de iniciales decorativo.
- Etiquetas `<label>` asociadas a cada campo del formulario.
- Botones con `type="button"` y elementos interactivos navegables con teclado.
- `meta charset` y `meta viewport` en el `<head>`.

---

## 12. Tecnologías utilizadas

- HTML5
- CSS3 (Flexbox, Grid, Media Queries, variables CSS, BEM)
- JavaScript (DOM, eventos, `localStorage`, JSON, `fetch` y promesas)
- Google Fonts, Font Awesome, SweetAlert2
- Formspree, Canva, Google Maps, Fake Store API
- Git, GitHub y GitHub Pages

---
© 2026 RIGIS Website · Proyecto Front-End · Talento Tech
