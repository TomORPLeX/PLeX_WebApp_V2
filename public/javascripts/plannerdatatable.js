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

                    array[i] = row;
                    row = [];
                }

                $('#datatableplanner').DataTable({
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
                        {title: "ASSUMED_GANG_SIZE"}
                ]
                });
                //$("#divcases").load("planner #tablecontainer"); //reload div
            }
        });
    }
} );