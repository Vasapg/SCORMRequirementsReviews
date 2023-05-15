var tipoDeError = [];
var oraciones = [];
var texto_error = [];
var texto_original = document.getElementById("documentoXML").innerHTML;


document.getElementById("documentoXML").addEventListener("mouseup",function(){
    var oracion = window.getSelection();
    if(oracion != ""){
        texto_error.push(oracion.toString());
        enableButtons();
    }
});

//Se agrega el tipo de error
function gestionDeTipo(tipo){
    var oracion = texto_error.pop().toString();
    if (oracion.length <= 10)
    {
        alert("text selected must have more than 10 characters");
        disableButtons();
        return ;
    }
    const matches = oracion.match(/(\r\n|\n|\r)/gm);

    if (matches && matches.length >= 1) {
        alert("Errors cannot be selected between paragraphs");
        disableButtons();
        return ;
    }
    tipoDeError.push(tipo);
    oraciones.push(oracion);
    var oracion = oraciones.pop();
    resaltarTexto(tipo);
    oraciones.push(oracion.toString());
    console.log("Array de oraciones:");
    console.log(oraciones);
    console.log("Array de tipos:");
    console.log(tipoDeError);
    disableButtons();
    cerrarPopup3("TiposDeError");
}

function eliminarError(texto, tipo){
    tipoDeError.splice(tipoDeError.indexOf(tipo),1);
    oraciones.splice(oraciones.indexOf(texto),1);
    console.log("Array de oraciones:");
    console.log(oraciones);
    console.log("Array de tipos:");
    console.log(tipoDeError);
}

//Con esta funcion se pretende resaltar en negrita el error seleccionado y soltar un bocadillo que indique su tipo
//A su vez se añade un "listener", que permite que clickando el texto seleccionado, se elimine y vuelva a como antes
function resaltarTexto(tipo) {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    const selectedText = range.toString();
    const newNode = document.createElement("b");
    newNode.style.position = 'relative';
    newNode.style.display = 'inline-block';
    const bubble = document.createElement("div");
    const bubbleText = document.createTextNode(tipo);
    bubble.style.display = 'inline-block';
    bubble.style.background = '#000';
    bubble.style.color = '#fff';
    bubble.style.borderRadius = '5px';
    bubble.style.padding = '5px';
    bubble.style.position = 'relative';
    bubble.style.top = '-2em';
    bubble.style.left = '0.5em';
    bubble.style.fontSize = '12px';
    bubble.classList.add("bubble");
    bubble.appendChild(bubbleText);
    newNode.appendChild(document.createTextNode(selectedText));
    newNode.appendChild(bubble);
    range.deleteContents();
    range.insertNode(newNode);
    selection.removeAllRanges();
  
    newNode.addEventListener("click", function () {
      const originalNode = document.createTextNode(selectedText);
      range.deleteContents();
      range.insertNode(originalNode);
      selection.removeAllRanges();
      eliminarError(selectedText, tipo);
    });
  }

function abrirPopup(modal){
    document.getElementById(modal).style.display="block";
    if(modal == "estasseguro2")
        cerrarPopup();
}

function cerrarPopup(){
    document.getElementById("t_errores").style.display="none";
    document.getElementById("delete_error").style.display="none";
    var eliminar = document.getElementById("tabla");
    if(eliminar != null){
        var padre = eliminar.parentNode;
        padre.removeChild(eliminar);
    }
}

//Eliminar funciones redundantes
function cerrarPopup3(window){
    document.getElementById(window).style.display="none";
}


function sigPagina(){
    window.location = "compSoluciones.html";
    console.log(tipoDeError);
    console.log(oraciones);
    localStorage.setItem("tipoDeError",JSON.stringify(tipoDeError));
    localStorage.setItem("oraciones",JSON.stringify(oraciones));
}

function enableButtons()
{
    document.getElementById("Understability").disabled = false;
    document.getElementById("Redundancy").disabled = false;
    document.getElementById("Completeness").disabled = false;
    document.getElementById("Ambiguity").disabled = false;
    document.getElementById("Consistency").disabled = false;
    document.getElementById("Organisation").disabled = false;
    document.getElementById("Traceability").disabled = false;
    document.getElementById("Testability").disabled = false;
    document.getElementById("Realism").disabled = false;
}

function disableButtons()
{
    document.getElementById("Understability").disabled = true;
    document.getElementById("Redundancy").disabled = true;
    document.getElementById("Completeness").disabled = true;
    document.getElementById("Ambiguity").disabled = true;
    document.getElementById("Consistency").disabled = true;
    document.getElementById("Organisation").disabled = true;
    document.getElementById("Traceability").disabled = true;
    document.getElementById("Testability").disabled = true;
    document.getElementById("Realism").disabled = true;
}