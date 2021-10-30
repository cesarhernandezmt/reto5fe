function traerInformacion(){

    $.ajax({
        url:"http://129.151.121.62:8081/api/Client/all",
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
    myTable+="<th>"+"CORREO ELECTRONICO"+"</th>";
    /*myTable+="<th>"+"CONTRASEÑA"+"</th>";*/
    myTable+="<th>"+"NOMBRE DEL CLIENTE"+"</th>";
    myTable+="<th>"+"EDAD"+"</th>";
    myTable+="<th>"+"Actualizar Registro"+"</th>";
    myTable+="<th>"+"Eliminar Registro"+"</th>";
    myTable+="<tr>";
    
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].idClient+"</td>";
        myTable+="<td>"+respuesta[i].email+"</td>";
        /*myTable+="<td>"+respuesta[i].password+"</td>";*/
        myTable+="<td>"+respuesta[i].name+"</td>";
        myTable+="<td>"+respuesta[i].age+"</td>";
        myTable+='<td><center><button onclick="editarElemento('+respuesta[i].idClient+')">Actualizar</button><center></td>';
        myTable+='<td><center><button onclick="borrarElemento('+respuesta[i].idClient+')">Borrar</button><center></td>';
        myTable+="</tr>"
    }

    myTable+="</table>";
    $("#resultado").html(myTable);

}


function guardarElemento(){

    if($("#email").val() == "" || $("#password").val() == "" || $("#name").val() == "" || $("#age").val() == ""){
        alert("Por favor llene y seleccione todos los campos de registro solicitados, para poder añadir el registro.")
    }
    else{

        let myData={
            email:$("#email").val(),
            password:$("#password").val(),
            name:$("#name").val(),        
            age:$("#age").val(),
        };
        
        console.log(myData);
        let dataToSend=JSON.stringify(myData);

        $.ajax({
            url:"http://129.151.121.62:8081/api/Client/save",
            type:"POST",
            data:dataToSend,
            datatype:"JSON",
            contentType: "application/json",
            success:function(respuesta){
                console.log(respuesta);
                $("#resultado").empty();
                $("#email").val("");
                $("#password").val("");                        
                $("#name").val("");
                $("#age").val("");
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

    if($("#email").val() == "" || $("#password").val() == "" || $("#name").val() == "" || $("#age").val() == ""){
        alert("Por favor llene y seleccione todos los campos de registro solicitados, para poder añadir el registro.")
    }
    else{
        
        let myData={
            idClient:idElemento,
            email:$("#email").val(),
            password:$("#password").val(),              
            name:$("#name").val(),
            age:$("#age").val(),
        };
        
        console.log(myData);
        let dataToSend=JSON.stringify(myData);

        $.ajax({
            url:"http://129.151.121.62:8081/api/Client/update",
            type:"PUT",
            data:dataToSend,
            contentType:"application/JSON",
            datatype:"JSON",
            success:function(respuesta){
                console.log(respuesta);
                $("#resultado").empty();
                $("#idClient").val("");
                $("#email").val("");
                $("#password").val("");               
                $("#name").val("");
                $("#age").val("");
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
        idClient:idElemento
    };

    console.log(myData);
    let dataToSend=JSON.stringify(myData);

    $.ajax({
        url:"http://129.151.121.62:8081/api/Client/"+idElemento,
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
