$(document).ready(function() {


    var temp = getCookie('EIN');
    var tempfilelocation = './data/' +temp+'_LatLngData.json';
    $.getJSON(tempfilelocation, function (data) {
        $('#overlay').show();
        var parsed = [];
        var row = new Array();
        var array = new Array();
        parsed = data.LatLngData;
        for (var i = 0; i < parsed.length; i++) {
            for (var i = 0; i < parsed.length; i++) {

                row[0] = parsed[i].OM_OUC;
                row[1] = parsed[i].PRIMARY_SKILL;
                row[2] = parsed[i].JOBDESCRIPTION + " " + parsed[i].SUB_DESCRIPTION ;
                row[3] = parsed[i].CASE_STATUS;
                row[4] = parsed[i].web_system_defined_priority;
                row[5] = parsed[i].EXCHANGE;
                row[6] = parsed[i].CASE_ID;
                row[7] = parsed[i].PLANNED_TT_DURATION;
                row [8] = "<a href = http://10.187.148.18/ewocs2a/JobFlowPages/JobFlow/tabid/115/language/en-GB/Default.aspx?caseid="+ parsed[i].CASE_OBJID + "&queueid="+ parsed[i].QUEUE_ID +"#no-back-button target =\"_blank\">"+ parsed[i].ESTIMATENUMBER+ "</a>";

                array[i] = row;
                row = [];
            }

            $('#datatabledemandjson').DataTable({
                data: array,
                columns: [
                    {title: "OUC"},
                    {title: "SKILL"},
                    {title: "Type"},
                    {title: "Case Status"},
                    {title: "Priority"},
                    {title: "Exchange"},
                    {title: "Case ID"},
                    {title: "Duration"},
                    {title: "Estimate"}
                ]
            });


            var table = $('#datatabledemandjson').DataTable();

            table.order( [ 4, 'asc' ]).draw();
        }
        $('#overlay').fadeOut(1000);
    });
});
