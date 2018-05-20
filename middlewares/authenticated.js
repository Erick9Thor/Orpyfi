'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'eric_due';

exports.ensureAuth = (req, res, next) => {
    if(!req.headers.authorization){
        return res.status(403).send({menssage: 'La peticion no tiene la cabecera de auth.'})
    }
     
    var token = req.headers.authorization.replace(/['"]+/g, '')

    try {   
        var payload = jwt.decode(token, secret)
        if(payload.exp <= moment().unix()){
            return res.status(401).send({menssage: 'El token ha expirado'})
        }

    } catch (ex){
        return res.status(404).send({message: 'Token no valido'});
    }

    req.user = payload; //Dentro del middleware se encuentra el user con el payload que es toda la info propia
    next(); //Salir del middleware
}