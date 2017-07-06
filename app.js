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


//FIN Funciones Varias**************************************************************************************