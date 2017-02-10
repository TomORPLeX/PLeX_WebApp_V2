document.getElementById("divcases").onclick = function ()
{
    var cases = $.map($("#cases option:selected"), function(el, i) {
        return $(el).text();
    });
    var estimatenum = document.getElementById('estimate').value;
    var numofcases = cases.length;
    var obj = {'cases': cases, 'estimatenum':estimatenum};
    //alert(cases +'\n'+'length: '+numofcases);

    if(numofcases==1) {
        alert(cases +'\n'+'length: '+numofcases);
        $.ajax({
            type: 'POST',
            data: JSON.stringify(obj),
            contentType: 'application/json',
            url: '/querycasedata',
            success: function (values) {
                alert(JSON.stringify(values));
                if(values.formvalues.dso != null){
                    document.getElementById("dso").checked = true;
                }
                if (values.formvalues.tmbooked != null){
                    document.getElementById("tmbooked").checked = true;
                }
                if (values.formvalues.keystonetask != null){
                    document.getElementById("keystonetask").checked = true;
                }
                if (values.formvalues.flagtofluidity != null){
                    document.getElementById("flagtofluidity").checked = true;
                }
                if (values.formvalues.skills != null){
                    console.log('in skills');
                    document.getElementById("addeditskill").value = values.formvalues.skills;
                }
                if(values.formvalues.starttime != null) {
                    document.getElementById("starttime").value = values.formvalues.starttime;
                }
                if(values.formvalues.finishtime != null) {
                    document.getElementById("finishtime").value = values.formvalues.finishtime;
                }
                if(values.formvalues.engein != null) {
                    document.getElementById("engein").value = values.formvalues.engein;
                }
                if(values.formvalues.tasknum != null) {
                    document.getElementById("tasknum").value = values.formvalues.tasknum;
                }
                if(values.formvalues.travel != null){
                    document.getElementById("traveltime").value = values.formvalues.travel;
                }
                if(values.formvalues.eodtravel != null){
                    document.getElementById("eodtravel").value = values.formvalues.eodtravel;
                }
                if(values.formvalues.dates != null){
                    document.getElementById("dates").value = values.formvalues.dates;
                }
                if(values.formvalues.engein2 != null) {
                    document.getElementById("engein2").value = values.formvalues.engein2;
                }
                if(values.formvalues.tasknum2 != null) {
                    document.getElementById("tasknum2").value = values.formvalues.tasknum2;
                }
                if(values.formvalues.travel2 != null){
                    document.getElementById("traveltime2").value = values.formvalues.travel2;
                }
                if(values.formvalues.eodtravel2 != null){
                    document.getElementById("eodtravel2").value = values.formvalues.eodtravel2;
                }
                if(values.formvalues.dates2 != null){
                    document.getElementById("dates2").value = values.formvalues.dates2;
                }
                if(values.formvalues.engein3 != null) {
                    document.getElementById("engein3").value = values.formvalues.engein3;
                }
                if(values.formvalues.tasknum3 != null) {
                    document.getElementById("tasknum3").value = values.formvalues.tasknum3;
                }
                if(values.formvalues.travel3 != null){
                    document.getElementById("traveltime3").value = values.formvalues.travel3;
                }
                if(values.formvalues.eodtravel3 != null){
                    document.getElementById("eodtravel3").value = values.formvalues.eodtravel3;
                }
                if(values.formvalues.dates3 != null){
                    document.getElementById("dates3").value = values.formvalues.dates3;
                }
                if(values.formvalues.engein4 != null) {
                    document.getElementById("engein4").value = values.formvalues.engein4;
                }
                if(values.formvalues.tasknum4 != null) {
                    document.getElementById("tasknum4").value = values.formvalues.tasknum4;
                }
                if(values.formvalues.travel4 != null){
                    document.getElementById("traveltime4").value = values.formvalues.travel4;
                }
                if(values.formvalues.eodtravel4 != null){
                    document.getElementById("eodtravel4").value = values.formvalues.eodtravel4;
                }
                if(values.formvalues.dates4 != null){
                    document.getElementById("dates4").value = values.formvalues.dates4;
                }
                if(values.formvalues.engein5 != null) {
                    document.getElementById("engein5").value = values.formvalues.engein5;
                }
                if(values.formvalues.tasknum5 != null) {
                    document.getElementById("tasknum5").value = values.formvalues.tasknum5;
                }
                if(values.formvalues.travel5 != null){
                    document.getElementById("traveltime5").value = values.formvalues.travel5;
                }
                if(values.formvalues.eodtravel5 != null){
                    document.getElementById("eodtravel5").value = values.formvalues.eodtravel5;
                }
                if(values.formvalues.dates5 != null){
                    document.getElementById("dates5").value = values.formvalues.dates5;
                }
                if(values.formvalues.engein6 != null) {
                    document.getElementById("engein6").value = values.formvalues.engein6;
                }
                if(values.formvalues.tasknum6 != null) {
                    document.getElementById("tasknum6").value = values.formvalues.tasknum6;
                }
                if(values.formvalues.travel6 != null){
                    document.getElementById("traveltime6").value = values.formvalues.travel6;
                }
                if(values.formvalues.eodtravel6 != null){
                    document.getElementById("eodtravel6").value = values.formvalues.eodtravel6;
                }
                if(values.formvalues.dates6 != null){
                    document.getElementById("dates6").value = values.formvalues.dates6;
                }

            },
            error: function (request, status, error) {
                window.location.replace("/error");
            }
        });


    } else {
        alert('Please select a single case to load the existing information');
    }

};