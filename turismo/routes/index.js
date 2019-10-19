var express = require('express');
var router = express.Router();
//var test= require('../modelos/persona');
var cuentaControl = require("../controlador/CuentaControl");
var cuentaC= new cuentaControl();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Turismo' ,sesion:true, fragmento:'fragmentos/principal'});
});
//REGISTRO E INICIO DE  SESION
router.get('/registrate',cuentaC.visualizar);
module.exports = router;
