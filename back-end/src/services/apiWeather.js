const fetch = require("node-fetch");

var weather = async function (lat, lon) {
  try {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.API_KEY}&units=metric`;

    const rawWeather = await fetch(apiUrl);
    const weather = rawWeather.json();
    return weather;
  } catch (error) {
    console.log(error);
  }
};

module.exports = weather;
