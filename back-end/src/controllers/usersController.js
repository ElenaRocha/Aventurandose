const mongoose = require("mongoose");
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
        userInfo: savedInfo,
      });
    });
  },

  updateUser: async function (req, res) {
    const newUserInfo = req.body;
    const userId = req.params.id;

    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(newUserInfo.password, salt);

    const userUpdated = await User.findByIdAndUpdate(userId, {
      name: newUserInfo.name,
      surname: newUserInfo.surname,
      alias: newUserInfo.alias,
      email: newUserInfo.email,
      password: encryptedPassword,
    });

    userUpdated.save((err, savedInfo) => {
      if (err)
        throw new Error(
          "Ha habido un error al actualizar los datos del usuario",
          err
        );

      res.status(200).json({
        message: "Usuario actualizado correctamente",
        newUserInfo: savedInfo,
      });
    });
  },

  unsuscribe: async function (req, res) {
    const userId = req.params.id;
    const userUnsuscribed = await User.findByIdAndDelete(userId);
    res.status(200).json({
      message: "El usuario se ha dado de baja",
    });
  },

  userLogin: async function (req, res) {
    const userInfo = req.body;

    const userData = await User.findOne({ email: userInfo.email }).exec();

    if (!userData) {
      res.status(401).json({
        message: "Usuario o contraseña incorrectos",
      });
      return;
    }
    const passwordIsCorrect = await bcrypt.compare(
      password,
      userData[0].password
    );
    if (!passwordIsCorrect) {
      res.status(401).json({
        message: "Usuario o contraseña incorrectos",
      });
      return;
    }
    const token = jwt.sign({ email }, secret, { expiresIn: "1d" });
    res.status(200).json({
      message: "Login correcto",
      token,
      email,
    });
  },
};

module.exports = usersController;
