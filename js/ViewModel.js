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
    const allInfoWindows = [];
    self.cities = ko.observableArray([]);
    self.cities.push('all');
    
    self.selected = ko.observable();
    
    selected.subscribe(value => {
      self.setShowCity(value);
    });
    
    ko.utils.arrayForEach(self.companyList(), eachCompany => {
      const marker = eachCompany.marker;
      allMarkers.push(marker);
      allInfoWindows.push(eachCompany.infoWindow);
      
      // push city
      const city = eachCompany.city();
      
      if (self.cities.indexOf(city) < 0) {
        self.cities.push(city);
      }
      
      
      marker.addListener('click', function(e) {
        // Pan to company selected
        self.panToCompany(eachCompany);
        self.generateStockInfo(eachCompany);
      });
    });
    
    
    // Reset to initial state
    google.maps.event.addListener(map, 'zoom_changed', () => {
      if (map.getZoom() === 10) {
        self.hideStockInfo(true);
        self.selectedCompany(self.companyList()[0]);
        allMarkers.forEach(marker => {
          marker.setOpacity(1);
        });
      }
    });
    
    
    
    
    // click event handlers
    
    // currentCompany indicates which company's address to be shown,
    // not to mistaken with selectedCompany
    self.currentCompany = undefined;
    
    self.toggleDetails = target => {
      self.currentCompany = self.currentCompany === target ? undefined : target;
      ko.utils.arrayForEach(self.companyList(), (eachCompany) => {
        eachCompany.showDetails(eachCompany === self.currentCompany);
      });
    };
    
    // selectedCompany indicates which company to pan to
    
    self.selectedCompany = ko.observable(self.companyList()[0]);
    
    self.panToCompany = company => {
      // Set up marker opacity change
      self.selectedCompany(company);
      const marker = company.marker;

      marker.setOpacity(1);
      
      allMarkers.forEach(otherMarker => {
        if (otherMarker !== marker) {
          otherMarker.setOpacity(0.4);
        }
      });
      
      allInfoWindows.forEach(otherInfoWindow => {
        if (otherInfoWindow !== company.infoWindow) {
          otherInfoWindow.close();
        }
      });
      
      // Pan to company location
      const loc = company.loc();
      
      map.panTo({
        lat: loc.lat - 0.002,
        lng: loc.lng,
      });
      
      smoothZoomIn(map.getZoom(), 15, function() {
        company.infoWindow.open(map, company.marker);
      });
    };
    
    
    // Stock Info module
    
    self.hideStockInfo = ko.observable(true);
    
    self.closeStockInfo = () => {
      self.hideStockInfo(true);
    }
    
    self.generateStockInfo = company => {
      
      const errorHandle = e => {
        console.log(e);
        self.hideStockInfo(false);
      }
      
      const handleData = data => {
        console.log(data);
        self.hideStockInfo(false);
      }
      
      
      // `getStock` method is defined in va.js  
      getStock(company.symbol())
      .then(data => {
        // not necessarily juice, could contain parameter-related error
        if (data['Error Message']) {
          errorHandle(new Error(data['Error Message']));
        } else {
          handleData(data);
        }
      }).catch(e => {
        // it could be the network or server, let's handle it either way
        errorHandle(e);
      })
      ;
    }
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
