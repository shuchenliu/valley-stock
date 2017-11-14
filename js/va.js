// Simple wrapper around the Alpha Vantage stock price API  
const getLastMinuteStock = symbol => {
  const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=1min&apikey=J1DTQRI3GZ8PKZ8K`;
  
  // network test
  //const url = 'https://httpstat.us/500';
  return fetch(url).then(r => {
    // Something in the json at least
    if(r.ok) {
      return r.json();
    }
    // any response that is not [200,299]
    throw new Error(r.statusText);
  }).catch(e => {
    //network error
    throw e;
  });
}

const getLastDayStock = symbol => {
  const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=J1DTQRI3GZ8PKZ8K`;
  
  // network test
  //const url = 'https://httpstat.us/500';
  return fetch(url).then(r => {
    // Something in the json at least
    if(r.ok) {
      return r.json();
    }
    // any response that is not [200,299]
    throw new Error(r.statusText);
  }).catch(e => {
    //network error
    throw e;
  });
}


