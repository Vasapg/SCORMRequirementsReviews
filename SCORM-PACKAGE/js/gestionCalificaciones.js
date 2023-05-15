function calcularNota(text_originales,tipos_originales,pesos_originales,text_alumno,tipos_alumno){
    pesos_originales = stringToInt(pesos_originales);
    var notaFinal = sumaNumeros(pesos_originales);
    var notaAlumno = 0;
    for(var i = 0; i<text_originales.length; i++){
        for(var j = 0; j<text_alumno.length; j++){
            if(text_alumno[j].split(" ").length - text_originales[i].split(" ").length < 8){
                if(compTextos(text_originales[i].split(" "),text_alumno[j].split(" ")) >= calcOchenta(text_originales[i].split(" ")) 
                && tipos_originales[i] == tipos_alumno[j]){
                    notaAlumno += pesos_originales[i];
                }
            }            
        }
    }

    if(!localStorage.getItem("notasDocumentos")){
        var notasDocumentos = [];
        var notasAlumno = [];
        notasDocumentos.push(notaFinal);
        notasAlumno.push(notaAlumno);        
        localStorage.setItem("notasDocumentos",JSON.stringify(notasDocumentos));
        localStorage.setItem("notasAlumno",JSON.stringify(notasAlumno));
    }
    else{
        var notasDocumentos = localStorage.getItem("notasDocumentos");
        var notasAlumno = localStorage.getItem("notasAlumno");
        notasDocumentos = JSON.parse(notasDocumentos);
        notasAlumno = JSON.parse(notasAlumno);
        notasDocumentos.push(notaFinal);
        notasAlumno.push(notaAlumno);
        localStorage.setItem("notasDocumentos",JSON.stringify(notasDocumentos));
        localStorage.setItem("notasAlumno",JSON.stringify(notasAlumno));
    }

    var body = document.getElementById("tablaCalificaciones");
    var tabla = document.createElement("table");
    tabla.setAttribute("class","tg");
    tabla.setAttribute("id","tabla");
    var fila1 = document.createElement("tr");
    
    var titulo = document.createElement("th");
    titulo.setAttribute("class","tg-4erg");  
    var titulo1 = document.createTextNode("Title");
    titulo.appendChild(titulo1);

    var nota_e = document.createElement("th");
    nota_e.setAttribute("class","tg-4erg");  
    var nota_e1 = document.createTextNode("grade");
    nota_e.appendChild(nota_e1);

    fila1.appendChild(titulo);
    fila1.appendChild(nota_e);
    tabla.appendChild(fila1);

    var arraydetitulos = localStorage.getItem("titulos");
    arraydetitulos = JSON.parse(arraydetitulos);
    for(var i = 0; i<notasDocumentos.length; i++){
        var fila2 = document.createElement("tr");
        var titulo2 = document.createElement("th");
        var titulo22 = document.createTextNode(arraydetitulos[i]);
        titulo2.appendChild(titulo22);

        var nota_e2 = document.createElement("th");
        var nota_e22 = document.createTextNode(notasAlumno[i] + "/" + notasDocumentos[i]);
        nota_e2.appendChild(nota_e22);

        fila2.appendChild(titulo2);
        fila2.appendChild(nota_e2);
        tabla.appendChild(fila2);
    }  

    body.appendChild(tabla);
}

function sumaNumeros(arrayNum){
    var total = 0;
    for(var i = 0; i<arrayNum.length; i++){
        total = total + arrayNum[i];
    }
    return total;    
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

function stringToInt(array){
    for(var i = 0; i<array.length; i++){
        array[i] = parseInt(array[i]);
    }
    return array;
}

function finalizarActividad()
{
    parent.window.location = "https://moodle.upm.es/titulaciones/oficiales/mod/scorm/view.php?id=52416";
}