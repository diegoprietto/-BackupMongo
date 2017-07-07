"use strict";

/*Constantes*/

var tipoAlertas = {
	ok: "success",
	info: "info",
	error: "danger",
	warning: "warning"
};



//Generar alerta (Bootstrap)
/*
	idContenedor: Div dodne se va a realizar un append del alerta
	tipoAlerta: Tipo de alerta de Bootstrap, "warning", "info", "success", "danger"  (Opcional, por defecto "info")
	mensaje: Texto que se muestra (Opcional)
	textoNegrita: Primer texto que aparece resaltado en negrita en el alerta (Opcional)
*/
function generarAlerta(idContenedor, tipoAlerta, mensaje, textoNegrita){
	if (!tipoAlerta) tipoAlerta = "info";
	if (!textoNegrita) textoNegrita = "";
	if (!mensaje) mensaje = "";

	var datoHtml = '\
		<div class="alert alert-' + tipoAlerta + ' alert-dismissible" role="alert">\
			<button class="close" type="button" data-dismiss="alert" aria-label="Close">\
				<span aria-hidden="true">×</span>\
			</button>\
			<strong>' + textoNegrita + '</strong>\
			' + mensaje + '\
		</div>';

	$("#" + idContenedor).append(datoHtml);
}