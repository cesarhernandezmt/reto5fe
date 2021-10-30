function traerInformacion(){

    $.ajax({
        url:"http://129.151.121.62:8081/api/Admin/all",
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
    myTable+="<th>"+"NOMBRE"+"</th>";
    myTable+="<th>"+"CORREO ELECTRONICO"+"</th>";
    /*myTable+="<th>"+"CONTRASEÑA"+"</th>";*/
    myTable+="<th>"+"Actualizar Registro"+"</th>";
    myTable+="<th>"+"Eliminar Registro"+"</th>";
    myTable+="<tr>";

    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].idAdmin+"</td>";
        myTable+="<td>"+respuesta[i].name+"</td>";        
        myTable+="<td>"+respuesta[i].email+"</td>";
        /*myTable+="<td>"+respuesta[i].password+"</td>";*/
        myTable+='<td><center><button onclick="editarElemento('+respuesta[i].idAdmin+')">Actualizar</button><center></td>';
        myTable+='<td><center><button onclick="borrarElemento('+respuesta[i].idAdmin+')">Borrar</button><center></td>';
        myTable+="</tr>"
    }

    myTable+="</table>";
    $("#resultado").html(myTable);

}


function guardarElemento(){

    if($("#name").val() == "" || $("#email").val() == "" || $("#password").val() == ""){
        alert("Por favor llene y seleccione todos los campos de registro solicitados, para poder añadir el registro.")
    }
    else{

        let myData={
            name:$("#name").val(),
            email:$("#email").val(),
            password:$("#password").val(),
        };

        console.log(myData);
        let dataToSend=JSON.stringify(myData);

        $.ajax({
            url:"http://129.151.121.62:8081/api/Admin/save",
            type:"POST",
            data:dataToSend,
            datatype:"JSON",
            contentType: "application/json",
            success:function(respuesta){
                console.log(respuesta);
                $("#resultado").empty();
                $("#name").val("");
                $("#email").val("");
                $("#password").val("");
                traerInformacion();
                console.log("Se ha añadido el registro");
                alert("Se ha añadido el registro")
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log("Excepción: No se ha añadido el registro. Verifique la operación e intente nuevamente.");
                alert("Excepción: No se ha añadido el registro. Verifique la operación e intente nuevamente.")
            }
        });
    }

}


function editarElemento(idElemento){

    if($("#name").val() == "" || $("#email").val() == "" || $("#password").val() == ""){
        aalert("Por favor llene y seleccione todos los campos de registro solicitados, para poder añadir el registro.")
    }
    else{

        let myData={
            idAdmin:idElemento,
            name:$("#name").val(),
            email:$("#email").val(),
            password:$("#password").val(),
        };

        console.log(myData);
        let dataToSend=JSON.stringify(myData);

        $.ajax({
            url:"http://129.151.121.62:8081/api/Admin/update",
            type:"PUT",
            data:dataToSend,
            contentType:"application/JSON",
            datatype:"JSON",
            success:function(respuesta){
                console.log(respuesta);
                $("#resultado").empty();
                $("#idAdmin").val("");
                $("#name").val("");
                $("#email").val("");
                $("#password").val("");
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
        idAdmin:idElemento
    };

    console.log(myData);
    let dataToSend=JSON.stringify(myData);

    $.ajax({
        url:"http://129.151.121.62:8081/api/Admin/"+idElemento,
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
            console.log("Excepción: No se ha eliminado el registro. Verifique la operación e intente nuevamente.");
            alert("Excepción: No se ha eliminado el registro. Verifique la operación e intente nuevamente.")         
        }
    });

}
