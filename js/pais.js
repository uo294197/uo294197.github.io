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
            // Verifica si se reciben datos
            console.log("Datos recibidos:", datos);  
            
            let forecast = ""; // Acumula el HTML de los pronósticos
            
            // Itera sobre cada <time> en <forecast> y verifica que existan estos nodos
            const times = $(datos).find("forecast > time");
            console.log("Nodos de pronóstico encontrados:", times.length);
            
            if (times.length === 0) {
                console.log("No se encontraron nodos <time> en <forecast>");
            }
            
            times.each(function() {
                try {
                    // Obtén la información de fecha
                    let fecha = $(this).attr("from").split("T")[0];
                    console.log("Fecha procesada:", fecha);
                    
                    // Extrae los datos del clima
                    let tempMax = parseFloat($(this).find("temperature").attr("max")) - 273.15;
                    let tempMin = parseFloat($(this).find("temperature").attr("min")) - 273.15;
                    let humedad = $(this).find("humidity").attr("value");
                    let icono = $(this).find("symbol").attr("var");
                    let descripcion = $(this).find("symbol").attr("name");
                    let lluvia = $(this).find("precipitation").attr("probability") || "0";
                    
                    // Mensajes de depuración para verificar cada valor
                    console.log("Temperatura mínima:", tempMin);
                    console.log("Temperatura máxima:", tempMax);
                    console.log("Humedad:", humedad);
                    console.log("Icono:", icono);
                    console.log("Descripción:", descripcion);
                    console.log("Probabilidad de lluvia:", lluvia);
                    
                    // Genera el HTML de cada día
                    forecast += `<article>
                        <h3>Pronóstico para ${fecha}</h3>
                        <p>Temperatura mínima: ${tempMin.toFixed(1)} °C</p>
                        <p>Temperatura máxima: ${tempMax.toFixed(1)} °C</p>
                        <p>Humedad: ${humedad}%</p>
                        <p><img src="https://openweathermap.org/img/wn/${icono}.png" alt="${descripcion}"> ${descripcion}</p>
                        <p>Probabilidad de lluvia: ${lluvia}%</p>
                    </article>`;
                } catch (error) {
                    console.log("Error procesando nodo <time>:", error);
                }
            });
            
            // Verifica el HTML generado en la consola antes de insertarlo
            console.log("HTML generado:", forecast);

            // Inserta el pronóstico en el body si forecast tiene contenido
            if (forecast) {
                $("body").append(`<section>${forecast}</section>`);
            } else {
                $("body").append("<section><p>No se generó HTML del pronóstico.</p></section>");
            }
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

