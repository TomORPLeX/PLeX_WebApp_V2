document.getElementById("addeng").onclick = function ()
{
    // on click
    //Increment engcount
    // Then reload engrows div

    alert('hello!');

    $("#engrows").append(""+
        "<div class=\"form-group row\" id=\"engrow2\">"+
        "<div class=\"form-group col-md-3\">"+
"<input style=\"padding: 0px\" type=\"number\" class=\"form-control\" name=\"engein\" value=\"<%=formvalues.engein%>\">"+
    "</div>"+

"<div class=\"form-group col-md-2\">"+
"<select name=\"tasknum\" class=\"form-control\">"+
"<option value=\"\" selected><em>Select From List</em></option>"+
"<option value=\"1\"><em>1</em></option>"+
"<option value=\"2\"><em>2</em></option>"+
"<option value=\"3\"><em>3</em></option>"+
"<option value=\"4\"><em>4</em></option>"+
"<option value=\"5\"><em>5</em></option>"+
"<option value=\"6\"><em>6</em></option>"+
"</select>"+
"</div>"+

"<div class=\"form-group col-md-2\">"+
"<select name=\"traveltime\" class=\"form-control\">"+
"<option value=\"\" selected><em>Select From List</em></option>"+
"<option value=\"10\" ><em>10</em></option>"+
"</select>"+
"</div>"+

"<div class=\"form-group col-md-2\" id=\"randomdiv\">"+
"<select name=\"eodtravel\" class=\"form-control\">"+
"<option style=\"padding: 0px\" value=\"\" selected><em>Select From List</em></option>"+
"<option style=\"padding: 0px\" value=\"10\"><em>10</em></option>"+
"    </select>"+
"</div>"+

"<div class=\"form-group col-md-2\">"+
"<input type=\"text\" class=\"auto-kal\" data-kal=\"mode: 'multiple', months: 1, direction: 'future', blackout: function(date) { var today = new Date(); today.getDate(); var plus30 = today.setMonth(today.getMonth()+1); return date > plus30}\" name=\"dates\">"+
"    </div>"+

"</div>"

    );

//$("#engrows").load("planner #engrows");

};