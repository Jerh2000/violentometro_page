const modalViolentometro = new bootstrap.Modal(document.getElementById("modal-violentometro"), {});

$(document).ready(function ()
{
    $(document).keypress(function(event) {
        if (event.which === 13) { // 13 es el código de la tecla Enter
            nextQuestion() ;
        }
    });
});


const questions = [
    "1) ¿Te convence de no salir sola por seguridad y te prevee de lo necesario para que no lo hagas?",
    '2) ¿Te ha mencionado que para tener éxito como mujer debes estar siempre arreglada, maquillada y ser bonita?',
    '3) ¿Tiene control sobre tus finanzas?',
    '4) ¿Te pide las contraseñas para acceder a tu banco en línea o hacer retiros de cajeros automáticos?',
    '5) ¿Te ha pedido tus contraseñas bancarias o acceso a ellas cuando quiera?',
    '6) ¿Alguna vez te han dicho o haz Escuchado esta frase: "Si eres mujer debes ser madre"?',
    '7) ¿Alguna vez te han dicho o haz Escuchado esta frase: "ser mamá es lo más lindo de ser mujer"?',
    '8) ¿Alguna vez te han dicho o haz Escuchado esta frase: "Deberías ser más femenina "?',
    '9) ¿Ha tenido comportamientos físicamente agresivos, como empujarte o provocar daño?',
    '10) ¿Te obliga a subir o bajar de peso según su ideal de belleza?',
    '11) ¿Le ha hecho comentarios sexuales no deseados?',
    '12) ¿Te ha exigido que no te arregles o maquilles o cuides tu apariencia personal?',
    '13) ¿Te menosprecia o se burla de tus habilidades y capacidades?',
    '14) ¿Te ha dificultado estudiar o trabajar debido a las responsabilidades domésticas, cuidado de hijos/as o personas dependientes de ti?',
    '15) ¿Controla o administra tus ingresos?',
    '16) ¿Te ha prohibido emprender un negocio o realizar ventas?',
    '17) ¿Se presenta sin previo aviso en tu trabajo, estudios u otros lugares para controlar con quien estás?',
    '18) ¿Te pone celosa o se molesta si hablas con otros hombres y te prohíbe tener amistades con ellos?',
    '19) ¿Te ha causado lesiones que han requerido hospitalizacion o atención médica?',
    '20) ¿Te ha causado lesiones como torceduras o fracturas?',
    '21) ¿Te ha abofeteado o lanzado objetos para hacerte daño?',
    '22) ¿Haz sido forzada a tener relaciones sexuales con otras personas?',
    '23) ¿Ha requerido atención médica por infecciones de transmisión sexual o lesiones en sus partes íntimas debido a agresiones sexuales?',
    '24) ¿Te ha obligado a tener relaciones sexuales con otras personas?',
    '25) ¿Ha tenido contacto sexual no deseado en sus partes íntimas?',
    '26) ¿Te amenaza a través de miradas, gestos o señas?',
    '27) ¿Se ha sentido acosada sexualmente a través de medios virtuales como redes sociales, teléfono o correo electrónico?',
    '28) ¿Te ha quitado documentos,  artículos personales o han quitado tus ingresos?',
    '29) ¿Te ha impedido tener contacto con tu familia o amigos?',
    '30) ¿Alguna vez te han dicho o haz Escuchado esta frase: "Se lo busco por andar vestida así" ?',
    '31) ¿Alguna vez te han dicho o haz Escuchado esta frase: "Si le pegan es porque se lo merece"?'
];

const options = [
    "Nunca",
    "Casi Nunca",
    "Algunas Veces",
    "Casi Siempe",
    "Siempre"
];

const backgrounds = [
    'url("img/bg/6047506.jpg")',
    'url("img/bg/rm222-mind-22.jpg")'
];

let currentQuestion = 0;

function createQuestionHTML(question, index) {
    const container = document.createElement('div');
    container.classList.add('question','text-center','mt-5');
    container.setAttribute('data-index', index);

    const questionTitle = document.createElement('h2');
    questionTitle.classList.add('fs-3');
    questionTitle.classList.add('text-center','fw-bold');
    questionTitle.innerText = question;
    container.appendChild(questionTitle);

    options.forEach((option, i) => 
    {
        const formCheck = document.createElement('div');
        formCheck.classList.add('form-check', 'form-check-inline','mt-2');

        const input = document.createElement('input');
        input.type = 'radio';
        input.name = `radio-${index}`;
        input.value = `${i}`;
        input.classList.add('form-check-input');

        const label = document.createElement('label');
        label.classList.add('fs-5');
        label.appendChild(input);
        label.appendChild(document.createTextNode(option));

        formCheck.appendChild(label);
        container.appendChild(formCheck);

    });

    return container;
}

