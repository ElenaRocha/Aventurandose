require("dotenv").config();
const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("combined"));

app.all("/weather/:city", (req, res) => {
  const city = req.params.city;

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}&units=metric`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((json) => {
      res.render("weather", json);
    })
    .catch((err) => new Error("Error en la petición a la API", err));
});

app.listen(process.env.PORT, () =>
  console.log("Running on port ", process.env.PORT)
);
