document.getElementById("addeng").onclick = function ()
{
    alert('hello!');
    var eincounter = 0;
    $("#engcontainer").append(""+
        "<p>Appended Content</p>"+
        "<%=eincounter %>"
        );
};