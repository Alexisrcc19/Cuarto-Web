'use strict';
var persona = require('../modelos/persona');
//var pasaje = require('../modelos/cuenta');
class PersonaControl {
    visualizarReg(req, res) {
        var msg = {error: req.flash("error"), info: req.flash("info")};
        res.render("index", {title: "Registrar Cliente",
            sesion: true,
            fragmento: "fragmentos/persona/registro",
            msg: msg});
    }
    

    guardar(req, res) {
        //cuenta.filter({correo: req,body.correo}).run().then(function(alexis){
        //if(alexis.length<=0){
        //Guardo los datos, sin q se repita el correo
        //}else{
        //error
        //}).error();
        var datos = {
            nacionalidad: req.body.nacionalidad,
            cedula: req.body.cedula,
            pasaporte: req.body.pasaporte,
            apellidos: req.body.apellidos,
            nombres: req.body.nombres,
            fecha_nac: req.body.fecha_nac,
            edad: req.body.edad
        };

        var Persona = new persona(datos);
        Persona.save().then(function (result) {
            //res.send(result);
            req.flash('info', 'Se ha registrado correctamente!');
            res.redirect('/pasaje/tabla');
        }).error(function (error) {
            res.flash('error', 'No se registro correctamente');

        });

    }
}
module.exports = PersonaControl;