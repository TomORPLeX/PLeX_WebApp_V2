$( "#estimate" ).keyup(function() {

    var estimate2 = document.getElementById('estimate').value;

    var obj = {'estimate': estimate2};

    if (estimate2.length > 6) {
        $.ajax({
            type: 'POST',
            data: JSON.stringify(obj),
            contentType: 'application/json',
            url: '/queryestimatecases',
            success: function () {
                //alert('Back In ClientSide (loadestimate)');
                $("#divcases").load("planner #divcases"); //reload div
            }
        });
    }
});