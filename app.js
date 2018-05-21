'use strict'

var express = require('express')
var bodyParser = require('body-parser')

var app = express()

// cargar rutas (endpoitns)
var user_routes = require('./routes/user')
var artist_routes = require('./routes/artist')
var album_routes = require('./routes/album')
var song_routes = require('./routes/song')

//Conversion a JSON de cabeceras
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//configuracion de cabezeras para las CORS, middelware de cabezeras
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); //Permite el acceso a todos los dominios 
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Acces-Control-Allow-Request-Method')
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');

    next();
})

//rutas base, aplicadas con MIDLEWARE
app.use('/api', user_routes) //MIDELWARE API
app.use('/api', artist_routes) //MIDELWARE API
app.use('/api', album_routes) //MIDELWARE API
app.use('/api', song_routes) //MIDELWARE API

module.exports = app;

