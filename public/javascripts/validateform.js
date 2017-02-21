function validateForm() {
    var ein1 = document.forms["form1"]["engein"].value;
    var ein2 = document.forms["form1"]["engein2"].value;
    var ein3 = document.forms["form1"]["engein3"].value;
    var ein4 = document.forms["form1"]["engein4"].value;
    var ein5 = document.forms["form1"]["engein5"].value;
    var ein6 = document.forms["form1"]["engein6"].value;
    //alert('ein1 :'+ein1 +' len :'+ein1.length);
    if (!(ein1.length == 9 || ein1.length == 0)) {
        alert("Please Enter 9 Digit EIN For Eng 1");
        return false;
    }
    if (!(ein2.length == 9 || ein2.length == 0)) {
        alert("Please Enter 9 Digit EIN For Eng 2");
        return false;
    }
    if (!(ein3.length == 9 || ein3.length == 0)) {
        alert("Please Enter 9 Digit EIN For Eng 3");
        return false;
    }
    if (!(ein4.length == 9 || ein4.length == 0)) {
        alert("Please Enter 9 Digit EIN For Eng 4");
        return false;
    }
    if (!(ein5.length == 9 || ein5.length == 0)) {
        alert("Please Enter 9 Digit EIN For Eng 5");
        return false;
    }
    if (!(ein6.length == 9 || ein6.length == 0)) {
        alert("Please Enter 9 Digit EIN For Eng 6");
        return false;
    }
}