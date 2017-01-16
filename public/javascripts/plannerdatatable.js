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
                    row[1] = parsed[i].CUST_EST_NO;
                    row[2] = parsed[i].JIN;
                    row[3] = parsed[i].PRIMARY_SKILL;
                    row[4] = parsed[i].EXCH;
                    row[5] = parsed[i].OM_OUC;
                    row[6] = parsed[i].CSS_EXCH;
                    row[7] = parsed[i].SYSTEM_DEFINED_PRIORITY;
                    row[8] = parsed[i].CASE_STATUS;
                    row[9] = parsed[i].PRIORITY_DESCRIPTION;
                    row[10] = parsed[i].QU_ID;
                    row[11] = parsed[i].CASE_OBJID;
                    row[12] = parsed[i].SUB_DESCRIPTION;
                    row[13] = parsed[i].WT_DESCRIPTION;
                    row[14] = parsed[i].CASE_QUEUE;
                    row[15] = parsed[i].OM_PATCH_NAME;
                    row[16] = parsed[i].ASSUMED_GANG_SIZE;
                    row[17] = parsed[i].CASETOTALREC;
                    row[18] = parsed[i].TT_REMAINING_DURATION;
                    row[19] = parsed[i].QUEUE;
                    row[20] = parsed[i].HREF;
                    row[21] = parsed[i].LON;
                    row[22] = parsed[i].LAT;

                    array[i] = row;
                    row = [];

                }

                $('#datatableplanner').DataTable({
                    data: array,
                    columns: [
                        {title: "CASE_ID"},
                        {title: "CUST_EST_NO"},
                        {title: "JIN"},
                        {title: "PRIMARY_SKILL"},
                        {title: "EXCH"},
                        {title: "OM_OUC"},
                        {title: "CSS_EXCH"},
                        {title: "SYSTEM_DEFINED_PRIORITY"},
                        {title: "CASE_STATUS"},
                        {title: "PRIORITY_DESCRIPTION"},
                        {title: "QU_ID"},
                        {title: "CASE_OBJID"},
                        {title: "SUB_DESCRIPTION"},
                        {title: "WT_DESCRIPTION"},
                        {title: "CASE_QUEUE"},
                        {title: "OM_PATCH_NAME"},
                        {title: "ASSUMED#GANG#SIZE"},
                        {title: "CASETOTALREC"},
                        {title: "TT#REMAINING#DURATION"},
                        {title: "QUEUE"},
                        {title: "#HREF"},
                        {title: "LON"},
                        {title: "LAT"}
                    ]
                });
                //$("#divcases").load("planner #tablecontainer"); //reload div
            }
        });
    }
} );