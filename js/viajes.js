"use strict";
class Viajes {
  constructor() {
    navigator.geolocation.getCurrentPosition(this.getPosicion.bind(this), this.verErrores.bind(this));
  }

	getLongitud(){
        return this.longitud;
    }
	
    getLatitud(){
        return this.latitud;
    }
	
    getAltitud(){
        return this.altitud;
    }
	
	getMapaEstatico(dondeVerlo) {
		var ubicacion = document.getElementById(dondeVerlo);

		var apiKey = "&key=AIzaSyCTrIKXCE08WLNimTdu5W0taOgFe08W6N4";
		var url = "https://maps.googleapis.com/maps/api/staticmap?";

		var centro = "center=" + this.latitud + "," + this.longitud;
		var zoom = "&zoom=15";
		var tamaño = "&size=800x600";
		var marcador = "&markers=color:red%7Clabel:S%7C" + this.latitud + "," + this.longitud;
		var sensor = "&sensor=false";

		this.imagenMapa = url + centro + zoom + tamaño + marcador + sensor + apiKey;
		ubicacion.innerHTML = "<img src='" + this.imagenMapa + "' alt='mapa estático google' />";
	}
  
  getPosicion(posicion) {
    this.longitud = posicion.coords.longitude;
    this.latitud = posicion.coords.latitude;
    this.precision = posicion.coords.accuracy;
    this.altitud = posicion.coords.altitude;
    this.precisionAltitud = posicion.coords.altitudeAccuracy;
    this.rumbo = posicion.coords.heading;
    this.velocidad = posicion.coords.speed;
	this.getMapaEstatico("mapaEstatico");
  }

  verErrores(error) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        this.mensaje = "El usuario no permite la petición de geolocalización";
        break;
      case error.POSITION_UNAVAILABLE:
        this.mensaje = "Información de geolocalización no disponible";
        break;
      case error.TIMEOUT:
        this.mensaje = "La petición de geolocalización ha caducado";
        break;
      case error.UNKNOWN_ERROR:
        this.mensaje = "Se ha producido un error desconocido";
        break;
    }
  }
  
   leerArchivoTexto(files) 
  { 
      var archivo = files[0];
      var nombre = document.getElementById("nombreArchivo");
      var tamaño = document.getElementById("tamañoArchivo");
      var tipo = document.getElementById("tipoArchivo");
      var ultima = document.getElementById("ultimaModificacion");
      var contenido = document.getElementById("contenidoArchivo");
      var areaVisualizacion = document.getElementById("areaTexto");
      var errorArchivo = document.getElementById("errorLectura");
      nombre.innerText = "Nombre del archivo: " + archivo.name;
      tamaño.innerText = "Tamaño del archivo: " + archivo.size + " bytes"; 
      tipo.innerText = "Tipo del archivo: " + archivo.type;
      ultima.innerText = "Fecha de la última modificación: " + archivo.lastModifiedDate;
      contenido.innerText="Contenido del archivo de texto:"
    
      var tipoTexto = /text.*/;
      if (archivo.type.match(tipoTexto)) 
        {
          var lector = new FileReader();
          lector.onload = function (evento) {
         
            areaVisualizacion.innerText = lector.result;
            }      
          lector.readAsText(archivo);
          }
      else {
          errorArchivo.innerText = "Error : ¡¡¡ Archivo no válido !!!";
          }       
  };
  
  leerArchivoKML(files){
	var archivo = files[0];
    var tipoKML = /xml.*/;
    if (archivo.type.match(tipoKML)) {
      var lector = new FileReader();
      lector.onload = function (evento) {
        var kmlContent = lector.result;

        // Convertimos el contenido KML en un Blob para cargarlo en el mapa
        var blob = new Blob([kmlContent], { type: 'application/vnd.google-earth.kml+xml' });
        var url = URL.createObjectURL(blob);

        // Añadimos el archivo KML al mapa
        var kmlLayer = new google.maps.KmlLayer({
          url: url,
          map: mapaGeoposicionado,
          suppressInfoWindows: false, // Opcional: Controla si se muestran las ventanas de información de los elementos del KML
          preserveViewport: true // Opcional: Mantiene el área de vista actual del mapa
        });
      };
      lector.readAsText(archivo);
    } else {
      alert("Error: El archivo no es un archivo KML válido.");
    }
  }
  

  
}

var miMapa = new Object();
const Viaje = new Viajes();
var infoWindow;

 
		  
  async function initMap(){  
    var centro = {lat: 43.3672702, lng: -5.8502461};
    var mapaGeoposicionado = new google.maps.Map(document.getElementById("mapaDinamico"),{
        zoom: 8,
        center:centro,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    
    infoWindow = new google.maps.InfoWindow;
    if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('LocalizaciÃ³n encontrada');
            infoWindow.open(mapaGeoposicionado);
            mapaGeoposicionado.setCenter(pos);
          }, function() {
            handleLocationError(true, infoWindow, mapaGeoposicionado.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, mapaGeoposicionado.getCenter());
        }
      }

      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: Ha fallado la geolocalizaciÃ³n' :
                              'Error: Su navegador no soporta geolocalizaciÃ³n');
        infoWindow.open(mapaGeoposicionado);
      }

miMapa.initMap = initMap;






