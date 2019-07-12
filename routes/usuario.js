const express = require('express'),
      api = express.Router(),
      multipart = require('connect-multiparty'),
			mdUpload = multipart({ uploadDir: './uploads'}),
      usuarioController = require('../controllers/usuario');


api
  .get('/usuarios', usuarioController.getUsuarios)
  .get('/usuarios-old', usuarioController.getUsuariosOld)
  .post('/usuario', usuarioController.saveUsuario)
  .post('/login', usuarioController.login)


module.exports = api;
