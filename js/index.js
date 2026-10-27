
/*-----------------------
 mensaje de alerta al abrir la página
 -----------------------*/
alert("Página en construcción. Puede haber funcionalidades que no estén disponibles o que no funcionen correctamente. Disculpe las molestias.");


/*-----------------------
 Función para calcular el total de meses de experiencia acumulados por los residentes en el carrito 
 -----------------------*/

// Paso 1: crear funciones puras y específicas.
// Primero, definimos funciones simples que hacen una sola cosa.

// 1. Función auxiliar para calcular los meses desde una fecha hasta hoy
function calcularMesesDesde(fechaIngreso) {
    const ingreso = new Date(fechaIngreso);
    const hoy = new Date(); // Fecha actual (2026)

    let aniosDiferencia = hoy.getFullYear() - ingreso.getFullYear();
    let mesesDiferencia = hoy.getMonth() - ingreso.getMonth();
    
    let totalMeses = (aniosDiferencia * 12) + mesesDiferencia;

    // Si todavía no llegó el día del mes actual, restamos un mes
    if (hoy.getDate() < ingreso.getDate()) {
        totalMeses--;
    }

    return totalMeses >= 0 ? totalMeses : 0;
}

function sumarMeses(listaResidentes) {    // lista_residentes es un array de objetos residentes
    let totalMeses = 0;
    for (let i = 0; i < listaResidentes.length; i++) {
        // Obtenemos la fecha de ingreso de este residente
        const fechaIngreso = listaResidentes[i].fecha_ingreso;
        
        // Calculamos sus meses al vuelo y los sumamos al total
        totalMeses += calcularMesesDesde(fechaIngreso);
    }
    return totalMeses;
}


function mostrarResidentes() {
    const grilla = document.getElementById("integrantes__grilla");
    grilla.innerHTML="";

    residentes.forEach(residente => {
        const tarjeta = document.createElement("div");
        tarjeta.classList.add("integrante"); 

        const nombreResidente = residente.nombre || "Residente sin nombre";
        const mesesCalculados = calcularMesesDesde(residente.fecha_ingreso);

        // --- VALIDAMOS LA FOTO ---
        let htmlImagen = "";
        if (residente.foto) {
            // Si el objeto tiene foto, usamos la clase .integrante__imagen de tu CSS
            htmlImagen = `<img src="${residente.foto}" alt="Foto de ${nombreResidente}" class="integrante__imagen">`;
        } else {
            // Si no tiene foto, usamos tu clase del círculo con la inicial
            htmlImagen = `
                <div class="integrante__imagen integrante__imagen--sin-foto" aria-hidden="true">
                    ${nombreResidente.charAt(0)}${residente.apellido.charAt(0)}
                </div>
            `;
        }
        // -------------------------

        tarjeta.innerHTML = `
            ${htmlImagen}
            <h3 class="integrante__nombre">${nombreResidente} ${residente.apellido}</h3>
            <p class="integrante__carrera">${residente.carrera_base}</p>
            <p class="integrante__anio">Año de ingreso: ${residente.anio_ingreso}</p>
            <p class="integrante__nivel">Actualmente ${residente.nivel} </p> 
            <button class="integrante__boton" type="button">
                <i class="fa-solid fa-star" style="color: rgb(255, 212, 59);"></i> Agregar al dream team
            </button>
        `;
        // ==========================================
        // AQUÍ AGREGAMOS LA FUNCIONALIDAD AL BOTÓN
        // ==========================================
        const botonAgregar = tarjeta.querySelector(".integrante__boton");
        
        botonAgregar.addEventListener("click", () => {
            // Llamamos al método agregar de tu carrito pasándole este residente específico
            carrito.agregar(residente, botonAgregar); // Pasamos también el botón para cambiar su estilo
            
            // Opcional: Podés llamar también al total para verlo actualizado en la consola
            carrito.totalMesesExperiencia();
        });
        // ==========================================
        grilla.appendChild(tarjeta);
    });
}

// Ejecutamos la función al cargar la página
mostrarResidentes();




// Paso 2: crear un módulo para el Carrito.
// Ahora, creamos un objeto que actuará como nuestro "módulo". Este objeto agrupará el
// estado (los productos) y las acciones (métodos) relacionadas con el carrito


const carrito = {
    residentes: [],
    agregar: function(residente, botonHtml) {
        // 1. Verificamos si el residente ya está en el carrito
        const indice = this.residentes.findIndex(r => r.id === residente.id);

        if (indice !== -1) {
            // SI YA ESTÁ: Lo removemos del equipo
            this.remover(residente, botonHtml);
            return;
        }
        // 2. Verificar si ya se alcanzó el límite máximo de 3 residentes
        if (this.residentes.length >= 3) {
            alert("Solo puedes elegir 3 residentes para tu equipo");
            return; // Detiene la ejecución
        }

        // 2. Si pasa ambas validaciones, lo agregamos al array
        this.residentes.push(residente);
        console.log(`Se ha agregado a ${residente.nombre} ${residente.apellido} al carrito.`);
        
        // CAMBIAMOS EL ESTILO Y TEXTO DEL BOTÓN
        // ==========================================
        if (botonHtml) {
            botonHtml.style.backgroundColor = "#41AED9"; // Un color adjunto en css
            botonHtml.innerHTML = '<i class="fa-solid fa-check"></i> ¡Agregado!';
        }
        // ==========================================

        // Calculamos y mostramos el total actualizado
        this.totalMesesExperiencia();
        actualizarContadorDreamTeam(); // Actualizamos el contador en pantalla
    },

    remover: function(residente, botonHtml) {
        // 1. Buscamos y eliminamos al residente del array
        const indice = this.residentes.findIndex(r => r.id === residente.id);
        if (indice !== -1) {
            this.residentes.splice(indice, 1);
            console.log(`Se ha quitado a ${residente.nombre} del carrito.`);
        }

        // 2. Restauramos el botón a su estado original
        if (botonHtml) {
            botonHtml.style.backgroundColor = ""; // Vuelve al color por defecto del CSS (.integrante__boton)
            botonHtml.innerHTML = '<i class="fa-solid fa-star" style="color: rgb(255, 212, 59);"></i> Agregar al dream team';
        }

        this.totalMesesExperiencia();
        actualizarContadorDreamTeam(); // Actualizamos el contador en pantalla
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

// carrito.agregar(residentes[0]); // Agregamos a Solange
// carrito.agregar(residentes[1]); // Agregamos a Paloma
// carrito.totalMesesExperiencia(); // Calculamos el total de meses de experiencia acumulados por los residentes en el carrito


// ----------------------------//
// Función para actualizar el número en pantalla al lado de la estrella
function actualizarContadorDreamTeam() {
    const contadorSpan = document.getElementById("contador-dream-team");
    if (contadorSpan) {
        const cantidad = carrito.residentes.length;
        contadorSpan.textContent = cantidad;

        // Si es 0 lo ocultamos, si es mayor a 0 lo mostramos
        if (cantidad === 0) {
            contadorSpan.style.display = "none";
        } else {
            contadorSpan.style.display = "inline-block";
        }
    }
}
// Ejecutamos la función al cargar la página para que arranque oculto si está en 0
document.addEventListener("DOMContentLoaded", () => {
    actualizarContadorDreamTeam();
});