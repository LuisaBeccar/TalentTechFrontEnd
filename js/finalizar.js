/* ============================================================
   PAGINA DE FINALIZAR COMPRA
   Muestra lo que hay en el carrito, el total, y permite comprar.
   ============================================================ */

function mostrarCarrito() {
  const carrito = obtenerCarrito();
  const lista = document.getElementById("lista-carrito");
  const total = document.getElementById("total-carrito");

  // Si el carrito esta vacio, mostramos un mensaje y salimos
  if (carrito.length === 0) {
    lista.innerHTML = `<p class="carrito-vacio">Tu carrito está vacío. <a href="#grilla-productos">Ver productos</a></p>`;
    total.textContent = formatearPrecio(0);
    return;
  }

  lista.innerHTML = "";

  for (let i = 0; i < carrito.length; i++) {
    const item = carrito[i];

    lista.innerHTML += `
      <div class="item-carrito">
        <span class="item-nombre">${item.nombre}</span>
        <span>x ${item.cantidad}</span>
        <span class="item-precio">${formatearPrecio(item.precio * item.cantidad)}</span>
        <button onclick="quitarYMostrar(${item.id})" title="Quitar">
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
    `;
  }

  total.textContent = formatearPrecio(calcularTotal());
}

// Quita el producto y vuelve a dibujar la lista
function quitarYMostrar(id) {
  eliminarProducto(id);
  mostrarCarrito();
}

function finalizarCompra() {
  const nombre = document.getElementById("nombre").value;
  const email = document.getElementById("email").value;

  if (obtenerCarrito().length === 0) {
    Swal.fire({
      icon: "warning",
      title: "Carrito vacío",
      text: "No hay productos en el carrito."
    });
    return;
  }

  if (nombre === "" || email === "") {
    Swal.fire({
      icon: "error",
      title: "Faltan datos",
      text: "Completá tu nombre y tu email."
    });
    return;
  }

  // Guardamos el total ANTES de vaciar el carrito
  const total = calcularTotal();
  vaciarCarrito();

  Swal.fire({
    icon: "success",
    title: "¡Gracias por tu compra, " + nombre + "!",
    text: "Total pagado: " + formatearPrecio(total),
    confirmButtonText: "Volver a la tienda",
    confirmButtonColor: "var(--color-primario)"
  }).then(function () {
    // .then se ejecuta cuando el usuario cierra el cartel
    // Volvemos a dibujar el carrito (ahora vacio) en esta misma pagina
    mostrarCarrito();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

mostrarCarrito();