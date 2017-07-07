var fs = require('fs');

var Qux = function () {};

//Guarda en archivo plano
/*
	error: Función callback que se ejecuta cuando ocurre un error
	data: String que se almacena en el archivo
	nombreArchivo: ruta completa del archivo donde se guarda
	callback: Función callback que se ejecuta cuando se guarda con éxito
*/
Qux.prototype.almacenar = function (error, data, nombreArchivo, callback){

	fs.writeFile(nombreArchivo, data, (err) => {
		
		if (err){
			//Ocurrió un error
			if (error) error(err);
		}else{
			//Guardado con éxito
			callback();
		}
	});
}

//Obtiene datos del archivo plano
/*
	error: Función callback que se ejecuta cuando ocurre un error
	nombreArchivo: ruta completa del archivo a leer
	callback: Función callback que se ejecuta cuando se carga con éxito, se pasa los datos leídos por parámetro
*/
Qux.prototype.obtener = function (error, nombreArchivo, callback){

	fs.readFile(nombreArchivo, (err, data) => {
		
		if (err){
			//Ocurrió un error
			if (error) error(err);
		}else{
			//Leido con éxito
			callback(data);
		}
	});
}

exports.Qux = Qux;