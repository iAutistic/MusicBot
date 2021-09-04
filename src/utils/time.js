const moment = require("moment");

async function getFormattedDate(dateString) {
  var date = moment(dateString).format("h:mm:ss");
  return date.toString();
}

module.exports = getFormattedDate;
