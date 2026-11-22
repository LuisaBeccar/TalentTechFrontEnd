/* ============================================================
   FUNCIONES DEL CARRITO
   Este archivo se usa en las DOS paginas (index y finalizar).
   El carrito se guarda en localStorage para que no se pierda
   al cambiar de pagina.
   ============================================================ */

// Trae el carrito guardado. Si no hay nada, devuelve un array vacio.
function obtenerCarrito() {
  const carritoGuardado = localStorage.getItem("carrito");
  if (carritoGuardado === null) {
    return [];
  }
  return JSON.parse(carritoGuardado);   // texto -> array
}

// Guarda el carrito en localStorage.
function guardarCarrito(carrito) {
  localStorage.setItem("carrito", JSON.stringify(carrito));   // array -> texto
  actualizarContador();
}

// Agrega un producto al carrito usando su id.
// Si ya estaba, le suma 1 a la cantidad.
function agregarProducto(id) {
  const carrito = obtenerCarrito();

  // Buscamos el producto en el array de productos
  const producto = productos.find(function (p) {
    return p.id === id;
  });

  // Buscamos si ya esta en el carrito
  const itemEnCarrito = carrito.find(function (item) {
    return item.id === id;
  });

  if (itemEnCarrito) {
    itemEnCarrito.cantidad = itemEnCarrito.cantidad + 1;
  } else {
    carrito.push({
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      cantidad: 1
    });
  }

  guardarCarrito(carrito);
  // Cartelito chico (toast) arriba a la derecha que se va solo
  Swal.fire({
    toast: true,
    position: "top-end",
    icon: "success",
    title: "Agregaste: " + producto.nombre,
    showConfirmButton: false,
    timer: 1500
  });
}

// Saca un producto del carrito (todas sus unidades).
function eliminarProducto(id) {
  const carrito = obtenerCarrito();

  // filter se queda con todos MENOS el que tiene ese id
  const carritoNuevo = carrito.filter(function (item) {
    return item.id !== id;
  });

  guardarCarrito(carritoNuevo);
}

// Vacia el carrito por completo.
function vaciarCarrito() {
  guardarCarrito([]);
}

// Suma precio x cantidad de cada producto.
function calcularTotal() {
  const carrito = obtenerCarrito();
  let total = 0;

  for (let i = 0; i < carrito.length; i++) {
    total = total + carrito[i].precio * carrito[i].cantidad;
  }

  return total;
}

// Cuenta cuantas unidades hay en total en el carrito.
function contarProductos() {
  const carrito = obtenerCarrito();
  let cantidad = 0;

  for (let i = 0; i < carrito.length; i++) {
    cantidad = cantidad + carrito[i].cantidad;
  }

  return cantidad;
}

// Muestra el numerito rojo al lado del icono del carrito.
function actualizarContador() {
  const contador = document.getElementById("contador-carrito");
  if (!contador) return;   // si la pagina no tiene contador, no hacemos nada
  const cantidad = contarProductos();
  // Con 0 lo dejamos vacio para que el CSS (:empty) lo oculte
  contador.textContent = cantidad > 0 ? cantidad : "";
}

// Convierte 1109.5 en "$1.109,50" (la API trae precios con centavos)
function formatearPrecio(numero) {
  return "$" + numero.toLocaleString("es-AR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

// Apenas carga la pagina, actualizamos el contador del header.
actualizarContador();