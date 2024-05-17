const modalViolentometro = new bootstrap.Modal(document.getElementById("modal-violentometro"), {});

$(document).ready(function ()
{


});

function OpenViolentometro() 
{
    let allChecked = true;
    let total = 0;
    // Obtener todos los nombres de los grupos de radio buttons
    $('input[type="radio"]').each(function() {
        const name = $(this).attr('name');
        const checkedRadio = $('input[name="' + name + '"]:checked');
        console.log(checkedRadio);
        if (checkedRadio.length === 0) {
            allChecked = false;
            return false; // Salir del bucle each si se encuentra un grupo sin selección
        }
    });

    if (!allChecked) 
    {
        alert('Por favor, responde todas las preguntas.');
        return;
    }

    $('input[type="radio"]:checked').each(function() {
        total += parseFloat($(this).val());
    });

    modalViolentometro.show(); // Mostramos el modal

    // Creamos una función interna para ejecutar el bucle con un retraso
    function loopWithDelay(index) {
        setTimeout(function() {
            updateMercuryHeight(index);
            if (index < total) { // Si no hemos llegado al último índice
                loopWithDelay(index + 1); // Llamamos a la función de nuevo con el siguiente índice
            }
        }, 100); // Esperamos 100 milisegundos (0.1 segundo) antes de ejecutar la siguiente iteración
    }

    // Iniciamos el bucle con retraso
    loopWithDelay(0);
}


function updateMercuryHeight(value) 
{
    var mercury = document.getElementById('mercury');
    mercury.style.height = (value / 125) * 100 + '%';

    var color;
    if (value < 40) 
    {
        color = "yellow";
    } else if (value < 80) {
        color = "orange";
    } else {
        color = "red";
    }

    // Aplicamos el color al degradado
    mercury.style.background = "linear-gradient(to bottom, yellow 0%, yellow 25%, orange 25%, orange 50%, " + color + " 50%, " + color + " 100%)";

}