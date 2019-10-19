'use strict'
class CuentaControl{
    cerrar_sesion(req,res){
        req.session.destroy();
        res.redirect('/')
    }
}

module.exports= CuentaControl;