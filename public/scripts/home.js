"use strict";

var idContenedorAlertas = "contenedorAlertas";

$(document).ready(function () {
	
});


//Botón consultar
function consultar(){
	var datos = obtenerDatos();

	$.ajax({
		contentType: "application/json",
		method: "POST",
		url: "/consultar",
		data: JSON.stringify({ content: datos }),
		success: function(response) { consultarOk(response); },
		error: function(response) { consultarError(response); }
	});
}

//Ajax Exitoso
function consultarOk(response){
	if (response && response.RESULTADO && response.CONTENIDO && response.RESULTADO === "OK"){
		//Mostrar msj de éxito
		generarAlerta(idContenedorAlertas, tipoAlertas.ok, "Archivo creado.", "Éxito");

	}else if (response && response.RESULTADO && response.MENSAJE && response.RESULTADO === "ERROR" ){
		//Mostrar msj de error
		generarAlerta(idContenedorAlertas, tipoAlertas.error, response.MENSAJE, "Error");
	}else{
		//Mostrar msj de error desconocido
		generarAlerta(idContenedorAlertas, tipoAlertas.error, "Error desconocido.", "Error");
	}

}

//Ajax Erroneo
function consultarError(response){
	generarAlerta(idContenedorAlertas, tipoAlertas.error, "No se pudo conectar al servidor", "Error");
}

//Obtiene datos de los input para enviar al servidor
function obtenerDatos(){
	var estructura = {
		uri: $("#txUri").val(),
		coleccion: $("#txColeccion").val(),
		filtros: $("#txFiltro").val(),
		archivo: $("#txArchivo").val(),
	}

	return estructura;
}

