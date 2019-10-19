'use strict';
var models= require('../models');
var uuid = require('uuid');
class ConsultaControl{
    buscar(req, res) {
        const Sequelize = require('sequelize');
        const Op = Sequelize.Op;
        var criterio = req.query.criterio;
        var texto = req.query.texto;
        var data = {};
        if (criterio === 'cedula') {
            models.paciente.findAll({where: {cedula: texto}, include: [{model: models.historia, as: 'historia'}]}).then(function (lista) {
                lista.forEach(function (item, index) {
                    data[index] = {cedula: item.cedula,
                        paciente: item.apellidos + " " + item.nombres,
                        nro: item.historia.nro_historia,
                        habitos: item.historia.habitos,
                        enf: item.historia.enfermedades,
                        enf_her: item.historia.enfer_here,
                        external: item.historia.id
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
                        habitos: item.historia.habitos,
                        enf: item.historia.enfermedades,
                        enf_her: item.historia.enfer_here,
                        external: item.historia.id
                    };
                });
                res.json(data);
            }).error(function (error) {

            });
        } 
    }
    
    guardarConsulta(req, res) {
        var dataConsulta = {
            diagnostico: req.body.diag,
            motivo: req.body.motivo,
            receta: req.body.receta,
            fecha: req.body.fecha,
            id_medico: req.body.idMedico,
            id_historia: req.body.idHistoria,
            external_id: uuid.v4(),
        };
        models.consultaMedica.create(dataConsulta).then(function (cuentaSave) {
            req.flash('success', 'Se ha registrado correctamente!');
            //alert('Se ha registrado correctamente')
            res.redirect('/administracion/pacientes');
        }).error(function (error) {
            res.send(error);
        });
    }
    
    visualizarTabla(req, res) {
        models.consultaMedica.findAll({include: [{model: models.historia},{model:models.persona}]}).then(function (todos) {
            //console.log(JSON.stringify(todos));
            res.render('index',
                    {title: 'Consulta Médica',
                        fragmento: "fragmentos/consulta/listaConsulta",
                        sesion: true,
                        listado: todos,
                        usuario: req.user.id,
                        msg: {error: req.flash('error'), info: req.flash('info')}
                    });
        });
    }
    visualizarModi(req, res) {
        var external = req.params.external;
         models.consultaMedica.findOne({where: {external_id: external},include: [{model: models.historia},{model:models.persona}]}).then(function (data) {
            //if (data.length > 0) {
                //var paciente = data[0];
                res.render('index', {
                    title: 'Consulta Medica',
                    fragmento: "fragmentos/consulta/modificar",
                    sesion: true,
                    consulta: data,
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
        var external = req.body.external;
       models.consultaMedica.findOne({where: {external_id: external}}).then(function (data) {
                var consultaMedica = {
                    motivo: req.body.motivo,
                    diagnostico: req.body.diagnostico,
                    fecha: req.body.fecha,
                    receta: req.body.receta}
                
                models.consultaMedica.update(consultaMedica, {where: {external_id: external}}).then(function (cuentaSave) {
                        req.flash('info', 'Se ha modificado correctamente!');
                        //alert('Se ha registrado correctamente')
                        res.redirect('/administracion/consulta');
                }).error(function (error) {
                    req.flash('error', 'Error al modificar!');
                    //alert('Se ha registrado correctamente')
                    res.redirect('/administracion/consulta/modificar/:external');
                });
        }).error(function (error) {

        });
    }
    
}
module.exports= ConsultaControl;
