$(document).ready(function() {
    var skillsFilter = [];
    var y;

    $("#button").click(function () {
         skillsFilter = [];
         y=0;

        for (i = 0; i < 9; i++) {

            if ($("#filter" + i).is(":checked")) {

                skillsFilter[y] = "'"+ $('#filter' + i).attr('name'+i) + "'";
                y++;
            }
            else {

                continue;
            }
        }

    skillsFilter[y-1] = skillsFilter[y-1]+");";

        alert((skillsFilter.join()));
        $.ajax({
            type: 'POST',
            data: JSON.stringify(skillsFilter),
            contentType: 'application/json',
            url: '/mapRerender',
            success: function (data) {
                $("#mapid").load("#mapid", function(){
                    alert(data);
                });
            }
        });

    });
});