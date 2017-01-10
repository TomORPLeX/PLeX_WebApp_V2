
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
};




$(document).ready(function() {

    var LonLatData;
    var temp = getCookie('EIN');
    var tempfilelocation = './data/' +temp+'_LatLngData.json';

    $.getJSON(tempfilelocation, function (data) {
        alert('hello');
        L.map('mapid').remove();
        LonLatData = data;
        alert(JSON.stringify(LonLatData.LatLngData));


    var mymap = L.map('mapid').setView([51, 0], 5);

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibnNwbGV4IiwiYSI6ImNpd2VwcWp5azAwYTYyems0YjJ3eW90Y2sifQ.l_f-I_QjwU25BMyQyfNphg', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.streets',
        accessToken: 'pk.eyJ1IjoibnNwbGV4IiwiYSI6ImNpd2VwcWp5azAwYTYyems0YjJ3eW90Y2sifQ.l_f-I_QjwU25BMyQyfNphg'
    }).addTo(mymap);



    var markers = new L.MarkerClusterGroup();

    for (i = 0; i < LonLatData.LatLngData.length; i++) {

        var marker = L.marker([LonLatData.LatLngData[i].LAT, LonLatData.LatLngData[i].LON]);
        marker.bindPopup("<b>Skill: </b><br>" + LonLatData.LatLngData[i].PRIMARY_SKILL +
                "<br><b>Type: </b><br>" + LonLatData.LatLngData[i].WT_DESCRIPTION + " " + LonLatData.LatLngData[i].SUB_DESCRIPTION +
                "<br><b>Case Status: </b><br>" + LonLatData.LatLngData[i].CASE_STATUS +
                "<br><b>Priority: </b><br>" + LonLatData.LatLngData[i].PRIORITY_DESCRIPTION +
                "<br><b>Exchange: </b><br>" + LonLatData.LatLngData[i].EXCH +
                "<br><b>Case ID: </b><br>" + LonLatData.LatLngData[i].CASE_ID +
                "<br><b>Estimate: </b><br>" + LonLatData.LatLngData[i].CUST_EST_NO
        ).openPopup();
        markers.addLayer(marker);
    }
    mymap.addLayer(markers);
    });
});
