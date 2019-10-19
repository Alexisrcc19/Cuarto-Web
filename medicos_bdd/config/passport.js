//var bCrypt = require('bcrypt-nodejs'); //modulo para encriptar claves
var models = require('./../models');
var cuenta = models.cuenta;
var persona = models.persona;
module.exports = function (passport) {
    var Cuenta = cuenta;//modelo
    var Persona = persona;//modelo    
    var LocalStrategy = require('passport-local').Strategy;
    //Permite serializar los datos de cuenta
    passport.serializeUser(function (cuenta, done) {
        done(null, cuenta.id);
    });
    // Permite deserialize la cuenta de usuario
    passport.deserializeUser(function (id, done) {
        Cuenta.findOne({where: {id: id}, include: [{model: Persona}]}).then(function (cuenta) {
            if (cuenta) {
                var userinfo = {
                    id: cuenta.persona.id,                    
                    nombre: cuenta.persona.apellidos + " " + cuenta.persona.nombres                    
                };
                console.log(userinfo);
                done(null, userinfo);
            } else {
                done(cuenta.errors, null);
            }
        });
    });    
    //inicio de sesion
    passport.use('local-signin', new LocalStrategy(
            {
                usernameField: 'correo',
                passwordField: 'clave',
                passReqToCallback: true // allows us to pass back the entire request to the callback
            },
            function (req, email, password, done) {
                var Cuenta = cuenta;
                
                Cuenta.findOne({where: {correo: email}}).then(function (cuenta) {
                    if (!cuenta) {
                        return done(null, false, {message: req.flash('error', 'Cuenta no existe')});
                    }
                    if (cuenta.clave !== password) {
                        return done(null, false, {message: req.flash('error', 'Clave incorrecta')});
                    }
                    var userinfo = cuenta.get();                                  
                    return done(null, userinfo);

                }).catch(function (err) {
                    console.log("Error:", err);
                    return done(null, false, {message: req.flash('error', 'Cuenta erronea')});
                });
            }
    ));
}
