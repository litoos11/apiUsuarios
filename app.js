const express = require('express'),
			bodyParser = require('body-parser'),
			app = express();

// cargar rutas
const userRoutes = require('./routes/usuario');


// middlewares de body-parser
app
	.use(bodyParser.urlencoded({extended: false}))
	.use(bodyParser.json())

// Configurar cabeceras y cors
app
	.use((req, res, next)=>{
		res.header('Access-Control-Allow-Origin', '*');
		res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
		res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
		res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
		next();
	})
	
//rutas base
app
	.use('/api', userRoutes)

module.exports = app;