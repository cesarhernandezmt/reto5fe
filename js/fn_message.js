function inicioDoctor(){

    $.ajax({
        url:"http://129.151.121.62:8081/api/Doctor/all",
        type:"GET",
        datatype:"JSON",
        contentType: "application/json",
        success:function(respuesta){
            console.log(respuesta);
            let $select = $("#select-doctor");
            $.each(respuesta, function (id, name) {
                $select.append('<option value='+name.id+'>'+name.name+'</option>');
                console.log("select "+name.id)

            });
        },
        error: function(jqXHR, textStatus, errorThrown) {
            
        }
    });

}


function inicioClient(){

    $.ajax({
        url:"http://129.151.121.62:8081/api/Client/all",
        type:"GET",
        datatype:"JSON",
        contentType: "application/json",
        success:function(respuesta){
            console.log(respuesta);
            let $select = $("#select-client");
            $.each(respuesta, function (idClient, name) {
                $select.append('<option value='+name.idClient+'>'+name.name+'</option>');
                console.log("select "+name.idClient)

            });
        },
        error: function(jqXHR, textStatus, errorThrown) {
            
        }
    });

}


function traerInformacion(){

    $.ajax({
        url:"http://129.151.121.62:8081/api/Message/all",
        type:"GET",
        datatype:"JSON",
        contentType: "application/json",
        success:function(respuesta){
            console.log(respuesta);
            mostrarRespuesta(respuesta)
        },
        error: function(jqXHR, textStatus, errorThrown) {
            
        }
    });

}


function mostrarRespuesta(respuesta){

    let myTable = "<table>";

    myTable+="<tr>";
    myTable+="<th>"+"ID"+"</th>";
    myTable+="<th>"+"TEXTO DEL MENSAJE"+"</th>";
    myTable+="<th>"+"MEDICO"+"</th>";
    myTable+="<th>"+"CLIENTE"+"</th>";
    myTable+="<th>"+"Actualizar Registro"+"</th>";
    myTable+="<th>"+"Eliminar Registro"+"</th>";
    myTable+="<tr>";

    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].idMessage+"</td>";
        myTable+="<td>"+respuesta[i].messageText+"</td>";
        myTable+="<td>"+respuesta[i].doctor.name+"</td>";
        myTable+="<td>"+respuesta[i].client.name+"</td>";
        myTable+='<td><center><button onclick="editarElemento('+respuesta[i].idMessage+')">Actualizar</button><center></td>';
        myTable+='<td><center><button onclick="borrarElemento('+respuesta[i].idMessage+')">Borrar</button><center></td>';       
        myTable+="</tr>"
    }

    myTable+="</table>";
    $("#resultado").html(myTable);

}


function guardarElemento(){

    if($("#messageText").val() == "" || $("#select-doctor").val() == null || $("#select-client").val() == null){
        alert("Por favor llene y seleccione todos los campos de registro solicitados, para poder añadir el registro.")
    }
    else{

        let myData={
            messageText:$("#messageText").val(),
            doctor:{id:$("#select-doctor").val()},
            client:{idClient:+$("#select-client").val()},
        };
        
        console.log(myData);
        let dataToSend=JSON.stringify(myData);
        console.log(dataToSend);
        $.ajax({
            url:"http://129.151.121.62:8081/api/Message/save",
            type:"POST",
            data:dataToSend,
            datatype:"JSON",
            contentType: "application/json",
            success:function(respuesta){
                console.log(respuesta);
                $("#resultado").empty();
                $("#messageText").val("");
                $("#doctor").val("");
                $("#client").val("");
                traerInformacion();
                console.log("Se ha añadido el registro");
                alert("Se ha añadido el registro")
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(jqXHR, textStatus, errorThrown);
                console.log("Excepción: No se ha añadido el registro. Verifique la operación e intente nuevamente.");
                alert("Excepción: No se ha añadido el registro. Verifique la operación e intente nuevamente.")
            }
        });
    }

}


function editarElemento(idElemento){

    if($("#messageText").val() == "" || $("#select-doctor").val() == null || $("#select-client").val() == null){
        alert("Por favor llene y seleccione todos los campos de registro solicitados, para poder añadir el registro.")
    }
    else{

        let myData={
            idMessage:idElemento,
            messageText:$("#messageText").val(),
            doctor:{id:+$("#select-doctor").val()},
            client:{idClient:+$("#select-client").val()},
        };

        console.log(myData);
        let dataToSend=JSON.stringify(myData);

        $.ajax({
            url:"http://129.151.121.62:8081/api/Message/update",
            type:"PUT",
            data:dataToSend,
            contentType:"application/JSON",
            datatype:"JSON",
            success:function(respuesta){
                console.log(respuesta);
                $("#resultado").empty();
                $("#idMessage").val("");
                $("#messageText").val("");
                $("#doctor").val("");
                $("#client").val("");
                traerInformacion();
                console.log("Se ha actualizado el registro");
                alert("Se ha actualizado el registro")
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log("Excepción: No se ha actualizado el registro. Verifique la operación e intente nuevamente.");
                alert("Excepción: No se ha actualizado el registro. Verifique la operación e intente nuevamente.")
            }
        });
    }

}


function borrarElemento(idElemento){

    let myData={
        id:idElemento
    };

    let dataToSend=JSON.stringify(myData);

    $.ajax({
        url:"http://129.151.121.62:8081/api/Message/"+idElemento,
        type:"DELETE",
        data:dataToSend,
        datatype:"JSON",
        contentType:"application/JSON",
        success:function(respuesta){
            console.log(respuesta);
            $("#resultado").empty();
            traerInformacion();
            console.log("Se ha eliminado el registro");
            alert("Se ha eliminado el registro")
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log("No se puede eliminar la Especialidad porque ya fue asignada al registro de un Médico.");
            alert("No se puede eliminar la Especialidad porque ya fue asignada al registro de un Médico.")
        }
    });

}

