const request = require("request");

var geocodeAddress = (address) => {
  return new Promise((resolve, reject) => {
    request({
      url: `http://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}`,
      json: true
    }, (error, response, body) => {
      if (error) {
        reject("Unable to connect to Google server");
      } else if (body.status === "ZERO_RESULTS") {
        reject("Unable to find that address");
      } else if (body.status === "OK") {
        const result = {
          address: body.results[0].formatted_address,
          latitude: body.results[0].geometry.location.lat,
          longitude: body.results[0].geometry.location.lng
        }
        resolve(result);
      }
    });
  });
}

geocodeAddress("95014").then((result) => {
  console.log("Successfully got address information ", JSON.stringify(result, undefined, 2));
}, (errorMessage) => {
  console.log("Error occurred", errorMessage);
});
