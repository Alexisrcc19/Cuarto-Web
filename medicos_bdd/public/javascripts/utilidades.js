function calcularEdad(fecha) {
    // var fecha = document.getElementById("fecha");
    var hoy = new Date();
    var cumpleanos = new Date(fecha);
    var edad = hoy.getFullYear() - cumpleanos.getFullYear();
    var m = hoy.getMonth() - cumpleanos.getMonth();

    if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
        edad--;
    }
    if (edad < 0) {
        edad = 0;
    }
    console.log("Tienes:" + edad + "anios");
    return edad;
}

function validarCedula(cedula) {
    var cad = cedula.trim();
    var total = 0;
    var longitud = cad.length;
    var longcheck = longitud - 1;

    if (cad !== "" && longitud === 10) {
        for (i = 0; i < longcheck; i++) {
            if (i % 2 === 0) {
                var aux = cad.charAt(i) * 2;
                if (aux > 9)
                    aux -= 9;
                total += aux;
            } else {
                total += parseInt(cad.charAt(i)); // parseInt o concatenará en lugar de sumar
            }
        }

        total = total % 10 ? 10 - total % 10 : 0;

        if (cad.charAt(longitud - 1) == total) {
            return true;
        } else {
            return false;
        }
    }
}

function manejoMensajes(msg) {    
    //console.log(error);
    var mensaje = '<div class="alert alert-danger">';
    mensaje += msg;
    mensaje += '</div>';
    $("#error").html(mensaje);
}

function verificar() {
    $.validator.addMethod("soloLetras", function (value, element) {
            return this.optional(element) || /^[a-ñ-z\s]+$/i.test(value);
        }, "Solo letras");

        $.validator.addMethod("registro", function (value, element) {
            return this.optional(element) || /^[N]-[0-9]{4}-[R]-[0-9]{3}$/.test(value);
        }, "Ingrese un registro valido");

        $.validator.addMethod("cedula", function (value, element) {
            return this.optional(element) || validarCedula(value);
        }, "Cedula no valida");
        $("#formulario").validate({
            rules: {
                cedula: {
                    required: true,
                    minlength: 10,
                    maxlength: 10,
                    cedula: true
                },
                apellidos: {
                    required: true,
                    soloLetras:true
                },
                nombres: {
                    required: true,
                    soloLetras:true
                },
                nro:{
                    required: true,
                    registro:true
                },
                correo:{
                    required: true
                },
                clave:{
                    required: true
                },
                direccion:{
                    required: true
                },
                enf:{
                    required: true
                },
                enf_her:{
                    required: true
                },
                hab:{
                    required: true
                },
                contacto:{
                    required: true
                },
                motivo:{
                    required: true
                },
                diagnostico:{
                    required: true
                },
                receta:{
                    required: true
                }
                
            }
        });
    }
