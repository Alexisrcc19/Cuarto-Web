'use strict';
var pacienteC = require('../modelos/paciente');
var historiaC = require('../modelos/historia');
class PacienteController {
    visualizar(req, res) {
        pacienteC.getJoin({historia: true}).then(function (todos) {
            var nro = "NHIS-" + (todos.length + 1);
            res.render('index',
                    {title: 'Pacientes',
                        fragmento: "fragmentos/paciente/lista",
                        sesion: true,
                        listado: todos,
                        nro: nro,
                        msg: {error: req.flash('error'), info: req.flash('info')}
                    });
        }).error(function (error) {
            req.flash('error', 'Hubo un error!');
            res.redirect('/');
        });
    }

    guardar(req, res) {
        var dataP = {
            cedula: req.body.cedula,
            apellidos: req.body.apellidos,
            nombres: req.body.nombres,
            fecha_nac: req.body.fecha_nac,
            edad: req.body.edad,
            direccion: req.body.direccion
        };
        var paciente = new pacienteC(dataP);
        var dataH = {
            nro_historia: req.body.nro_his,
            enfermedades: req.body.enf,
            enfer_hede: req.body.enf_her,
            habitos: req.body.hab,
            contacto: req.body.contacto
        };
        var historia = new historiaC(dataH);
        paciente.historia = historia;
        paciente.saveAll({historia: true}).then(function (nuevo) {
            req.flash('info', 'Paciente registrado!');
            res.redirect('/administracion/pacientes');
        }).error(function (error) {
            req.flash('error', 'No se pudo registrar!');
            res.redirect('/administracion/pacientes');
        });
    }
    visualizar_modificar(req, res) {
        var external = req.params.external;
        pacienteC.getJoin({historia: true}).filter({external_id: external}).then(function (data) {
            if (data.length > 0) {
                var paciente = data[0];
                res.render('index', {
                    title: 'Pacientes',
                    fragmento: "fragmentos/paciente/modificar",
                    sesion: true,
                    paci: paciente,
                    msg: {error: req.flash('error'), info: req.flash('info')}
                });
            } else {
                req.flash('info', 'No se pudo encontrar lo solicitado!');
                res.redirect('/administracion/pacientes');
            }
        }).error(function (error) {

        });
    }

    modificar(req, res) {
        pacienteC.getJoin({historia: true}).filter({external_id: req.body.external}).then(function (data) {
            if (data.length > 0) {
                var paciente = data[0];
                paciente.apellidos = req.body.apellidos;
                paciente.nombres = req.body.nombres;
                paciente.fecha_nac = req.body.fecha_nac;
                paciente.edad = req.body.edad;
                paciente.direccion = req.body.direccion;
                //Historial
                paciente.historia.enfermedades = req.body.enf;
                paciente.historia.enfer_here = req.body.enf_her;
                paciente.historia.habitos = req.body.hab;
                paciente.historia.contacto = req.body.contacto;

                paciente.saveAll({cuenta: true}).then(function (sape) {
                    req.flash('info', 'Se ha modificado correctamente!');
                    res.redirect('/administracion/pacientes');
                }).error(function (error) {
                    console.log(error);
                    req.flash('info', 'No se pudo modificar!');
                    res.redirect('/administracion/pacientes/modificar');
                });

            } else {
                req.flash('info', 'No se pudo encontrar lo solicitado!');
                res.redirect('/administracion/pacientes');
            }
        }).error(function (error) {

        });
    }

    buscar(req, res) {
        var criterio = req.query.criterio;
        var texto = req.query.texto;
        var data = {};
        if (criterio === 'todos') {
            pacienteC.getJoin({historia: true}).then(function (lista) {
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
            pacienteC.getJoin({historia: true}).filter({cedula: texto}).then(function (lista) {
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
            pacienteC.getJoin({historia: true}).filter(function (filtro) {
                return filtro('historia')('nro_historia').eq(texto);
            }).then(function (lista) {
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
            pacienteC.getJoin({historia: true}).filter(function (filtro) {
                return filtro('apellidos').match(texto);
            }).then(function (lista) {
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