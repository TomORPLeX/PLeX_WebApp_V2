$(document).ready(function() {

    $.ajax({
        type: 'POST',
        url: '/queryjobflowdata',
        success: function(data1) {
            $('#overlay').show();
            //alert(JSON.stringify(data1));
            var table = $('#datatablejobflow').DataTable({
                data: data1.data1,
                columns: [
                    {title: "OUC"},
                    {title: "EIN"},
                    {title: "Eng ID"},
                    {title: "Eng Name"},
                    {title: "PRIMARY_NS_SKILLS"},
                    {title: "Vehicles"},
                    {title: "Start Location"},

                    {title: "TODAY_TASKS_ALLOCATED"},
                    {title: "TODAY_PLANNED_NOT_PINNED"},
                    {title: "TODAY_CONDITIONAL_FORMAT"},

                    {title: "Day 1 TASKS ALLOCATED"},
                    {title: "Day 1 PLANNED_NOT_PINNED"},
                    {title: "Day 1 CONDITIONAL_FORMAT"},

                    {title: "Day 2 TASKS ALLOCATED"},
                    {title: "Day 2 PLANNED_NOT_PINNED"},
                    {title: "Day 2 CONDITIONAL_FORMAT"},

                    {title: "Day 3 TASKS ALLOCATED"},
                    {title: "Day 3 PLANNED_NOT_PINNED"},
                    {title: "Day 3 CONDITIONAL_FORMAT"},

                    {title: "Day 4 TASKS ALLOCATED"},
                    {title: "Day 4 PLANNED_NOT_PINNED"},
                    {title: "Day 4 CONDITIONAL_FORMAT"},

                    {title: "Day 5 TASKS ALLOCATED"},
                    {title: "Day 5 PLANNED_NOT_PINNED"},
                    {title: "Day 5 CONDITIONAL_FORMAT"}

                ],
                "pageLength": 20
            });
            $('#overlay').fadeOut(1000);
        }
    });

});
