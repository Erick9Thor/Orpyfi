'use strict'

var exprees = require('express')
var ArtistController = require('../controllers/artist');
var api = exprees.Router();
var md_auth = require('../middlewares/authenticated')

var multipart = require('connect-multiparty'); // Poder subir ficheros a trabes de http
var md_upload = multipart({uploadDir: './uploads/artists'}) //Middleware para la subida/guardado de imagenes.


api.get('/artist/:id', md_auth.ensureAuth, ArtistController.getArtist)
api.post('/artist', md_auth.ensureAuth, ArtistController.saveArtist)
api.get('/artists/:page?', md_auth.ensureAuth, ArtistController.getArtists)
api.put('/artist/:id', md_auth.ensureAuth, ArtistController.updateArtist)
api.delete('/artist/:id', md_auth.ensureAuth, ArtistController.deleteArtist)
api.post('/upload-image-artist/:id', [md_auth.ensureAuth, md_upload], ArtistController.uploadImage );
api.get('/get-image-artist/:imageFile', ArtistController.getImageFile );

module.exports = api;

