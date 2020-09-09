const express = require("express");
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
router.get("/listado/:cathegory", trailsController.getTrailByCathegory);
router.get("/listado/:tag", trailsController.getTrailByTag);
router.post("/formulario", trailsController.registerTrail);
router.put("/formulario/:id", trailsController.updateTrail);
router.delete("/formulario/:id", trailsController.deleteTrail);
router.post("/etiquetar/:trail_id/:tag_id", trailsController.addTag);
router.post("/comentar/:trail_id/:user_id", trailsController.addComment);

module.exports = router;