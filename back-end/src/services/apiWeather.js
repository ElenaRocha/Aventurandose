const fetch = require("node-fetch");

var weather = {
  getWeather: async function (lat, lon) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.API_KEY}&units=metric`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((json) => {
        res.send(json);
      })
      .catch((err) => new Error("Error en la petición a la API", err));
  },
};

module.exports = weather;
