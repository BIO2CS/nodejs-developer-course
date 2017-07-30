const yargs = require("yargs");
const axios = require("axios");

const argv = yargs
  .option({
    a: {
      alias: "address",
      describe: "Address to fetch weather for",
      demand: true,
      string: true
    }
  })
  .help()
  .alias("h", "help")
  .argv;

var address = encodeURIComponent(argv.address);
var geoCodeUrl = `http://maps.googleapis.com/maps/api/geocode/json?address=${address}`;

axios.get(geoCodeUrl).then((response) => {
  if (response.data.status === "ZERO_RESULTS") {
    throw new Error("Unable to find that address");
  }

  const lat = response.data.results[0].geometry.location.lat;
  const lng = response.data.results[0].geometry.location.lng;
  console.log(response.data.results[0].formatted_address);

  const weatherUrl = `https://api.darksky.net/forecast/08a117056804c7599df57bd360bb26ab/${lat},${lng}`;
  return axios.get(weatherUrl);
}).then(response => {
  const temperature = response.data.currently.temperature;
  const apparentTemperature = response.data.currently.temperature;
  console.log(`It's currently ${temperature}. It feels like ${apparentTemperature}.`);
})
.catch(e => {
  if (e.code === "ENOTFOUND") {
    console.log("Unable to connect to API servers");
  } else {
    console.log(e.message);
  }
});

//forecast key: 08a117056804c7599df57bd360bb26ab
