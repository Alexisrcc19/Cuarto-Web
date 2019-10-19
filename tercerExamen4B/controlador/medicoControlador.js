'use strict';
var models = require('../models');
var uuid = require('uuid');
var bcrypt = require('bcrypt');
const saltRounds = 10;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
class medicoControlador {
    verRegistro(req, res) {
        res.render('index', {title: 'Registrate', fragmento: "fragmentos/registro_medico", sesion: true, msg: {error: req.flash('error'), ok: req.flash('ok')}});
    }
    guardar(req, res) {
        var persona = models.persona;// NUEVO
        var generateHash = function (clave) {
            return bcrypt.hashSync(clave, bcrypt.genSaltSync(saltRounds), null);
        };
        var dataP = {
            cedula: req.body.cedula,
            apellidos: req.body.apellidos,
            nombres: req.body.nombres,
            edad: req.body.edad,
            fecha_nac: req.body.fecha_nac,
            external_id: uuid.v4(),
            cuenta: {
                correo: req.body.correo,
                clave: generateHash(req.body.clave),
                external_id: uuid.v4()
            }
        };
        persona.findOne({where:{cedula:dataP.cedula}}).then(function (per) {
            if(per===null){
                persona.create(dataP, {include: [{model: models.cuenta, as: 'cuenta'}]}).then(function (cuentaSave) {
                    req.flash('ok', 'Se ha registrado correctamente!');
                    res.redirect('/');
                }).error(function (error) {
                    req.flash('error', 'Error al registrar!');
                    res.redirect('/medico/registro');
                });
            }else{
                req.flash('error', 'Cedula Repetida!');
                    res.redirect('/medico/registro');
            }
        }).error(function (error) {
            req.flash('error', 'error en la consulta!');
                    res.redirect('/medico/registro');
        });
    }
}
module.exports = medicoControlador;

