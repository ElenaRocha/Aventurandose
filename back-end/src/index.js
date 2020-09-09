require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const trailsRouter = require("./routes/trailsRouter.js");
const usersRouter = require("./routes/usersRouter.js");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("combined"));
//app.use(express.static(__dirname + "/public"));

app.use("/rutas", trailsRouter);
app.use("/usuarios", usersRouter);

/*app.use((err, req, res, next) => {
  if (res.headersSent) return next(err);
  res.status(400).json({ err: err });
});*/

app.listen(process.env.PORT, () =>
  console.log("Running on port ", process.env.PORT)
);