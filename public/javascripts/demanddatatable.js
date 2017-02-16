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

                    row[5] = parsed[i].ATTENDANCE_DAY_6;
                    row[6] = parsed[i].PERCENTAGE_ON_TASK_DAY_6;
                    row[7] = parsed[i].PERCENTAGE_TRAVEL_DAY_6;
                    row[8] = parsed[i].PLAN_ISSUES_DAY_6;
                    row[9] = parsed[i].TOUR_DAY_6;

                    row[10] = parsed[i].ATTENDANCE_DAY_5;
                    row[11] = parsed[i].PERCENTAGE_ON_TASK_DAY_5;
                    row[12] = parsed[i].PERCENTAGE_TRAVEL_DAY_5;
                    row[13] = parsed[i].PLAN_ISSUES_DAY_5;
                    row[14] = parsed[i].TOUR_DAY_5;

                    row[15] = parsed[i].ATTENDANCE_DAY_4;
                    row[16] = parsed[i].PERCENTAGE_ON_TASK_DAY_4;
                    row[17] = parsed[i].PERCENTAGE_TRAVEL_DAY_4;
                    row[18] = parsed[i].PLAN_ISSUES_DAY_4;
                    row[19] = parsed[i].TOUR_DAY_4;

                    row[20] = parsed[i].ATTENDANCE_DAY_3;
                    row[21] = parsed[i].PERCENTAGE_ON_TASK_DAY_3;
                    row[22] = parsed[i].PERCENTAGE_TRAVEL_DAY_3;
                    row[23] = parsed[i].PLAN_ISSUES_DAY_3;
                    row[24] = parsed[i].TOUR_DAY_3;

                    row[25] = parsed[i].ATTENDANCE_DAY_2;
                    row[26] = parsed[i].PERCENTAGE_ON_TASK_DAY_2;
                    row[27] = parsed[i].PERCENTAGE_TRAVEL_DAY_2;
                    row[28] = parsed[i].PLAN_ISSUES_DAY_2;
                    row[29] = parsed[i].TOUR_DAY_2;

                    row[30] = parsed[i].ATTENDANCE_DAY_1;
                    row[31] = parsed[i].PERCENTAGE_ON_TASK_DAY_1;
                    row[32] = parsed[i].PERCENTAGE_TRAVEL_DAY_1;
                    row[33] = parsed[i].PLAN_ISSUES_DAY_1;
                    row[34] = parsed[i].TOUR_DAY_1;

                    row[35] = parsed[i].ATTENDANCE_DAY_0;
                    row[36] = parsed[i].PERCENTAGE_ON_TASK_DAY_0;
                    row[37] = parsed[i].PERCENTAGE_TRAVEL_DAY_0;
                    row[38] = parsed[i].PLAN_ISSUES_DAY_0;
                    row[39] = parsed[i].TOUR_DAY_0;

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

                        {title: "ATTENDANCE_DAY_6"},
                        {title: "PERCENTAGE_ON_TASK_DAY_6"},
                        {title: "PLAN_ISSUES_DAY_6"},
                        {title: "TOUR_DAY_6"},

                        {title: "ATTENDANCE_DAY_5"},
                        {title: "PERCENTAGE_ON_TASK_DAY_5"},
                        {title: "PLAN_ISSUES_DAY_5"},
                        {title: "TOUR_DAY_5"},

                        {title: "ATTENDANCE_DAY_4"},
                        {title: "PERCENTAGE_ON_TASK_DAY_4"},
                        {title: "PLAN_ISSUES_DAY_4"},
                        {title: "TOUR_DAY_4"},

                        {title: "ATTENDANCE_DAY_3"},
                        {title: "PERCENTAGE_ON_TASK_DAY_3"},
                        {title: "PLAN_ISSUES_DAY_3"},
                        {title: "TOUR_DAY_3"},

                        {title: "ATTENDANCE_DAY_2"},
                        {title: "PERCENTAGE_ON_TASK_DAY_2"},
                        {title: "PLAN_ISSUES_DAY_2"},
                        {title: "TOUR_DAY_2"},

                        {title: "ATTENDANCE_DAY_1"},
                        {title: "PERCENTAGE_ON_TASK_DAY_1"},
                        {title: "PLAN_ISSUES_DAY_1"},
                        {title: "TOUR_DAY_1"},

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