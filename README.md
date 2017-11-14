## Valley-Stock

Valley Stock is a simple web app that conveniently tracks Silicon Vally public companies' stock prices in real time.

### How

1. Run locally   
 i) 
 > git   clone https://github.com/shuchenliu/valley-stock.git  
 > cd   valley-stock
 
  ii) open `index.html` with any modern browser.  
  
  **Or you can:** 
2. Visit [Vally Stock](https://shuchenliu.github.io/valley-stock) , which is publicly hosted via Github.io.

### What

1.  There are **9** companies from **6** valley cities currently covered by Valley-Stock.
2. The app offers a search-selection filter, which could be easily used to filter out target companies by city.
3. Each marker is customized using company logo and is placed on the map where the company headquarter is located.
4. When a company's marker or listing is clicked, map will automatically zoom in and pan to the marker and stock price tracker will appear.
5. The tracker contains 2 types of prices repectively from last trading day and last trading minute.

!["The snapshot"](https://github.com/shuchenliu/valley-stock/blob/master/snapshot.png?raw=true)

### Dependency
[**Google Maps JavaScipt API**](https://developers.google.com/maps/documentation/javascript/tutorial) v3.30

[**Semantic UI**](https://github.com/Semantic-Org/Semantic-UI) v2.2.12

[**jQUery**](https://jquery.com/) v3.2.1 (for Semantic UI use only)

[**Alpha Vantage API**](https://www.alphavantage.co/documentation/)

### Known Issues
The `Alpha Vantage` API will sometimes:       
	1. throw `invalid paramter error` even if all parameters provided are valid **and/or**  
	2. return empty json even if API call has been properly issued.

These errors are handled. Please check browser console when encountered for more info.

### Future Development
1. Add interactive charts using `D3` or `HighCharts`
2. Rewrite application using `ReactJS`.
