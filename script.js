

document.addEventListener('DOMContentLoaded', function() {
  const sections = document.querySelectorAll('section'); // Obtener todas las secciones
  const muñequito = document.getElementById('muñequito');

  const firstSection = sections[0]; // Obtener la primera sección
  const firstSectionRect = firstSection.getBoundingClientRect(); // Obtener el rectángulo de la primera sección

  // Obtener la posición inicial del muñequito
  const initialTop = firstSectionRect.top + window.scrollY - 0; // -100 para ajustar la posición vertical
  const initialLeft = firstSectionRect.left + 50; // Ajustar la posición horizontal

  muñequito.style.top = `${initialTop}px`; // Establecer la posición inicial del muñequito
  muñequito.style.left = `${initialLeft}px`;

  sections.forEach(function(section, index) {
    section.addEventListener('click', function() {
      // Obtener la posición de la sección clickeada
      const rect = section.getBoundingClientRect();
      const scrollToTop = rect.top + window.scrollY - 0; // -100 para ajustar la posición vertical
      const scrollToLeft = (index * 200) - (firstSectionRect.left - 50); // Ajustar posición horizontal relativa a la primera sección

      // Desplazar la página a la sección clickeada
      window.scrollTo({
        top: scrollToTop,
        behavior: 'smooth' // Desplazamiento suave
      });

      // Mover el muñequito a la sección clickeada
      muñequito.style.top = `${scrollToTop}px`;
      muñequito.style.left = `${scrollToLeft}px`;
    });
  });


});

var map;
var markers = [];

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

// function initMap() {
//   // Coordenadas de los puntos que deseas mostrar en el mapa
  


//   // Opciones del mapa
//   var opcionesMapa = {
//     zoom: 10, // Nivel de zoom
//     center: { lat: 10.393967, lng: -75.481516 } // Centro del mapa
//   };

//   // Crear un nuevo mapa dentro del contenedor
//   var mapa = new google.maps.Map(document.getElementById('map'), opcionesMapa);

//   // Iterar sobre los puntos y agregar marcadores
//   for (var i = 0; i < puntos.length; i++) {
//     var punto = puntos[i];
//     var marcador = new google.maps.Marker({
//       position: { lat: punto.lat, lng: punto.lng },
//       map: mapa,
//       title: punto.nombre // Nombre del punto (se muestra al pasar el cursor sobre el marcador)
//     });
//   }
// }

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