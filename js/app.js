let map;
function initMap(){
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 37.5242092, lng: -122.254427},
    zoom: 10,
    maxZoom: 13,
    minZoom: 10,
    zoomControl: true,
    mapTypeControl: false,
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
  
  companies.forEach(company => {
    const icon = {
      url: company.icon.url,
      scaledSize: new google.maps.Size(company.icon.width, company.icon.height),
    };
    
    const marker = new google.maps.Marker({
      map: map,
      position: company.loc,
      title: company.name,
      icon: icon,
    });
  });
};