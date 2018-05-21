'use strict'

var exprees = require('express')
var SongController = require('../controllers/song');
var api = exprees.Router();
var md_auth = require('../middlewares/authenticated')

var multipart = require('connect-multiparty'); // Poder subir ficheros a trabes de http
var md_upload = multipart({ uploadDir: './uploads/songs' }) //Middleware para la subida/guardado de imagenes.


api.get('/song/:id', md_auth.ensureAuth, SongController.getSong)
api.post('/song', md_auth.ensureAuth, SongController.saveSong)
api.get('/songs/:album?', md_auth.ensureAuth, SongController.getSongs)
api.put('/song/:id', md_auth.ensureAuth, SongController.updateSong)
api.delete('/song/:id', md_auth.ensureAuth, SongController.deleteSong)
api.post('/upload-file-song/:id', [md_auth.ensureAuth, md_upload], SongController.uploadFile );
api.get('/get-song-file/:songFile', SongController.getSongFile );



module.exports = api;

