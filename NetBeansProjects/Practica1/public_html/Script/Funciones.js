var URL_SOAP = "http://localhost/wsdl/index.php?wsdl";
var URL_RESTPUL = "http://localhost/wsdl/restfull.php";
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


function cargarEspecialidades() {

    var message = '';
    message += '<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">';
    message += '<Body>';
    message += '<lista_especialidades xmlns="urn:server"/>';
    message += ' </Body>';
    message += '</Envelope>';
    $.ajax({
        url: URL_SOAP,
        type: 'POST',
        contentType: 'text/xml',
        data: message,
        dataType: 'xml',
        success: function (data, textStatus, jqXHR) {
            var xml = jqXHR.responseXML;
            var xmlData = $.parseXML(xml);
            var opciones = '';
            $(xml).text(xmlData).find('item').each(function () {
                //var id= $(this).find("id").text();
                var nombre = $(this).find("nombre").text();
                opciones += "<option value= '" + nombre + "'>" + nombre + "</option>";
            });
            $('#especialidad').html(opciones);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR.responseText);
        }
    });
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

function manejoErrores(xml) {
    var xmlData = $.parseXML(xml);
    var error = $(xml).find("faultstring").text();
    //console.log(error);
    var mensaje = '<div class="alert alert-danger">';
    mensaje += error;
    mensaje += '</div>';

    $("#error").html(mensaje);
}

function verificarInicioSesion() {
    if (localStorage["token"] != null) {
        location.href = "paciente.html";
    }
}

function verificarNoInicioSesion() {
    if (localStorage["token"] == null) {
        location.href = "Inicio.html";
    }
}

function cerrar_sesion() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("external");
    location.href = "Inicio.html";
}
var externalPaciente = "";
function cargarPacientes() {
    var accion = "/listar_paciente";
    $.ajax({
        url: URL_RESTPUL + accion,
        type: 'GET',
        dataType: 'json',
        headers: {'api-token': localStorage["token"]},
        success: function (data, textStatus, jqXHR) {
            //     console.log(data);
            if (data.codigo) {
                manejoErroresJson(data.message, data.codigo);
            } else {
                var tabla = '';
                $.each(data, function (index, item) {
                    //console.log(item.cedula);
                    var aux = $.param(item);
                    externalPaciente = item.external;
                    var itemData = JSON.stringify(item);
                    tabla += '<tr>';
                    tabla += '<th scope="row">' + (index + 1) + '</th>';
                    tabla += '<td>' + item.cedula + '</td>';
                    tabla += '<td>' + item.apellidos + ' ' + item.nombres + '</td>';
                    //  tabla += '<td><a  class="btn btn-primary" data-toggle="modal"  id="modificar" data-target="#registroPaciente"\n\
                    //         onclick="obtenerPaciente(' + "'" + externalPaciente + "'" + ')" >Modificar </a> </td>';
                    tabla += '<td><a  class="btn btn-primary" data-toggle="modal"  id="modificar" data-target="#registroPaciente"\n\
                             onclick="obtenerPacientesconParam(' + "'" + aux + "'" + ')" >Modificar </a> </td>';
                    tabla += '</tr>';
                });
                $("#cuerpo").html(tabla);
            }

        }, error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
            alert("ERROR");
        }
    });
}


function obtenerPaciente(external) {
    var accion = "/obtener_paciente/" + external;
    $.ajax({
        url: URL_RESTPUL + accion,
        type: 'GET',
        dataType: 'json',
        headers: {'api-token': localStorage["token"]},
        success: function (data, textStatus, jqXHR) {
            console.log(data);
            if (data.codigo) {
                manejoErroresJson(data.message, data.codigo);
            } else {
                cargarDatosPacientes(data);
            }
        }, error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR)
        }
    });
}

