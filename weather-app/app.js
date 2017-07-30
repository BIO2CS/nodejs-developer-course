const yargs = require("yargs");

const geocode= require("./geocode/index");
const weather = require("./weather/index");

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

var latitude;
var longitude;

geocode.geocodeAddress(argv.address, (errorMessage, results) => {
  if (errorMessage) {
    console.log(errorMessage);
  } else {
    latitude = results.latitude;
    longitude = results.longitude;
    console.log(JSON.stringify(results, undefined, 2));
    weather.getWeather(latitude, longitude, (errorMessage, results) => {
      if (errorMessage) {
        console.log(errorMessage);
      } else {
        console.log(JSON.stringify(results, undefined, 2));
      }
    });
  }
});

//forecast key: 08a117056804c7599df57bd360bb26ab
