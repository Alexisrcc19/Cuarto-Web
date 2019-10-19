"use strict";
var utiles = require('./utiles');
var medico = require('../modelos/medico');
var cuenta = require('../modelos/cuenta');
var thinky = require('../config/thinky_init');

var r = thinky.r;
class Test {
    listar(req, res) {

        medico.getJoin({cuenta: true}).filter({cuenta: {correo: "jose.o.guaman@unl.edu.ec"}})
                //medico.get("1").getJoin({cuenta: true})
                //medico
                //medico.getJoin({cuenta: true})
                //  .run()
                .then(function (user) {
                    if (user.length <= 0) {
                        console.log("No hay nada");
                        console.log(user.length);
                    } else {
                        console.log("Si hay ");
                        console.log(user.length);

                    }

                    res.send(user);
                    /*
                     * user = {
                     *     id: "0e4a6f6f-cc0c-4aa5-951a-fcfc480dd05a",
                     *     name: "Michel",
                     *     account: {
                     *         id: "3851d8b4-5358-43f2-ba23-f4d481358901",
                     *         userId: "0e4a6f6f-cc0c-4aa5-951a-fcfc480dd05a",
                     *         sold: 2420
                     *     }
                     * }
                     */
                }).error(function (error) {
            res.send("Hubo un error");
        });//.error(utiles.handleError(res));


    }
    guardar(req, res) {
        var data = {cedula: "1104334634", apellidos: "Guaman", nombres: "sebastian", edad: 12};
        var med = new medico(data);
        var datacuenta = {correo: "sebas@unl.edu.ec", clave: "1234"};
        var cuen = new cuenta(datacuenta);
        //med.cuenta = [cuen];      
        med.cuenta = cuen;
        //cuen.medico = med;
        med.saveAll({cuenta: true}).then(function (result) {
            res.send(result);
        }).error(function (error) {
            // Handle error
        });
    }

    tabla(req, res) {
        var a = req.body.nra;
        var b = req.body.nrb;
        var resp = {};
        for (var i = 1; i <= b; i++) {
            resp[i - 1] = {"resp": (i * a), "detalle": i + "*" + a};
        }
        //res.send(resp);
        res.render('index', {title: "tabla", andrea: 'fragmentos/tabla', sesion: true, respuesta: resp});
    }

}
module.exports = Test;