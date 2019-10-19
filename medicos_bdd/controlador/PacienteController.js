'use strict';
var models = require('../models');
var uuid = require('uuid');
const Sequelize = require('sequelize');
class PacienteController {
    visualizar(req, res) {
        models.paciente.findAll({include: [{model: models.historia, as: 'historia'}]}).then(function (todos) {
            //console.log(JSON.stringify(todos));
            var nro = "NHIS-" + (todos.length + 1);
            res.render('index',
                    {title: 'Pacientes',
                        fragmento: "fragmentos/paciente/lista",
                        sesion: true,
                        listado: todos,
                        nro: nro,
                        msg: {error: req.flash('error'), info: req.flash('info')}
                    });
        });
    }

    guardar(req, res) {
        var dataP = {
            cedula: req.body.cedula,
            apellidos: req.body.apellidos,
            nombres: req.body.nombres,
            fecha_nac: req.body.fecha_nac,
            edad: req.body.edad,
            direccion: req.body.direccion,
            external_id: uuid.v4(),
            historia: {
                nro_historia: req.body.nro_his,
                enfermedades: req.body.enf,
                enfer_here: req.body.enf_her,
                habitos: req.body.hab,
                contacto: req.body.contacto,
                external_id: uuid.v4()
            }
        };
        models.paciente.create(dataP, {include: [{model: models.historia, as: 'historia'}]}).then(function (cuentaSave) {
            req.flash('success', 'Se ha registrado correctamente!');
            //alert('Se ha registrado correctamente')
            res.redirect('/administracion/pacientes');
        }).error(function (error) {
            res.send(error);
        });
    }
    visualizar_modificar(req, res) {
        var external = req.params.external;
        models.paciente.findOne({where: {external_id: external}, include: [{model: models.historia, as: 'historia'}]}).then(function (data) {
            //if (data.length > 0) {
                //var paciente = data[0];
                res.render('index', {
                    title: 'Pacientes',
                    fragmento: "fragmentos/paciente/modificar",
                    sesion: true,
                    paci: data,
                    msg: {error: req.flash('error'), info: req.flash('info')}
                });
            //} else {
             //   req.flash('info', 'No se pudo encontrar lo solicitado!');
              //  res.redirect('/administracion/pacientes');
            //}
        }).error(function (error) {

        });
    }

    modificar(req, res) {
        models.paciente.findOne({where: {external_id: req.body.external}, include: [{model: models.historia, as: 'historia'}]}).then(function (data) {
                var paciente = {
                    apellidos: req.body.apellidos,
                    nombres: req.body.nombres,
                    fecha_nac: req.body.fecha_nac,
                    edad: req.body.edad,
                    direccion: req.body.direccion}
                //Historial
                var historia = {
                    enfermedades: req.body.enf,
                    enfer_here: req.body.enf_her,
                    habitos: req.body.hab,
                    contacto: req.body.contacto}
                
                models.paciente.update(paciente, {where: {external_id: req.body.external}}).then(function (cuentaSave) {
                    models.historia.update(historia, {where: {id_paciente: data.id}});
                        req.flash('info', 'Se ha modificado correctamente!');
                        //alert('Se ha registrado correctamente')
                        res.redirect('/administracion/pacientes');
                }).error(function (error) {
                    req.flash('error', 'Error al modificar!');
                    //alert('Se ha registrado correctamente')
                    res.redirect('/administracion/paciente/modificar/:external');
                });
        }).error(function (error) {

        });
    }

    buscar(req, res) {
        const Op = Sequelize.Op;
        var criterio = req.query.criterio;
        var texto = req.query.texto;
        var data = {};
        if (criterio === 'todos') {
            models.paciente.findAll({include: [{model: models.historia, as: 'historia'}]}).then(function (lista) {
                lista.forEach(function (item, index) {
                    data[index] = {cedula: item.cedula,
                        paciente: item.apellidos + " " + item.nombres,
                        nro: item.historia.nro_historia,
                        external: item.external_id
                    };
                });
                res.json(data);
            }).error(function (error) {

            });
        } else if (criterio === 'cedula') {
            models.paciente.findAll({where: {cedula: texto}, include: [{model: models.historia, as: 'historia'}]}).then(function (lista) {
                lista.forEach(function (item, index) {
                    data[index] = {cedula: item.cedula,
                        paciente: item.apellidos + " " + item.nombres,
                        nro: item.historia.nro_historia,
                        external: item.external_id
                    };
                });
                res.json(data);
            }).error(function (error) {

            });
        } else if (criterio === 'historia') {
            models.paciente.findAll({include: [{model: models.historia, as: 'historia', where: {nro_historia: texto}}]}).then(function (lista) {
                lista.forEach(function (item, index) {
                    data[index] = {cedula: item.cedula,
                        paciente: item.apellidos + " " + item.nombres,
                        nro: item.historia.nro_historia,
                        external: item.external_id
                    };
                });
                res.json(data);
            }).error(function (error) {

            });
        } else if (criterio === 'apellidos') {
            models.paciente.findAll({where: {apellidos: {[Op.like]: '%'+texto+'%' }}, 
                include: [{model: models.historia, as: 'historia'}]}).then(function (lista) {
                lista.forEach(function (item, index) {
                    data[index] = {cedula: item.cedula,
                        paciente: item.apellidos + " " + item.nombres,
                        nro: item.historia.nro_historia,
                        external: item.external_id
                    };
                });
                res.json(data);
            }).error(function (error) {

            });
        }else if (criterio === 'alexis') {
            models.paciente.findAll({include: [{model: models.historia, as: 'historia'}],where: {cedula:texto ,[Op.or]: {nro_historia: texto}}}).then(function (lista) {
                lista.forEach(function (item, index) {
                    data[index] = {cedula: item.cedula,
                        paciente: item.apellidos + " " + item.nombres,
                        nro: item.historia.nro_historia,
                        external: item.external_id
                    };
                });
                res.json(data);
            }).error(function (error) {

            });
        }
    }

}
module.exports = PacienteController;