function executeQuery() {
    $.ajax({
        url: '/plc',
        success: function(data) {
            // do something with the return value here if you like
            console.log(data.plc.temperature,data.plc.wight + " кг.");
            $("#temper").html(data.plc.temperature.toFixed(2)+"&deg C");
            $("#pwight").html(data.plc.wight);
            $("#datatime").html(new Date());
        },
        error: function (error) {
            $("#temper").html("ERR&deg C");
            $("#wight").html("ERR кг.");
            console.log(error);

        }

    });
    setTimeout(executeQuery, 1000); // you could choose not to continue on failure...
}


$(document).ready(function () {
    let dataPlc = null;
    $("#button-1, #button-2, #button-3, #button-4, #button-5, #button-6, #button-7, #button-8, #button-9").button();

    setTimeout(executeQuery, 1000);
});

