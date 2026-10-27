function mostrarProductos(){
    const grilla=document.getElementById("integrantes__grilla")
    grilla.innerHTML="";
}

alert("Página en construcción. Puede haber funcionalidades que no estén disponibles o que no funcionen correctamente. Disculpe las molestias.");


/*-----------------------
 Función para calcular el total de meses de experiencia acumulados por los residentes en el carrito 
 -----------------------*/

// Paso 1: crear funciones puras y específicas.
// Primero, definimos funciones simples que hacen una sola cosa.
function sumarMeses(listaResidentes) {    // lista_residentes es un array de objetos residentes
    let totalMeses = 0;
    for (let i = 0; i < listaResidentes.length; i++) {
        totalMeses += listaResidentes[i].meses_en_residencia;
    }
    return totalMeses;
}

// Paso 2: crear un módulo para el Carrito.
// Ahora, creamos un objeto que actuará como nuestro "módulo". Este objeto agrupará el
// estado (los productos) y las acciones (métodos) relacionadas con el carrito
const carrito ={
    residentes: [],
    agregar: function(residente) {
        this.residentes.push(residente);
        console.log(`Se ha agregado a ${residente.nombre} ${residente.apellido} al carrito.`);  
    },
    totalMesesExperiencia: function() {
        const mesesAcumulados = sumarMeses(this.residentes);
        console.log(`El total de meses de experiencia acumulados por los residentes en el carrito es: ${mesesAcumulados} meses.`);
        return mesesAcumulados;
    }
};

// Paso 3: usar el módulo en nuestra aplicación.
// Vamos a simular que un usuario agrega productos al carrito.
// Creamos algunos productos de ejemplo (objetos)
// const laptop = { nombre: "Laptop Gamer", precio: 1500 };
// const teclado = { nombre: "Teclado Mecánico", precio: 120 };
// const mouse = { nombre: "Mouse Vertical", precio: 80 };
// // Usamos los métodos del módulo para interactuar con el carrito
// carrito.agregar(laptop); // -> "Laptop Gamer" fue agregado al carrito.
// carrito.agregar(teclado); // -> "Teclado Mecánico" fue agregado al carrito.

// carrito.agregar(mouse); // -> "Mouse Vertical" fue agregado al carrito.
// // Calculamos y mostramos el total
// carrito.obtenerTotal(); // -> El total de la compra es: $1700

carrito.agregar(residentes[0]); // Agregamos a Solange
carrito.agregar(residentes[1]); // Agregamos a Paloma
carrito.totalMesesExperiencia(); // Calculamos el total de meses de experiencia acumulados por los residentes en el carrito