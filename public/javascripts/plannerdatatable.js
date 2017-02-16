var tempcounter = 1;
$("#navbar-header").ready(function() {
    if (tempcounter > 1)
    {
        return;
    } else {
        //alert("loaded " + tempcounter + " times");
        tempcounter++;

        $.ajax({
            type: 'POST',
            url: '/getdatatable_planner',
            success: function (obj) {
                var parsed = [];
                var row = new Array();
                var array = new Array();
                parsed = JSON.parse(obj);
                for (var i = 0; i < parsed.length; i++) {

                    row[0] = parsed[i].ESTIMATENUMBER;
                    row[1] = parsed[i].CASE_ID;
                    row[2] = parsed[i].PLANNED_DATE;
                    row[3] = parsed[i].TASK_NUMBER;
                    row[4] = parsed[i].ENG_TRAVEL_TIME;
                    row[5] = parsed[i].EOD_TRAVEL;
                    row[6] = parsed[i].WEB_PRIORITY_DESCRIPTION;
                    row[7] = parsed[i].WEB_PRIMARY_SKILL;
                    row[8] = parsed[i].WEB_REVIEW_FLAG;
                    row[9] = parsed[i].WEB_KEYSTONE_TASK;
                    row[10] = parsed[i].WEB_SPECIFIC_START_TIME;
                    row[11] = parsed[i].WEB_SPECIFIC_END_TIME;

                    array[i] = row;
                    row = [];
                }

                $('#datatableplanner').DataTable({
                    data: array,
                    columns: [
                        {title: "ESTIMATENUMBER"},
                        {title: "CASE_ID"},
                        {title: "PLANNED_DATE"},
                        {title: "TASK_NUMBER"},
                        {title: "ENG_TRAVEL_TIME"},
                        {title: "EOD_TRAVEL"},
                        {title: "WEB_PRIORITY_DESCRIPTION"},
                        {title: "WEB_PRIMARY_SKILL"},
                        {title: "WEB_REVIEW_FLAG"},
                        {title: "WEB_KEYSTONE_TASK"},
                        {title: "WEB_SPECIFIC_START_TIME"},
                        {title: "WEB_SPECIFIC_END_TIME"}
                    ]
                });
            }
        });
    }
} );