
const chatbotmodal = new bootstrap.Modal(document.getElementById("chatbot-help"), {});

const chatInput = document.getElementById('chatInput');
const chatLog = document.getElementById('chatLog');

var map;
var markers = [];
var counterChat = 0;

var locations = [
  { lat: 10.40736580084985, lng: -75.49202041226125, nombre: 'Comisaria de Familia - Cartagena de Indias' },
  { lat: 10.409715115332057, lng: -75.48435710364696, nombre: 'Casa de Justicia Chiquinquira - Cartagena de Indias' },
  { lat: 11.028463969250513, lng: -74.80715132672596, nombre: 'CAVIF' }
  
];

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: -34.397, lng: 150.644 },
      zoom: 8,
      mapTypeId: 'roadmap', // Tipo de mapa inicial
      mapTypeControl: false // Ocultar el control de tipo de mapa predeterminado
  });

  for (var i = 0; i < locations.length; i++) {
      var marker = new google.maps.Marker({
          position: locations[i],
          map: map,
          title: locations[i].nombre,
      });
      markers.push(marker);
  }
}

document.getElementById('chatInput').addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
    Chating();
  }
});

function markMap(point)
{
  map.setCenter(locations[point]);
  map.setZoom(20);
}


function goToViolentometro()
{

  var nombre = $('#nombre').val();
  var email = $('#direccion').val();
  var edad = $('#edad').val();
  var telefono = $('#telefono').val();

  if (nombre.length == 0 || direccion.length == 0 || edad <= 0 || telefono.length == 0)  
  {
      alert('Por favor, completa todos los campos.');
      return;
  }

  window.location.href = "violentometro.html";
}

function OpenChat()
{
  counterChat++;
  chatLog.innerHTML = "";

  chatbotmodal.show();
  const newMessage = document.createElement('div');
  newMessage.classList.add('chat-message-bot');
  newMessage.textContent = "-Hola, estoy aquí para ayudarte. Necesito estos datos: Nombre, edad, dirección y número.";
  chatLog.appendChild(newMessage);
  chatInput.value = '';
  chatLog.scrollTop = 0;

  const newMessage2 = document.createElement('div');
  newMessage2.classList.add('chat-message-bot');
  newMessage2.textContent = "Escribe tu nombre a continuación...";
  chatLog.appendChild(newMessage2);
  chatInput.value = '';
  chatLog.scrollTop = 0;
}

function Chating()
{

  if (chatInput.value.trim() !== '') {
    const newMessage = document.createElement('div');
    newMessage.classList.add('chat-message');
    newMessage.textContent = chatInput.value;
    chatLog.appendChild(newMessage);
    chatInput.value = '';
    chatLog.scrollTop = chatLog.scrollHeight;
  }

  counterChat++;

  if(counterChat == 2)
  {
    const newMessage = document.createElement('div');
    newMessage.classList.add('chat-message-bot');
    newMessage.textContent = "Escribe tu edad...";
    chatLog.appendChild(newMessage);
    chatInput.value = '';
    chatLog.scrollTop = chatLog.scrollHeight;
    counterChat++;
    return;
  }

  if(counterChat == 4)
  {
    const newMessage = document.createElement('div');
    newMessage.classList.add('chat-message-bot');
    newMessage.textContent = "Escribe tu dirección...";
    chatLog.appendChild(newMessage);
    chatInput.value = '';
    chatLog.scrollTop = chatLog.scrollHeight;
    counterChat++;
    return;
  }

  if(counterChat == 6)
  {
    const newMessage = document.createElement('div');
    newMessage.classList.add('chat-message-bot');
    newMessage.textContent = "Escribe tu número de teléfono...";
    chatLog.appendChild(newMessage);
    chatInput.value = '';
    chatLog.scrollTop = chatLog.scrollHeight;
    counterChat++;
    return;
  }

  if(counterChat == 8)
    {
      const newMessage = document.createElement('div');
      newMessage.classList.add('chat-message-bot');
      newMessage.textContent = "¿Como te podemos ayudar? Elige una de estas categorías:";

      const newMessage2 = document.createElement('button');
      newMessage2.classList.add('btn','btn-primary','mx-2','my-1');
      newMessage2.textContent = "Asesoramiento psicológico.";

      const newMessage3 = document.createElement('button');
      newMessage3.classList.add('btn','btn-primary','mx-2','my-1');
      newMessage3.textContent = "Asesoramiento Legal. ";

      const newMessage4 = document.createElement('button');
      newMessage4.classList.add('btn','btn-primary','mx-2','my-1');
      newMessage4.textContent = "Rutas de atención. ";

      const newMessage5 = document.createElement('button');
      newMessage5.classList.add('btn','btn-primary','mx-2','my-1');
      newMessage5.textContent = "¿Estas sufriendo Violencia? ";

      const newMessage6 = document.createElement('button');
      newMessage6.classList.add('btn','btn-primary','mx-2','my-1');
      newMessage6.textContent = "Información de nuestra empresa.";

      const newMessage7 = document.createElement('button');
      newMessage7.classList.add('btn','btn-primary','mx-2','my-1');
      newMessage7.textContent = "Otro.";

      chatLog.appendChild(newMessage);
      chatLog.appendChild(newMessage2);
      chatLog.appendChild(newMessage3);
      chatLog.appendChild(newMessage4);
      chatLog.appendChild(newMessage5);
      chatLog.appendChild(newMessage6);
      chatLog.appendChild(newMessage7);
      chatInput.value = '';
      chatLog.scrollTop = chatLog.scrollHeight;
      counterChat++;
      return;
    }

  chatLog.scrollTop = 0;
}