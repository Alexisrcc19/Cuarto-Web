'use strict';
function sumar (req, res) {
    var a = req.params.a;
    var b = req.params.b;
    a = parseInt(a);
    b = parseInt(b);
    var c = a + b;
    
    res.send(c + " ");
}
function resta(a, b) {
    var c = a - b;
    return c;
}
function handleError(res) {
    return function(error) {
        console.log(error);
        return res.render("error",{message: error.message, status: "500", stack: error.message});//res.send(500, {error: error.message});
    }
}
module.exports = {sumar, resta, handleError};

