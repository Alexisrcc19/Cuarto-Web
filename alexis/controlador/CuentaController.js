/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
'use strict';
/**
 * I mportacion de la clase de modelo Cuenta
 * @type Module cuenta|Module cuenta
 */
var cuentaC = require('../modelos/cuenta');
/**
 * Clase que permite iniciar sesion y cerrar sesion
 */
class CuentaController {
    /**
     * Funcion que permite iniciar sesion
     * @param {type} req objeto peticion
     * @param {type} res objeto respuesta
     * @returns {undefined} redireccion a paginas
     */
    iniciar_sesion(req, res) {
        //var cuenta = new cuentaC();
        cuentaC.getJoin({medico: true}).filter({correo: req.body.correo}).run().then(function (janina) {
            if(janina.length > 0) {
                var cuenta = janina[0];
                if(cuenta.clave === req.body.clave) {
                    req.session.cuenta = {external:cuenta.medico.external_id,
                    usuario: cuenta.medico.apellidos+" "+cuenta.medico.nombres};
                    res.redirect('/');
                } else {
                    req.flash('error', 'Sus credenciales no son las correctas!');
                res.redirect('/');
                }
                
            } else {
                req.flash('error', 'Sus credenciales no son las correctas!');
                res.redirect('/');
            }
            
        }).error(function (error) {
            
        });
    }
    
    cerrar_sesion(req, res) {        
        req. session.destroy();        
        res.redirect('/');
    }
}
module.exports = CuentaController;

