function inicioSpecialty(){

    $.ajax({
        url:"http://129.151.121.62:8081/api/Specialty/all",
        type:"GET",
        datatype:"JSON",
        contentType: "application/json",
        success:function(respuesta){
            console.log(respuesta);
            let $select = $("#select-specialty");
            $.each(respuesta, function (id, name) {
                $select.append('<option value='+name.id +'>'+name.name+'</option>');
                console.log("select "+name.id)

            });
        },
        error: function(jqXHR, textStatus, errorThrown) {
            
        }
    });

}


function traerInformacion(){

    $.ajax({
        url:"http://129.151.121.62:8081/api/Doctor/all",
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
    /*myTable+="<th>"+"ID"+"</th>";*/
    myTable+="<th>"+"NOMBRE DEL MEDICO"+"</th>";
    myTable+="<th>"+"DEPARTAMENTO"+"</th>";
    myTable+="<th>"+"AÑO"+"</th>";
    myTable+="<th>"+"DESCRIPCION"+"</th>";
    myTable+="<th>"+"ESPECIALIDAD"+"</th>";
    myTable+="<th>"+"Actualizar Registro"+"</th>";
    myTable+="<th>"+"Eliminar Registro"+"</th>";
    myTable+="<tr>";

    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        /*myTable+="<td>"+respuesta[i].id+"</td>";*/
        myTable+="<td>"+respuesta[i].name+"</td>";
        myTable+="<td>"+respuesta[i].department+"</td>";
        myTable+="<td>"+respuesta[i].year+"</td>";
        myTable+="<td>"+respuesta[i].description+"</td>"; 
        myTable+="<td>"+respuesta[i].specialty.name+"</td>";
        myTable+="<td><center><button onclick='editarElemento("+respuesta[i].id+")'>Actualizar</button><center></td>";
        myTable+="<td><center><button onclick='borrarElemento("+respuesta[i].id+")'>Borrar</button><center></td>";
        myTable+="</tr>"
    }

    myTable+="</table>";
    $("#resultado").html(myTable);

}


function guardarElemento(){

    if($("#name").val() == "" || $("#department").val() == "" || $("#year").val() == "" || $("#description").val() == "" ||
       $("#select-specialty").val() == null){
            alert("Por favor llene y seleccione todos los campos de registro solicitados, para poder añadir el registro.")
    }
    else{

        let myData={
            name:$("#name").val(),
            department:$("#department").val(),
            year:$("#year").val(),
            description:$("#description").val(),
            specialty:{id:+$("#select-specialty").val()},
        };
        
        console.log(myData);
        let dataToSend=JSON.stringify(myData);

        $.ajax({
            url:"http://129.151.121.62:8081/api/Doctor/save",
            type:"POST",
            data:dataToSend,
            datatype:"JSON",
            contentType: "application/json",
            success:function(respuesta){
                console.log(respuesta);
                $("#resultado").empty();
                $("#name").val("");
                $("#department").val("");
                $("#year").val("");
                $("#description").val("");
                $("#specialty").val("");
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

    if($("#name").val() == "" || $("#department").val() == "" || $("#year").val() == "" || $("#description").val() == "" ||
       $("#select-specialty").val() == null){
            alert("Por favor llene y seleccione todos los campos de registro solicitados, para poder añadir el registro.")
    }
    else{

        let myData={
            id:idElemento,
            name:$("#name").val(),
            department:$("#department").val(),
            year:$("#year").val(),
            description:$("#description").val(),
            specialty:{id:+$("#select-specialty").val()},
        };

        console.log(myData);
        let dataToSend=JSON.stringify(myData);

        $.ajax({
            url:"http://129.151.121.62:8081/api/Doctor/update",
            type:"PUT",
            data:dataToSend,
            contentType:"application/JSON",
            datatype:"JSON",
            success:function(respuesta){
                console.log(respuesta);
                $("#resultado").empty();
                $("#id").val("");
                $("#name").val("");
                $("#department").val("");
                $("#year").val("");
                $("#description").val("");
                $("#specialty").val("");
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
        url:"http://129.151.121.62:8081/api/Doctor/"+idElemento,
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

