'use strict'

var exprees = require('express')
var ArtistController = require('../controllers/artist');
var api = exprees.Router();
var md_auth = require('../middlewares/authenticated')


api.get('/artist', md_auth.ensureAuth, ArtistController.getArtist)
api.post('/artist', md_auth.ensureAuth, ArtistController.saveArtist)


module.exports = api;

