'use strict'

var bcrypt = require('bcrypt-nodejs') //Encriptar contraseñas
var User = require('../models/user')

function pruebas(req, res) {
    res.status(200).send({
        message: 'Probando una accion del controlador de user del server'
    });
}

function saveUser(req, res) {
    var user = new User();

    var params = req.body //Llegara por post usando JSON

    user.name = params.name;
    user.surname = params.surname;
    user.email = params.email;
    user.role = 'ROLE_USER'
    user.image = 'null'

    if (params.password) {
        //Encriptaremos el password.
        bcrypt.hash(params.password, null, null, function (err, hash) {
            user.password = hash;
            if (user.name != null && user.surname != null && user.email != null) {
                //Guardar el user
                user.save((err, userStored) => {
                    if (err) {
                        res.status(500).send({ message: 'Error al guardar el usuario' })
                    } else {
                        if (!userStored) {
                            res.status(404).send({ message: 'No se a registrado el usuario' })
                        } else {
                            res.status(200).send({ user: userStored })
                        }
                    }
                });
            } else {
                res.status(200).send({ message: 'Introduce todos los campos' })
            }
        })
    } else {
        res.status(200).send({ message: 'Introduce la contraseña' })
    }
}

function loginUser(req, res) {
    var params = req.body

    var email = params.email;
    var password = params.password;

    User.findOne({ email: email.toLowerCase() }, (err, user) => {
        if (err) {
            res.status(500).send({ message: 'Error en la peticion' })
        } else {
            if (!user) {
                res.status(404).send({ message: 'El usuario no existe' })
            } else {
                bcrypt.compare(password, user.password, function (err, check) {
                    if (check) {
                        if (params.gethash) {
                            //devolver un token de jwt
                        } else {
                            res.status(200).send({ user })
                        }
                    }
                    else {
                        res.status(404).send({ message: 'El usuario no ha podido loguearse' })
                    }
                });
            }
        }
    })
}

module.exports = {
    pruebas,
    saveUser,
    loginUser
}