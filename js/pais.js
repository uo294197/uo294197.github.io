"use strict";
class Pais{
    constructor(nombreCircuito,latMeta, longMeta){
       this.nombreCircuito=nombreCircuito;
	   this.latMeta = latMeta;
      this.longMeta = longMeta;
    }
	
    setValores(){
		this.apikey = "9b78bae472a2bd2d0d112053ad77a805";
		this.ciudad = this.nombreCircuito;
        this.tipo = "&mode=xml";
        this.unidades = "&units=metric";
        this.idioma = "&lang=es";
        this.url = "http://api.openweathermap.org/data/2.5/forecast?q="+this.nombreCircuito +"mode="+this.tipo + this.unidades + this.idioma + "&appid=" + this.apikey;
    }
    
    getNombreCircuito(){
        return this.nombreCircuito
    }
   
 
	 cargarDatos(){
        $.ajax({
            dataType: "xml",
            url: this.url,
            method: 'GET',
            success: function(datos){
                
                  
                    $("h5").text((new XMLSerializer()).serializeToString(datos));
                
           
                   
                    var ciudad                = $('location',datos).attr("name");
                    var temperaturaMin        = $('temperature',datos).attr("min");
                    var temperaturaMax        = $('temperature',datos).attr("max");
                    var humedad               = $('humidity',datos).attr("value");
                    var precipitacionValue    = $('precipitation',datos).attr("value");
					var symbol    = $('symbol',datos).attr("var");
                    
					
                    var stringDatos =   "<li>Ciudad: " + ciudad + "</li>";
                    stringDatos += "<li>Temperatura mÃ­nima: " + temperaturaMin + " grados Celsius</li>";
                    stringDatos += "<li>Temperatura mÃ¡xima: " + temperaturaMax + " grados Celsius</li>";
                    stringDatos += "<li>Humedad: " + humedad + " " + humedadUnit + "</li>";
                    stringDatos += "<li>PrecipitaciÃ³n valor: " + precipitacionValue + "</li>";
                    $("p").html(stringDatos);                  
                },
            error:function(){
                $("h3").html("Â¡Tenemos problemas! No puedo obtener XML de <a href='http://openweathermap.org'>OpenWeatherMap</a>"); 
                $("h4").remove();
                $("h5").remove();
                $("p").remove();
                }
        });
    }
    crearElemento(tipoElemento, texto, insertarAntesDe){
        // Crea un nuevo elemento modificando el Ã¡rbol DOM
        // El elemnto creado es de 'tipoElemento' con un 'texto' 
        // El elemnto se coloca antes del elemnto 'insertarAntesDe'
        var elemento = document.createElement(tipoElemento); 
        elemento.innerHTML = texto;
        $(insertarAntesDe).before(elemento);
    }
    verXML(){
        //Muestra el archivo JSON recibido
        this.crearElemento("h2","Datos en XML desde <a href='http://openweathermap.org'>OpenWeatherMap</a>","footer"); 
        this.crearElemento("h4","XML","footer"); // Crea un elemento con DOM        
        this.crearElemento("h5","","footer"); // Crea un elemento con DOM para el string con XML
        this.crearElemento("h4","Datos","footer"); // Crea un elemento con DOM 
        this.crearElemento("p","","footer"); // Crea un elemento con DOM para los datos obtenidos con XML
        this.cargarDatos();
        $("button").attr("disabled","disabled");
    }
}

var pais = new Pais("Shanghai",31.336667, 121.218611)


