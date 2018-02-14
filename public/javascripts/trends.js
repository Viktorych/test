
function executeQuery() {


   $.ajax({
       url: '/plc',
       success: function(data) {
           // do something with the return value here if you like
           console.log(data.plc.temperature,data.plc.wight);
           $("#temper").html(data.plc.temperature.toFixed(2)+"&deg C");
           $("#wight").html(data.plc.wight + " кг.");
           //$("#datatime").html(new Date());
       },
       error: function (error) {
           $("#temper").html("ERR&deg C");
           $("#wight").html("ERR кг.");

       }

   });
   setTimeout(executeQuery, 1000); // you could choose not to continue on failure...
}


$(document).ready(function () {
    $( "#dpStart" ).datepicker({
        showOn: "button",
        buttonImage: "images/calendar.gif",
        buttonImageOnly: true,
        buttonText: "Выберете дату начала."
    });
    $( "#dpStop" ).datepicker({
        showOn: "button",
        buttonImage: "images/calendar.gif",
        buttonImageOnly: true,
        buttonText: "Выберете дату окончания."
    });
    $( "fieldset input" ).checkboxradio();
    //$("#button-1, #button-2, #button-3, #button-4, #button-5, #button-6, #button-7, #button-8, #button-9").button();

    setTimeout(executeQuery, 1000);




    let g = new Dygraph(
        document.getElementById("graph"),

        [[0, 0]],
        {
            //title: 'РР·РјРµРЅРµРЅРёРµ СЃРєРѕСЂРѕСЃС‚Рё  РІРѕ РІСЂРµРјРµРЅРё.',
            labels: ['Время', '*'],
            ylabel: '*',
            xlabel: 'Время',
            colors: ['#ff291c'],
            strokeWidth: 2,
            drawPoints: true,
            pointSize: 1,
            highlightCircleSize: 3,
        }
    );
});

