'use strict';
var models = require('../models/');
var uuid = require('uuid');
//var pasaje = require('../models/pasaje');
class PasajeControl {
    visualizar(req, res) {
        var msg = {error: req.flash("error"), ok: req.flash("ok")};
         models.persona.findAll({include: [{model: models.pasaje, as: 'pasaje'}]}).then(function (datos) {
            res.render("index", {title: "Pasajes",
                sesion: true,
                fragmento: "fragmentos/pasaje/Registro",
                msg: msg,
                listado: datos});
        }).error(function (error) {
            res.flash('error', 'ERROR');
        });

    }

    guardar(req, res) {
        //cuenta.filter({correo: req,body.correo}).run().then(function(alexis){
        //if(alexis.length<=0){
        //Guardo los datos, sin q se repita el correo
        //}else{
        //error
        //}).error();
        var datos = {
            salida: req.body.origen,
            destino: req.body.destino,
            nro_asiento: req.body.nro,
            fecha: req.body.fecha,
            tipo: req.body.tipo,
            external_id: uuid.v4(),
            id_persona: req.body.id,
            costo: req.body.valorDesc
        };
        
        models.pasaje.create(datos).then(function (pasajeSave) {
            //res.send(result);
            req.flash('ok', 'Se ha registrado correctamente!');
            res.redirect('/');
        }).error(function (error) {
            res.flash('error', 'No se registro correctamente');

        });

    }

    vertabla(req, res) {
        models.pasaje.findAll({include: [{model: models.persona}]}).then(function (datos) {
            res.render('index',
                    {title: 'Historial de Pasajes',
                        fragmento: "fragmentos/pasaje/tabla",
                        sesion: true,
                        pasaje: datos,
                        msg: {error: req.flash('error'), ok: req.flash('ok')}
                    });
        }).error(function (error) {
            req.flash('error', 'Hubo un error!');
            res.redirect('/');
        });
    }
    
    visualizarModiPasaje(req, res) {
         var id = req.params.external;
         models.pasaje.findAll({where:{external_id: id},include: [{model: models.persona}] }).then(function (data) {
            if (data.length > 0) {
                var consulta = data[0];
                res.render('index', {
                    title: 'Modificar Pasajes',
                    fragmento: "fragmentos/pasaje/Modificar",
                    sesion: true,
                    pasaje: consulta,
                    external:consulta.external_id,
                    msg: {error: req.flash('error'), ok: req.flash('ok')}
                });
            } else {
                req.flash('error', 'No se pudo encontrar lo solicitado!');
                res.redirect('/pasaje/tabla');
            }
        }).error(function (error) {

        });
    }
     modificar(req, res) {
        
                var pasaje = [];
                pasaje.salida = req.body.origen;
                pasaje.destino = req.body.destino;
                pasaje.fecha = req.body.fecha;
                pasaje.nro_asiento = req.body.nro_asiento;
                pasaje.costo = req.body.valorDesc;
                models.pasaje.update(pasaje,{where:{external_id: req.body.external}}).then(function (sape) {
                    req.flash('ok', 'Se ha modificado correctamente!');
                    res.redirect('/pasaje/tabla');
                }).error(function (error) {
                    console.log(error);
                    req.flash('error', 'No se pudo modificar!');
                    res.redirect('/pasaje/modificar');
                });

            
    }

}
module.exports = PasajeControl;