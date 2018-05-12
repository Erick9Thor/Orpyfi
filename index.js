'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 3977 // Puerto que tendra nuestro servidor por defecto

mongoose.connect('mongodb://localhost:27017/orpyfi', (err, res) => {
    if(err){
        throw err;
    }
    else{
        console.log('Conexión con la base de datos funcionando')
        app.listen(port, function(){
            console.log("Servidor corriendo, escuchando en http://localhost:" + port)
        })
    }
});