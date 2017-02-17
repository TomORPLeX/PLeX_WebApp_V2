$("form1").ready(function() {

    var plannermessage0 = document.getElementById("plannermessagep").innerHTML;
    //alert('innerHTML :'+plannermessage0);
    if (plannermessage0 != "test message") {
        $("#MessageDialog").dialog({
            buttons: {
                "Close": function () {
                    $(this).dialog("close");
                }
            },
            title: "Updated Case Values",
            width: "auto",
            height: "auto"
        });
    }
});