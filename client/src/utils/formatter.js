import dateFormat from 'date-fns/format';

export default {
  toCurreny: data => data.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'),
  toDate: data => {
    return dateFormat(data, 'MMM DD, YYYY');
  }
};
