$(document).ready(function() {

    $.ajax({
        type: 'POST',
        url: '/queryjobflowdata',
        success: function(data1) {
            $('#overlay').show();
            //alert(JSON.stringify(data1));
            var tablehead2;
            var fixedcolhead;
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
            var table = $('#datatablejobflow').DataTable({
                data: data1.data1,
                "columnDefs": [ {
                    "visible": false,
                    "targets": -1
                }],
                columns: [
                    {title: "OUC"},
                    {title: "EIN"},
                    {title: "Eng ID"},
                    {title: "Eng Name"},
                    {title: "PRIMARY_NS_SKILLS"},
                    {title: "Vehicles"},
                    {title: "Start Location"},

                    {title: "Tasks Allocated"},
                    {title: "Planned but not Pinned"},
                    {title: "Number Of Issues"},

                    {title: "Tasks Allocated"},
                    {title: "Planned but not Pinned"},
                    {title: "Number Of Issues"},

                    {title: "Tasks Allocated"},
                    {title: "Planned but not Pinned"},
                    {title: "Number Of Issues"},

                    {title: "Tasks Allocated"},
                    {title: "Planned but not Pinned"},
                    {title: "Number Of Issues"},

                    {title: "Tasks Allocated"},
                    {title: "Planned but not Pinned"},
                    {title: "Number Of Issues"},

                    {title: "Tasks Allocated"},
                    {title: "Planned but not Pinned"},
                    {title: "Number Of Issues"}

                ],
                scrollX:        "800px",
                paging:         true,
                pageLength: 25,
                fixedColumns: {
                    leftColumns: 7
                },
                dom: '<"top"iflp<"clear">>rt<"bottom"<"clear">>',
                rowCallback: function(row, data, index) {
                    if (data[7]== null && data[8] == null) {
                        $(row).find('td:eq(7)').addClass('colorgrey');
                        $(row).find('td:eq(8)').addClass('colorgrey');
                    } else if (data[9] >= 1) {
                        $(row).find('td:eq(7)').addClass('colorpink');
                        $(row).find('td:eq(8)').addClass('colorpink');
                    } else {
                        $(row).find('td:eq(7)').addClass('colorgreen');
                        $(row).find('td:eq(8)').addClass('colorgreen');
                    }

                    if (data[10]== null && data[11] == null) {
                        $(row).find('td:eq(10)').addClass('colorgrey');
                        $(row).find('td:eq(11)').addClass('colorgrey');
                    } else if (data[12] >= 1) {
                        $(row).find('td:eq(10)').addClass('colorpink');
                        $(row).find('td:eq(11)').addClass('colorpink');
                    } else {
                        $(row).find('td:eq(10)').addClass('colorgreen');
                        $(row).find('td:eq(10)').addClass('colorgreen');
                    }

                    if (data[13]== null && data[14] == null) {
                        $(row).find('td:eq(13)').addClass('colorgrey');
                        $(row).find('td:eq(14)').addClass('colorgrey');
                    } else if (data[15] >= 1) {
                        $(row).find('td:eq(13)').addClass('colorpink');
                        $(row).find('td:eq(14)').addClass('colorpink');
                    } else {
                        $(row).find('td:eq(13)').addClass('colorgreen');
                        $(row).find('td:eq(14)').addClass('colorgreen');
                    }

                    if (data[16]== null && data[17] == null) {
                        $(row).find('td:eq(16)').addClass('colorgrey');
                        $(row).find('td:eq(17)').addClass('colorgrey');
                    } else if (data[18] >= 1) {
                        $(row).find('td:eq(16)').addClass('colorpink');
                        $(row).find('td:eq(17)').addClass('colorpink');
                    } else {
                        $(row).find('td:eq(16)').addClass('colorgreen');
                        $(row).find('td:eq(17)').addClass('colorgreen');
                    }

                    if (data[19]== null && data[20] == null) {
                        $(row).find('td:eq(19)').addClass('colorgrey');
                        $(row).find('td:eq(20)').addClass('colorgrey');
                    } else if (data[21] >= 1) {
                        $(row).find('td:eq(19)').addClass('colorpink');
                        $(row).find('td:eq(20)').addClass('colorpink');
                    } else {
                        $(row).find('td:eq(19)').addClass('colorgreen');
                        $(row).find('td:eq(20)').addClass('colorgreen');
                    }

                    if (data[22]== null && data[23] == null) {
                        $(row).find('td:eq(22)').addClass('colorgrey');
                        $(row).find('td:eq(23)').addClass('colorgrey');
                    } else if (data[24] >= 1) {
                        $(row).find('td:eq(22)').addClass('colorpink');
                        $(row).find('td:eq(23)').addClass('colorpink');
                    } else {
                        $(row).find('td:eq(22)').addClass('colorgreen');
                        $(row).find('td:eq(23)').addClass('colorgreen');
                    }

                }
            });
            tablehead2 = $(".dataTables_scrollHeadInner table thead");
            fixedcolhead = $(".DTFC_LeftHeadWrapper table thead");
            tablehead2.prepend("<tr><th colspan=\"7\"></th><th colspan=\"3\">Day 0 ("+day0+")</th><th colspan=\"3\">Day 1 ("+day1+")</th><th colspan=\"3\">Day 2 ("+day2+")</th><th colspan=\"3\">Day 3 ("+day3+")</th><th colspan=\"3\">Day 4 ("+day4+")</th><th colspan=\"3\">Day 5 ("+day5+")</th></tr>");
            fixedcolhead.prepend("<tr><th colspan=\"7\">Engineer Info</th></tr>");

            $('#overlay').fadeOut(1000);
        }
    });

});
