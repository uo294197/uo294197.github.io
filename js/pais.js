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
        this.url = "http://api.openweathermap.org/data/2.5/forecast?lat=" + this.latMeta+"&lon="+this.longMeta + this.tipo + this.unidades + this.idioma + "&appid=" + this.apikey;
    }
    
    getNombreCircuito(){
        return this.nombreCircuito
    }
   
cargarDatos() {
    $.ajax({
        dataType: "xml",
        url: this.url,
        method: 'GET',
        success: function(datos) {
            console.log("Datos recibidos:", datos);  // Verificar que llegan datos
            
            let forecast = ""; // Acumula el HTML de los pronósticos
            
            // Itera sobre cada <time> en <forecast>
            $(datos).find("forecast > time").each(function() {
                // Obtén la información de fecha
                let fecha = $(this).attr("from").split("T")[0];
                
                // Extrae los datos del clima
                let tempMax = parseFloat($(this).find("temperature").attr("max")) - 273.15;
                let tempMin = parseFloat($(this).find("temperature").attr("min")) - 273.15;
                let humedad = $(this).find("humidity").attr("value");
                let icono = $(this).find("symbol").attr("var");
                let descripcion = $(this).find("symbol").attr("name");
                let lluvia = $(this).find("precipitation").attr("probability") || "0";
                
                // Genera el HTML de cada día
                forecast += `<article>
                    <h3>Pronóstico para ${fecha}</h3>
                    <p>Temperatura mínima: ${tempMin.toFixed(1)} °C</p>
                    <p>Temperatura máxima: ${tempMax.toFixed(1)} °C</p>
                    <p>Humedad: ${humedad}%</p>
                    <p><img src="https://openweathermap.org/img/wn/${icono}.png" alt="${descripcion}"> ${descripcion}</p>
                    <p>Probabilidad de lluvia: ${lluvia}%</p>
                </article>`;
            });
            
            // Verifica el HTML generado en la consola antes de insertarlo
            console.log("HTML generado:", forecast);

            // Inserta el pronóstico en el body
            $("body").append(`<section>${forecast}</section>`);
        },
        error: function() {
            // En caso de error en la petición, muestra un mensaje en el body
            $("body").append("<section><p>¡Error al cargar los datos del tiempo!</p></section>");
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
pais.verXML();

