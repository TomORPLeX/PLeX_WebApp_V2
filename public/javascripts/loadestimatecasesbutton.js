document.getElementById("getcasesbutton").onclick = function () {
    var estimate2 = document.getElementById('estimate').value;
    var obj = {'estimate': estimate2};

    if (estimate2.length > 6) {
        $.ajax({
            type: 'POST',
            data: JSON.stringify(obj),
            contentType: 'application/json',
            url: '/queryestimatecases',
            success: function (data) {
                var mulSelect = document.getElementById('cases');
                var numcases = Object.keys(data).length;
                if (casesLoadedFlag == 0) {
                    for (var i = 0; i < numcases; i++) {
                        var opt = document.createElement('option');
                        opt.appendChild(document.createTextNode(data[i].CASE_ID));
                        opt.value = data[i].CASE_ID;
                        mulSelect.appendChild(opt);
                    }
                    casesLoadedFlag = 1;
                }
            }
        });
    }
};