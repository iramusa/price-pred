var CsvColumn = require('./utils.js').CsvColumn;

module.exports.weeks = 4;
module.exports.retries = 5;
module.exports.errorCode = 11;

module.exports.journeys = [
  {
    flight: {
      origin: {countryCode: "gb", airport: "Edinburgh", iata: "EDI"},
      destination: {countryCode: "es", airport: "Barcelona El Prat", iata: "BCN"}
    },
    departureDate: new Date(2017, 9, 20),
    returnDate: new Date(2017, 9, 27)
  }/*,
  {
    flight: {
      origin: {countryCode: "gb", airport: "Edinburgh", iata: "EDI"},
      destination: {countryCode: "es", airport: "Malaga", iata: "AGP"}
    },
    departureDate: new Date(2015, 9, 20),
    returnDate: new Date(2015, 9, 27)
  },
  {
    flight: {
      origin: {countryCode: "gb", airport: "Edinburgh", iata: "EDI"},
      destination: {countryCode: "pl", airport: "Poznan", iata: "POZ"}
    },
    departureDate: new Date(2015, 9, 12),
    returnDate: new Date(2015, 9, 19)
  },
  {
    flight: {
      origin: {countryCode: "gb", airport: "London Stansted", iata: "STN"},
      destination: {countryCode: "pl", airport: "Poznan", iata: "POZ"}
    },
    departureDate: new Date(2015, 9, 12),
    returnDate: new Date(2015, 9, 19)
  },
  {
    flight: {
      origin: {countryCode: "gb", airport: "Edinburgh", iata: "EDI"},
      destination: {countryCode: "pl", airport: "Gdansk", iata: "GDN"}
    },
    departureDate: new Date(2015, 9, 20),
    returnDate: new Date(2015, 9, 27)
  }*/
];

module.exports.columns = [
  new CsvColumn('check_date', 'scrapeDate'),
  new CsvColumn('from', 'origin'),
  new CsvColumn('to', 'destination'),
  new CsvColumn('flight_date', 'date'),
  new CsvColumn('departure_time', 'departure'),
  new CsvColumn('arrival_time', 'arrival'),
  new CsvColumn('flight_number', 'flightNumber'),
  new CsvColumn('price', 'price')
];
