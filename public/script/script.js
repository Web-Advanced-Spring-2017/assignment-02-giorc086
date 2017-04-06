(function() {
    let URL = "http://localhost:8080/api/resort";
    let searchField = document.querySelector('#search');
    let resortNames = [];
    let resultElement = document.querySelector('.results');

    //searches through the resort names from user input on keyup
    $('#search').keyup(function() {

        let key = $('#search').val(); //value inputed in search field
        let regEx = new RegExp(key, 'i');
        let newArray = [];

        if (key === '') {
            resultElement.innerHTML = '';
            return; //ends execution of function
        }
        for (let i = 0; i < resortNames.length; i++) {
            if (regEx.test(`${resortNames[i].resortName}`)) {
                newArray.push(resortNames[i]);
            } //else do nothing
        }
        console.log(newArray);
        resultElement.innerHTML = '';
        for (item of newArray) {
            let newLi = document.createElement('li'); //creates new li element in html
            newLi.innerText = item.resortName; //show name in li
            newLi.dataset.myCustomId = item.id; //add new data type to li tag with corresponding id
            resultElement.appendChild(newLi);
        }
        $('li').click(function(e) {
            let clickedResortId = $(this).attr('data-my-custom-id');

            $.ajax({
                    method: "GET",
                    url: "http://localhost:8080/api/resort/" + clickedResortId
                })
                .done(function(response) {
                    console.log(response);
                    $('#temp').text('temperature');
                    $('#temp').text('Temperature: ' + response.resortTemp);

                    $('#elevationTop').text('elevationTop');
                    $('#elevationTop').text('Elevation Top: ' + response.resortTerrain.terrain.elevationTop);

                    $('#elevationBase').text('elevationBase');
                    $('#elevationBase').text('Elevation Base: ' + response.resortTerrain.terrain.elevationBase);
                });
        });
    });
    $.ajax({
            method: "GET",
            url: URL
        })
        .done(function(response) {
            console.log(response); //logs the array
            resortNames = response;
            searchField.removeAttribute('disabled'); //enables input field when resorts are loaded
        });
})();

// MAP CODE
$(function() {
    // Asynchronously Load the map API 
    var script = document.createElement('script');
    script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyDaidSgjFzj8MV98T7-PFBwvnDwS56c4e0&callback=initialize";
    document.body.appendChild(script); //add map to body tag in html
});

function initialize() {
    var map;
    var bounds = new google.maps.LatLngBounds();
    var mapOptions = {
        mapTypeId: 'terrain'
    };

    // Display a map on the page
    map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
    map.setTilt(45);

    // Multiple Markers
    var markers = [
        ['Aspen', 39.1911, -106.8175, "aspen.html"],
        ['Vail', 39.6403, -106.3742],
        ['Keystone', 39.5792, -105.9347],
        ['Breckenridge', 39.4817, -106.0384],
        ['Beaver Creek', 39.6042, -106.5165],
        ['Arapahoe Basin', 39.6423, -105.8717],
        ['Copper Mountain', 39.5014, -106.1516],
        ['Monarch Mountain', 38.5114, -106.3330],
        ['Loveland', 39.6800, -105.8979],
        ['Eldora', 39.9372, -105.5827],
        ['Purgatory Resort', 37.6303, -107.8140],
        ['Snowmass', 39.1897, -106.9464]
    ];

    // Display multiple markers on a map
    var infoWindow = new google.maps.InfoWindow(),
        marker, i;

    // Loop through our array of markers & place each one on the map  
    for (i = 0; i < markers.length; i++) {
        // console.log(infoWindowContent);
        //     
        var position = new google.maps.LatLng(markers[i][1], markers[i][2]);
        bounds.extend(position);
        marker = new google.maps.Marker({
            position: position,
            map: map,
            title: markers[i][0],
            url: markers[i][3]
        });

        // Allow each marker to have an info window    
        google.maps.event.addListener(marker, 'click', (function(marker, i) {

            var infoWindowContent = '<a href="' + markers[i][3] + '">' + markers[i][0] + '</a>';

            return function() {


                infoWindow.setContent(infoWindowContent);
                infoWindow.open(map, marker);
                // window.location.href = this.url;
            }
        })(marker, i));

        // Automatically center the map fitting all markers on the screen
        map.fitBounds(bounds);
    }

    // Override our map zoom level once our fitBounds function runs (Make sure it only runs once)
    var boundsListener = google.maps.event.addListener((map), 'bounds_changed', function(event) {
        this.setZoom(7);
        google.maps.event.removeListener(boundsListener);
    });



}

//END OF MAP CODE
