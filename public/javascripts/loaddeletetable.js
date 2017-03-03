
$(document).ready(function() {

    var defaultdata =  [
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

});

$("#deletion").click(function () {
   //alert('clicked');
    var rowdata =[];
    var cases1 = $.map($("#cases option:selected"), function (el1) {
        return $(el1).text();
    });
    var estimatenum1 = document.getElementById('estimate').value;
    var numofcases1 = cases1.length;
    var obj = {'cases': cases1, 'estimatenum': estimatenum1};
    //alert(cases1 +'\n'+'length: '+numofcases1);

    if (numofcases1 == 1) {
            $.ajax({
                type: 'POST',
                data: JSON.stringify(obj),
                contentType: 'application/json',
                url: '/querydeletedata',
                success: function (data) {
                    //alert(JSON.stringify(data.deletedata.length));
                    if (data.deletedata.length>0) {
                        $(function () {
                            //alert('im here');
                            $('#tableDelete').bootstrapTable("load", data.deletedata);
                        });
                    }else{
                        var defaultdata =  [
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
    $("#tableDelete tbody tr:contains()").hide();
});



