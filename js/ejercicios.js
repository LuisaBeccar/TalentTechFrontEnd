


function miAccion1() {

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

        // Convertimos a número
        num1 = parseFloat(num1);
        num2 = parseFloat(num2);

        // Validamos si ingresaron números válidos con isNaN
        if (isNaN(num1) || isNaN(num2)) {
            window.alert("Por favor, ingresá valores numéricos válidos.");
            return; // Detiene la ejecución si hay un error
        }

        // Mostramos en consola
        console.log("Suma: " + (num1 + num2));
        console.log("Resta: " + (num1 - num2));
        console.log("Multiplicación: " + (num1 * num2));
        console.log("División: " + (num1 / num2));
        console.log("Módulo: " + (num1 % num2));

        // Usamos alert en lugar de confirm para mostrar los resultados
        window.alert(
            "Resultados de las operaciones:" +
            "\n• Suma: " + (num1 + num2) +
            "\n• Resta: " + (num1 - num2) +
            "\n• Multiplicación: " + (num1 * num2) +
            "\n• División: " + (num1 / num2) +
            "\n• Módulo: " + (num1 % num2)
        ); /* el mensaje de alerto va adentro del if else, porque si no, si el usuario ingresa un valor no numérico, se va a mostrar un mensaje que no tiene sentido. */
    }

function miAccion2() {

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

        let nombre1 = prompt("Ingresá tu nombre:");
        let edad = parseInt(prompt("Ingresá tu edad:"));

        if (isNaN(edad)) {
            console.log("Por favor, ingresá una edad válida.");
        } else {
            let mensaje = "Hola, " + nombre1 + ". Tienes " + edad + " años.";
            console.log(mensaje);

            if (edad >= 18) {
                console.log("Eres mayor de edad.");
            } else {
                console.log("No eres mayor de edad.");
            }
        window.alert(mensaje);  /* el mansaje de alertava adentro del if else, porque si no, si el usuario ingresa un valor no numérico, se va a mostrar un mensaje que no tiene sentido. */

        }

    }

