URL_SOAP = 'http://localhost/examen_cuarto_b/wsdl2.php?wsdl';
URL_RESTFUL = 'http://localhost/examen_cuarto_b/json2.php';
var id_dep;
var external;
function registroProyectos() {
    var token = "EXAMEN_4_B";
    var monto;
    localStorage["token"] = token;
    var cuerpo = '<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">';
    cuerpo += '<Body>';
    cuerpo += '<guardar_proyecto xmlns="urn:server">';
    cuerpo += '<token>' + token + '</token>';
    cuerpo += '<nombre>' + $("#nombre").val() + '</nombre>';
    cuerpo += '<finicio>' + $("#finicio").val() + '</finicio>';
    cuerpo += '<ffinalizacion>' + $("#ffinal").val() + '</ffinalizacion>';
    cuerpo += '<tiempo>' + diferenciaMeses() + '</tiempo>';
    if (esExtranjero() != true) {
        cuerpo += '<provincia>' + $("#provincia").val() + '</provincia>';
        cuerpo += '<canton>' + $("#canton").val() + '</canton>';
        monto = $("#monto").val();
    } else {
        cuerpo += '<provincia>' + "S/N" + '</provincia>';
        cuerpo += '<canton>' + "S/N" + '</canton>';
        monto = $("#montoextranjero").val()
    }
    cuerpo += '<pais>' + $("#pais").val() + '</pais>';
    cuerpo += '<extranjero>' + $("#opciones").val() + '</extranjero>';
    cuerpo += '<descripcion>' + $("#descripcion").val() + '</descripcion>';
    cuerpo += '<monto>' + monto + '</monto>';
    cuerpo += '<id>' + $('#tipo').val() + '</id>';
    cuerpo += '</guardar_proyecto>';
    cuerpo += '</Body>';
    cuerpo += '</Envelope>';
    console.log(cuerpo);
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
                // alert("Se ha registrado con exito el proyecto");
                //location.href = "index.html";
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR.responseText);
            manejoErrores(jqXHR.responseText);
        }
    });
}
//var provincia='';
function modificarProyecto() {
    var prov;
    var can;
    var monto;
    if (esExtranjero() != true) {
        prov = $("#provincia").val();
        can = $("#canton").val();
        monto = $("#monto").val();
    } else {
        prov = "S/N";
        can = "S/N";
        monto = $("#montoextranjero").val();
    }
    console.log(prov);
    console.log(can);
    console.log(pais);
    var cuerpo = '';
    cuerpo += '<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">';
    cuerpo += '<Body>';
    cuerpo += '<modificar_proyecto xmlns="urn:server">';
    cuerpo += '<token>' + "EXAMEN_4_B" + '</token>';
    cuerpo += '<external>' + external + '</external>';
    cuerpo += '<nombre>' + $("#nombre").val() + '</nombre>';
    cuerpo += '<finicio>' + $("#finicio").val() + '</finicio>';
    cuerpo += '<ffinalizacion>' + $("#ffinal").val() + '</ffinalizacion>';
    cuerpo += '<tiempo>' + $("#tiempo").val() + '</tiempo>';
    cuerpo += '<provincia>' + prov + '</provincia>';
    cuerpo += '<canton>' + can + '</canton>';
    cuerpo += '<pais>' + $("#pais").val() + '</pais>';
    cuerpo += '<extranjero>' + $("#opciones").val() + '</extranjero>';
    cuerpo += '<descripcion>' + $("#descripcion").val() + '</descripcion>';
    cuerpo += '<monto>' + monto + '</monto>';
    cuerpo += '<id_departamento>' + $("#tipo").val() + '</id_departamento>';
    cuerpo += '</modificar_proyecto>';
    cuerpo += ' </Body>';
    cuerpo += '</Envelope>';
    console.log(cuerpo);
    $.ajax({
        url: URL_SOAP,
        type: 'POST',
        contentType: 'text/xml',
        data: cuerpo,
        dataType: 'xml',
        success: function (data, textStatus, jqXHR) {
            var mensaje = '';
            console.log(jqXHR.status);
            if (jqXHR.status == '200') {
                alert("Se modifico con exito");
                mensaje += '<div class="alert alert-success" role="alert">';
                mensaje += '    DATOS MODIFICADOS CORRECTAMENTE';
                mensaje += '</div>';
                $("#mensaje").html(mensaje);
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR.responseText);
            manejoErrores(jqXHR.responseText);
            alert("error al modificar");
        }
    });

}

