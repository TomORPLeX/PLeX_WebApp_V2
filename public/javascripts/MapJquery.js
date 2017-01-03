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

        for (z = 0; z < 11; z++) {

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

        /*var fluidityStatusFlag = 0;

        if (fluidityStatus == "All"){
            fluidityStatusFlag = 1;
            fluidityStatus = "";
        }else{
            fluidityStatus = "WHERE case_status= '" + fluidityStatus +"'";
        }

        var plannedWorkFlag = 0;

        if(plannedWork == "All"){
            plannedWorkFlag = 1;
        }else if (fluidityStatusFlag == 1){
            plannedWork = "WHERE planned_work" + plannedWork;
        }else{
            plannedWork = " OR planned_work" + plannedWork;
        }

        var priorityScoreFlag = 0;

        if(priorityScore.length < 1){
            priorityScoreFlag = 1;
            priorityScore = "";
        }else if (fluidityStatusFlag == 1){
         priorityScore = "WHERE priority_description IN (" + priorityScore + ")";
        }else{
         priorityScore = " OR priority_description IN (" + priorityScore + ")";
        }

        var skillsFilterFlag = 0;

        if(skillsFilter.length < 1){
            skillsFilterFlag = 1;
            skillsFilter = "";
        }else if (priorityScoreFlag == 1){
            skillsFilter = "WHERE primary_skill IN (" + skillsFilter + ")";
        }else{
            skillsFilter = " OR primary_skill IN (" + skillsFilter + ")";
        }

        var oucSelectionFlag = 0;

        if(oucSelection == ""){
            oucSelectionFlag = 1;
        }else if (skillsFilterFlag == 1){
            oucSelection = "WHERE OM_OUC= '" + oucSelection +"'";
        }else{
            oucSelection = " OR OM_OUC= '" + oucSelection +"'";
        }*/

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
            url: '/mapRerender',
            success: function (data) {

            }
        });

    });
});