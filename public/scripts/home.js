"use strict";

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
	debugger;
	alert("Exito");
}

//Ajax Erroneo
function consultarError(response){
	alert("Error");
}

//Obtiene datos de los input para enviar al servidor
function obtenerDatos(){
	var estructura = {
		uri: $("#txUri").val(),
		coleccion: "Users",					/////AGREGAR!!!
		filtros: $("#txFiltro").val(),
		archivo: $("#txArchivo").val(),
	}

	return estructura;
}