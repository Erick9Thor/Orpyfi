'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'eric_due'

exports.createToken = function(user) {
    var payload = {
        sub: user._id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        role: user.role,
        image: user.image,
        iat: moment().unix(), //Retorna la hora del sistema,
        exp: moment().add(30, 'days').unix //Tiempo de expiracion
    };

    return jwt.encode(payload, secret) //Se codifica el hash con la info del user + un secret propio.
};