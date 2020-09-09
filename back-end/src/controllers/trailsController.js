//const express = require("express");
const mongoose = require("mongoose");
//const fs = require("fs");

const Trail = require("../models/trailModel.js");
const Cathegory = require("../models/cathegoryModel.js");
const Tag = require("../models/tagModel.js");
const Comment = require("../models/commentModel.js");

//const multer = require('multer');

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
      const trailCollection = await Trail.find();
      res.status(200).json({ ...trailCollection });
    } catch (err) {
      console.log(err);
    }
  },

  getAllTags: async function (req, res) {
    try {
      const trailCollection = await Tag.find();
      res.status(200).json({ ...trailCollection });
    } catch (err) {
      console.log(err);
    }
  },

  getAllCathegories: async function (req, res) {
    try {
      const trailCollection = await Cathegory.find();
      res.status(200).json({ ...trailCollection });
    } catch (err) {
      console.log(err);
    }
  },

  getTrailByCathegory: async function (req, res) {
    try {
      const getCathegory = req.params.cathegory;
      const getTrail = await Trail.find({ cathegories: getCathegory });
      res.status(200).json(getTrail);
    } catch (err) {
      console.log(err);
    }
  },

  getTrailByTag: async function (req, res) {
    try {
      const getTag = req.params.tag;
      const getTrail = await Trail.find({ tags: getTag });
      res.status(200).json(getTrail);
    } catch (err) {
      console.log(err);
    }
  },

  registerTrail: function (req, res) {
    /*if (req.email !== "elenarocha@gmail.com") {
      res.status(401).json({
        message: "No tiene permiso para realizar esta acción",
      });
      return;
    }*/

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
      if (err) throw new Error("Ha habiado un error al registrar la ruta", err);

      res.status(200).json({
        message: "Ruta guardada correctamente",
        trailInfo: savedInfo,
      });
    });
  },

  updateTrail: async function (req, res) {
    /*if (req.email !== "elenarocha@gmail.com") {
      res.status(401).json({
        message: "No tiene permiso para realizar esta acción",
      });
      return;
    }*/

    const newTrailInfo = req.body;
    const trailId = req.params.id;

    const trailUpdated = await Trail.findByIdAndUpdate(trailId, {
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
    });

    trailUpdated.save((err, savedInfo) => {
      if (err) throw new Error("Ha habido un error al actualizar la ruta", err);

      res.status(200).json({
        message: "Se ha actualizado la ruta",
        newTrailInfo: savedInfo,
      });
    });
  },

  deleteTrail: async function (req, res) {
    /*if (req.email !== "elenarocha@gmail.com") {
      res.status(401).json({
        message: "No tiene permiso para realizar esta acción",
      });
      return;
    }*/

    const trailId = req.params.id;
    const trailDeleted = await Trail.findByIdAndDelete(trailId);
    res.status(200).json({ message: "Ruta aliminada" });
  },

  addTag: async function (req, res) {
    const trailId = req.params.trail_id;
    const tagId = req.params.tag_id;

    const tagAdded = await Trail.findByIdAndUpdate(trailId, {
      $push: { tags: tagId },
    });

    /*const trailAdded = await Tag.findByIdAndUpdate(tagId, {
      $push: { trails: trailId },
    });*/

    tagAdded.save((err, savedInfo) => {
      if (err) throw new Error("Ha habiado un error al registrar la ruta", err);

      res.status(200).json({
        message: "Ruta guardada correctamente",
        tagId: savedInfo,
      });
    });
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

    comment.save((err, savedInfo) => {
      if (err) throw new Error("Ha habiado un error al registrar la ruta", err);

      res.status(200).json({
        message: "Ruta guardada correctamente",
        newComment: savedInfo,
      });
    });
  },
};

module.exports = trailController;
