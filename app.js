"use strict";

var express = require('express');
var app = express();

var bodyParser = require('body-parser');

//Aumentar el límite máximo permitido del request en 50m
//Nota: Por defecto el límite es muy pequeño para permitir subir fotos
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

var AccesoMongo = require('./AccesoMongo.js').Qux;
var accesoMongo = new AccesoMongo();


//Definición de puerto
app.set('port', (process.env.PORT || 5000));

//Archivos públicos
app.use(express.static('public'));

//Usar el paquete Pug para Templates
app.set('view engine', 'pug');



//INICIO Atributos **************************************************************************************



//FIN Atributos **************************************************************************************


//INICIO Funciones AJAX**************************************************************************************

app.post('/consultar', function(req, res){

  var datos = req.body.content;

  //Si hay datos, realizar consulta
  if (datos){

    //Proceso de actualización en BD
    accesoMongo.consultarDatos(
      function () {
        console.log("guardarSolicitud: Error al intentar almacenar en BD");

        //Enviar un flag de Error
        respuestaAjaxJson(res, 'ERROR', 'Error al intentar realizar la consulta');
      },
      datos,
      function (result) {

        //Enviar un flag de éxito
        respuestaAjaxJson(res, 'OK', 'null', result);
      }
    );

  }else{
    //Sin datos de entrada
    respuestaAjaxJson(res, 'ERROR', 'No se recibió datos.');
  }

});


//FIN Funciones AJAX**************************************************************************************



//INICIO Definición URL**************************************************************************************

//Renderizar usando Pug
app.get('/', function(req, res){

  res.render('home');

});


//Cualquier url que no existente, redirigir a Home
app.all('/*', function (req, res) {

   console.log("Acceso a url inexistente: " + req.originalUrl);

   res.redirect('/');
})

 //FIN Definición URL**************************************************************************************



//INICIO Server**************************************************************************************

var server = app.listen(app.get('port'), function () {

   var host = server.address().address
   var port = server.address().port

   console.log("Servidor iniciado en http://%s:%s", host, port)
})

//FIN Server**************************************************************************************



//INICIO Funciones Varias**************************************************************************************


//Clonar objetos con jQuery
function clonarObjetoJs (obj) {
    return JSON.parse(JSON.stringify(obj));
}

//Genera un número entero al azar según los límites indicados
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}


//Enviar mensajes Ajax al cliente en formato JSon
/*
  res: Objeto Response
  tipoMsj: "ERROR", "OK", etc.
  mensaje: (Opcional), texto a mostrar al usuario
  contenido: (Opcional), respuesta de la consulta realizada, no se muestra al usuario
*/
function respuestaAjaxJson(res, tipoMsj, mensaje, contenido){
  res.setHeader('Content-Type', 'application/json');

  var datos = {
    RESULTADO: tipoMsj
  };

  //Valores opcionales
  if (mensaje) datos.MENSAJE = mensaje;
  if (contenido) datos.CONTENIDO = contenido;

  //Enviar respuesta
  res.send(JSON.stringify( datos ));
}

//FIN Funciones Varias**************************************************************************************