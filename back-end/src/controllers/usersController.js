const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const User = require("../models/userModel.js");

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
      res.status(401).json({
        message: "Usuario o contraseña incorrectos",
      });
      return;
    }

    const passwordIsCorrect = await bcrypt.compare(
      userInfo.password,
      userData.password
    );

    if (!passwordIsCorrect) {
      res.status(401).json({
        message: "Usuario o contraseña incorrectos",
      });
      return;
    }

    const token = jwt.sign({ email: userData.email }, secret, {
      expiresIn: 60 * 60 * 24,
    });

    res.status(200).json({
      message: "Login correcto",
      token,
      //email,
    });
  },
};

module.exports = usersController;
