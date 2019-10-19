var express = require('express');
var router = express.Router();
//variables paciente
var pacienteC = require('../controlador/PacienteController');
var paciente = new pacienteC(); 
//VIDEO
var medicocontrol = require('../controlador/MedicoController');
var medico = new medicocontrol();
//middleware 
function verificar_inicio(req) {
    return (req.session !== undefined && req.session.cuenta !== undefined);
}
var auth = function (req, res, next) {
    if (verificar_inicio(req)) {
        next();
    } else {
        res.json({msg: "No tienes acceso", cod:403});
    }
}

/* GET users listing. */
router.get('/',auth, function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/buscar_paciente',paciente.buscar);
//VIDEO
router.get('/buscar_consulta',medico.buscar);
module.exports = router;