function listarProvincia() {
    var accion = "/listar_provincias";
    $.ajax({
        url: URL_RESTFUL + accion,
        type: 'GET',
        dataType: 'json',
        success: function (data, textStatus, jqXHR) {
            //  console.log(data);
            if (data.codigo) {
                manejoErroresJson(data.message, data.codigo);
            } else {
                var opcion = '';
                $.each(data, function (index, item) {
                    opcion += '<option  value= ' + item.nombre + '>' + item.nombre + '</option>';
                });
                $("#provincia").html(opcion);
                listarCanton($("#provincia").val());
            }

        }, error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
            alert("ERROR");
        }
    });
}

function listarCanton(provincia) {
    var accion = "/listar_cantones/" + provincia;
    $.ajax({
        url: URL_RESTFUL + accion,
        type: 'GET',
        dataType: 'json',
        success: function (data, textStatus, jqXHR) {
            // console.log(data);
            if (data.codigo) {
                manejoErroresJson(data.message, data.codigo);
            } else {
                var opcion = '';
                $.each(data, function (index, item) {
                    //  console.log(item.canton);
                    opcion += "<option value= '" + item.canton + "'>" + item.canton + "</option>";
                });
                $("#canton").html(opcion);
            }

        }, error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
            alert("ERROR");
        }
    });
}

function listarProyecto() {
    var accion = "/listar_proyectos";
    $.ajax({
        url: URL_RESTFUL + accion,
        type: 'GET',
        dataType: 'json',
        headers: {'api-token': localStorage["token"]},
        success: function (data, textStatus, jqXHR) {
             console.log(data);
            if (data.codigo) {
                manejoErroresJson(data.message, data.codigo);
            } else {
                var tabla = '';
                var tablas = '';
                var aux;
                $.each(data, function (index, item) {
                    aux = $.param(item);
                    id_dep = item.id_departamento;
                    tablas= obtenerDepartamentos(id_dep);
                    if(id_dep=="6"||id_dep=="7"||id_dep=="8"){
                    tabla += '<tr>';
                    tabla += '<th scope="row">' + (index + 1) + '</th>';
                    tabla += '<td>' + item.nombre + '</td>';
                    tabla += '<td>' + item.f_inicio + '</td>';
                    tabla += '<td>' + item.f_finalizacion + '</td>';
                    tabla += '<td>' + item.provincia + '</td>';
                    tabla += '<td>' + item.canton + '</td>';
                    tabla += '<td>' + item.monto + '</td>';
                    tabla += '<td>' + item.descripcion + '</td>';
                    tabla += '<td><a  class="btn btn-primary" data-toggle="modal"  id="modificar" data-target="#modificarProy"\n\
                              onclick="obtenerProyectos(' + "'" + aux + "'" + ')" >Modificar </a> </td>';
                    tabla += "</tr>"
                    console.log(tablas);
                }
                });
              
                
                // $("#cuerpo").html(tablas);
                 $("#cuerpo").html(tabla);

            }

        }, error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
            alert("ERROR");
        }
    });
}

