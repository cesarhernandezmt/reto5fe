function traerInformacion(){

    $.ajax({
        url:"http://129.151.121.62:8081/api/Score/all",
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
    myTable+="<th>"+"CALIFICACION"+"</th>";
    myTable+="<th>"+"Actualizar Registro"+"</th>";
    myTable+="<th>"+"Eliminar Registro"+"</th>";
    myTable+="<tr>";
    
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].idScore+"</td>";
        myTable+="<td>"+respuesta[i].score+"</td>";
        myTable+='<td><center><button onclick="editarElemento('+respuesta[i].idScore+')">Actualizar</button><center></td>';
        myTable+='<td><center><button onclick="borrarElemento('+respuesta[i].idScore+')">Borrar</button><center></td>';
        myTable+="</tr>"
    }

    myTable+="</table>";
    $("#resultado").html(myTable);

}


function guardarElemento(){

    if($("#score").val() == ""){
            alert("Por favor llene y seleccione todos los campos de registro solicitados, para poder añadir el registro.")
    }
    else{

        let myData={
            score:$("#score").val(),
        };

        console.log(myData);
        let dataToSend=JSON.stringify(myData);
        console.log(dataToSend);

        $.ajax({
            url:"http://129.151.121.62:8081/api/Score/save",
            type:"POST",
            data:dataToSend,
            datatype:"JSON",
            contentType: "application/json",
            success:function(respuesta){
                console.log(respuesta);
                $("#resultado").empty();
                $("#score").val("");
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

    if($("#score").val() == ""){
        alert("Por favor llene y seleccione todos los campos de registro solicitados, para poder añadir el registro.")
    }
    else{

        let myData={
            idScore:idElemento,
            score:$("#score").val(),
        };

        console.log(myData);
        let dataToSend=JSON.stringify(myData);
        console.log(dataToSend);

        $.ajax({
            url:"http://129.151.121.62:8081/api/Score/update",
            type:"PUT",
            data:dataToSend,
            contentType:"application/JSON",
            datatype:"JSON",
            success:function(respuesta){
                console.log(respuesta);
                $("#resultado").empty();
                $("#idScore").val("");
                $("#score").val("");
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
        idScore:idElemento
    };

    console.log(myData);
    let dataToSend=JSON.stringify(myData);

    $.ajax({
        url:"http://129.151.121.62:8081/api/Score/"+idElemento,
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
