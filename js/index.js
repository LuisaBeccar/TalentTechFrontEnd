// para hacer la metrica de meses de experiencia de los residentes seleccionados (precio o valor que tendran pero que no aparecera en la portada sino al final de la compra)

function calcularMesesDesde(fechaIngreso) {
    const ingreso = new Date(fechaIngreso);
    const hoy = new Date();

    let totalMeses = (hoy.getFullYear() - ingreso.getFullYear()) * 12
                   + (hoy.getMonth() - ingreso.getMonth());

    if (hoy.getDate() < ingreso.getDate()) {
        totalMeses--;
    }
    return totalMeses >= 0 ? totalMeses : 0;
}

function sumarMeses(listaResidentes) {
    let totalMeses = 0;
    for (let i = 0; i < listaResidentes.length; i++) {
        totalMeses += calcularMesesDesde(listaResidentes[i].fecha_ingreso);
    }
    return totalMeses;
}



// para mostrar los residentes en la grilla y manejar el carrito de selección

function mostrarResidentes() {
    const grilla = document.getElementById("integrantes__grilla");
    grilla.innerHTML = "";

    residentes.forEach(residente => {
        const tarjeta = document.createElement("div");
        tarjeta.classList.add("integrante");

        const nombre = residente.nombre || "Residente sin nombre";
        const htmlImagen = residente.foto
            ? `<img src="${residente.foto}" alt="Foto de ${nombre}" class="integrante__imagen">`
            : `<div class="integrante__imagen integrante__imagen--sin-foto" aria-hidden="true">${nombre.charAt(0)}${residente.apellido.charAt(0)}</div>`;

        tarjeta.innerHTML = `
            ${htmlImagen}
            <h3 class="integrante__nombre">${nombre} ${residente.apellido}</h3>
            <p class="integrante__carrera">${residente.carrera_base}</p>
            <p class="integrante__anio">Año de ingreso: ${residente.anio_ingreso}</p>
            <p class="integrante__nivel">Actualmente ${residente.nivel}</p>
            <button class="integrante__boton" type="button"></button>
        `;

        const boton = tarjeta.querySelector(".integrante__boton");
        marcarBoton(boton, carrito.contiene(residente));          // estado inicial (obs. 5)
        boton.addEventListener("click", () => carrito.agregar(residente, boton)); // sin llamada duplicada (obs. 3)

        grilla.appendChild(tarjeta);
    });
}

// Cambia el botón con una clase en vez de estilo inline (obs. 6)
function marcarBoton(boton, agregado) {
    boton.classList.toggle("integrante__boton--agregado", agregado);
    boton.innerHTML = agregado
        ? '<i class="fa-solid fa-check"></i> ¡Agregado!'
        : '<i class="fa-solid fa-star" style="color: rgb(255, 212, 59);"></i> Agregar al dream team';
}

const carrito = {
    residentes: [],

    contiene(residente) {
        return this.residentes.some(r => r.id === residente.id);
    },

    agregar(residente, boton) {
        if (this.contiene(residente)) {
            this.remover(residente, boton);
            return;
        }
        if (this.residentes.length >= 3) {
            alert("Solo puedes elegir 3 residentes para tu equipo");
            return;
        }
        this.residentes.push(residente);
        marcarBoton(boton, true);
        this.actualizar();
    },

    remover(residente, boton) {
        this.residentes = this.residentes.filter(r => r.id !== residente.id);
        marcarBoton(boton, false);
        this.actualizar();
    },

    totalMesesExperiencia() {
        return sumarMeses(this.residentes);
    },


  

    vaciar() {
        this.residentes = [];
        this.actualizar();
    },


    // Guarda, actualiza contador y muestra el total en pantalla (obs. 4 y 5)
    // actualizar() {
    //     localStorage.setItem("dreamTeam", JSON.stringify(this.residentes.map(r => r.id)));
    //     actualizarContadorDreamTeam();
    //     mostrarCarrito();
    //     console.log(`Total de meses: ${this.totalMesesExperiencia()}`);
    // },
    actualizar() {
            localStorage.setItem("dreamTeam", JSON.stringify(this.residentes.map(r => r.id)));
            refrescarVista();
        },

    cargar() {
        const ids = JSON.parse(localStorage.getItem("dreamTeam")) || [];
        this.residentes = residentes.filter(r => ids.includes(r.id));
    },

    // vaciar() {
    //     this.residentes = [];
    //     mostrarResidentes();   // vuelve todos los botones a "Agregar"
    //     this.actualizar();     // guarda [] en localStorage y actualiza contador, total y lista
    // },
       vaciar() {
        this.residentes = [];
        this.actualizar();
    },
};

