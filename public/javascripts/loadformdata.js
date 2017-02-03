document.getElementById("divcases").onclick = function ()
{
    var cases = $.map($("#cases option:selected"), function(el, i) {
        return $(el).text();
    });
    var numofcases = cases.length;
    var obj = {'cases': cases};
    //alert(cases +'\n'+'length: '+numofcases);

    if(numofcases==1) {
        alert(cases +'\n'+'length: '+numofcases);
        $.ajax({
            type: 'POST',
            data: JSON.stringify(obj),
            contentType: 'application/json',
            url: '/querycasedata',
            success: function () {
                //alert('Back In ClientSide (loadestimate)');
                $("#estimatecontainer").load("planner #estimatecontainer"); //reload div
                alert("ALL DONE!");
            },
            error: function (request, status, error) {
                window.location.replace("/error");
            }
        });


    } else {
        alert('Please select a single case to load the existing information');
    }

};