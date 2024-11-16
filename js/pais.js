class Pais {
    constructor(nombreCircuito, latMeta, longMeta) {
        this.nombreCircuito = nombreCircuito;
        this.latMeta = latMeta;
        this.longMeta = longMeta;
    }

    setValores() {
        this.apikey = "9b78bae472a2bd2d0d112053ad77a805";
        this.ciudad = this.nombreCircuito;
        this.tipo = "&mode=xml";
        this.unidades = "&units=metric";
        this.idioma = "&lang=es"; 
        this.url = "http://api.openweathermap.org/data/2.5/forecast?lat=" + this.latMeta + "&lon=" + this.longMeta + this.tipo + this.unidades + this.idioma + "&appid=" + this.apikey;
    }

    getNombreCircuito() {
        return this.nombreCircuito;
    }

  cargarDatos(horaEspecifica) {
    $.ajax({
        dataType: "xml",
        url: this.url,
        method: 'GET',
        success: (datos) => {
            // Log de la respuesta completa
            console.log("Respuesta completa del API:", datos);

            let forecast = ""; // Acumula el HTML de los pronósticos
            const times = $(datos).find("forecast > time");

            console.log("Nodos de pronóstico encontrados:", times.length);

            if (times.length === 0) {
                console.log("No se encontraron nodos <time> en <forecast>");
            }

            // Itera sobre cada <time> y verifica si la hora coincide con la deseada
            times.each((index, timeNode) => {
                try {
                    let fechaHora = $(timeNode).attr("from");
                    let fecha = fechaHora.split("T")[0];
                    let hora = fechaHora.split("T")[1].split(":")[0]; // Extrae solo la hora

                    if (hora === horaEspecifica) { // Si la hora coincide con la deseada
                        let tempMax = parseFloat($(timeNode).find("temperature").attr("max")) - 273.15;
                        let tempMin = parseFloat($(timeNode).find("temperature").attr("min")) - 273.15;
                        let humedad = $(timeNode).find("humidity").attr("value");
                        let icono = $(timeNode).find("symbol").attr("var");
                        let descripcion = $(timeNode).find("symbol").attr("name");
                        let lluvia = $(timeNode).find("precipitation").attr("probability") || "0";

                        forecast += `<article>
                            <h3>Pronóstico para ${fecha} ${hora}:00</h3>
                            <p>Temperatura mínima: ${tempMin.toFixed(1)} °C</p>
                            <p>Temperatura máxima: ${tempMax.toFixed(1)} °C</p>
                            <p>Humedad: ${humedad}%</p>
                            <p><img src="https://openweathermap.org/img/wn/${icono}.png" alt="${descripcion}"> ${descripcion}</p>
                            <p>Probabilidad de lluvia: ${lluvia}%</p>
                        </article>`;
                    }
                } catch (error) {
                    console.log("Error procesando nodo <time>:", error);
                }
            });

            if (forecast) {
                $("body").append(`<section>${forecast}</section>`);
            } else {
                $("body").append("<section><p>No se generó HTML del pronóstico para esa hora.</p></section>");
            }
        },
        error: () => {
            $("body").append("<section><p>¡Error al cargar los datos del tiempo!</p></section>");
        }
    });
}

    verXML() {
        this.crearElemento("h2", "Datos en XML desde <a href='http://openweathermap.org'>OpenWeatherMap</a>", "footer");
        this.crearElemento("h4", "XML", "footer"); // Crea un elemento con DOM        
        this.crearElemento("h5", "", "footer"); // Crea un elemento con DOM para el string con XML
        this.crearElemento("h4", "Datos", "footer"); // Crea un elemento con DOM 
        this.crearElemento("p", "", "footer"); // Crea un elemento con DOM para los datos obtenidos con XML
        this.cargarDatos("12"); // Ejemplo: Cargar pronóstico para las 12:00
        $("button").attr("disabled", "disabled");
    }

    crearElemento(tipoElemento, texto, insertarAntesDe) {
        var elemento = document.createElement(tipoElemento); 
        elemento.innerHTML = texto;
        $(insertarAntesDe).before(elemento);
    }
}

var pais = new Pais("Shanghai", 31.336667, 121.218611);
pais.verXML();
