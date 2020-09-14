//const express = require("express");
const mongoose = require("mongoose");
//const fs = require("fs");

const Trail = require("../models/trailModel.js");
const User = require("../models/userModel.js");
const Cathegory = require("../models/cathegoryModel.js");
const Tag = require("../models/tagModel.js");
const Comment = require("../models/commentModel.js");
const getWeather = require("../services/apiWeather.js");

//const multer = require("multer");

//const app = express();

/*app.use(multer({ dest: "./uploads/",
  rename: function (fieldname, filename) {
    return filename;
  },
 }));*/

mongoose
  .connect(process.env.DDBB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => handleError(error));

mongoose.connection.on("error", (err) => {
  console.log("Database error: ", err);
});

mongoose.set("useFindAndModify", false);

const trailController = {
  getAllTrails: async function (req, res) {
    try {
      const trailCollection = await Trail.find()
        .populate("cathegories")
        .populate("tags")
        .populate("comments");
      res.status(200).json({ ...trailCollection });
    } catch (err) {
      res.send("Error al obtener datos");
    }
  },

  getAllTags: async function (req, res) {
    try {
      const trailCollection = await Tag.find().populate("trails");
      res.status(200).json({ ...trailCollection });
    } catch (err) {
      res.send("Error al obtener datos");
    }
  },

  getAllCathegories: async function (req, res) {
    try {
      const trailCollection = await Cathegory.find().populate("trails");
      res.status(200).json({ ...trailCollection });
    } catch (err) {
      res.send("Error al obtener datos");
    }
  },

  getTrailByCathegory: async function (req, res) {
    try {
      const getCathegory = req.params.cathegory;

      const getTrail = await Trail.find({ cathegories: getCathegory })
        .populate("cathegories")
        .populate("tags")
        .populate("comments");
      res.status(200).json(getTrail);
    } catch (err) {
      res.send("Error al obtener datos");
    }
  },

  getTrailByTag: async function (req, res) {
    try {
      const getTag = req.params.tag;
      const getTrail = await Trail.find({ tags: getTag })
        .populate("cathegories")
        .populate("tags")
        .populate("comments");
      res.status(200).json(getTrail);
    } catch (err) {
      res.send("Error al obtener datos");
    }
  },

  getTrailById: async function (req, res) {
    try {
      const getId = req.params.id;

      const getTrail = await Trail.findById(getId)
        .populate("cathegories")
        .populate("tags")
        .populate("comments");

      const lat = await getTrail.location[0];
      const lon = await getTrail.location[1];

      const weather = await getWeather(lat, lon);

      res.status(200).json({
        ...getTrail,
        weather,
      });
    } catch (err) {
      res.send("Error al obtener datos");
    }
  },

  registerTrail: function (req, res) {
    if (req.email !== "elenarocha@gmail.com") {
      res.status(401).json({
        message: "No tiene permiso para realizar esta acción",
      });
      return;
    }

    const trailInfo = req.body;

    const trail = new Trail();
    trail.name = trailInfo.name;
    trail.description = trailInfo.description;
    trail.time = trailInfo.time;
    trail.length = trailInfo.length;
    trail.slope = trailInfo.slope;
    trail.circular = trailInfo.circular;
    trail.province = trailInfo.province;
    trail.location = trailInfo.location;
    trail.trasnport = trailInfo.transport;
    trail.cathegories = trailInfo.cathegory;

    trail.save((err, savedInfo) => {
      if (err) throw new Error("Error al registrar la ruta", err);

      res.status(200).json({
        message: "Ruta guardada correctamente",
        savedInfo,
      });
    });
  },

  updateTrail: async function (req, res) {
    if (req.email !== "elenarocha@gmail.com") {
      res.status(401).json({
        message: "No tiene permiso para realizar esta acción",
      });
      return;
    }

    const newTrailInfo = req.body;
    const trailId = req.params.id;

    Trail.findByIdAndUpdate(
      trailId,
      {
        name: newTrailInfo.name,
        description: newTrailInfo.description,
        time: newTrailInfo.time,
        length: newTrailInfo.length,
        slope: newTrailInfo.slope,
        circular: newTrailInfo.circular,
        province: newTrailInfo.province,
        location: newTrailInfo.location,
        trasnport: newTrailInfo.transport,
        cathegories: newTrailInfo.cathegory,
      },
      { new: true },
      (err, savedInfo) => {
        if (err) throw new Error("Error al actualizar la ficha de ruta", err);

        res.status(200).json({
          message: "Ruta actualizada correctamente",
          savedInfo,
        });
      }
    );
  }, //si dejas campos sin enviar, se resetean a null

  deleteTrail: async function (req, res) {
    if (req.email !== "elenarocha@gmail.com") {
      res.status(401).json({
        message: "No tiene permiso para realizar esta acción",
      });
      return;
    }

    const trailId = req.params.id;
    Trail.findByIdAndDelete(trailId, (err, savedInfo) => {
      if (err) throw new Error("Error al eliminar ruta", err);

      res.status(200).json({
        message: "Ruta eliminada correctamente",
        savedInfo,
      });
    });
  },

  addCathegory: async function (req, res) {
    if (req.email !== "elenarocha@gmail.com") {
      res.status(401).json({
        message: "No tiene permiso para realizar esta acción",
      });
      return;
    }

    const trailId = req.params.trail_id;
    const cathegoryId = req.params.cathegory_id;

    Trail.findByIdAndUpdate(
      trailId,
      {
        $push: { cathegories: cathegoryId },
      },
      (err, response, savedInfo) => {
        if (err) throw new Error("Error al asignar categoría", err);

        Cathegory.findByIdAndUpdate(
          cathegoryId,
          {
            $push: { trails: trailId },
          },
          (err, resp2) => {
            if (err) throw new Error("Error al guardar categoría", err);

            res.status(200).json({
              message: "Categoría guardada correctamente",
              savedInfo,
            });
          }
        );
      }
    );
  }, //limitar el número  de etiquetas y catewgorías por ruta, y asegurarse de que no se repiten

  addTag: async function (req, res) {
    const trailId = req.params.trail_id;
    const tagId = req.params.tag_id;

    Trail.findByIdAndUpdate(
      trailId,
      {
        $push: { tags: tagId },
      },
      (err, response, savedInfo) => {
        if (err) throw new Error("Error al asignar etiqueta", err);

        Tag.findByIdAndUpdate(
          tagId,
          {
            $push: { trails: trailId },
          },
          (err, resp2) => {
            if (err) throw new Error("Error al guardar la etiqueta", err);

            res.status(200).json({
              message: "Etiqueta guardada correctamente",
              savedInfo,
            });
          }
        );
      }
    );
  },

  addComment: async function (req, res) {
    const newComment = req.body;
    const trailId = req.params.trail_id;
    const userId = req.params.user_id;

    const comment = new Comment();
    comment.title = newComment.title;
    comment.content = newComment.content;
    comment.trail = trailId;
    comment.user = userId;

    comment.save((err, response, savedInfo) => {
      if (err) throw new Error("Error al publicar el comentario", err);

      Trail.findByIdAndUpdate(
        trailId,
        { $push: { comments: response._id } },
        (err, resp2) => {
          if (err) throw new Error("Error al guardar el comentario", err);
        }
      );

      User.findByIdAndUpdate(
        userId,
        { $push: { comments: response._id } },
        (err, resp3) => {
          if (err) throw new Error("Error al guardar el comentario", err);

          res.status(200).json({
            message: "Comentario publicado correctamente",
            savedInfo,
          });
        }
      );
    });
  },
};

module.exports = trailController;
