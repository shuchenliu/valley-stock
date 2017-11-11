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
    
    // Markers handling
    const markers = [];
    
    ko.utils.arrayForEach(self.companyList(), eachCompany => {
      const marker = eachCompany.marker;
      markers.push(marker)
      
      marker.addListener('click', function(e) {
        // Pan to company selected
        self.panToCompany(eachCompany);
      });
    });
    
    
    
    // click event handlers
    self.currentCompany = undefined;
    
    self.toggleDetails = target => {
      self.currentCompany = self.currentCompany === target ? undefined : target;
      ko.utils.arrayForEach(self.companyList(), (eachCompany) => {
        eachCompany.showDetails(eachCompany === self.currentCompany);
      });
    }
    
    self.panToCompany = company => {
      // Set up marker opacity change
      const marker = company.marker;

      marker.setOpacity(1);
      markers.forEach(otherMarker => {
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
      
      smoothZoomIn(map.getZoom(), 15);
    }
    
};


/*
* End point of App, will be called after Google Map is loaded
*/
function startApp() {
    initMap();
    ko.applyBindings(ViewModel);
};
