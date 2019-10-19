var express = require('express');
var router = express.Router();
var passport = require('passport');
//CONTROLADORES
var medicocontrol = require('../controlador/medicoControlador');
var medico = new medicocontrol();
var cuentacontrol = require('../controlador/CuentaControl');
var cuenta = new cuentacontrol();
var pacientecontrol= require('../controlador/PacienteController');
var paciente= new pacientecontrol();
var consultaC= require('../controlador/ConsultaControl');
var consulta= new consultaC();
var fotoC=require('../controlador/FotoControl');
var foto= new fotoC();
//MILDWARE
var auth = function (req, res, next) {
    if(req.isAuthenticated()) {
        next();
    } else {
        req.flash('error', "Debe iniciar sesion primero");
        res.redirect("/");
    }
}

/* GET home page. */
router.get('/', function (req, res, next) {
    if (req.isAuthenticated()) {
        console.log(req.user.nombre);
        res.render('index', {title: "Principal",
            andrea: 'fragmentos/principal', sesion: true,
            usuario: req.user.nombre});
    } else {
        res.render('index', {title: 'Medicos', msg: {error: req.flash('error'),
                ok: req.flash('success')}});
    }
});

//inicio session
router.post('/inicio_sesion',
        passport.authenticate('local-signin',
                {successRedirect: '/principal',
                    failureRedirect: '/',
                    failureFlash: true}
        ));

module.exports = router;
//principal
router.get('/principal',  function(req, res, next) {        
  res.render('index', { title: 'Principal', sesion: true, fragmento:"fragmentos/principal" ,usuario: req.user.nombre});
  });
//MEDICO
router.get('/cerrar_sesion', auth, cuenta.cerrar_sesion);
router.get('/registromedico', medico.verRegistro);
router.post('/registromedico', medico.guardar);

//  PACIENTE
router.get('/administracion/pacientes', paciente.visualizar);
router.post('/administracion/pacientes/guardar', paciente.guardar);
router.get('/administracion/paciente/modificar/:external', paciente.visualizar_modificar);
router.post('/administracion/paciente/actualizar', paciente.modificar);
///CONSULTA
router.get('/administracion/consultas', auth, function(req, res, next) {        
  res.render('index', { title: 'Consulta', sesion: true, fragmento:"fragmentos/consulta/registroConsulta" ,usuario: req.user.id});
  });

router.post('/administracion/consulta/guardar', consulta.guardarConsulta);
router.get('/administracion/consulta',consulta.visualizarTabla);
router.get('/administracion/consulta/modificar/:external', consulta.visualizarModi);
router.post('/administracion/consulta/actualizar', consulta.modificar);

//FOTO
router.get('/administracion/foto', auth,foto.visualizar);
router.post('/administracion/foto/subir',auth, foto.subirFoto);
