module.exports.CsvColumn = function(column, field) {
  this.column = column;
  this.field = field;
};

module.exports.csvFileName = function(scrapeDate) {
  dateString = new Date(scrapeDate).toISOString().slice(0, 10);
  return 'prices-'+dateString+'.csv';
}

module.exports.noop = function(x) { return x; };
