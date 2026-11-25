const URL_API = "https://fakestoreapi.com/products";

// Empieza vacio y se llena cuando llega la respuesta de la API.
let productos = [];


// Pide los productos a la API y los guarda en el array "productos".
// Devuelve una promesa: usamos .then() para saber cuando termino.
function cargarProductos() {
  return fetch(URL_API)
    .then(function (respuesta) {
      if (!respuesta.ok) {
        throw new Error("Error " + respuesta.status);
      }
      return respuesta.json();   // texto -> array de objetos
    })
    .then(function (datos) {
      // La API viene en ingles (title, price, image...).
      // La pasamos a nuestros nombres en español para usarlos en todo el codigo.
      productos = datos.map(function (p) {
        return {
          id: p.id,
          nombre: p.title,
          precio: p.price,
          imagen: p.image,
          categoria: p.category,
          descripcion: p.description
        };
      });
    });
}


// Dibuja una tarjeta por cada producto en la grilla
function mostrarProductos() {
  const grilla = document.getElementById("grilla-productos");
  grilla.innerHTML = "";   // empezamos con la grilla vacia

  for (let i = 0; i < productos.length; i++) {
    const producto = productos[i];

    // Al agregar, tambien redibujamos el checkout de abajo (mostrarCarrito esta en finalizar.js)
    grilla.innerHTML += `
      <article class="card">
        <img src="${producto.imagen}" alt="${producto.nombre}">
        <div class="card-info">
          <span class="categoria">${producto.categoria}</span>
          <h3>${producto.nombre}</h3>
          <p>${producto.descripcion}</p>
          <span class="precio">${formatearPrecio(producto.precio)}</span>
          <button onclick="agregarProducto(${producto.id}); mostrarCarrito();">
            <i class="fa-solid fa-cart-plus"></i> Agregar al carrito
          </button>
        </div>
      </article>
    `;
  }
}

// Mensaje mientras esperamos la respuesta de la API
function mostrarCargando() {
  const grilla = document.getElementById("grilla-productos");
  grilla.innerHTML = `<p class="mensaje-grilla"><i class="fa-solid fa-spinner fa-spin"></i> Cargando productos...</p>`;
}

// Mensaje si la API no responde
function mostrarError() {
  const grilla = document.getElementById("grilla-productos");
  grilla.innerHTML = `<p class="mensaje-grilla">No pudimos cargar los productos. Probá de nuevo más tarde.</p>`;
}

mostrarCargando();

cargarProductos()
  .then(function () {
    mostrarProductos();
  })
  .catch(function (error) {
    console.error(error);
    mostrarError();
  });
