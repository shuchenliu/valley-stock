/*
* View - Model interaction that's gonna be handled by KnockoutJS
*/

const ViewModel = () => {
    const self = this;
    
    // load data into observableList
    self.companyList = ko.observableArray([]);
    companies.forEach(data => {
      self.companyList.push(new Company(data));
    });
    
    
    
    // Filter method
    self.showCity = ko.observable('all');
    
    
    self.filteredCompanyList = ko.computed(() => {
      if (self.showCity() == 'all') {
        return self.companyList();
      }
      
      return ko.utils.arrayFilter(self.companyList(), eachCompany => {
        return self.showCity() == eachCompany.city();
      });
    });
    
    
    
    
    self.setShowCity = city => {
      // Only update when necessary
      if (city == self.showCity()) {
        return;
      }
      
      self.showCity(city);
      
      
      // update markers
      ko.utils.arrayForEach(self.companyList(), eachCompany => {
        if (city == 'all' || city == eachCompany.city()) {
          eachCompany.marker.setMap(map);
        } else {
          eachCompany.marker.setMap(null);
        }
      });
    };
    
    
    
    // Markers handling
    const allMarkers = [];
    self.cities = ko.observableArray([]);
    self.cities.push('all');
    
    self.selected = ko.observable();
    
    selected.subscribe(value => {
      self.setShowCity(value);
    });
    
    ko.utils.arrayForEach(self.companyList(), eachCompany => {
      const marker = eachCompany.marker;
      allMarkers.push(marker);
      
      
      // push city
      const city = eachCompany.city();
      
      if (self.cities.indexOf(city) < 0) {
        self.cities.push(city);
      }
      
      
      marker.addListener('click', function(e) {
        // Pan to company selected
        self.panToCompany(eachCompany);
      });
    });
    
    
    google.maps.event.addListener(map, 'zoom_changed', () => {
      if (map.getZoom() === 10) {
        allMarkers.forEach(marker => {
          marker.setOpacity(1);
        });
      }
    });
    
    
    
    
    // click event handlers
    self.currentCompany = undefined;
    
    self.toggleDetails = target => {
      self.currentCompany = self.currentCompany === target ? undefined : target;
      ko.utils.arrayForEach(self.companyList(), (eachCompany) => {
        eachCompany.showDetails(eachCompany === self.currentCompany);
      });
    };
    
    
    self.panToCompany = company => {
      // Set up marker opacity change
      const marker = company.marker;

      marker.setOpacity(1);
      
      allMarkers.forEach(otherMarker => {
        if (otherMarker !== marker) {
          otherMarker.setOpacity(0.4);
        }
      });
      
      // Pan to company location
      const loc = company.loc();
      
      map.panTo({
        lat: loc.lat,
        lng: loc.lng + 0.005,
      });
      
      smoothZoomIn(map.getZoom(), 15, function() {
        company.infoWindow.open(map, company.marker);
      });
    };
    
};


/*
* End point of App, will be called after Google Map is loaded
*/
function startApp() {
    initMap();
    ko.applyBindings(ViewModel);
    
    // semantic-ui
    $('#search-select')
      .dropdown()
    ;
};
