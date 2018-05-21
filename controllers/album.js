'use strict'

var fs = require('fs');
var path = require('path');

var mongoosePaginate = require('mongoose-pagination')

var Artist = require('../models/artist')
var Album = require('../models/album')
var Song = require('../models/song')


//Populate linkea collections, indicas que propiedad contiene el ide del collection linkeado
function getAlbum(req, res) {
    var albumId = req.params.id;

    Album.findById(albumId).populate({ path: 'artist' }).exec((err, album) => {
        if (err) {
            res.status(500).send({ message: 'Error en la peticion' })
        } else {
            if (!album) {
                res.status(404).send({ message: 'No existe le album' })
            } else {
                res.status(200).send({ album })
            }
        }
    })
}

function getAlbums(req, res) {
    var artistId = req.params.artist

    let find;
    if (!artistId) {
        //Sacar totod los albums de la BD
        find = Album.find({}).sort('title');
    } else {
        //Sacar el album de un artista concreto de la bd
        find = Album.find({ artist: artistId }).sort('year');
    }
    find.populate({ path: 'artist' }).exec((err, albums) => {
        if (err) {
            res.status(500).send({ message: 'Error en el server' })
        } else {
            if (!albums) {
                res.status(404).send({ message: 'No hay albums' })
            } else {
                res.status(200).send({ albums })
            }
        }
    })
}

function saveAlbum(req, res) {
    var album = new Album();
    var params = req.body;

    album.title = params.title;
    album.description = params.description;
    album.year = params.year;
    album.image = 'null'
    album.artist = params.artist;

    album.save((err, albumStored) => {
        if (err) {
            res.status(500).send({ message: 'Error en el server' })
        } else {
            if (!albumStored) {
                res.status(404).send({ message: 'No se ha guardado' })

            } else {
                res.status(200).send({ album: albumStored })
            }
        }
    })
}

module.exports = {
    getAlbum,
    saveAlbum,
    getAlbums
}