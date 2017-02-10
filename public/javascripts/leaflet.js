
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

$(document).ready(function() {

    var LonLatData;
    var temp = getCookie('EIN');
    var tempfilelocation = './data/' +temp+'_LatLngData.json';
    L.map('mapid').remove();
    var tempLatLonCook = getCookie('latLonCook');
    var tempScaleCook = getCookie('scale');
    var n = tempLatLonCook.indexOf(",");
    var tempLat= tempLatLonCook.substring(7, n);
    var tempLon= tempLatLonCook.substring(n+1, tempLatLonCook.length-1);
    var tempScale= tempScaleCook.substring(0,tempScaleCook.length);
    var lat = Number(tempLat);
    var lon = Number(tempLon);
    var scale = Number(tempScale);

    var mymap = L.map('mapid').setView([54.00011, 0.00001], 5);

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibnNwbGV4IiwiYSI6ImNpd2VwcWp5azAwYTYyems0YjJ3eW90Y2sifQ.l_f-I_QjwU25BMyQyfNphg', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.streets',
        accessToken: 'pk.eyJ1IjoibnNwbGV4IiwiYSI6ImNpd2VwcWp5azAwYTYyems0YjJ3eW90Y2sifQ.l_f-I_QjwU25BMyQyfNphg'
    }).addTo(mymap);

    $.getJSON(tempfilelocation, function (data) {
        LonLatData = data;
        var markers = new L.MarkerClusterGroup();

        for (i = 0; i < LonLatData.LatLngData.length; i++) {

            if (LonLatData.LatLngData[i].LAT !== null){
            var marker = L.marker([LonLatData.LatLngData[i].LAT, LonLatData.LatLngData[i].LON]);
            marker.bindPopup("<b>Skill: </b><br>" + LonLatData.LatLngData[i].PRIMARY_SKILL +
                    "<br><b>Type: </b><br>" + LonLatData.LatLngData[i].JOBDESCRIPTION + " " + LonLatData.LatLngData[i].SUB_DESCRIPTION +
                    "<br><b>Case Status: </b><br>" + LonLatData.LatLngData[i].CASE_STATUS +
                    "<br><b>Priority: </b><br>" + LonLatData.LatLngData[i].web_system_defined_priority +
                    "<br><b>Exchange: </b><br>" + LonLatData.LatLngData[i].EXCHANGE +
                    "<br><b>Case ID: </b><br>" + LonLatData.LatLngData[i].CASE_ID +
                    "<br><b>Estimate: </b><br><a href = http://10.187.148.18/ewocs2a/JobFlowPages/JobFlow/tabid/115/language/en-GB/Default.aspx?caseid="+ LonLatData.LatLngData[i].CASE_OBJID + "&queueid="+ LonLatData.LatLngData[i].QUEUE_ID +"#no-back-button target =\"_blank\"> "+ LonLatData.LatLngData[i].ESTIMATENUMBER+ "</a>"
            ).openPopup();
            markers.addLayer(marker);
            }else{
                continue;
            }
        }
        mymap.addLayer(markers);
       mymap.setView([lat, lon], scale);
    });

    document.getElementById("button").addEventListener("click", function(e) {
        var latLonCook;
        var scaleCook;

        latLonCook =mymap.getCenter();
        scaleCook =mymap.getZoom();
        //alert(latLonCook);
        document.cookie = "latLonCook=" + latLonCook;
        document.cookie = "scale=" + scaleCook;
    });
});
