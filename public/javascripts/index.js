$(document).ready(function() {
    $('#files').DataTable({
        "bJQueryUI": true,
        "sPaginationType": "full_numbers"
    });
    g = new Dygraph(

        // containing div
        document.getElementById("graph"),

        // CSV or path to a CSV file.
        "Date,Temperature\n" +
        "2008-05-07,75\n" +
        "2008-05-08,70\n" +
        "2008-05-09,80\n"

    );
} );