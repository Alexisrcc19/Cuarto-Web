URL_SOAP = 'http://localhost/wsdl/index.php?wsdl';
URL_RESTFUL = 'http://localhost/wsdl/restfull.php';
function cargarEspecialidades() {
    var cuerpo = '';
    cuerpo += '<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">';
    cuerpo += '<Body>';
    cuerpo += '<lista_especialidades xmlns="urn:server"/>';
    cuerpo += '</Body>';
    cuerpo += '</Envelope>';
    $.ajax({
        url: URL_SOAP,
        type: 'POST',
        contentType: 'text/xml',
        data: cuerpo,
        dataType: 'xml',
        success: function (data, textStatus, jqXHR) {
            var xml = jqXHR.responseXML;
            var xmlData = $.parseXML(xml);
            var opciones = '';
            $(xml).text(xmlData).find('item').each(function () {
                var nombre = $(this).find("nombre").text();
                opciones += "<option value= '" + nombre + "'>" + nombre + "</option>";
            });
            $('#Especialidad').html(opciones);
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

function registroMedicos() {
    var cuerpo = '<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">>';
    cuerpo += '<Body>';
    cuerpo += '<registro_medico xmlns="urn:server">';
    cuerpo += '<cedula>' + $("#cedula").val() + '</cedula>';
    cuerpo += '<apellidos>' + $("#apellidos").val() + '</apellidos>';
    cuerpo += '<nombres>' + $("#nombres").val() + '</nombres>';
    cuerpo += '<especialidad>' + $("#Especialidad").val() + '</especialidad>';
    cuerpo += '<correo>' + $("#correo").val() + '</correo>';
    cuerpo += '<nro_reg>' + $("#registro").val() + '</nro_reg>';
    cuerpo += '<clave>' + $("#clave").val() + '</clave>';
    cuerpo += '</registro_medico>';
    cuerpo += '</Body>';
    cuerpo += '</Envelope>';
    $.ajax({
        url: URL_SOAP,
        data: cuerpo,
        type: 'POST',
        dataType: 'xml',
        contentType: 'text/xml',
        success: function (data, textStatus, jqXHR) {
            var mensaje = '';
            if (jqXHR.status == '200') {
                mensaje += '<div class="alert alert-success" role="alert">';
                mensaje += '    Registro con exito';
                mensaje += '</div>';
                $("#mensaje").html(mensaje);
                alert("Se ha registrado con exito tu cuenta");
                location.href = "index.html";
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR.responseText);
            manejoErrores(jqXHR.responseText);
        }
    });
}

function InicioSesion() {
    var cuerpo = '<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">';
    cuerpo += '<Body>';
    cuerpo += '<iniciar_sesion xmlns="urn:server">';
    cuerpo += '<correo>' + $("#user").val() + '</correo>';
    cuerpo += '<clave>' + $("#clave1").val() + '</clave>';
    cuerpo += '</iniciar_sesion>';
    cuerpo += '</Body>';
    cuerpo += '</Envelope>';
    $.ajax({
        url: URL_SOAP,
        data: cuerpo,
        type: 'POST',
        dataType: 'xml',
        contentType: 'text/xml',
        success: function (data, textStatus, jqXHR) {
            var mensaje = '';
            if (jqXHR.status == '200') {
                var xml = jqXHR.responseXML;
                var xmlChange = $.parseXML(xml);
                var external = $(xml).text(xmlChange).find("external_id").text();
                var token = $(xml).text(xmlChange).find("token").text();
                var persona = $(xml).text(xmlChange).find("persona").text();
                localStorage["token"] = token;
                localStorage["user"] = persona;
                localStorage["external"] = external;
                location.href = "tabla.html";
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR.responseText);
            manejoErrores(jqXHR.responseText);
        }
    });
}
var externalPaciente = '';
function listarPaciente() {
    var accion = "/listar_paciente";
    $.ajax({
        url: URL_RESTFUL + accion,
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
                    console.log(item.cedula);
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
function manejoErrores(xml) {
    var xmlData = $.parseXML(xml);
    var error = $(xml).find("faultstring").text();
    console.log(error);
    var mensaje = '<div class="alert alert-danger">';
    mensaje += error;
    mensaje += '</div>';

    $("#mensaje").html(mensaje);
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
    $("#mensaje").html(mensaje);
}

function verificarInicioSesion() {
    if (localStorage["token"] != null) {
        location.href = "tabla.html";
    }
}

function verificarNoInicioSesion() {
    if (localStorage["token"] == null) {
        location.href = "index.html";
    }
}

function cerrar_sesion() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("external");
    location.href = "index.html";
}