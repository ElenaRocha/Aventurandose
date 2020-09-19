const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const User = require("../models/userModel.js");
const getWeather = require("../services/apiWeather.js");

mongoose.set("useFindAndModify", false);

const secret = process.env.SECRET;

mongoose
  .connect(process.env.DDBB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => handleError(error));

mongoose.connection.on("error", (err) => {
  console.log("Database error: ", err);
});

const usersController = {
  getWeather: async function (req, res) {
    const lat = req.params.lat;
    const lon = req.params.lon;

    const weather = await getWeather(lat, lon);

    res.status(200).json(weather);
  },

  createUser: async function (req, res) {
    const userInfo = req.body;

    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(userInfo.password, salt);

    const user = new User();
    user.name = userInfo.name;
    user.surname = userInfo.surname;
    user.alias = userInfo.alias;
    user.email = userInfo.email;
    user.password = encryptedPassword;

    user.save((err, savedInfo) => {
      if (err)
        throw new Error("Ha habido un error al registrar al usuario", err);

      res.status(200).json({
        message: "Se ha resgistrado correctamente",
        savedInfo,
      });
    });
  },

  getUserById: async function (req, res) {
    try {
      const getId = req.params.id;

      const getUser = await User.findById(getId);

      res.status(200).json(getUser);
    } catch (err) {
      res.send("Error al obtener datos");
    }
  },

  updateUser: async function (req, res) {
    const newUserInfo = req.body;
    const userId = req.params.id;

    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(newUserInfo.password, salt);

    User.findByIdAndUpdate(
      userId,
      {
        name: newUserInfo.name,
        surname: newUserInfo.surname,
        alias: newUserInfo.alias,
        email: newUserInfo.email,
        password: encryptedPassword,
      },
      { new: true },
      (err, savedInfo) => {
        if (err)
          throw new Error(
            "Ha habido un error al actualizar los datos del usuario",
            err
          );

        res.status(200).json({
          message: "Usuario actualizado correctamente",
          response: savedInfo,
        });
      }
    );
  },

  unsuscribe: async function (req, res) {
    const userId = req.params.id;
    const userUnsuscribed = await User.findByIdAndDelete(
      userId,
      (err, savedInfo) => {
        if (err) throw new Error("Ha habido un error al darse de baja", err);

        res.status(200).json({
          message: "Usuario dado de baja correctamente",
          savedInfo,
        });
      }
    );
  },

  userLogin: async function (req, res) {
    const userInfo = req.body;

    const userData = await User.findOne({ email: userInfo.email });

    if (!userData) {
      res.status(200).json({
        message: "Usuario o contraseña incorrectos",
      });
      return;
    }

    const passwordIsCorrect = await bcrypt.compare(
      userInfo.password,
      userData.password
    );

    if (!passwordIsCorrect) {
      res.status(200).json({
        message: "Usuario o contraseña incorrectos",
      });
      return;
    }

    const token = jwt.sign({ _id: userData._id }, secret, {
      expiresIn: 60 * 60 * 24,
    });

    const userId = userData._id;

    const role = userData.role;

    res.status(200).json({
      message: "Login correcto",
      token,
      userId,
      role,
    });
  },
};

module.exports = usersController;
