var express = require('express');
var router = express.Router();
    //var test= require('../modelos/persona');
var personaControl = require("../controlador/PersonaControl");
var personaC= new personaControl();
var pasajeControl= require("../controlador/PasajeControl");
var pasaje= new pasajeControl();
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Examen 4B' ,sesion:false, fragmento:'fragmentos/principal'});
});
//REGISTRO PASAJEROS
router.get('/cliente/registrate',personaC.visualizarReg);
router.post('/cliente/registrate',personaC.guardar);
//PASAJE
router.get('/pasaje/registro',pasaje.visualizar);
router.post('/pasaje/registro',pasaje.guardar);
//TABLA Y MODIFICAR
router.get('/pasaje/tabla', pasaje.vertabla);
router.get('/pasaje/modificar', pasaje.visualizarModiPasaje);
router.post('/pasaje/modificar',pasaje.modificar);

//BUSCAR 
router.get('/pasajes/buscar_consulta',pasaje.buscar);
module.exports = router;

