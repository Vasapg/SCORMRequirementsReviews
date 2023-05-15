//Esta función se encarga de extraer de la BBDD el array de documentos disponibles y el array de documentos hechos
//para elegir uno que este pendiente, para elegir un documento se realiza al azar con Math.random,
//Una vez elegido uno que no este hecho, se agrega a la variable de DoscHechos y se envía al servicio Moodle
//De la respuesta del servicio Moodle, obtendremos el titulo, el texto y los errores establecidos.

function abrirDocumento(URL){
    fetch(URL)
    .then(response => response.text())
    .then(data => {
		var xmlDoc = new DOMParser().parseFromString(data, "text/xml");
		var titulo = xmlDoc.getElementsByTagName("title")[0].childNodes[0].nodeValue;
		var texto = xmlDoc.getElementsByTagName("text")[0].childNodes[0].nodeValue;

		var texto_errores = [];
		var tipos_errores = [];
		var pesos_errores = [];
		var comments = [];
		var numErrores = xmlDoc.getElementsByTagName("defect").length;

		//Con este bucle buscamos guardar en los arrays los textos de error, con su tipo y pesos.
		for (var i = 0; i < numErrores; i++) {
			var txt_Error = xmlDoc.getElementsByTagName("defect")[i].childNodes[0].nodeValue;
			var tipo_Error = xmlDoc.getElementsByTagName("defect")[i].getAttribute("type");
			var peso_Error = xmlDoc.getElementsByTagName("defect")[i].getAttribute("weight");
			var comment = xmlDoc.getElementsByTagName("defect")[i].getAttribute("comment");

			texto_errores.push(txt_Error);
			tipos_errores.push(tipo_Error);
			pesos_errores.push(peso_Error);
			comments.push(comment);
		}
		var arrayDeTitulos = localStorage.getItem("titulos");
		arrayDeTitulos = JSON.parse(arrayDeTitulos);
		arrayDeTitulos.push(titulo);
		//Pusheamos toda la información necesario a la BBDD
		localStorage.setItem("titulos", JSON.stringify(arrayDeTitulos));
		localStorage.setItem("titulo", titulo);
		localStorage.setItem("texto", formatearTexto(texto));
		localStorage.setItem("textoSolucion", texto);
		localStorage.setItem("texto_errores", JSON.stringify(texto_errores));
		localStorage.setItem("tipos_errores", JSON.stringify(tipos_errores));
		localStorage.setItem("pesos_errores", JSON.stringify(pesos_errores));
		localStorage.setItem("comments", JSON.stringify(comments))
		localStorage.setItem("global", xmlDoc.getElementsByTagName("Global")[0].childNodes[0].nodeValue)

		//Aqui preparamos el texto para presentarlo en formato HTML
		var body = document.getElementById("documentoXML");
		var tituloHTML = document.createElement("h1");
		tituloHTML.textContent = titulo;
		var textoHTML = document.createElement("p");
		textoHTML.setAttribute("id", "doc");
		textoHTML.innerHTML = formatearTexto(texto);

		var espacioHTML = document.createElement("hr");
		body.appendChild(tituloHTML);
		body.appendChild(espacioHTML);
		body.appendChild(textoHTML);
		body.appendChild(espacioHTML);
	})
	.catch(error => console.error(error));
}

function getConfig() {
    return fetch("https://raw.githubusercontent.com/Vasapg/PIE-SCORM/main/Self-Assesment-4/exercises/config.xml")
      .then(response => response.text())
      .then(data => {	
        var xmlDoc = new DOMParser().parseFromString(data, "text/xml");
        localStorage.setItem("nEjercicio", 0);
        localStorage.setItem("maxEjercicio", parseInt(xmlDoc.getElementsByTagName("numExercises")[0].childNodes[0].nodeValue));
        var titulos = [];
        var urls = [];
        
        // obtiene todas las etiquetas "title" y "url"
        var titleTags = xmlDoc.getElementsByTagName("title");
        var urlTags = xmlDoc.getElementsByTagName("url");
        console.log(titleTags);
        console.log(urlTags);
        console.log("bruh");
        
        // itera sobre las etiquetas y guarda los contenidos en los arrays
        for (var i = 0; i < titleTags.length; i++) 
        {
          titulos.push(titleTags[i].textContent);
          urls.push(urlTags[i].textContent);
        }
        console.log(titulos);
        console.log(urls);
        localStorage.setItem("urls", JSON.stringify(urls));
        localStorage.setItem("titulos", JSON.stringify(titulos));
      });
  }
  
  async function getUrl() {
    if (!localStorage.getItem("urls")) {
      await getConfig();
    }
    var nEjercicio = parseInt(localStorage.getItem("nEjercicio"));
    console.log(nEjercicio);

    var url = JSON.parse(localStorage.getItem("urls"));
    url = url[nEjercicio];

    abrirDocumento(url);
    nEjercicio = nEjercicio + 1;
    localStorage.setItem("nEjercicio", nEjercicio);
  }


function comprobarXHTTP() {
	var xhttp;
	if (window.XMLHttpRequest) {
		xhttp = new XMLHttpRequest();
	}
	else {
		xhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	return xhttp;
}

//Esta función nos permite saber que documentos estan hechos del array de documentos posibles a elegir, pasandole
//el array de documentos ya hechos.
function yaEstaHecho(array, doc) {
	var i = 0;
	var buleano = false;
	while (i < array.length && !buleano) {
		if (array[i] == doc) {
			buleano = true;
		}
		i++
	}
	return buleano;
}

//pasa el texto a formato html
function formatearTexto(texto) {
	texto = texto.replace(/[\n]/gi, "<br>");
	texto = marked.parse(texto);
	return texto;
}

window.onload = getUrl();