function cargarDatosPacientes(item) {
    $("#apellidos1").val(item.apellidos),
            $("#nombres1").val(item.nombres),
            $("#fecha1").val(item.fecha_nac),
            $("#direccion1").val(item.direccion),
            $("#genero").val(item.genero),
            $("#celular1").val(item.celular),
            $("#habito1").val(item.habitos),
            $("#enfermedades1").val(item.enfermedades),
            $("#enfermedades_h").val(item.enferm_heder),
            $("#cedula1").val(item.cedula),
            $("#telefono1").val(item.telefono)
    var edad = calcularEdad($("#fecha1").val());
    $("#edad1").val(edad);
}

function  guardarDatosModificados(external) {
    var accion = "/modificar_paciente/" + external;
    var data = {
        "apellidos": $("#apellidos1").val(),
        "nombres": $("#nombres1").val(),
        "fecha_nac": $("#fecha1").val(),
        "direccion": $("#direccion1").val(),
        "genero": $("#genero").val(),
        "edad": $("#edad1").val(),
        "celular": $("#celular1").val(),
        "habitos": $("#habito1").val(),
        "enfermedades": $("#enfermedades1").val(),
        "enfermedades_hederitarias": $("#enfermedades_h").val(),
        "cedula": $("#cedula1").val(),
        "telefono": $("#telefono1").val()
    };
    var dataEnv = JSON.stringify(data);
    $.ajax({
        url: URL_RESTPUL + accion,
        data: dataEnv,
        type: 'POST',
        headers: {"api-token": localStorage["token"]},
        dataType: 'json',
        success: function (data, textStatus, jqXHR) {
            var external = data.external;
            console.log("External:" + external);
            if (data.codigo && data.codigo == "200") {
                alert("Se ha modificado correctamente");
            } else {
                manejoErroresJson(data.message, data.codigo);
                alert("nnn " + data.message, data.codigo)
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            manejoErroresJson(jqXHR, textStatus, errorThrown);
            console.log(jqXHR);
        }
    });
}

function obtenerPacientesconParam(data) {
    var datos= JSON.parse('{"'+data.replace(/&/g, '","').replace(/=/g,'":"')+'"}',function (key,value) {
        return key===""?value:decodeURIComponent(value)
    });
    externalPaciente = datos.external;
    //var valores = aux.split(/\s*&\s*/); 
    //var obj={valores};
    cargarDatosPacientes(datos);
    console.log("ESto es el param");
    console.log(decodeURIComponent(data));  
    console.log("ESto es el Cadena legible");
    console.log(datos);
}

function manejoErroresJson(error, codigo) {
    if (codigo == "401") {
        mensaje = "Hubo un error al momento de solicitar la informacion,\n\
                por favor pongase en contacto";
    }
    //console.log(error);
    var mensaje = '<div class="alert alert-danger">';
    mensaje += error;
    mensaje += '</div>';
    $("#error").html(mensaje);
}

function validarPaciente() {
    $.validator.addMethod('soloLetras', function (value, element) {
        return this.optional(element) || /^[a-ñ-z\s]+$/i.test(value);
    }, 'Solo letras');

    $.validator.addMethod('registro', function (value, element) {
        return this.optional(element) || /^[N]-[0-9]{4}-[R]-[0-9]{3}$/.test(value);
    }, 'Ingrese un registro valido');

    $.validator.addMethod('validarCedula', function (value, element) {
        return this.optional(element) || validarCedula(value);
    }, 'Ingrese un número de cedula valido');

    $("#formulario").validate({
        rules: {
            cedula: {
                required: true,
                minlength: 10,
                maxlength: 10,
                number: true,
                validarCedula: true
            },
            nombres: {
                required: true,
                minlength: 4,
                maxlength: 30,
                soloLetras: true
            },
            apellidos: {
                required: true,
                minlength: 4,
                maxlength: 30,
                soloLetras: true
            },
            fecha: {
                required: true
            },
            direccion: {
                required: true,
                minlength: 4,
                maxlength: 50
            },
            telefono: {
                required: false,
                minlength: 7,
                maxlength: 7
            },
            celular: {
                required: false,
                minlength: 10,
                maxlength: 10
            },
            habitos: {
                required: true
            },
            enfermedades: {
                required: true
            },
            enfer_hered: {
                required: true
            }
        }
    });
}

