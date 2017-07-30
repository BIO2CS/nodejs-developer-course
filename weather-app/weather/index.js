const request = require("request");

const getWeather = (latitude, longitude, callback) => {
  var url = `https://api.darksky.net/forecast/08a117056804c7599df57bd360bb26ab/${latitude},${longitude}`;
  request({
    url: url,
    json: true
  }, (error, response, body) => {
    if (error) {
      callback("Unable to connect to the forecast.io server");
    } else if (!error && response.statusCode === 200) {
      const result = {
        temperature: body.currently.temperature
      }
      callback(undefined, result);
    } else {
      callback("Unable to fetch weather");
    }
  })
}

module.exports = {
  getWeather
}
