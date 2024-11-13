class Noticias{
	
constructor(){

 if (!window.File || !window.FileReader || !window.FileList || !window.Blob) 
    {  
        document.write("<p>¡¡¡ Este navegador NO soporta el API File y este programa puede no funcionar correctamente !!!</p>");
    }
       
}
	
	
	readInputFile(files){
		  const main = document.querySelector("main");
		  var archivo = files[0];
		  var nombre = document.createElement("p");
		  var tamaño = document.createElement("p");
		  var tipo = document.createElement("p");
		  var ultima = document.createElement("p");
		  var contenido = document.createElement("p");
		  var areaVisualizacion = document.createElement("p");
		  var errorArchivo = document.createElement("p");
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
				main.appendChild(nombre);
				main.appendChild(tamaño);
				main.appendChild(tipo);
				main.appendChild(ultima);
				main.appendChild(contenido);
				main.appendChild(areaVisualizacion);
			  lector.readAsText(archivo);
			  }
		  else {
			  errorArchivo.innerText = "Error : ¡¡¡ Archivo no válido !!!";
			  main.appendChild(errorArchivo);
			  }       
	}


	publicar(){
		const main = document.querySelector("main");
		const titulo = document.querySelector("#titular");
		const cuerpo = document.querySelector("#texto");
		
		if (titulo.innerText .trim() === "" || cuerpo.innerText .trim() === "") {
			alert("Por favor, complete ambos campos.");
			return; 
		}
		
		const h2 = document.createElement("h2");
		const p = document.createElement("p");
		
		h2.innerText = titulo.innerText ;
		p.innerText = cuerpo.innerText ;

		main.appendChild(h2);
		main.appendChild(p);

		titulo.innerText  = "";
		cuerpo.innerText  = "";
	}
	
	
	
	
	
}