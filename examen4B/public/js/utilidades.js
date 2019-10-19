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
            pasaporte: {
                required: true
            },
            apellidos: {
                required: true,
                soloLetras: true
            },
            nombres: {
                required: true,
                soloLetras: true
            },
            nro: {
                required: true,
                registro: true
            },
            correo: {
                required: true
            },
            clave: {
                required: true
            },
            direccion: {
                required: true
            },
            enf: {
                required: true
            },
            enf_her: {
                required: true
            },
            hab: {
                required: true
            },
            contacto: {
                required: true
            },
            motivo: {
                required: true
            },
            diagnostico: {
                required: true
            },
            receta: {
                required: true
            }

        }
    });
}
function cambiarFecha() {
    //alert(fecha);
    var d = new Date();
    //alert((d.getDate()+"/"+(d.getMonth()+1))+"/"+d.getFullYear());
    var mes = (d.getMonth() + 1);
    var dia = d.getDate();
    var fecha = (d.getFullYear() + "-" + rellenarCeros(mes, 2) + "-" + rellenarCeros(dia, 2));
    console.log(fecha);
    $("#fecha").val(fecha);
}
function rellenarCeros(texto, nro_cero) {
    texto = texto + "";
    if (texto.length < nro_cero) {
        var aux = "";
        for (var i = texto.length; i < nro_cero; i++) {
            aux += "0";
        }
        return aux + texto;
    } else {
        return texto;
    }
}

function destino() {
    var origen=$("#origen").val();
    var destino=$("#destino").val();
    if(origen===destino){
        return true;
    }else{
        return false;
    }
}


function esExtranjero() {
    var val = $("#opciones").val();
    console.log(val);
    if (val == "si") {
        var monto=
        $("#valor").val(calcularmonto(true,));   
    }
    }
function carcularmonto(val, monto) {
    let total = 0;
    var monto = 0;
    var iva = 1;
    if (val == true) {
        monto = $("#monto").val();
        iva = (monto * 10) / 100;
        total = Math.round(monto) + Math.round(iva);
        $("#montoextranjero").val(total)
    }
}
