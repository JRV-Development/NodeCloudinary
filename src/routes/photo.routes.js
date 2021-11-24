const { Router } = require("express");
const router = Router();
const {
  renderImage,
  renderFormImage,
  addImage,
  deletedImage,
} = require("../controllers/photo.controllers");

router.get("/", renderImage);

router.get("/addImage", renderFormImage);
router.post("/addImage", addImage);

router.delete("/delete/image/:photo_id", deletedImage);

module.exports = router;
