function traerReportStatus(){

    $.ajax({
        url:"http://129.151.121.62:8082/api/Reservation/report-status",
        type:"GET",
        datatype:"JSON",
        contentType: "application/json",
        success:function(respuesta){
            console.log(respuesta);
            mostrarReportStatus(respuesta);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            
        }
    });

}


function mostrarReportStatus(respuesta){

    let myTable = "<table>";

    myTable+="<tr>";
    myTable+="<th>"+"RESERVACIONES COMPLETADAS"+"</th>";
    myTable+="<th>"+"RESERVACIONES CANCELADAS"+"</th>";
    myTable+="<tr>";

    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].completed+"</td>";
        myTable+="<td>"+respuesta[i].cancelled+"</td>";
        myTable+="</tr>"
    }

    myTable+="</table>";
    $("#resultado-status").html(myTable);

}


function traerReportDates(){

    if($("#startDate").val() == "" || $("#devolutionDate").val() == "") {
        alert("Por favor llene y seleccione todos los campos de registro solicitados, para poder añadir el registro.")
    }
    else{

        let startDate = document.getElementById("#startDate").value;
        let devolutionDate = document.getElementById("#devolutionDate").value;

        console.log(startDate);
        console.log(devolutionDate);

        $.ajax({
            url:"http://129.151.121.62:8082/api/Reservation/report-dates/"+startDate+"/"+devolutionDate,
            type:"GET",
            datatype:"JSON",
            contentType: "application/json",
            success:function(respuesta){
                console.log(respuesta);
                mostrarReportDates(respuesta);
            },
            error: function(jqXHR, textStatus, errorThrown) {
            
            }
        });
    }

}

function mostrarReportDates(respuesta){

    let myTable = "<table>";

    myTable+="<tr>";
    myTable+="<th>"+"FECHA DE FINALIZACION (DEVOLUCION)"+"</th>";
    myTable+="<th>"+"FECHA DE INICIO"+"</th>";
    myTable+="<th>"+"ESTADO DE LA RESERVACION"+"</th>";
    myTable+="<tr>";

    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].devolutionDate+"</td>";
        myTable+="<td>"+respuesta[i].startDate+"</td>";
        myTable+="<td>"+respuesta[i].status+"</td>";
        myTable+="</tr>"
    }

    myTable+="</table>";
    $("#resultado-dates").html(myTable);

}

function traerReportClients(){

    $.ajax({
        url:"http://129.151.121.62:8082/api/Reservation/report-clients",
        type:"GET",
        datatype:"JSON",
        contentType: "application/json",
        success:function(respuesta){
            console.log(respuesta);
            mostrarReportClients(respuesta);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            
        }
    });

}


function mostrarReportClients(respuesta){

    let myTable = "<table>";

    myTable+="<tr>";
    myTable+="<th>"+"TOTAL DE RESERVACIONES"+"</th>";
    myTable+="<th>"+"NOMBRE DEL CLIENTE"+"</th>";
    myTable+="<th>"+"CORREO ELECTRONICO"+"</th>";
    myTable+="<th>"+"EDAD"+"</th>";
    myTable+="<tr>";

    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].total+"</td>";
        myTable+="<td>"+respuesta[i].client.name+"</td>";
        myTable+="<td>"+respuesta[i].client.email+"</td>";
        myTable+="<td>"+respuesta[i].client.age+"</td>";
        myTable+="</tr>"
    }

    myTable+="</table>";
    $("#resultado-clients").html(myTable);

}
