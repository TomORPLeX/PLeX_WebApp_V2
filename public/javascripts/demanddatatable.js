var tempcounter2 = 1;
$(document).ready(function() {
    if (tempcounter2 > 1)
    {
        return;
    } else {
        //alert("loaded " + tempcounter2 + " times");
        tempcounter2++;

        $.ajax({
            type: 'POST',
            url: '/getdatatabledata',
            success: function (obj) {
                var parsed = [];
                var row = new Array();
                var array = new Array();
                parsed = JSON.parse(obj);
                for (var i = 0; i < parsed.length; i++) {

                    row[0] = parsed[i].OUC;
                    row[1] = parsed[i].EIN;
                    row[2] = parsed[i].ENG_ID;
                    row[3] = parsed[i].ENG_NAME;
                    row[4] = parsed[i].PRIMARY_NS_SKILLS;
                    row[5] = parsed[i].ATTENDANCE_DAY_0;
                    row[6] = parsed[i].PERCENTAGE_ON_TASK_DAY_0;
                    row[7] = parsed[i].PERCENTAGE_TRAVEL_DAY_0;
                    row[8] = parsed[i].PLAN_ISSUES_DAY_0;
                    row[9] = parsed[i].TOUR_DAY_0;

                    array[i] = row;
                    row = [];
                }

                $('#datatabledemand').DataTable({
                    data: array,
                    columns: [
                        {title: "OUC"},
                        {title: "EIN"},
                        {title: "ENG_ID"},
                        {title: "ENG_NAME"},
                        {title: "PRIMARY_NS_SKILLS"},
                        {title: "ATTENDANCE_DAY_0"},
                        {title: "PERCENTAGE_ON_TASK_DAY_0"},
                        {title: "PLAN_ISSUES_DAY_0"},
                        {title: "TOUR_DAY_0"}
                    ]
                });
            }
        });
    }
} );