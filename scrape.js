var fs = require('fs');
var Nightmare = require('nightmare');
var bunyan = require('bunyan');
var config = require('./config.js');
var utils = require('./utils.js');
var pickJourney = require('./steps/pick_journey.js');
var gatherPrices = require('./steps/gather_prices.js');

var log = bunyan.createLogger({name: 'scrape_ryanair', streams: [{path: 'scrape_ryanair.log'}]});
var scrapeDate = Date.now();
var priceFileName = utils.csvFileName(scrapeDate);
console.log("Price file: " + priceFileName);

process.on('exit', function(code) {
  console.log("Exiting with code: "+code);
  if(code == config.errorCode && fs.existsSync(priceFileName)) {
    fs.unlinkSync(priceFileName);
  }
});

var scrapeLoop = function(journey, attempt) {
  var error = false;
  var logData = {
    attempt: attempt,
    origin: journey.flight.origin.iata,
    destination: journey.flight.destination.iata
  };

  var nightmare = new Nightmare();
  nightmare
    .useragent("Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/43.0.2357.130 Safari/537.36")
    .viewport(1366, 768)
    .goto('http://www.ryanair.com')
    .wait()
    .screenshot("test.png")
    .use(pickJourney.selectAirport("origin", journey.flight.origin))
    .use(pickJourney.selectAirport("destination", journey.flight.destination))
    .use(pickJourney.selectDate(".datepicker-flight-from-trigger", journey.departureDate))
    .use(pickJourney.selectDate(".datepicker-flight-to-trigger", journey.returnDate))
    .click("form#flight-booking-form button[type=submit]")
    .wait()
    .wait(20000+Math.round(Math.random*20000))
    .screenshot("test.png")
    .evaluate(gatherPrices.extractPrices, function(priceData) {
      if(typeof priceData === 'string') {
        error = true;
        log.error(logData, priceData);
        if(attempt >= config.retries) {
          log.error(logData, "All scraping attempts failed!");
          process.exit(config.errorCode);
        }
      } else {
        priceData.forEach(function(price) { price.scrapeDate = scrapeDate; });
        gatherPrices.savePriceData(priceData, priceFileName);
      }
    }, journey.flight, config.weeks)
    .run(function(err, nightmare){
      if(err) {
        log.error(logData, err.message);
        error = true;
      }
      if(error && attempt < config.retries) {
        scrapeLoop(journey, attempt+1);
      } else if(error) {
        log.error(logData, "All scraping attempts failed!");
        process.exit(config.errorCode);
      }
    });
};
var scrape = function(journey) { scrapeLoop(journey, 0); };

if(!fs.existsSync(priceFileName)) {
  var columnLine = config.columns.map(function(col) { return col.column; }).join(',');
  fs.writeFileSync(priceFileName, columnLine+"\n");

  journeyInfo = config.journeys.map(function(j) {
      return {
        origin: j.flight.origin.iata,
        destination: j.flight.destination.iata,
        depart_from: j.departureDate,
        return_from: j.returnDate
      };
  });
  log.info({journeys: journeyInfo}, "Scraping");
  config.journeys.forEach(scrape);
}
