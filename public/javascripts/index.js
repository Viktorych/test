
$(document).ready(function () {


    var tableFiles = $('#files').DataTable({
        "ajax": '/files',
        "bJQueryUI": true,
        "sPaginationType": "full_numbers",
        "columns":
            [
                {"data": "file"}

            ]
    });
    var g = new Dygraph(
        document.getElementById("graph"),

        [[0,0]],
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
        });

        //datagraph = $.get("/file/" + data.file).responseText;
        //console.log(datagraph);
        //g.data = datagraph;
        //g.updateOptions({'file': datagraph});
        //analiz.ajax.url('/analiz/'+data.ID).load();
        //g.ajax.

    });

});