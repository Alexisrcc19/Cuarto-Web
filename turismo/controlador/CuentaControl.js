'use strict'
class CuentaControl {
    visualizar(req, res) {
        res.render("index", {title: "Registrate",
            sesion: true,
            fragmento: "fragmentos/registroPersona"});
    }
}
module.exports = CuentaControl;