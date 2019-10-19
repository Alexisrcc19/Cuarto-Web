var express = require('express');
var router = express.Router();
//var rapidin = require('../controlador/utiles');
var test_file = require('../controlador/Test');
var test = new test_file();
var medicocontrol = require('../controlador/MedicoController');
var medico = new medicocontrol();
var cuentacontrol = require('../controlador/CuentaController');
var cuenta = new cuentacontrol();
var pacienteC = require('../controlador/PacienteController');
var paciente = new pacienteC();
//middleware 
function verificar_inicio(req) {
    return (req.session !== undefined && req.session.cuenta !== undefined);
}
var auth = function (req, res, next) {
    if (verificar_inicio(req)) {
        next();
    } else {
        req.flash('error', 'Debes iniciar sesion primero!');
        res.redirect('/');
    }
}
/* GET home page. */
router.get('/', function (req, res, next) {
    if (req.session !== undefined && req.session.cuenta !== undefined) {
        res.render('index', {title: "Principal",
            fragmento: 'fragmentos/principal', sesion: true,
            usuario: req.session.cuenta.usuario});
    } else {
        res.render('index', {title: 'Medicos', msg: {error: req.flash('error'), 
                ok: req.flash('success')}});
    }
});

//registro
router.get('/registro', medico.verRegistro);
router.post('/registro', medico.guardar);
//login
router.post('/inicio_sesion', cuenta.iniciar_sesion);
router.get('/cerrar_sesion', auth, cuenta.cerrar_sesion);
//paciente
router.get('/administracion/pacientes', auth, paciente.visualizar);
router.post('/administracion/paciente/guardar', auth, paciente.guardar);
router.get('/administracion/paciente/modificar/:external', auth, paciente.visualizar_modificar);
router.post('/administracion/paciente/actualizar', auth, paciente.modificar);
//VIDEO
router.get('/administracion/consulta', auth ,medico.verConsulta);
router.post('/administracion/consulta/guardar',auth,  medico.guardarConsulta);
router.get('/administracion/Historial_consulta', auth, medico.visualizarConsulta);
router.get('/administracion/Historial_consulta/modificar', auth, medico.visualizarModiConsulta);
router.post('/administracion/Historial_consulta/actualizar', auth, medico.modificarConsulMed);


//router.get('/viviana/:a/:b', rapidin.sumar);
/*router.get('/resta/:a/:b', function (req, res){
 var a = req.params.a * 1;
 var b = req.params.b * 1;
 var c = rapidin.resta(a, b);
 res.send(c+"");
 });*/
//router.get('/medicos', auth, test.listar);
//router.get('/medicos/guardar', test.guardar);
//router.post('/test/tabla', test.tabla);

module.exports = router;
