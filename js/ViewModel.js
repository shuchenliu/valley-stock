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
        self.dailyDataLoaded(false);
        self.minuteDataLoaded(false);
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
      self.dailyDataLoaded(false);
      self.minuteDataLoaded(false);
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
    self.dailyDataLoaded = ko.observable(false);
    self.minuteDataLoaded = ko.observable(false);
    
    self.minuteData = ko.observable({data: {}});
    self.dailyData = ko.observable({data: {}});
    
    self.setData = (data, index) => {
      
      if (index === 0) {
        self.minuteData(data);
      } else {
        self.dailyData(data);
      }
    };
    
    self.closeStockInfo = () => {
      self.hideStockInfo(true);
    };
    
    self.generateStockInfo = company => {
      
      // index: 0 - 1-min trading interval
      // index: 1 - Daily
      
      // print error message
      const errorHandle = (e, index) => {
        console.log(e);
        self.setData({
          data: {
          
          },
          error: e.message,
        }, index);
        self.hideStockInfo(false);
      };
      
      //print data
      const handleData = (data, index) => {
        console.log(data);
        const handle = index === 0 ? 'Time Series (1min)' : 'Time Series (Daily)';
        
        let lastRefreshed = data['Meta Data']['3. Last Refreshed'];
        let originalTime = lastRefreshed;
        
        if (index === 1) {
          
          lastRefreshed = lastRefreshed.slice(0,10);
        }
        
        const lastPrice = data[handle][lastRefreshed];
        
        //console.log(lastMinutePrice);
        
        // Processing data fetched
        let newData = {};
        
        for (let prop in lastPrice) {
          const newKey = prop.slice(3);
          newData[newKey] = lastPrice[prop];
        }
        
        const dataPack = {
          data: newData,
          lastRefreshed: originalTime,
        };
        
        self.setData(dataPack, index);
        self.hideStockInfo(false);
      };
      
      
      // `getStock` methods are defined in va.js  
      
      getLastMinuteStock(company.symbol())
      .then(data => {
        // not necessarily juice, could contain parameter-related error
        if (data['Error Message']) {
          errorHandle(new Error(data['Error Message']), 0);
        } else {
          handleData(data, 0);
        }
      }).catch(e => {
        // it could be the network or server, let's handle it either way
        errorHandle(e, 0);
      }).then(() => {
        self.minuteDataLoaded(true);
      })
      ;
      
      
      getLastDayStock(company.symbol())
      .then(data => {
        // not necessarily juice, could contain parameter-related error
        if (data['Error Message']) {
          errorHandle(new Error(data['Error Message']), 1);
        } else {
          handleData(data, 1);
        }
      }).catch(e => {
        // it could be the network or server, let's handle it either way
        errorHandle(e, 1);
      }).then(() => {
        self.dailyDataLoaded(true);
      })
      ;
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

function handleMapError() {
  alert('Cannot connect to Google, please try again later');
};