function obtenerDepartamentos(id) {
    var accion = "/obtener_departamento/" + id;
    let cont=0;
    $.ajax({
        url: URL_RESTFUL + accion,
        type: 'GET',
        dataType: 'json',
        headers: {'api-token': localStorage["token"]},
        success: function (data, textStatus, jqXHR) {
            //console.log(tablad);
            var tabla = '';
            var tipo='';
            if (data.codigo) {
                manejoErroresJson(data.message, data.codigo);
            } else {
                var index = 0;
                
                if (data.tipo == 'I') {
                    tipo=data.tipo;
                  /*  tabla += '<tr>';
                    tabla += '<th scope="row">' + (index + 1) + '</th>';
                    tabla += '<td>' + tablad.nombre + '</td>';
                    tabla += '<td>' + tablad.f_inicio + '</td>';
                    tabla += '<td>' + tablad.f_finalizacion + '</td>';
                    tabla += '<td>' + tablad.provincia + '</td>';
                    tabla += '<td>' + tablad.canton + '</td>';
                    tabla += '<td>' + tablad.monto + '</td>';
                    tabla += '<td>' + tablad.descripcion + '</td>';
                    tabla += '<td><a  class="btn btn-primary" data-toggle="modal"  id="modificar" data-target="#modificarProy"\n\
                              onclick="obtenerProyectos(' + "'" + aux + "'" + ')" >Modificar </a> </td>';
                    tabla += "</tr>"*/
                    return true;
                    //console.log(tablad.nombre);
                    //$("#cuerpo").html(tablad);
                    //return tabla;
                    console.log(tipo);
                }
                   
            }
        }, error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
            alert("ERROR");

        }
    });
}

function obtenerProyectos(data) {
    var datos = JSON.parse('{"' + data.replace(/&/g, '","').replace(/=/g, '":"') + '"}', function (key, value) {
        return key === "" ? value : decodeURIComponent(value)
    });
    cargarDatosProyecto(datos);
    external = datos.external;
    console.log("external: " + external);
}
function cargarDatosProyecto(item) {
    //console.log(item);
    $("#nombre").val(item.nombre);
    $("#finicio").val(item.f_inicio);
    $("#ffinal").val(item.f_finalizacion);
    $("#descripcion").val(item.descripcion);
    $("#monto").val(item.monto);
    $("#tiempo").val(diferenciaMeses());
    id_dep = item.id_departamento;
    $("#tipo").val(id_dep);

    if (item.extranjero != "0") {
        $("#opciones").val("si");
        esExtranjero();

    } else {
        $("#opciones").val("no");

        // esExtranjero();
    }
    $("#pais").val(item.pais);
    $("#provincia").val(item.provincia);
    listarCanton(item.provincia);
    console.log(item.canton);
    $("#canton").val(item.canton);
    //console.log(item.id_departamento);
}

var dataa;
function listarDepartamentos() {
    var accion = "/listar_departamentos";
    $.ajax({
        url: URL_RESTFUL + accion,
        type: 'GET',
        dataType: 'json',
        headers: {'api-token': localStorage["token"]},
        success: function (data, textStatus, jqXHR) {
            //console.log(data);
            dataa = data;
            // obtenerIdDep(data);
            if (data.codigo) {
                manejoErroresJson(data.message, data.codigo);
            } else {
                var opcion = '';
                $.each(data, function (index, item) {
                    //console.log(item.nombre);
                    opcion += "<option value= " + item.id + ">" + item.nombre + "</option>";

                });

                $("#tipo").html(opcion);
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

function esExtranjero() {
    var val = $("#opciones").val();
    console.log(val);
    if (val == "si") {
        $("#provinciadiv").children().prop('disabled', true);
        $("#cantondiv").children().prop('disabled', true);
        //$("#pais").val('');
        // $("#pais").reset();
        $("#monto2").show();
        return true;

        // carcularmonto(true);
    } else {
        $("#provinciadiv").children().prop('disabled', false);
        $("#cantondiv").children().prop('disabled', false);
        $("#pais").val("ECUADOR");
        $("#monto2").hide();
        return false;
    }




//$(selector).hide(opciones);
}

function diferenciaMeses() {
    var d1 = new Date($("#finicio").val());
    var d2 = new Date($("#ffinal").val());
    var months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth();
    months += d2.getMonth();
    return months <= 0 ? 0 : months;
}
function carcularmonto(val, monto) {
    let total = 0;
    var monto = 0;
    var iva = 1;
    if (val == true) {
        monto = $("#monto").val();
        iva = (monto * 20) / 100;
        total = Math.round(monto) + Math.round(iva);
        $("#montoextranjero").val(total)
    }
}

