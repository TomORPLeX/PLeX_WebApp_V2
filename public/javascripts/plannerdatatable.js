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
            url: '/getdatatabledata_planner',
            success: function (obj) {
                var parsed = [];
                var row = new Array();
                var array = new Array();
                parsed = JSON.parse(obj);
                for (var i = 0; i < parsed.length; i++) {

                    row[0] = parsed[i].CASE_ID;
                    row[1] = parsed[i].ESTIMATENUMBER;
                    row[2] = parsed[i].PRIMARY_SKILL;
                    row[3] = parsed[i].SUB_DESCRIPTION;
                    row[4] = parsed[i].EXCHANGE;
                    row[5] = parsed[i].OM_OUC;
                    row[6] = parsed[i].OM_PATCH_NAME;
                    row[7] = parsed[i].FINAL_STATUS;
                    row[8] = parsed[i].QUEUE_ID;
                    row[9] = parsed[i].QUEUE_NAME;
                    row[10] = parsed[i].PRIORITY_DESCRIPTION;
                    row[11] = parsed[i].ASSUMED_GANG_SIZE;

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