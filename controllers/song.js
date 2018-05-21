'use strict'

var fs = require('fs');
var path = require('path');

var mongoosePaginate = require('mongoose-pagination')

var Artist = require('../models/artist')
var Album = require('../models/album')
var Song = require('../models/song')

function getSong(req, res) {
    var songId = req.params.id;

    Song.findById(songId).populate({ path: 'album' }).exec((err, song) => {
        if (err) {
            res.status(500).send({ message: 'Error en la peticion' })
        } else {
            if (!song) {
                res.status(404).send({ message: 'La cancion no existe' })
            } else {
                res.status(200).send({ song })

            }
        }
    })
}

function saveSong(req, res) {
    var song = new Song();

    var params = req.body;
    song.number = params.number;
    song.name = params.name;
    song.duration = params.duration;
    song.file = 'null'
    song.album = params.album;

    song.save((err, songStored) => {
        if (err) {
            res.status(500).send({ message: 'Error en el server' })
        } else {
            if (!songStored) {
                res.status(404).send({ message: 'No se ha guardado la cancion' })

            } else {
                res.status(200).send({ song: songStored })
            }
        }
    })
}

function getSongs(req, res) {
    var albumId = req.params.album;
    let find;
    if (!albumId) {
        find = Song.find({}).sort('number')
    } else {
        find = Song.find({ album: albumId }).sort('number')
    }
    find.populate({
        path: 'album',
        populate: {
            path: 'artist',
            model: 'Artist'
        }
    }).exec((err, songs) => {
        if (err) {
            res.status(500).send({ message: 'Error en el server' })
        } else {
            if (!songs) {
                res.status(404).send({ message: 'No encontrado canciones' })
            } else {
                res.status(200).send({ songs })
            }
        }
    })
}

function updateSong(req, res){
    var songId = req.params.id;
    var update = req.body;

    Song.findByIdAndUpdate(songId, update, (err, songUpdated) => {
        if (err) {
            res.status(500).send({ message: 'Error en el server' })
        } else {
            if (!songUpdated) {
                res.status(404).send({ message: 'No se ha actuaizado la cancion' })
            } else {
                res.status(200).send({ song: songUpdated })
            }
        }
    })
}

function deleteSong(req, res){
    var songId = req.params.id;
    
    Song.findByIdAndRemove(songId, (err, songDel)=>{
        if (err) {
            res.status(500).send({ message: 'Error en el server' })
        } else {
            if (!songDel) {
                res.status(404).send({ message: 'No se ha borrado la cancion' })
            } else {
                res.status(200).send({ song: songDel })
            }
        }
    })
}

function uploadFile(req, res) {
    var songId = req.params.id;
    var file_name = 'No subido...';

    if (req.files) {
        var file_path = req.files.file.path;
        var file_split = file_path.split('\\');
        var file_name = file_split[2];

        var ext_split = file_name.split('\.');
        var file_ext = ext_split[1];

        if (file_ext == 'mp3' || file_ext == 'ogg') {
            Song.findByIdAndUpdate(songId, { file: file_name }, (err, songUpdated) => {
                if (err) {
                    res.status(500).send({ message: 'Error al actt el user' })
                } else {
                    if (!songUpdated) {
                        res.status(404).send({ message: 'No se ha podido actualizar el album' })
                    } else {
                        res.status(200).send({ song: songUpdated })
                    }
                }
            })
        }
        else {
            res.status(200).send({ message: 'Extension del archivo no valida' })
        }
    }
    else {
        res.status(200).send({ message: 'No has subido ninguna imagen' })
    }
}


function getSongFile(req, res) {
    var imageFile = req.params.songFile;
    var path_file = './uploads/songs/' + imageFile;
    fs.exists(path_file, function (exists) {
        if (exists) {
            res.sendFile(path.resolve(path_file));
        }
        else {
            res.status(200).send({ message: 'No existe el fichero de audio' })
        }
    })
}

module.exports = {
    getSong,
    saveSong, 
    getSongs,
    updateSong,
    deleteSong,
    uploadFile,
    getSongFile
}