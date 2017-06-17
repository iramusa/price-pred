var utils = require('../utils.js');

var markMonth = function(month) {
  var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  var withText = function(text) {
    return function(idx, el) { return el.textContent == text; };
  };

  $(".datepicker .datepicker-months td .month").filter(withText(months[month].toString())).attr('data-hook', "flight-date-selected");

  return {
    month_elems: $('.datepicker .month[data-hook=flight-date-selected]').length,
    month: month,
  };
};
var markDay = function(day) {
  var withText = function(text) {
    return function(idx, el) { return el.textContent == text; };
  };

  $(".datepicker .datepicker-days td.day:not('.disabled')").filter(withText(day.toString())).attr('data-hook', "flight-date-selected");

  return {
    day_elems: $('.datepicker .day[data-hook=flight-date-selected]').length,
    day: day
  };
};

module.exports.selectDate = function(datepickerTrigger, flightDate) {
  return function(nightmare) {
    nightmare
      .click(datepickerTrigger)
      .evaluate(markMonth, utils.noop, flightDate.getMonth())
      .click('.datepicker .month[data-hook=flight-date-selected]')
      .evaluate(markDay, utils.noop, flightDate.getDate())
      .click('.datepicker .day[data-hook=flight-date-selected]');
  };
};

module.exports.selectAirport = function(directionType, direction) {
  var inputName = null;
  switch(directionType) {
    case "origin": inputName = "fromAirportName"; break;
    case "destination": inputName = "toAirportIATA"; break;
    default:
      throw new Error("Incorrect type value in selectAirport");
  };
  return function(nightmare) {
    nightmare
      .click("input[name="+inputName+"]")
      .click(".country-selector-item#"+direction.countryCode)
      .click(".airport-selector-item[data-name='"+direction.airport+"']");
  };
};