document.addEventListener('DOMContentLoaded', () => {
    const questionContainer = document.getElementById('question-container');

    questions.forEach((question, index) => {
        questionContainer.appendChild(createQuestionHTML(question, index));
    });

    updateNavigation();
});

function updateNavigation() 
{
    let carousel = document.getElementById('carousel');
    let randomBackground = backgrounds[Math.floor(Math.random() * backgrounds.length)];
    console.log(randomBackground);
    carousel.style.backgroundImage = randomBackground;

    document.getElementById('prev').disabled = currentQuestion === 0;
    document.getElementById('next').style.display = currentQuestion === questions.length - 1 ? 'none' : 'inline-block';
    document.getElementById('finish').style.display = currentQuestion === questions.length - 1 ? 'inline-block' : 'none';

    document.querySelectorAll('.question').forEach((question, index) => {
        question.style.transform = `translateX(-${currentQuestion * 100}%)`;
    });
}

function prevQuestion() 
{
    if (currentQuestion > 0) {
        currentQuestion--;
        updateNavigation();
    }
}

function nextQuestion() 
{
    const selectedOption = document.querySelector(`input[name="radio-${currentQuestion}"]:checked`);
    console.log(selectedOption);
    console.log(currentQuestion);
    if (!selectedOption) {
        return;
    } 

    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        updateNavigation();
    }
}

function finishQuiz() 
{
    OpenViolentometro() ;
}

function OpenViolentometro() 
{
    $('#h-red-alert').hide();
    $('#b-red-alert').hide();
    $('#h-orange-alert').hide();
    $('#b-orange-alert').hide();
    $('#h-yellow-alert').hide();
    $('#b-yellow-alert').hide();

    let allChecked = true;
    let total = 0;
    // Obtener todos los nombres de los grupos de radio buttons
    $('input[type="radio"]').each(function() {
    const name = $(this).attr('name');
    const checkedRadio = $('input[name="' + name + '"]:checked');

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
    
    function loopWithDelay(index) 
    {
        setTimeout(function() {
            updateMercuryHeight(index);
            if (index < total) 
            { 
                loopWithDelay(index + 1); 
                $("#label-result").text('Su puntuación es de: ' + (index + 1))
            }
        }, 100);
    }

    loopWithDelay(0);


}


function updateMercuryHeight(value) 
{
    var mercury = document.getElementById('mercury');
    mercury.style.height = (value / 124) * 100 + '%';

    var modalContent = $('.modal-content');
    modalContent.removeClass('modal-red modal-yellow modal-orange');

    var color;
    if (value <= 32) 
    {
        color = "#FFEE00";
        $('#h-red-alert').hide();
        $('#b-red-alert').hide();
        $('#h-orange-alert').hide();
        $('#b-orange-alert').hide();
        $('#h-yellow-alert').show();
        $('#b-yellow-alert').show();
        modalContent.addClass('modal-yellow');
        $('#img-result').attr('src', 'img/advertencia.png');
    } else if (value <= 72) 
    {
        color = "#FF9100";
        $('#h-red-alert').hide();
        $('#b-red-alert').hide();
        $('#h-yellow-alert').hide();
        $('#b-yellow-alert').hide();
        $('#h-orange-alert').show();
        $('#b-orange-alert').show();
        modalContent.addClass('modal-orange');
        $('#img-result').attr('src', 'img/advertencia-orange.png');
    } else 
    {
        color = "#E20000";
        $('#h-orange-alert').hide();
        $('#b-orange-alert').hide();
        $('#h-yellow-alert').hide();
        $('#b-yellow-alert').hide();
        $('#h-red-alert').show();
        $('#b-red-alert').show();
        modalContent.addClass('modal-red');
        $('#img-result').attr('src', 'img/advertencia-red.png');
    }


    // Aplicamos el color al degradado
    mercury.style.background = "linear-gradient(to bottom, " + color + " 0%, " + color + " 25%, " + color + " 25%, " + color + " 50%, " + color + " 50%, " + color + " 100%)";
    //mercury.style.background = "linear-gradient(to bottom, rgb(117, 117, 117) 0%, rgb(117, 117, 117) 33%, rgb(117, 117, 117) 33%, rgb(117, 117, 117) 66%, rgb(117, 117, 117) 66%, rgb(117, 117, 117) 100%)";

}