// function actualizarContadorDreamTeam() {
//     const contador = document.getElementById("contador-dream-team");
//     const cantidad = carrito.residentes.length;
//     contador.textContent = cantidad;
//     contador.style.display = cantidad === 0 ? "none" : "inline-block";
// }
function actualizarContadorDreamTeam() {
    const contador = document.getElementById("contador-dream-team");
    if (!contador) return;
    const cantidad = carrito.residentes.length;
    contador.textContent = cantidad;
    contador.style.display = cantidad === 0 ? "none" : "inline-block";
}

// no se si dejar esto en la pantalla principal o solo el boton de vaciar 
function mostrarCarrito() {
    const lista = document.getElementById("lista-carrito");
    lista.innerHTML = "";
    carrito.residentes.forEach(r => {
        const li = document.createElement("li");
        li.textContent = `${r.nombre} ${r.apellido}`;
        lista.appendChild(li);
    });
}

// nuevo mostrar carrito para la pagina de finalizacion
// function mostrarCarritoFinalizador() {
//     const lista = document.getElementById("lista-carrito");
//     lista.innerHTML = "";
//     carrito.residentes.forEach(r => {
//         const li = document.createElement("li");
//         li.textContent = `${r.nombre} ${r.apellido}: tiene ${calcularMesesDesde(r.fecha_ingreso)} meses de experiencia en la RIGIS`;
//         lista.appendChild(li);

//         const totalMeses = document.createElement("p");
//         totalMeses.textContent = `Suma total de meses de experiencia del equipo de residentes elegido: ${carrito.totalMesesExperiencia()}`;
//         lista.appendChild(totalMeses);
//     });
// }

function mostrarCarritoFinalizador() {
    const lista = document.getElementById("lista-carrito");
    lista.innerHTML = "";
    carrito.residentes.forEach(r => {
        const li = document.createElement("li");
        li.textContent = `${r.nombre} ${r.apellido}: tiene ${calcularMesesDesde(r.fecha_ingreso)} meses de experiencia en la RIGIS`;
        lista.appendChild(li);
    });

    const total = document.getElementById("total-meses");
    if (total) {
        total.textContent = `Suma total de meses de experiencia del equipo de residentes elegido: ${carrito.totalMesesExperiencia()}`;
    }
}

//Nueva función que decide qué mostrar según la página:
function refrescarVista() {
    actualizarContadorDreamTeam();
    if (document.getElementById("integrantes__grilla")) {        // index.html
        mostrarResidentes();
        mostrarCarrito();
    } else if (document.getElementById("lista-carrito")) {       // finalizar_carrito.html
        mostrarCarritoFinalizador();
    }
}

const botonEjecutar = document.getElementById("ejecutar-carrito");
if (botonEjecutar) {
    botonEjecutar.addEventListener("click", () => window.open("multimedia/dream_team.jpg", "_blank"));
}

const botonVerSeleccion = document.getElementById("ver-carrito");
if (botonVerSeleccion) {
    botonVerSeleccion.addEventListener("click", () => window.open("ver_carrito.html", "_blank"));
}


// Inicio (con defer el DOM ya está listo; no hace falta DOMContentLoaded)
// carrito.cargar();
// mostrarResidentes();
// mostrarCarrito();
// document.getElementById("vaciar-carrito").addEventListener("click", () => carrito.vaciar());

carrito.cargar();
refrescarVista();

const botonVaciar = document.getElementById("vaciar-carrito");
if (botonVaciar) {
    botonVaciar.addEventListener("click", () => carrito.vaciar());
}