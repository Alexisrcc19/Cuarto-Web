'use strict';
var medico = require('../modelos/medico');
var cuenta = require('../modelos/cuenta');
var consultaMedica = require('../modelos/consultaMedica');
var paciente = require('../modelos/paciente');
var historial = require('../modelos/historia');
class Medicocontroller {
    verRegistro(req, res) {
        res.render('index', {title: 'Registrate', sesion: true, fragmento: "fragmentos/registro_medico"});
    }

    guardar(req, res) {
        var datos = {
            cedula: req.body.cedula,
            apellidos: req.body.apellidos,
            nombres: req.body.nombres,
            fecha_nac: req.body.fecha_nac,
            edad: req.body.edad,
            nro_registro: req.body.nro,
            especialdidad: req.body.especialidad
        };

        var datosC = {
            correo: req.body.correo,
            clave: req.body.clave
        };

        var Medico = new medico(datos);
        var Cuenta = new cuenta(datosC);
        Medico.cuenta = Cuenta;
        Medico.saveAll({cuenta: true}).then(function (result) {
            //res.send(result);
            req.flash('success', 'Se ha registrado correctamente!');
            res.redirect('/');
        }).error(function (error) {
            res.send(error);
        });

    }
    //video
    verConsulta(req, res) {
        var external = req.params.external;
        paciente.getJoin({historia: true}).filter({external_id: external}).then(function (data) {
            if (data.length > 0) {
                var paciente = data[0];
                res.render('index', {
                    title: 'Consulta Medica',
                    fragmento: "fragmentos/consultaMed",
                    sesion: true,
                    paci: paciente,
                    external: req.session.cuenta.external,
                    msg: {error: req.flash('error'), info: req.flash('info')}
                });
            } else {
                req.flash('info', 'No se pudo encontrar lo solicitado!');
                res.redirect('/administracion/pacientes');
            }
        }).error(function (error) {

        });
    }

    guardarConsulta(req, res) {
        historial.filter({external_id: req.body.externalHistoria}).then(function (data) {
            if (data.length > 0) {
                var h = data[0];
                medico.filter({external_id: req.body.externalMedico}).then(function (dataM) {
                    if (dataM.length > 0) {
                        var m = dataM[0];
                        var datos = {
                            diagnostico: req.body.diagnostico,
                            motivo: req.body.motivo,
                            receta: req.body.receta,
                            fecha: req.body.fecha,
                            id_historial: h.id,
                            id_medico: m.id
                        };
                        var consulta = new consultaMedica(datos);
                        consulta.saveAll().then(function (save) {
                            //console.log("h:"+data.id);
                            //console.log("m:"+dataM.id);
                            req.flash('info', 'Se ha guardado correctamente!');
                            res.redirect('/administracion/Historial_consulta');
                        }).error(function (error) {
                            console.log(error);
                            req.flash('info', 'No se pudo guardar!');
                            res.redirect('/administracion/pacientes');
                        });
                    } else {
                        req.flash('info', 'No se pudo encontrar lo solicitado!');
                        res.redirect('/administracion/pacientes');
                    }
                }).error(function (error) {
                    res.send(error);
                });


            } else {
                req.flash('info', 'No se pudo encontrar lo solicitado!');
                res.redirect('/administracion/pacientes');
            }
        }).error(function (error) {
            res.send(error);
        });
    }
    visualizarConsulta(req, res) {
        consultaMedica.getJoin({medico: true, historia: true}).then(function (todos) {
            res.render('index',
                    {title: 'Historial de Consultas Medicas',
                        fragmento: "fragmentos/listaConsulta",
                        sesion: true,
                        listado: todos,
                        msg: {error: req.flash('error'), info: req.flash('info')}
                    });
        }).error(function (error) {
            req.flash('error', 'Hubo un error!');
            res.redirect('/');
        });
    }
    
     visualizarModiConsulta(req, res) {
         var id = req.body.id;
         consultaMedica.getJoin({medico: true, historia: true}).filter({id: id}).then(function (data) {
            if (data.length > 0) {
                var consulta = data[0];
                res.render('index', {
                    title: 'Modificar Consulta Medica',
                    fragmento: "fragmentos/modificarConsulta",
                    sesion: true,
                    consulta: consulta,
                    msg: {error: req.flash('error'), info: req.flash('info')}
                });
            } else {
                req.flash('info', 'No se pudo encontrar lo solicitado!');
                res.redirect('/administracion/pacientes');
            }
        }).error(function (error) {

        });
    }
    
    modificarConsulMed(req, res) {
        var id = req.body.id;
        consultaMedica.getJoin({medico: true, historia: true}).filter({id: id}).then(function (data) {
            if (data.length > 0) {
                var consulta = data[0];
                consulta.diagnostico = req.body.diagnostico;
                consulta.motivo = req.body.motivo;
                consulta.receta = req.body.receta;
                consulta.fecha = req.body.fecha;
                consulta.saveAll().then(function (sape) {
                    req.flash('info', 'Se ha modificado correctamente!');
                    res.redirect('/administracion/pacientes');
                }).error(function (error) {
                    console.log(error);
                    req.flash('info', 'No se pudo modificar!');
                    res.redirect('/administracion/Historial_consulta');
                });

            } else {
                req.flash('info', 'No se pudo encontrar lo solicitado!');
                res.redirect('/administracion/Historial_consulta');
            }
        }).error(function (error) {

        });
    }
    
    buscar(req, res) {
        var criterio = req.query.criterio;
        var texto = req.query.texto;
        var data = {};
        if (criterio === 'todos') {
            consultaMedica.getJoin({medico: true, historia: true}).then(function (lista) {
                lista.forEach(function (item, index) {
                    data[index] = {diagnostico: item.diagnostico,
                        medico: item.medico.apellidos + " " + item.medico.nombres,
                        nro: item.historia.nro_historia,
                        motivo: item.motivo,
                        id: item.id
                    };
                });
                res.json(data);
            }).error(function (error) {

            });
        } else if (criterio === 'medico') {
           consultaMedica.getJoin({medico: true, historia: true}).filter(function (filtro) {
               return filtro('medico')('apellidos').match(texto);
           }).then(function (lista) {
                lista.forEach(function (item, index) {
                    data[index] = {diagnostico: item.diagnostico,
                        medico: item.medico.apellidos + " " + item.medico.nombres,
                        nro: item.historia.nro_historia,
                        motivo: item.motivo,
                        id: item.id
                    };
                });
                res.json(data);
            }).error(function (error) {

            });
        } else if (criterio === 'historia') {
            consultaMedica.getJoin({medico: true, historia: true}).filter(function (filtro) {
               return filtro('historia')('nro_historia').eq(texto);
           }).then(function (lista) {
                lista.forEach(function (item, index) {
                    data[index] = {diagnostico: item.diagnostico,
                        medico: item.medico.apellidos + " " + item.medico.nombres,
                        nro: item.historia.nro_historia,
                        motivo: item.motivo,
                        id: item.id
                    };
                });
                res.json(data);
            }).error(function (error) {

            });
        }
    }
}
module.exports = Medicocontroller;







