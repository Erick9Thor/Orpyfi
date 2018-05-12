'use strict'

var express = require('express')
var bodyParser = require('body-parser')

var app = express()

// cargar rutas (endpoitns)
var user_routes = require('./routes/user')

//Conversion a JSON de cabeceras
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//configuracion de cabezeras


//rutas base, aplicadas con MIDLEWARE
app.use('/api', user_routes) //MIDELWARE API


module.exports = app;
