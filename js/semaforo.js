"use strict";

class Semaforo{

	constructor(){
	this.levels = [0.2, 0.5, 0.8];
	this.lights = 4;
	this.unload_moment = null;
    this.clic_moment = null;
	this.difficulty = this.levels[Math.floor(Math.random() * this.levels.length)];
	this.createStructure();
	}

	createStructure(){
		const main = document.querySelector("main");
		 const header = document.createElement("h2");
         header.textContent = "Semáforo";
         main.appendChild(header);
		 
		for(let i = 0;i<this.lights;i++)
         {
            const div = document.createElement("div");
            main.appendChild(div);
        }
		
		const boton1 = document.createElement("button");
        boton1.textContent = "Arranque";
        boton1.addEventListener("click", () => this.initSequence());
        main.appendChild(boton1);

       
        const boton2 = document.createElement("button");
        boton2.textContent = "Reacción";
        boton2.addEventListener("click", () => this.stopReaction());
		boton2.disabled=true;
        main.appendChild(boton2);
      
	}


	initSequence(){
		const main = document.querySelector("main");
		main.classList.add("load");
		const boton = document.querySelectorAll("button")[0]; 
		boton.disabled= true;
		setTimeout(() => {
		this.endSequence();
		}, 2000+this.difficulty * 100);
		this.unload_moment = new Date();
	}
	
	
	
	endSequence(){
		const main = document.querySelector("main");
		main.classList.add("unload");
		main.classList.remove("load");
		const boton2 = document.querySelectorAll("button")[1]; 
		boton2.disabled=false;
	}
	
	stopReaction(){
		this.clic_moment = new Date();
		var tiempo = this.clic_moment - this.unload_moment-2000;
		tiempo= (tiempo / 1000).toFixed(3);
		const parrafo = document.createElement("p");
		parrafo.textContent="Tiempo de reacción: " + tiempo + " s";
		const main = document.querySelector("main");
		const parrafoExistente = main.querySelector("p"); 
		if (parrafoExistente) {
			main.removeChild(parrafoExistente); 
		}		
		main.appendChild(parrafo); 
		main.classList.remove("unload");
		const boton = document.querySelectorAll("button")[0]; 
		boton.disabled= false;
		const boton2 = document.querySelectorAll("button")[1]; 
		boton2.disabled=true;
	}







}