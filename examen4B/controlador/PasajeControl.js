'use strict';
var persona = require('../modelos/persona');
var pasaje = require('../modelos/pasaje');
class PasajeControl {
    visualizar(req, res) {
        var msg = {error: req.flash("error"), info: req.flash("info")};
        persona.then(function (datos) {
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
            origen: req.body.origen,
            destino: req.body.destino,
            fecha: req.body.fecha,
            duracion: req.body.duracion,
            valor: req.body.valor,
            id_persona: req.body.cliente
        };

        var Pasaje = new pasaje(datos);

        Pasaje.save().then(function (result) {
            //res.send(result);
            req.flash('info', 'Se ha registrado correctamente!');
            res.redirect('/pasaje/tabla');
        }).error(function (error) {
            res.flash('error', 'No se registro correctamente');

        });

    }

    vertabla(req, res) {
        pasaje.getJoin({persona: true}).then(function (datos) {
            res.render('index',
                    {title: 'Historial de Pasajes',
                        fragmento: "fragmentos/pasaje/tabla",
                        sesion: true,
                        pasaje: datos,
                        msg: {error: req.flash('error'), info: req.flash('info')}
                    });
        }).error(function (error) {
            req.flash('error', 'Hubo un error!');
            res.redirect('/');
        });
    }
    
    visualizarModiPasaje(req, res) {
         var id = req.body.external;
         pasaje.getJoin({persona: true}).filter({external_id:req.body.external}).then(function (data) {
            if (data.length > 0) {
                var consulta = data[0];
                res.render('index', {
                    title: 'Modificar Pasajes',
                    fragmento: "fragmentos/pasaje/Modificar",
                    sesion: true,
                    pasaje: consulta,
                    msg: {error: req.flash('error'), info: req.flash('info')}
                });
            } else {
                req.flash('info', 'No se pudo encontrar lo solicitado!');
                res.redirect('/pasaje/tabla');
            }
        }).error(function (error) {

        });
    }
     modificar(req, res) {
         pasaje.getJoin({persona: true}).filter({external_id:req.body.external}).then(function (data) {
            if (data.length > 0) {
                var pasaje = data[0];
                pasaje.origen = req.body.origen;
                pasaje.destino = req.body.destino;
                pasaje.fecha = req.body.fecha;
                pasaje.duracion = req.body.duracion;
                pasaje.valor = req.body.valor;
                pasaje.id_persona= req.body.cliente;
                pasaje.save().then(function (sape) {
                    req.flash('info', 'Se ha modificado correctamente!');
                    res.redirect('/pasaje/tabla');
                }).error(function (error) {
                    console.log(error);
                    req.flash('info', 'No se pudo modificar!');
                    res.redirect('/pasaje/modificar');
                });

            } else {
                req.flash('info', 'No se pudo encontrar lo solicitado!');
                res.redirect('/pasaje/tabla');
            }
        }).error(function (error) {

        });
    }

    buscar(req, res) {
        var criterio = req.query.criterio;
        var texto = req.query.texto;
        var data = {};
        if (criterio === 'todos') {
            pasaje.getJoin({persona: true}).then(function (lista) {
                lista.forEach(function (item, index) {
                    data[index] = {origen: item.origen,
                        cliente: item.persona.apellidos + " " + item.persona.nombres,
                        destino: item.destino,
                        external: item.external_id
                    };
                });
                res.json(data);
            }).error(function (error) {

            });
        } else if (criterio === 'origen') {
            pasaje.getJoin({persona: true}).filter(function (filtro) {
                return filtro('origen').eq(texto);
            }).then(function (lista) {
                lista.forEach(function (item, index) {
                    data[index] = {origen: item.origen,
                        cliente: item.persona.apellidos + " " + item.persona.nombres,
                        destino: item.destino,
                        external: item.external_id
                    };
                });
                res.json(data);
            }).error(function (error) {

            });
        } else if (criterio === 'pasajero') {
            pasaje.getJoin({persona: true}).filter(function (filtro) {
                return filtro ('persona')('apellidos').match(texto);
            }).then(function (lista) {
                lista.forEach(function (item, index) {
                    data[index] = {origen: item.origen,
                        cliente: item.persona.apellidos + " " + item.persona.nombres,
                        destino: item.destino,
                        valor: item.valor,
                        external: item.external_id
                    };
                });
                res.json(data);
            }).error(function (error) {

            });
        } else if (criterio === 'destino') {
            pasaje.getJoin({persona: true}).filter(function (filtro) {
                return filtro ('destino').match(texto);
            }).then(function (lista) {
                lista.forEach(function (item, index) {
                    data[index] = {origen: item.origen,
                        cliente: item.persona.apellidos + " " + item.persona.nombres,
                        destino: item.destino,
                        external: item.external_id
                    };
                });
                res.json(data);
            }).error(function (error) {

            });
        }
    }
}
module.exports = PasajeControl;