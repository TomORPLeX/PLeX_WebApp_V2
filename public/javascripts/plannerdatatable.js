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
                $('#overlay').show();
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
                    row[8] = parsed[i].PERCENTAGE_ON_TASK_DAY_0;
                    row[9] = parsed[i].PERCENTAGE_TRAVEL_DAY_0;
                    row[10] = parsed[i].TOUR_DAY_0;
                    row[11] = parsed[i].PLAN_ISSUES_DAY_0;


                    row[12] = parsed[i].ATTENDANCE_DAY_1;
                    row[13] = parsed[i].PERCENTAGE_ON_TASK_DAY_1;
                    row[14] = parsed[i].PERCENTAGE_TRAVEL_DAY_1;
                    row[15] = parsed[i].TOUR_DAY_1;
                    row[16] = parsed[i].PLAN_ISSUES_DAY_1;

                    row[17] = parsed[i].ATTENDANCE_DAY_2;
                    row[18] = parsed[i].PERCENTAGE_ON_TASK_DAY_2;
                    row[19] = parsed[i].PERCENTAGE_TRAVEL_DAY_2;
                    row[20] = parsed[i].TOUR_DAY_2;
                    row[21] = parsed[i].PLAN_ISSUES_DAY_2;

                    row[22] = parsed[i].ATTENDANCE_DAY_3;
                    row[23] = parsed[i].PERCENTAGE_ON_TASK_DAY_3;
                    row[24] = parsed[i].PERCENTAGE_TRAVEL_DAY_3;
                    row[25] = parsed[i].TOUR_DAY_3;
                    row[26] = parsed[i].PLAN_ISSUES_DAY_3;

                    row[27] = parsed[i].ATTENDANCE_DAY_4;
                    row[28] = parsed[i].PERCENTAGE_ON_TASK_DAY_4;
                    row[29] = parsed[i].PERCENTAGE_TRAVEL_DAY_4;
                    row[30] = parsed[i].TOUR_DAY_4;
                    row[31] = parsed[i].PLAN_ISSUES_DAY_4;

                    row[32] = parsed[i].ATTENDANCE_DAY_5;
                    row[33] = parsed[i].PERCENTAGE_ON_TASK_DAY_5;
                    row[34] = parsed[i].PERCENTAGE_TRAVEL_DAY_5;
                    row[35] = parsed[i].TOUR_DAY_5;
                    row[36] = parsed[i].PLAN_ISSUES_DAY_5;

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

                tablehead2 = $(".dataTables_scrollHeadInner table thead");
                fixedcolhead = $(".DTFC_LeftHeadWrapper table thead");
                tablehead2.prepend("<tr><th colspan=\"7\"></th><th colspan=\"5\">Day 0 ("+day0+")</th><th colspan=\"5\">Day 1 ("+day1+")</th><th colspan=\"5\">Day 2 ("+day2+")</th><th colspan=\"5\">Day 3 ("+day3+")</th><th colspan=\"5\">Day 4 ("+day4+")</th><th colspan=\"5\">Day 5 ("+day5+")</th></tr>");
                fixedcolhead.prepend("<tr><th colspan=\"7\">Engineer Info</th></tr>");


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
                        {title: "% Utilised"},
                        {title: "% Travel"},
                        {title: "Tasks Planned"},
                        {title: "Issues"},

                        {title: "Attendance"},
                        {title: "% Utilised"},
                        {title: "% Travel"},
                        {title: "Tasks Planned"},
                        {title: "Issues"},

                        {title: "Attendance"},
                        {title: "% Utilised"},
                        {title: "% Travel"},
                        {title: "Tasks Planned"},
                        {title: "Issues"},

                        {title: "Attendance"},
                        {title: "% Utilised"},
                        {title: "% Travel"},
                        {title: "Tasks Planned"},
                        {title: "Issues"},

                        {title: "Attendance"},
                        {title: "% Utilised"},
                        {title: "% Travel"},
                        {title: "Tasks Planned"},
                        {title: "Issues"},

                        {title: "Attendance"},
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
                    //dom: 'Bfrtip',
                    rowCallback: function(row, data, index) {
                        console.log(row);
                        if (data[4]== null) {
                            //$(row).find('td:eq(3)').addClass('colorred');
                            $(row).find('td:eq(1)').addClass('colorgrey');
                            //$(row).find('td:eq(5)').addClass('colorblue');
                        }
                    }
                });
                $('#overlay').fadeOut(1000);
            }
        });
    }
} );



