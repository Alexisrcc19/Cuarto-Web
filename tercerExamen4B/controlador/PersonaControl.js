'use strict';
var models = require('../models/');
var uuid = require('uuid');
const Sequelize = require('sequelize');
//var pasaje = require('../modelos/cuenta');
class PersonaControl {
    visualizarReg(req, res) {
        var msg = {error: req.flash("error"), ok: req.flash("ok")};
        res.render("index", {title: "Registrar Cliente",
            sesion: true,
            fragmento: "fragmentos/persona/registro",
            msg: msg});
    }

    guardar(req, res) {
        var datos = {
            nacionalidad: req.body.nacionalidad,
            cedula: req.body.cedula,
            pasaporte: req.body.pasaporte,
            apellidos: req.body.apellidos,
            nombres: req.body.nombres,
            fecha_nac: req.body.fecha_nac,
            edad: req.body.edad,
            external_id: uuid.v4()
        };
        models.persona.findOne({where: {pasaporte: datos.pasaporte}}).then(function (per) {
            if (per === null) {
                models.persona.create(datos).then(function (pasajeSave) {
                    req.flash('ok', 'Se ha registrado correctamente!');
                    res.redirect('/');
                }).error(function (error) {
                    req.flash('error', 'Error al registrar!');
                    res.redirect('/cliente/registrate');
                });
            } else {
                req.flash('error', 'Pasaporte repetido!');
                res.redirect('/cliente/registrate');
            }
        });
    }
    buscar(req, res) {

        const Op = Sequelize.Op;
        var criterio = req.query.criterio;
        var texto = req.query.texto;
        var data = {};
        if (criterio === 'pasaporte') {
            models.persona.findAll({include: [{model: models.pasaje, as: 'pasaje'}], where: {pasaporte: texto}}).then(function (lista) {
                lista.forEach(function (item, index) {
                    data[index] = {cedula: item.cedula,
                        cliente: item.apellidos + " " + item.nombres,
                        edad: item.edad,
                        pasaporte: item.pasaporte,
                        fecha: item.fecha,
                        id: item.id
                    };
                });
                res.json(data);
            }).error(function (error) {

            });
        } 
    }
}
module.exports = PersonaControl;