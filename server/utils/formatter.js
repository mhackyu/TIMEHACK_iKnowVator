const dateFormat = require('date-fns/format');

module.exports = {
  toCurreny: data => data.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'),
  toDate: data => {
    return dateFormat(data, 'MMM DD, YYYY');
  }
};
