document.getElementById("addeng").onclick = function ()
{
    alert('hello!');

    $("#engrows").append(""+
        "<div class=\"form-group row\" id=\"engrow2\">"+
        "<div class=\"form-group col-md-3\">"+
"<label for=\"EIN\">Enter Engineer EIN for Task</label><br><br>"+

"<input style=\"padding: 0px\" type=\"number\" class=\"form-control\" name=\"engein\" value=\"<%=formvalues.engein%>\">"+

    "</div>"+
"<div class=\"form-group col-md-2\">"+
"<label style=\"padding: 0px\" for=\"Profile\">Select Task Number</label>"+
"<select name=\"tasknum\" class=\"form-control\">"+
"<option value=\"\" selected><em>Select From List</em></option>"+
"    <option value=\"1\"><em>1</em></option>"+
"    <option value=\"2\"><em>2</em></option>"+
"    <option value=\"3\"><em>3</em></option>"+
"    <option value=\"4\"><em>4</em></option>"+
"    <option value=\"5\"><em>5</em></option>"+
"    <option value=\"6\"><em>6</em></option>"+
"</select>"+
"</div>"+

"<div class=\"form-group col-md-2\">"+
"<label style=\"padding: 0px\" for=\"Profile\">Travel To Next Task</label>"+
"<select name=\"traveltime\" class=\"form-control\">"+
"<option value=\"\" selected><em>Select From List</em></option>"+
"<option value=\"10\" ><em>10</em></option>"+
"</select>"+
"</div>"+

"<div class=\"form-group col-md-2\" id=\"randomdiv\">"+
"<label style=\"padding: 0px\" for=\"Profile\">EOD Travel<br><br></label>"+
"<select name=\"eodtravel\" class=\"form-control\">"+
"<option style=\"padding: 0px\" value=\"\" selected><em>Select From List</em></option>"+
"<option style=\"padding: 0px\" value=\"10\"><em>10</em></option>"+
"    </select>"+
"</div>"+

"<div class=\"form-group col-md-2\">"+
"<label style=\"padding: 0px\" for=\"EIN\" name=\"datewrap\">Select Planner Defined Date(s)</label>"+
"<input type=\"text\" class=\"auto-kal\" data-kal=\"mode: 'multiple', months: 1, direction: 'future', blackout: function(date) { var today = new Date(); today.getDate(); var plus30 = today.setMonth(today.getMonth()+1); return date > plus30}\" name=\"dates\">"+
"    </div>"+

"</div>"

    );

//$("#engrows").load("planner #engrows");

};