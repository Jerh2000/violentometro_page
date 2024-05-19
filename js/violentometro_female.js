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
    "1) ¿La convences de no salir sola por seguridad y la prevees de lo necesario para que no lo hagas?",
    '2) ¿Alguna vez te han dicho o haz Escuchado esta frase: "Que pague al fin es hombre"?',
    '3) ¿Alguna vez haz dicho o haz Escuchado esta frase: "Ella no es para tener una relación seria"?',
    '4) ¿Alguna vez te han dicho o haz Escuchado esta frase: "El hombre no es gente ni familia"?',
    '5) ¿Alguna vez te han dicho o haz Escuchado esta frase: "Los Hombres no lloran"?',
    '6) ¿Le haz pedido sus contraseñas bancarias o acceso a ellas cuando quieres?',
    '7) ¿Le pides las contraseñas para acceder a su banco en línea o hacer retiros de cajeros automáticos?',
    '8) ¿Tienes control sobre sus finanzas?',
    '9) ¿Le haz mencionado que para tener éxito como mujer debe estar siempre arreglada, maquillada y ser bonita?',
    '10) ¿La convences de no salir sola por seguridad y la prevees de lo necesario para que no lo hagas?',
    '11) ¿Haz tenido comportamientos físicamente agresivos, como empujarla o provocarle daño?',
    '12) ¿La obligas a subir o bajar de peso según tu ideal de belleza?',
    '13) ¿Le haz hecho comentarios sexuales no deseados?',
    '14) ¿Le haz exigido que no se arregle, maquille o cuide su apariencia personal?',
    '15) ¿Menosprecias o te burlas de sus habilidades y capacidades?',
    '16) ¿Le dificultas estudiar o trabajar debido a las responsabilidades domésticas, cuidado de hijos/as o personas dependientes de ella?',
    '17) ¿Controlas o administras sus ingresos?',
    '18) ¿Le prohibes emprender un negocio o realizar ventas?',
    '19) ¿Te presentas sin previo aviso en su trabajo, estudios u otros lugares para controlar con quien está?',
    '20) ¿Le provocas celos o te molesta si habla con otros hombres y le prohíbes tener amistades con ellos?',
    '21) ¿Le ha causado lesiones que han requerido hospitalizacion o atención médica?',
    '22) ¿Le ha causado lesiones como torceduras o fracturas?',
    '23) ¿Le ha abofeteado o lanzado objetos para provocarle daño?',
    '24) ¿La ha forzada a tener relaciones sexuales con otras personas?',
    '25) ¿Ha requerido atención médica por infecciones de transmisión sexual o lesiones en sus partes íntimas debido a agresiones sexuales?',
    '26) ¿La ha obligado a tener relaciones sexuales con otras personas?',
    '27) ¿Le haz hecho contacto sexual no deseado en sus partes íntimas?',
    '28) ¿La amenazas a través de miradas, gestos o señas?',
    '29) ¿La haz acosado sexualmente a través de medios virtuales como redes sociales, teléfono o correo electrónico?',
    '30) ¿Le haz quitado documentos, artículos personales o haz quitado sus ingresos?',
    '31) ¿Le haz impedido tener contacto con su familia o amigos?'
];

const options = [
    "Nunca",
    "Casi Nunca",
    "Algunas Veces",
    "Casi Siempe",
    "Siempre"
];

const backgrounds = [
    'url("img/bg/3528115.jpg")',
    'url("img/bg/5097013.jpg")',
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
    if (value <= 40) 
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
    } else if (value <= 80) 
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
