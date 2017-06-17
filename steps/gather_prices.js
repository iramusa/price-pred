var fs = require('fs');
var config = require('../config.js');
var utils = require('../utils.js');

module.exports.extractPrices = function(flight, weeks){
  if(typeof FR === 'undefined' || !FR || !FR.flightData) { return "FR or FR.flightData missing! Has Ryanair changed their JS?"; }

  var isRegularFlight = function(el, idx) { return idx % 2 == 0; }
  var priceData = [];
  var trips = [
    {from: flight.origin.iata, to: flight.destination.iata},
    {from: flight.destination.iata, to: flight.origin.iata}
  ];

  for(week = 0; week < weeks; week++) {
    for(i = 0; i < trips.length; i++) {
      $.ajax("https://www.bookryanair.com/SkySales/Select-resource.aspx", {
        data: {action: "SelectInput$LinkButtonNext"+(i+1)},
        async: false,
        method: "POST",
        success: function(data){
          flightCode = trips[i].from + trips[i].to;
          FR.flightData[flightCode] = FR.flightData[flightCode].concat(data[flightCode]);
        }
      });
    }
  }

  trips.forEach(function(trip) {
    FR.flightData[trip.from+trip.to].forEach(function(day) {
      day[1].filter(isRegularFlight).forEach(function(flight) {
          priceData.push({
            date: day[0],
            origin: trip.from,
            destination: trip.to,
            flightNumber: flight[2],
            departure: flight[3][0].join(' '),
            arrival: flight[3][1].join(' '),
            price: flight[4].ADT[1].FarePrice
          });
        });
      });
    });

  return priceData;
};

module.exports.savePriceData = function(priceData, priceFileName) {
  var rows = priceData.map(function(price) {
    return config.columns.map(function(col) {
      return price[col.field];
    }).join(',');
  });

  if(rows.length > 0) {
    fs.appendFileSync(priceFileName, rows.join("\n")+"\n");
  }
};
