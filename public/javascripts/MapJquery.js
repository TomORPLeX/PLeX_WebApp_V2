$(document).ready(function() {
    var skillsFilter = [];
    var y;
    var x;
    var fluidityStatus;
    var plannedWork;
    var priorityScore = [];
    var oucSelection;
    var dataString = [];

    $("#button").click(function () {
        window.onbeforeunload = null;
        skillsFilter = [];
        priorityScore = [];
        dataString = [];
        y=0;
        x=0;

        for (i = 0; i < 9; i++) {

            if ($("#filter" + i).is(":checked")) {

                skillsFilter[y] = $('#filter' + i).attr('name'+i);
                y++;
            }else {

                continue;
            }
        }

        for (z = 0; z < 10; z++) {

            if ($("#priority" + z).is(":checked")) {
                priorityScore[x] = $('#priority' + z).attr('name'+z);
                x++;
            }else {
                continue;
            }
        }

        //skillsFilter[y-1] = skillsFilter[y-1]+");";
        fluidityStatus = $('#fluidity').find(":selected").text();
        plannedWork = $('#planned').find(":selected").text();
        oucSelection = $('#oucselection').find(":selected").text();

        dataString = {
            'fluidity':fluidityStatus,
            'planned':plannedWork,
            'priority':priorityScore,
            'skills':skillsFilter,
            'ouc':oucSelection
        };

        alert(dataString);
        alert(JSON.stringify(dataString));
        console.log(JSON.stringify(dataString));
        $.ajax({
            type: 'POST',
            data: JSON.stringify(dataString),
            contentType: 'application/json',
            url: '/maprerender',
            success: function (data) {
                setTimeout(function(){
                    window.location.reload(true);
                }, 250);

            }
        });

    });
});