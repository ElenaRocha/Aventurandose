const express = require("express");
const jwt = require("jsonwebtoken");
const usersController = require("../controllers/usersController.js");

const secret = process.env.SECRET;

const router = express.Router();

function authenticate(req, res, next) {
  const token = req.headers["x-access-token"];
  if (!token) {
    res.status(401).json({
      message: "Debes incluir un token válido en tu petición",
    });
    return;
  }
  const decodedToken = jwt.verify(token, secret);
  req.email = decodedToken.email;

  next();
}

router.get("/el-tiempo/:lat/:lon", usersController.getWeather);
router.post("/darse-de-alta", usersController.createUser);
router.put("/modificar-perfil/:id", authenticate, usersController.updateUser);
router.delete("/darse-de-baja/:id", authenticate, usersController.unsuscribe);
router.post("/entrar", usersController.userLogin);

module.exports = router;
