/* MAP set up */
// fs = require('fs');



//var LonLatData = fs.readFileSync ("./data/LatLngData.json");


    //console.log("in map update");
    //console.log("fs");
$(document).ready(function() {

    var LonLatData;
    //alert(db.length);

    $.getJSON('./data/LatLngData.json', function (data) {
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


/*module.exports = {

   leaf:  function () {

       var LonLatData;

       $.getJSON('./data/LatLngData.json', function (data) {
           alert('hello');
           LonLatData = data;
           alert(JSON.stringify(LonLatData));


           var mymap = L.map('mapid').setView([51, 0], 5);

           L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibnNwbGV4IiwiYSI6ImNpd2VwcWp5azAwYTYyems0YjJ3eW90Y2sifQ.l_f-I_QjwU25BMyQyfNphg', {
               attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
               maxZoom: 18,
               id: 'mapbox.streets',
               accessToken: 'pk.eyJ1IjoibnNwbGV4IiwiYSI6ImNpd2VwcWp5azAwYTYyems0YjJ3eW90Y2sifQ.l_f-I_QjwU25BMyQyfNphg'
           }).addTo(mymap);


           var jobNo = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22];

           var markers = new L.MarkerClusterGroup();

           for (i = 0; i < LonLatData.length; i++) {

               var marker = L.marker(LonLatData[i]);
               marker.bindPopup("<b>Case Number</b><br>" + jobNo[i]).openPopup();
               markers.addLayer(marker);
           }
           mymap.addLayer(markers);
       });
   }
};*/