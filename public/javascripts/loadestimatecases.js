$( "#estimate" ).keyup(function() {

    var estimate2 = document.getElementById('estimate').value;

    //alert('EWOC Estimate: ' +estimate2 +', length: ' +estimate2.length);
    //alert('key pressed');

    var obj = {'estimate': estimate2};

    if(estimate2.length > 5) {
        $.ajax({
            type: 'POST',
            data: JSON.stringify(obj),
            contentType: 'application/json',
            url: '/queryestimatecases',
        });
    }

});