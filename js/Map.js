let map;

// Module that smooths the zoom-in process 
// when a company is selected


const initMap = function(){
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 37.6106427, lng: -122.4478837},
    zoom: 10,
    maxZoom: 15,
    minZoom: 10,
    zoomControl: true,
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: false,
    styles: [
        {
            "stylers": [
                {
                    "visibility": "on"
                },
                {
                    "saturation": -100
                },
                {
                    "gamma": 0.54
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "labels.icon",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "water",
            "stylers": [
                {
                    "color": "#4d4946"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "labels.icon",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "labels.text",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#ffffff"
                }
            ]
        },
        {
            "featureType": "road.local",
            "elementType": "labels.text",
            "stylers": [
                {
                    "visibility": "simplified"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#ffffff"
                }
            ]
        },
        {
            "featureType": "transit.line",
            "elementType": "geometry",
            "stylers": [
                {
                    "gamma": 0.48
                }
            ]
        },
        {
            "featureType": "transit.station",
            "elementType": "labels.icon",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "gamma": 7.18
                }
            ]
        }
    ],
  });
  

  
  google.maps.event.addListener(map, 'zoom_changed', () => {
    if (map.getZoom() === 10) {
      markers.forEach(marker => {
        marker.setOpacity(1);
      });
    }
  });
  
};