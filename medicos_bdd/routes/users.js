var express = require('express');
var router = express.Router();
var pacienteC = require('../controlador/PacienteController');
var paciente = new pacienteC();
var consultaC = require('../controlador/ConsultaControl');
var consulta = new consultaC();
//MILDWARE
var auth = function (req, res, next) {
    if(req.isAuthenticated()) {
        next();
    } else {
        req.flash('error', "Debe iniciar sesion primero");
        res.redirect("/");
    }
}

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/buscar_paciente',paciente.buscar);
router.get('/buscar_consulta',consulta.buscar);
module.exports = router;
