
        /* EJ 3
        Queremos
        crear una pequeña lista de productos para nuestra tienda, donde cada
        uno tenga su nombre, precio y stock disponible.

        Qué tenés que hacer:
        1. Creá un objeto llamado producto1 que represente un artículo. Debe tener las
        siguientes propiedades (claves):
        ○ nombre (string) - curso
        ○ precio (number) - precio
        ○ stock (number) - cupos

        2. Mostrá en la consola el nombre y el precio del producto1 de forma separada,
        accediendo a sus propiedades.
        3. Creá un array llamado catalogo que contenga tres objetos de productos
        diferentes (podés inventar los datos).
        4. Mostrá el array completo en la consola para ver su estructura.
        5. Accedé y mostrá en la consola el nombre del segundo producto dentro del array
        catalogo.
        */

        let curso1 = {
            nombre: "Curso de R Introductorio",
            precio: 100,
            cupos: 2
        };

        console.log("Nombre del producto: " + curso1.nombre);
        console.log("Precio del producto: " + curso1.precio);   

        /*3.*/
        let catalogo = [
            {
                nombre: "Introduccion a Politica de Datos",
                precio: 150,
                cupos: 5
            },
            {
                nombre: "Curso de R Introductorio",
                precio: 100,
                cupos: 2
            },
            {
                nombre: "Curso de Git",
                precio: 200,
                cupos: 3
            }
        ];

        console.log(catalogo);
        console.log("Nombre del segundo producto: " + catalogo[1].nombre);

/*------------------------
Ejercicio práctico #1:
Validación de campos de un formulario (simulado con variables)

Lucía (Product Owner)
Queremos asegurarnos de que ningún usuario envíe un formulario
incompleto. Para eso vamos a simular los campos de un formulario con
variables en JavaScript.

Lo que harás:
● Declarar tres variables: nombre, correo y mensaje, asignándoles valores de prueba.
● Crear una función que valide que ninguna de estas variables esté vacía.
● Si todos los campos tienen texto, mostrar por consola:
"Formulario completo. Listo para enviar."
● Si falta completar alguno, mostrar:
"Faltan completar campos obligatorios.
Tips de Tomás:
Usá el operador && para verificar que todas las variables contengan texto.
Jugá cambiando los valores de prueba para ver cómo responde tu validación.

🛑¡Importante! Esta práctica te va a servir para entender la validación de datos antes de
enviarlos a un servidor, algo fundamental en cualquier aplicación web.
Ejercicio práctico #2:
Iterar una lista de productos y mostrarlos con alert() */

let nombre2 = "Juan";
let correo = "juan@ejemplo.com";
let mensaje = "Hola, me gustaría información sobre sus servicios.";

function funcion1() {
    if (nombre2 !== "" && correo !== "" && mensaje !== "") {
        console.log("Formulario completo. Listo para enviar.");
    }else {
        console.log("Faltan completar campos obligatorios.");
    }}


/* Ejercicio práctico #2:
Lucía (Product Owner)
Ahora necesitamos mostrar un listado de productos para que el usuario
pueda conocer la oferta disponible.

Lo que harás:
● Crear un array de al menos 5 productos (por ejemplo: "Remera", "Pantalón",
"Gorra").
● Recorrer el array con un bucle for o for...of.
● En cada iteración, mostrar el producto con un alert().
● Al finalizar, enviar por consola el mensaje:

"Lista de productos mostrada correctamente."
Tips de Tomás:
Definí el array como const para practicar buenas prácticas de variables
constantes.
Podés sumar un contador para contar cuántos productos se muestran.
🛑¡Recordá! Mostrar la información de forma dinámica con bucles es la base para crear
interfaces interactivas más adelante.

🛑const significa que no podés volver a asignar otro array a esa misma variable, pero
sí podés modificar el contenido del array.
● Podés agregar, quitar o modificar elementos dentro del array declarado con const.
● Pero no podés decirle después que sea un array completamente nuevo.
Recordemos:
● const = su referencia no cambia.
● let = variable flexible, su valor puede cambiar.
● var = forma más vieja, hoy se recomienda evitarla. */

const productos = ["Remera", "Pantalón", "Gorra", "Zapatos", "Chaqueta"];

for (let i = 0; i < productos.length; i++) {
    alert(productos[i]);
}

console.log("Lista de productos mostrada correctamente.");

// ejemplo de desestructuracion con spread operator.

const catalogoInicial = ["Teclado", "Mouse"];
const nuevoProducto = "Monitor";

function agregarProducto(catalogo, producto) {
    const nuevoCatalogo = [...catalogo, producto];
    return nuevoCatalogo;
}

const catalogoActualizado = agregarProducto(catalogoInicial, nuevoProducto);

console.log(catalogoInicial); // Imprime ["Teclado", "Mouse"] (¡eloriginal no cambió!)
console.log(catalogoActualizado); // Imprime ["Teclado", "Mouse", "Monitor"]


// ----------------------------
let nombre = prompt("¿Cuál es tu nombre?");
if (nombre) {
let saludo = "Hola, " + nombre.toUpperCase() + "!";
alert(saludo);
console.log("El usuario se llama " + nombre);
}