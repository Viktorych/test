$(document).ready(function () {


    let tableFiles;
    tableFiles = $(`#files`).DataTable({
        "ajax": '/files',
        "bJQueryUI": true,
        "sPaginationType": "full_numbers",
        "columns":
            [
                {"data": "file"}

            ],
        "order": [[0, "desc"]],
        "iDisplayLength": 20,
        "searching": false,
        //"paging":   false,
        //"ordering": false,
        //"bInfo" : false
        "bLengthChange": false,
        "language":
            {
                "url":
                    "config/Russian.json"
            }
        ,
    });
    let g = new Dygraph(
        document.getElementById("graph"),

        [[0, 0]],
        {
            //title: 'РР·РјРµРЅРµРЅРёРµ СЃРєРѕСЂРѕСЃС‚Рё  РІРѕ РІСЂРµРјРµРЅРё.',
            labels: ['Время', 'Вес'],
            ylabel: 'Вес',
            xlabel: 'Время',
            colors: ['#ff291c'],
            strokeWidth: 2,
            drawPoints: true,
            pointSize: 1,
            highlightCircleSize: 3,
        }
    );

    $('#files').on('click', 'tr', function () {
        data = tableFiles.row(this).data();
        // console.log(data);
        if (data) {
            _path = "/file/" + data.file;
            //console.log('You clicked on ' + _path + '\'s row');
            $.ajax({
                    type: "GET",
                    url: _path,
                    success: function (_data) {

                        //console.log(_data.data[0][0] );
                        g.updateOptions({'file': _data.data});
                        g.updateOptions({'title': data.file});
                    }
                }
            );
        }
        $("#files tbody tr").removeClass('row_selected');
        $(this).addClass('row_selected');

    });
/*
    $("#files tbody tr").on('click', function (event) {
        $("#files tbody tr").removeClass('row_selected');
        $(this).addClass('row_selected');
        console.log(this);
    });*/
});

