function validateForm() {
    var ein1 = document.forms["form1"]["engein"].value;
    var ein2 = document.forms["form1"]["engein2"].value;
    var ein3 = document.forms["form1"]["engein3"].value;
    var ein4 = document.forms["form1"]["engein4"].value;
    var ein5 = document.forms["form1"]["engein5"].value;
    var ein6 = document.forms["form1"]["engein6"].value;

    var dates1 = document.forms["form1"]["dates"].value;
    var dates2 = document.forms["form1"]["dates2"].value;
    var dates3 = document.forms["form1"]["dates3"].value;
    var dates4 = document.forms["form1"]["dates4"].value;
    var dates5 = document.forms["form1"]["dates5"].value;
    var dates6 = document.forms["form1"]["dates6"].value;

    if(!((ein1.length == 9 && dates1.length > 0) || (ein1.length == 0))) {
        alert('Enter 9 digit EIN and Date for Eng 1');
        return false;
    }
    if(!((ein2.length == 9 && dates2.length > 0) || (ein2.length == 0))) {
        alert('Enter 9 digit EIN and Date for Eng 2');
        return false;
    }
    if(!((ein3.length == 9 && dates3.length > 0) || (ein3.length == 0))) {
        alert('Enter 9 digit EIN and Date for Eng 3');
        return false;
    }
    if(!((ein4.length == 9 && dates4.length > 0) || (ein4.length == 0))) {
        alert('Enter 9 digit EIN and Date for Eng 4');
        return false;
    }
    if(!((ein5.length == 9 && dates5.length > 0) || (ein5.length == 0))) {
        alert('Enter 9 digit EIN and Date for Eng 5');
        return false;
    }
    if(!((ein6.length == 9 && dates6.length > 0) || (ein6.length == 0))) {
        alert('Enter 9 digit EIN and Date for Eng 6');
        return false;
    }

}