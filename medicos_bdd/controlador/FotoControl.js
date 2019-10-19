'use strict';
var models = require('../models/');
var persona = models.persona;
var formidable = require('formidable');
var extensiones = ["jpg", "png", "gif"];
var maxSize = 1 * 1024 * 1024;
var fs = require('fs');
class FotoControl {
    visualizar(req, res) {
        persona.findOne({where: {id: req.user.id}}).then(function (result) {
            if (result) {
                res.render('index', {
                    title: 'Principal',
                    fragmento: "fragmentos/perfil/foto",
                    sesion: true,
                    persona: result,
                    msg: {error: req.flash('error'), info: req.flash('info')}
                });
            } else {
                req.flash('error', 'No se encontro nada');
                //alert('Se ha registrado correctamente')
                res.redirect('/');
            }
        });
    }

    subirFoto(req, res) {
        var form = new formidable.IncomingForm();

        form.parse(req, function (err, fields, files) {
            if (files.archivo.size <= maxSize) {
                var extension = files.archivo.name.split(".").pop().toLowerCase();
                if (extensiones.includes(extension)) {
                    var external = fields.external;
                    var nombreFoto = external + "." + extension;
                    fs.rename(files.archivo.path, "public/uploads/" + nombreFoto, function (err) {
                        if (err) {
                            req.flash('error', 'HUbo un error' + err);
                            res.redirect('/administracion/foto');
                        } else {
                            persona.findOne({where: {external_id: external}}).then(function (result) {
                                result.foto = nombreFoto;
                                result.save().then(function (ok) {
                                    fs.exists(files.archivo.path, function(exists) {
                                        if(exists){
                                            fs.unlinkSync(files.archivo.path);
                                        }
                                    });
                                    req.flash('info', 'Se ha subido su foto correctamente');
                                    res.redirect('/administracion/foto');
                                })
                            });
                        }
                    });
                    //res.send(extension);
                } else {
                    req.flash('error', 'Tipo de archivo no valido, debe ser png,jpg o gif');
                    res.redirect('/administracion/foto');
                }

            } else {
                req.flash('error', 'El tamaño no puede superar 1MB');
                //alert('Se ha registrado correctamente')
                res.redirect('/administracion/foto');
            }

        });
    }
}


module.exports = FotoControl;
