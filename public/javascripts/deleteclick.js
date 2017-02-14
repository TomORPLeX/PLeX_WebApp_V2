$(document).ready(function() {
    $('#tableDelete').on('click-row.bs.table', function (e, row, $element) {
        console.log(row);
        if (row.PLANNED_ENGINEER != "-") {
            $("#DeleteDialog").dialog({
                buttons: {
                    "Yes- Delete case": function() {
                        var obj = { 'CASE_ID': row.CASE_ID,
                                    'PLANNED_ENGINEER': row.PLANNED_ENGINEER,
                                    'PLANNED_DATE': row.PLANNED_DATE};
                        $.ajax({
                            type: 'POST',
                            data: JSON.stringify(obj),
                            contentType: 'application/json',
                            url: '/deleteclicked',
                            success: function (data) {

                                $("#DeleteSuccessDialog").dialog({
                                    buttons: {"Close": function() {
                                        var rowdata =[];
                                        var cases1 = $.map($("#cases option:selected"), function (el1) {
                                            return $(el1).text();
                                        });
                                        var estimatenum1 = document.getElementById('estimate').value;
                                        var numofcases1 = cases1.length;
                                        var obj = {'cases': cases1, 'estimatenum': estimatenum1};

                                        if (numofcases1 == 1) {
                                            $.ajax({
                                                type: 'POST',
                                                data: JSON.stringify(obj),
                                                contentType: 'application/json',
                                                url: '/querydeletedata',
                                                success: function (data) {
                                                    if (data.deletedata.length > 0) {
                                                        $(function () {
                                                            //alert('im here');
                                                            $('#tableDelete').bootstrapTable("load", data.deletedata);
                                                        });
                                                    } else {
                                                        var defaultdata = [
                                                            {
                                                                "CASE_ID": "-",
                                                                "PLANNED_ENGINEER": "-",
                                                                "PLANNED_DATE": "-",
                                                                "ENG_TRAVEL_TIME": "-",
                                                                "EOD_TRAVEL": "-",
                                                                "TASK_NUMBER": "-"
                                                            }];

                                                        $('#tableDelete').bootstrapTable({
                                                            data: defaultdata
                                                        });
                                                    }
                                                },
                                                error: function (request, status, error) {
                                                    window.location.replace("/error");
                                                }
                                            });
                                        }
                                        $(this).dialog("close");
                                    }
                                    }
                                });
                            },
                            error: function (request, status, error) {
                                window.location.replace("/error");
                            }
                        });
                        $(this).dialog("close");
                    },
                    "No": function() {
                        $(this).dialog("close");
                    }
                }
            });

        }
    });
});