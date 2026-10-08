/*  EJ 1
Queremos que el usuario pueda ingresar dos números y ver qué
operaciones podemos hacer con ellos: sumar, restar, multiplicar, dividir
y más. También queremos evitar errores si el usuario ingresa algo que
no es un número.
Qué tenés que hacer:
● Pedir al usuario dos números usando prompt().
● Convertir esos datos a números con parseFloat().
● Mostrar en la consola los resultados de suma, resta, multiplicación, división y
módulo.
● Verificar con isNaN() si los datos ingresados son válidos para evitar errores.
Tips para tu código:
● Usá console.log() para mostrar mensajes claros con el resultado de cada
operación.
● Probá ingresar valores no numéricos y usá isNaN() para detectar esos casos.

*/

let num1 = prompt("Ingresá el primer número:");
let num2 = prompt("Ingresá el segundo número:");

num1 = parseFloat(num1);
num2 = parseFloat(num2);

console.log("Suma: " + (num1 + num2));
console.log("Resta: " + (num1 - num2));
console.log("Multiplicación: " + (num1 * num2));
console.log("División: " + (num1 / num2));
console.log("Módulo: " + (num1 % num2));


/* EJ 2
Queremos mostrar un mensaje que combine el nombre y la edad del
usuario, y además saber si es mayor de edad para adaptar el
contenido si hace falta.
Qué tenés que hacer:
● Pedir nombre y edad con prompt().
● Validar que la edad sea un número válido con isNaN().
● Convertir la edad de texto a número con parseInt() o Number().
● Concatenar los datos para formar un mensaje descriptivo y mostrarlo en consola.
● Comparar la edad para decir si la persona es mayor de edad o no.
Tips para tu código:
● Asegurate que los mensajes en consola sean claros y fáciles de entender.
● Probá distintos valores para asegurarte de que tu programa no falla con entradas
inesperadas.
*/

let nombre = prompt("Ingresá tu nombre:");
let edad = parseInt(prompt("Ingresá tu edad:"));

if (isNaN(edad)) {
    console.log("Por favor, ingresá una edad válida.");
} else {
    let mensaje = "Hola, " + nombre + ". Tienes " + edad + " años.";
    console.log(mensaje);

    if (edad >= 18) {
        console.log("Eres mayor de edad.");
    } else {
        console.log("No eres mayor de edad.");
    }
}

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