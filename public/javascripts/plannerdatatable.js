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
                    row[5] = parsed[i].VEHICLES;
                    row[6] = parsed[i].START_LOCATION;

                    row[7] = parsed[i].ATTENDANCE_DAY_0;
                    row[8] = parsed[i].FINAL_DOMAIN_DAY_0;
                    row[9] = parsed[i].PERCENTAGE_ON_TASK_DAY_0;
                    row[10] = parsed[i].PERCENTAGE_TRAVEL_DAY_0;
                    row[11] = parsed[i].TOUR_DAY_0;
                    row[12] = parsed[i].PLAN_ISSUES_DAY_0;

                    row[13] = parsed[i].ATTENDANCE_DAY_1;
                    row[14] = parsed[i].FINAL_DOMAIN_DAY_1;
                    row[15] = parsed[i].PERCENTAGE_ON_TASK_DAY_1;
                    row[16] = parsed[i].PERCENTAGE_TRAVEL_DAY_1;
                    row[17] = parsed[i].TOUR_DAY_1;
                    row[18] = parsed[i].PLAN_ISSUES_DAY_1;

                    row[19] = parsed[i].ATTENDANCE_DAY_2;
                    row[20] = parsed[i].FINAL_DOMAIN_DAY_2;
                    row[21] = parsed[i].PERCENTAGE_ON_TASK_DAY_2;
                    row[22] = parsed[i].PERCENTAGE_TRAVEL_DAY_2;
                    row[23] = parsed[i].TOUR_DAY_2;
                    row[24] = parsed[i].PLAN_ISSUES_DAY_2;

                    row[25] = parsed[i].ATTENDANCE_DAY_3;
                    row[26] = parsed[i].FINAL_DOMAIN_DAY_3;
                    row[27] = parsed[i].PERCENTAGE_ON_TASK_DAY_3;
                    row[28] = parsed[i].PERCENTAGE_TRAVEL_DAY_3;
                    row[29] = parsed[i].TOUR_DAY_3;
                    row[30] = parsed[i].PLAN_ISSUES_DAY_3;

                    row[31] = parsed[i].ATTENDANCE_DAY_4;
                    row[32] = parsed[i].FINAL_DOMAIN_DAY_4;
                    row[33] = parsed[i].PERCENTAGE_ON_TASK_DAY_4;
                    row[34] = parsed[i].PERCENTAGE_TRAVEL_DAY_4;
                    row[35] = parsed[i].TOUR_DAY_4;
                    row[36] = parsed[i].PLAN_ISSUES_DAY_4;

                    row[37] = parsed[i].ATTENDANCE_DAY_5;
                    row[38] = parsed[i].FINAL_DOMAIN_DAY_5;
                    row[39] = parsed[i].PERCENTAGE_ON_TASK_DAY_5;
                    row[40] = parsed[i].PERCENTAGE_TRAVEL_DAY_5;
                    row[41] = parsed[i].TOUR_DAY_5;
                    row[42] = parsed[i].PLAN_ISSUES_DAY_5;

                    array[i] = row;
                    row = [];
                }

                var today = new Date(); //$.datepicker.formatDate('dd/mm', new Date());
                var dd = today.getDate();
                var mm = today.getMonth() + 1;
                var day0 = dd + '/'+ mm;
                today.setDate(today.getDate() + 1);
                dd = today.getDate();
                mm = today.getMonth() + 1;
                var day1 = dd + '/'+ mm;
                today.setDate(today.getDate() + 1);
                dd = today.getDate();
                mm = today.getMonth() + 1;
                var day2 = dd + '/'+ mm;
                today.setDate(today.getDate() + 1);
                dd = today.getDate();
                mm = today.getMonth() + 1;
                var day3 = dd + '/'+ mm;
                today.setDate(today.getDate() + 1);
                dd = today.getDate();
                mm = today.getMonth() + 1;
                var day3 = dd + '/'+ mm;
                today.setDate(today.getDate() + 1);
                dd = today.getDate();
                mm = today.getMonth() + 1;
                var day4 = dd + '/'+ mm;
                today.setDate(today.getDate() + 1);
                dd = today.getDate();
                mm = today.getMonth() + 1;
                var day5 = dd + '/'+ mm;
                //alert(day0 + "  "+day1 + "  "+ day2 + " "+day3);

                var tablehead2;
                var fixedcolhead;

                var table = $('#datatableplanner').DataTable({
                    data: array,
                    "columnDefs": [ {
                        "visible": false,
                        "targets": -1
                    }],
                    columns: [
                        {title: "OUC"},
                        {title: "EIN"},
                        {title: "WM Pin"},
                        {title: "Name"},
                        {title: "Skills"},
                        {title: "Vehicles"},
                        {title: "Location"},

                        {title: "Attendance"},
                        {title: "Domain"},
                        {title: "% Utilised"},
                        {title: "% Travel"},
                        {title: "Tasks Planned"},
                        {title: "Issues"},

                        {title: "Attendance"},
                        {title: "Domain"},
                        {title: "% Utilised"},
                        {title: "% Travel"},
                        {title: "Tasks Planned"},
                        {title: "Issues"},

                        {title: "Attendance"},
                        {title: "Domain"},
                        {title: "% Utilised"},
                        {title: "% Travel"},
                        {title: "Tasks Planned"},
                        {title: "Issues"},

                        {title: "Attendance"},
                        {title: "Domain"},
                        {title: "% Utilised"},
                        {title: "% Travel"},
                        {title: "Tasks Planned"},
                        {title: "Issues"},

                        {title: "Attendance"},
                        {title: "Domain"},
                        {title: "% Utilised"},
                        {title: "% Travel"},
                        {title: "Tasks Planned"},
                        {title: "Issues"},

                        {title: "Attendance"},
                        {title: "Domain"},
                        {title: "% Utilised"},
                        {title: "% Travel"},
                        {title: "Tasks Planned"},
                        {title: "Issues"}
                    ],
                    //scrollY:        "100px",
                    scrollX:        "800px",
                    paging:         true,
                    pageLength: 25,
                    fixedColumns:   {
                        leftColumns: 7
                    },
                    dom: '<"top"iflp<"clear">>rt<"bottom"<"clear">>',
                    rowCallback: function(row, data, index) {
                        // attendance formatting
                        if (data[7]== "RDO") {
                            $(row).find('td:eq(7)').addClass('colorgrey');
                        } else if (data[7].substring(0,2) == 'OT' || !isNaN(data[7].substring(0,1)) ) {
                            $(row).find('td:eq(7)').addClass('colorgreen');
                        } else {
                            $(row).find('td:eq(7)').addClass('colororange');
                        }
                        if (data[13]== "RDO") {
                            $(row).find('td:eq(13)').addClass('colorgrey');
                        } else if (data[13].substring(0,2) == 'OT' || !isNaN(data[13].substring(0,1)) ) {
                            $(row).find('td:eq(13)').addClass('colorgreen');
                        } else {
                            $(row).find('td:eq(13)').addClass('colororange');
                        }
                        if (data[19]== "RDO") {
                            $(row).find('td:eq(19)').addClass('colorgrey');
                        } else if (data[19].substring(0,2) == 'OT' || !isNaN(data[19].substring(0,1)) ) {
                            $(row).find('td:eq(19)').addClass('colorgreen');
                        } else {
                            $(row).find('td:eq(19)').addClass('colororange');
                        }
                        if (data[25]== "RDO") {
                            $(row).find('td:eq(25)').addClass('colorgrey');
                        } else if (data[25].substring(0,2) == 'OT' || !isNaN(data[25].substring(0,1)) ) {
                            $(row).find('td:eq(25)').addClass('colorgreen');
                        } else {
                            $(row).find('td:eq(25)').addClass('colororange');
                        }
                        if (data[31]== "RDO") {
                            $(row).find('td:eq(31)').addClass('colorgrey');
                        } else if (data[31].substring(0,2) == 'OT' || !isNaN(data[31].substring(0,1)) ) {
                            $(row).find('td:eq(31)').addClass('colorgreen');
                        } else {
                            $(row).find('td:eq(31)').addClass('colororange');
                        }
                        if (data[37]== "RDO") {
                            $(row).find('td:eq(37)').addClass('colorgrey');
                        } else if (data[37].substring(0,2) == 'OT' || !isNaN(data[37].substring(0,1)) ) {
                            $(row).find('td:eq(37)').addClass('colorgreen');
                        } else {
                            $(row).find('td:eq(37)').addClass('colororange');
                        }

                        //Domain formatting
                        if (data[8]== "66" || data[8]== "67" || data[8]== "68") {
                            $(row).find('td:eq(8)').addClass('colorgreen');
                        } else {
                            $(row).find('td:eq(8)').addClass('colororange');
                        }
                        if (data[14]== "66" || data[14]== "67" || data[14]== "68") {
                            $(row).find('td:eq(14)').addClass('colorgreen');
                        } else {
                            $(row).find('td:eq(14)').addClass('colororange');
                        }
                        if (data[20]== "66" || data[20]== "67" || data[20]== "68") {
                            $(row).find('td:eq(20)').addClass('colorgreen');
                        } else {
                            $(row).find('td:eq(20)').addClass('colororange');
                        }
                        if (data[26]== "66" || data[26]== "67" || data[26]== "68") {
                            $(row).find('td:eq(26)').addClass('colorgreen');
                        } else {
                            $(row).find('td:eq(26)').addClass('colororange');
                        }
                        if (data[32]== "66" || data[32]== "67" || data[32]== "68") {
                            $(row).find('td:eq(32)').addClass('colorgreen');
                        } else {
                            $(row).find('td:eq(32)').addClass('colororange');
                        }
                        if (data[38]== "66" || data[38]== "67" || data[38]== "68") {
                            $(row).find('td:eq(38)').addClass('colorgreen');
                        } else {
                            $(row).find('td:eq(38)').addClass('colororange');
                        }

                        //Utilisation formatting
                        if (data[9] == null) {
                            $(row).find('td:eq(9)').addClass('colorgrey');
                        } else if (data[9] > 85) {
                            $(row).find('td:eq(9)').addClass('coloryellow');
                        } else if (data[9] > 70) {
                            $(row).find('td:eq(9)').addClass('colorgreen');
                        } else if (data[9] > 60) {
                            $(row).find('td:eq(9)').addClass('colorpink');
                        } else {
                            $(row).find('td:eq(9)').addClass('colorpurple');
                        }
                        if (data[15] == null) {
                            $(row).find('td:eq(15)').addClass('colorgrey');
                        } else if (data[15] > 85) {
                            $(row).find('td:eq(15)').addClass('coloryellow');
                        } else if (data[15] > 70) {
                            $(row).find('td:eq(15)').addClass('colorgreen');
                        } else if (data[15] > 60) {
                            $(row).find('td:eq(15)').addClass('colorpink');
                        } else {
                            $(row).find('td:eq(15)').addClass('colorpurple');
                        }
                        if (data[21] == null) {
                            $(row).find('td:eq(21)').addClass('colorgrey');
                        } else if (data[21] > 85) {
                            $(row).find('td:eq(21)').addClass('coloryellow');
                        } else if (data[21] > 70) {
                            $(row).find('td:eq(21)').addClass('colorgreen');
                        } else if (data[21] > 60) {
                            $(row).find('td:eq(21)').addClass('colorpink');
                        } else {
                            $(row).find('td:eq(21)').addClass('colorpurple');
                        }
                        if (data[27] == null) {
                            $(row).find('td:eq(27)').addClass('colorgrey');
                        } else if (data[27] > 85) {
                            $(row).find('td:eq(27)').addClass('coloryellow');
                        } else if (data[27] > 70) {
                            $(row).find('td:eq(27)').addClass('colorgreen');
                        } else if (data[27] > 60) {
                            $(row).find('td:eq(27)').addClass('colorpink');
                        } else {
                            $(row).find('td:eq(27)').addClass('colorpurple');
                        }
                        if (data[33] == null) {
                            $(row).find('td:eq(33)').addClass('colorgrey');
                        } else if (data[33] > 85) {
                            $(row).find('td:eq(33)').addClass('coloryellow');
                        } else if (data[33] > 70) {
                            $(row).find('td:eq(33)').addClass('colorgreen');
                        } else if (data[33] > 60) {
                            $(row).find('td:eq(33)').addClass('colorpink');
                        } else {
                            $(row).find('td:eq(33)').addClass('colorpurple');
                        }
                        if (data[39] == null) {
                            $(row).find('td:eq(39)').addClass('colorgrey');
                        } else if (data[39] > 85) {
                            $(row).find('td:eq(39)').addClass('coloryellow');
                        } else if (data[39] > 70) {
                            $(row).find('td:eq(39)').addClass('colorgreen');
                        } else if (data[39] > 60) {
                            $(row).find('td:eq(39)').addClass('colorpink');
                        } else {
                            $(row).find('td:eq(39)').addClass('colorpurple');
                        }

                        //Travel formatting
                        if (data[10] == null) {
                            $(row).find('td:eq(10)').addClass('colorgrey');
                        } else if (data[10] <= 25) {
                            $(row).find('td:eq(10)').addClass('colorgreen');
                        } else if (data[10] > 25) {
                            $(row).find('td:eq(10)').addClass('colorpink');
                        }
                        if (data[16] == null) {
                            $(row).find('td:eq(16)').addClass('colorgrey');
                        } else if (data[16] <= 25) {
                            $(row).find('td:eq(16)').addClass('colorgreen');
                        } else if (data[16] > 25) {
                            $(row).find('td:eq(16)').addClass('colorpink');
                        }
                        if (data[22] == null) {
                            $(row).find('td:eq(22)').addClass('colorgrey');
                        } else if (data[22] <= 25) {
                            $(row).find('td:eq(22)').addClass('colorgreen');
                        } else if (data[22] > 25) {
                            $(row).find('td:eq(22)').addClass('colorpink');
                        }
                        if (data[28] == null) {
                            $(row).find('td:eq(28)').addClass('colorgrey');
                        } else if (data[28] <= 25) {
                            $(row).find('td:eq(28)').addClass('colorgreen');
                        } else if (data[28] > 25) {
                            $(row).find('td:eq(28)').addClass('colorpink');
                        }
                        if (data[34] == null) {
                            $(row).find('td:eq(34)').addClass('colorgrey');
                        } else if (data[34] <= 25) {
                            $(row).find('td:eq(34)').addClass('colorgreen');
                        } else if (data[34] > 25) {
                            $(row).find('td:eq(34)').addClass('colorpink');
                        }
                        if (data[40] == null) {
                            $(row).find('td:eq(40)').addClass('colorgrey');
                        } else if (data[40] <= 25) {
                            $(row).find('td:eq(40)').addClass('colorgreen');
                        } else if (data[40] > 25) {
                            $(row).find('td:eq(40)').addClass('colorpink');
                        }

                        //Issues formating
                        if (!(data[12] == null)) {
                            $(row).find('td:eq(12)').addClass('colorpink');
                        } if (!(data[18] == null)) {
                            $(row).find('td:eq(18)').addClass('colorpink');
                        } if (!(data[24] == null)) {
                            $(row).find('td:eq(24)').addClass('colorpink');
                        } if (!(data[30] == null)) {
                            $(row).find('td:eq(30)').addClass('colorpink');
                        } if (!(data[36] == null)) {
                            $(row).find('td:eq(36)').addClass('colorpink');
                        } if (!(data[42] == null)) {
                            $(row).find('td:eq(42)').addClass('colorpink');
                        }
                    }
                });
                tablehead2 = $(".dataTables_scrollHeadInner table thead");
                fixedcolhead = $(".DTFC_LeftHeadWrapper table thead");
                tablehead2.prepend("<tr><th colspan=\"7\"></th><th colspan=\"6\">Day 0 ("+day0+")</th><th colspan=\"6\">Day 1 ("+day1+")</th><th colspan=\"6\">Day 2 ("+day2+")</th><th colspan=\"6\">Day 3 ("+day3+")</th><th colspan=\"6\">Day 4 ("+day4+")</th><th colspan=\"6\">Day 5 ("+day5+")</th></tr>");
                fixedcolhead.prepend("<tr><th colspan=\"7\">Engineer Info</th></tr>");

            }
        });
    }
} );