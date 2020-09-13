const express = require("express");
const jwt = require("jsonwebtoken");
const trailsController = require("../controllers/trailsController.js");

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

router.get("/listado", trailsController.getAllTrails);
router.get(
  "/listado/categorías/:cathegory",
  trailsController.getTrailByCathegory
);
router.get("/listado/etiquetas/:tag", trailsController.getTrailByTag);
router.get("/listado/ruta/:id", trailsController.getTrailById);
router.post("/formulario", authenticate, trailsController.registerTrail);
router.put("/formulario/:id", authenticate, trailsController.updateTrail);
router.delete("/formulario/:id", authenticate, trailsController.deleteTrail);
router.post(
  "/categorizar/:trail_id/:cathegory_id",
  authenticate,
  trailsController.addCathegory
);
router.post(
  "/etiquetar/:trail_id/:tag_id",
  authenticate,
  trailsController.addTag
);
router.post(
  "/comentar/:trail_id/:user_id",
  authenticate,
  trailsController.addComment
);

module.exports = router;
