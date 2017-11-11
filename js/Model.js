//utils
const parseLoc = str => {
  const locs = str.split(',');
  return {
    lat: parseFloat(locs[0]),
    lng: parseFloat(locs[1]),
  }
}


const smoothZoomIn = (currentZoom, targetZoom) => {
    		if (currentZoom < targetZoom) {
        		google.maps.event.addListenerOnce(map, 'zoom_changed', () => {
            		smoothZoomIn(currentZoom + 1, targetZoom);
            });
						setTimeout(() => {
            	map.setZoom(currentZoom + 1);
            },150);
        }
}

//KnockoutJS Model

class Company{
  constructor(data) {
    this.name = ko.observable(data.name);
    this.city = ko.observable(data.city);
    this.icon = ko.observable(data.icon);
    this.loc = ko.observable(data.loc);
    this.showDetails = ko.observable(false);
    
    
    
    // Create marker for each company
    const icon = {
      url: data.icon.url,
      scaledSize: new google.maps.Size(data.icon.width, data.icon.height),
    };
    
    this.marker = new google.maps.Marker({
      map: map,
      position: data.loc,
      title: data.name,
      icon: icon,
    });
  }
  
}


// Base data
const companies = [
  {
    name: 'Facebook',
    loc: parseLoc('37.4845242,-122.1486256'),
    icon : {
      url : './img/facebook.svg',
      width: 40,
      height: 40,
    },
    city: 'Menlo Park',
  },
  {
    name: 'Google',
    loc: parseLoc('37.4211918,-122.0867284'),
    icon : {
      url : './img/google.png',
      width: 40,
      height: 40,
    },
    city: 'Mountain View',
  },
  {
    name: 'Netflix',
    loc: parseLoc('37.2592759,-121.9631468'),
    icon : {
      url : './img/netflix.png',
      width: 55,
      height: 40,
    },
    city: 'Las Gatos',
  },
  {
    name: 'Apple',
    loc : parseLoc('37.331871, -122.029549'),
    icon : {
      url : './img/apple.png',
      width: 35,
      height: 40,
    },
    city: 'Cupertino',
  },
  {
    name: 'Cisco',
    loc : parseLoc('37.408402, -121.953682'),
    icon : {
      url : './img/cisco.png',
      width: 60,
      height: 40,
    },
    city: 'San Jose',
  },
  {
    name: 'Twitter',
    loc : parseLoc('37.776800, -122.416553'),
    icon : {
      url : './img/twitter.png',
      width: 60,
      height: 60,
    },
    city: 'San Francisco',
  },
  {
    name: 'Yelp',
    loc : parseLoc('37.786677, -122.399914'),
    icon : {
      url : './img/yelp.png',
      width: 90,
      height: 60,
    },
    city: 'San Francisco',
  },
  {
    name: 'Square',
    loc : parseLoc('37.775772, -122.418108'),
    icon : {
      url : './img/square.png',
      width: 30,
      height: 30,
    },
    city: 'San Francisco',
  },
  {
    name: 'Zynga',
    loc : parseLoc('37.770944, -122.403494'),
    icon : {
      url : './img/zynga.png',
      width: 40,
      height: 50,
    },
    city: 'San Francisco',
  },
];











