'use strict';
var models = require('../models');
var uuid = require('uuid');
class medicoControlador {
    verRegistro(req, res) {
        res.render('index', {title: 'Registrate', sesion: true, fragmento: "fragmentos/registro_medico"});
    }


    guardar(req, res) {
        var persona = models.persona;// NUEVO
        var dataP = {
            cedula: req.body.cedula,
            apellidos: req.body.apellidos,
            nombres: req.body.nombres,
            nro_registro: req.body.nro,
            especialdidad: req.body.especialidad,
            edad: req.body.edad,
            fecha_nac: req.body.fecha_nac,
            external_id: uuid.v4(),
            cuenta:{
                correo: req.body.correo,
                clave: req.body.clave
            }
        };

        persona.create(dataP,{include:[{model:models.cuenta,as: 'cuenta'}]}).then(function (cuentaSave) {
            req.flash('success', 'Se ha registrado correctamente!');
            //alert('Se ha registrado correctamente')
            res.redirect('/');
        }).error(function (error) {
            res.send(error);
        });
        
    }
}
module.exports = medicoControlador;

