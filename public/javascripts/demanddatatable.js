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
                    row[12] = parsed[i].DURATION;
                    row[13] = parsed[i].CASE_MINS_PLANNED;
                    row[14] = parsed[i].CASE_MINS_REMAINING;
                    row[15] = parsed[i].PLANNED_TT_DURATION;

                    array[i] = row;
                    row = [];
                }

                $('#datatabledemand').DataTable({
                    data: array,
                    columns: [
                        {title: "CASE_ID"},
                        {title: "ESTIMATENUMBER"},
                        {title: "PRIMARY_SKILL"},
                        {title: "SUB_DESCRIPTION"},
                        {title: "EXCHANGE"},
                        {title: "OM_OUC"},
                        {title: "OM_PATCH_NAME"},
                        {title: "FINAL_STATUS"},
                        {title: "QUEUE_ID"},
                        {title: "QUEUE_NAME"},
                        {title: "PRIORITY"},
                        {title: "ASSUMED_GANG_SIZE"},
                        {title: "DURATION"},
                        {title: "CASE_MINS_PLANNED"},
                        {title: "CASE_MINS_REMAINING"},
                        {title: "PLANNED_TT_DURATION"}

                    ]
                });
                //$("#divcases").load("planner #tablecontainer"); //reload div
            }
        });
    }
} );