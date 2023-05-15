function verSolucionXML(titulo,texto,texto_errores,tipos_errores,id,comments)
{
    var body = document.getElementById(id);  
    texto = quitarEspacios(texto);  
    for(var i = 0; i<texto_errores.length; i++)
    {
        texto_errores[i] = quitarEspacios(texto_errores[i]);
        texto = texto.replace(texto_errores[i], '<div><div class="bocadillo-cuadrado" onclick="handleClick(\'' + comments[i] + '\')">' + 
                tipos_errores[i] + '</div><strong>' + texto_errores[i] + '</strong></div>');


    }    
    body.innerHTML = '<h3>' + titulo + '</h3>' + '<hr>' + texto;
}

function verSolucionAlumno(titulo, texto, text_originales, tipos_originales, text_alumno, tipos_alumno, id)
{
    var body = document.getElementById(id);  
    texto = quitarEspacios(texto);  
    for(var i = 0; i<text_alumno.length; i++){
        for(var j = 0; j<text_originales.length; j++){
            if(text_alumno[i].split(" ").length - text_originales[j].split(" ").length < 8){
                if(compTextos(text_originales[j].split(" "),text_alumno[i].split(" ")) >= calcOchenta(text_originales[j].split(" ")) 
                && tipos_originales[j] == tipos_alumno[i]){
                    text_alumno[i] = quitarEspacios(text_alumno[i]);
                    texto = texto.replace(text_alumno[i],'<div><div class="bocadillo-cuadrado-good">' + tipos_alumno[i] 
                    + '</div><strong>' + text_alumno[i] + '</strong></div>');
                    break;
                }
                else if(j == text_originales.length - 1)
                {
                    text_alumno[i] = quitarEspacios(text_alumno[i]);
                    texto = texto.replace(text_alumno[i],'<div><div class="bocadillo-cuadrado-wrong">' + tipos_alumno[i] 
                    + '</div><strong>' + text_alumno[i] + '</strong></div>');
                    console.log("he puesto un error" + i + j);
                }
            }
            else if(j == text_originales.length - 1)
            {
                text_alumno[i] = quitarEspacios(text_alumno[i]);
                texto = texto.replace(text_alumno[i],'<div><div class="bocadillo-cuadrado-wrong">' + tipos_alumno[i] 
                + '</div><strong>' + text_alumno[i] + '</strong></div>');
                console.log("he puesto un error" + i + j);
            }       
        }
    }
    body.innerHTML = '<h3>' + titulo + '</h3>' + '<hr>' + texto;
}

function quitarEspacios(texto)
{
    texto = texto.split("\n").join("");
    texto = texto.split("\t").join("");
    var array = texto.split(" ");
    texto = "";
    for(var j = 0;j<array.length; j++){ 
        if(array[j] != ""){            
            if(j == array.length-1){
                texto += array[j];
            }
            else{
                texto += array[j] + " ";
            }            
        }
    }
    return texto;
}
function compTextos(array1,array2){
    var numCoincidencias = 0;
    for(var  i = 0; i<array2.length; i++){
        for(var j = 0; j<array1.length; j++){
            if(array2[i] == array1[j]){
                numCoincidencias++;
            }
        }

    }
    return numCoincidencias;
}

function calcOchenta(array){
    var calculo = array.length * 0.8;
    var resto = calculo % 1;
    if(resto != 0){
        if(resto >= 0.5){
            calculo = calculo + 1 - resto;
        }
        else{
            calculo = calculo - resto;
        }
    }
    return calculo;
}

function displayComment()
{
    var global = localStorage.getItem("global").toString();
    handleClick(global);
}

function handleClick(texto) {
    // Crear el elemento de la ventana
    const ventana = document.createElement("div");
    ventana.style.display = "flex";
    ventana.style.justifyContent = "center";
    ventana.style.alignItems = "center";
    ventana.style.position = "fixed";
    ventana.style.top = "0";
    ventana.style.left = "0";
    ventana.style.width = "100%";
    ventana.style.height = "100%";
    ventana.style.background = "rgba(0,0,0,0.5)";
    ventana.style.zIndex = "999";
  
    // Crear el elemento del contenido
    const contenido = document.createElement("div");
    contenido.style.background = "#fff";
    contenido.style.padding = "20px";
    contenido.style.borderRadius = "10px";
    contenido.style.boxShadow = "0px 0px 10px rgba(0,0,0,0.5)";
    contenido.style.position = "relative";
  
    // Agregar el texto al contenido
    const textoContenido = document.createTextNode(texto);
    contenido.appendChild(textoContenido);
  
    // Agregar el contenido a la ventana
    ventana.appendChild(contenido);
  
    // Crear el botón de cerrar
    const cerrar = document.createElement("button");
    cerrar.innerHTML = "X";
    cerrar.style.background = "#fff";
    cerrar.style.border = "none";
    cerrar.style.borderRadius = "50%";
    cerrar.style.color = "#000";
    cerrar.style.fontSize = "16px";
    cerrar.style.position = "absolute";
    cerrar.style.top = "-10px";
    cerrar.style.right = "-10px";
    cerrar.style.width = "30px";
    cerrar.style.height = "30px";
    cerrar.style.cursor = "pointer";
  
    // Función para cerrar la ventana
    function cerrarVentana(){
      ventana.style.display = "none";
    }
  
    // Agregar el botón de cerrar a la ventana y asignar el evento click
    contenido.appendChild(cerrar);
    cerrar.addEventListener("click", cerrarVentana);
  
    // Asignar el evento click fuera de la ventana para cerrarla
    ventana.addEventListener("click", function (e) {
      if (e.target === this) {
        cerrarVentana();
      }
    });
  
    // Agregar la ventana al documento
    document.body.appendChild(ventana);
  }
  