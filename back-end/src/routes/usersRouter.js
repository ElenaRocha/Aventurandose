const express = require("express");
const jwt = require("jsonwebtoken");
const usersController = require("../controllers/usersController.js");

const secret = process.env.SECRET;

const router = express.Router();

function authenticate(req, res, next) {
  const token = req.headers["x-access-token"];
  if (!token) {
    res.status(200).json({
      message: "Debes incluir un token válido en tu petición",
    });
    return;
  }
  const decodedToken = jwt.verify(token, secret);

  next();
}

router.get("/el-tiempo/:lat/:lon", usersController.getWeather);

router.post("/darse-de-alta", usersController.createUser);
router.get("ver-perfil/:id", authenticate, usersController.getUserById);
router.put("/ver-perfil/:id", authenticate, usersController.updateUser);
router.delete("/ver-perfil/:id", authenticate, usersController.unsuscribe);
router.post("/entrar", usersController.userLogin);

module.exports = router;
