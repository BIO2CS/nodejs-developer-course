const request = require("request");

const geocodeAddress = (address, callback) => {
  const encodedAddress = encodeURIComponent(address);

  request({
    url: `http://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
    json: true
  }, (err, response, body) => {
      if (err) {
        callback("Unable to connect to Google server");
      } else if (body.status === "ZERO_RESULTS") {
        callback("Unable to find that address");
      } else if (body.status === "OK") {
        const result = {
          address: body.results[0].formatted_address,
          latitude: body.results[0].geometry.location.lat,
          longitude: body.results[0].geometry.location.lng
        }
        callback(undefined, result);
      }
    }
  );
}

module.exports = {
  geocodeAddress
};
