// MAP CODE
// Global : placeName
$(function() {
    console.log("LOCATION from Node -> Pug -> Script.js : " + placeName)
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
        [placeName, 39.1911,-106.8175],//when you made changes in the app.js to retrieve lat and lon, you can call them with variables like placeName, so for example placeLat and placeLon
    ];
                              
    // Display multiple markers on a map
    var infoWindow = new google.maps.InfoWindow(), marker, i;
    
    // Loop through our array of markers & place each one on the map  
    for( i = 0; i < markers.length; i++ ) {
        // console.log(infoWindowContent);
    //     
        var position = new google.maps.LatLng(markers[i][1], markers[i][2]);
        bounds.extend(position);
        marker = new google.maps.Marker({
            position: position,
            map: map,
            title: markers[i][0],
            url:markers[i][3]
        });
        
        // Allow each marker to have an info window    
        google.maps.event.addListener(marker, 'click', (function(marker, i) {

            var infoWindowContent = '<a href="'+markers[i][3]+'">'+markers[i][0]+'</a>';

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
        this.setZoom(11);
        google.maps.event.removeListener(boundsListener);
    });  
}
//END OF MAP CODE