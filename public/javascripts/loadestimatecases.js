var casesLoadedFlag = 0;
$( "#estimate" ).keyup(function() {

    var estimate2 = document.getElementById('estimate').value;
    var obj = {'estimate': estimate2};

    if (estimate2.length > 7 && estimate2.length < 10) {
        $.ajax({
            type: 'POST',
            data: JSON.stringify(obj),
            contentType: 'application/json',
            url: '/queryestimatecases',
            success: function (data) {
                var mulSelect = document.getElementById('cases');
                var numcases = Object.keys(data).length;

                if (numcases == 0) {
                    alert('Invalid Estimate Number');
                }

                $('#cases').children().remove().end();

                    for (var i = 0; i < numcases; i++) {
                        var opt = document.createElement('option');
                        opt.appendChild(document.createTextNode(data[i].CASE_ID));
                        opt.value = data[i].CASE_ID;
                        mulSelect.appendChild(opt);
                    }

            },
            error: function () {
                alert('Invalid Estimate Number');
            }
        });
    }
});

$('span[name="noteicon"]').click(function () {
    var cases = $.map($("#cases option:selected"), function(el, i) {
        return $(el).text();
    });
    var id = $(this).attr('id');
    //alert(id);
    var engnum = id.substring(3,4);
    //alert(engnum);
    var ein;
    if (engnum == 1) {
        ein = document.getElementById("engein").value;
    } else {
        ein = document.getElementById("engein"+engnum).value;
    }
    //alert('engnum:'+engnum+' ein:'+ein);
    if(cases.length==1 && ein.length == 9){
        //alert('case and EIN legit');
        $("#note"+engnum+"dialog").dialog({
            buttons: {
                "Close": function () {
                    $(this).dialog("close");
                },
                "Submit": function() {
                    var note = $.trim($("#note"+engnum).val());
                    //alert(note);
                    var obj = {"note":note, "case":cases, "ein":ein};
                    // Insert notes into table
                    $.ajax({
                        type: 'POST',
                        data: JSON.stringify(obj),
                        contentType: 'application/json',
                        url: '/updatenotes',
                        success: function () {
                            $("#note"+engnum+"dialog").dialog("close");
                            $("#DeleteSuccessDialog").dialog({
                                buttons: {
                                    "Close": function () {
                                        $(this).dialog("close");
                                        if(note.length> 0 ){
                                            $("#eng"+engnum+"notes").removeClass().addClass('glyphicon\ glyphicon-file');
                                        } else {
                                            $("#eng"+engnum+"notes").removeClass().addClass('glyphicon\ glyphicon-plus');
                                        }
                                    }
                                },
                                title: "Updated Case Notes",
                                width: "250",
                                height: "150"
                            });
                        },
                        error: function () {
                            alert('Failed to update case notes, please try again');
                        }
                    });
                }
            },
            title: "Case Notes",
            width: "600",
            height: "400"
        });
    } else {
        alert('Invalid EIN or CASE_ID');
    }
});

