const express = require("express");
const { ctrlWrapper, validation } = require("../../middlewares");

const { superheroesSchemas } = require("../../schemas");
const { superheroes: ctrl } = require("../../controllers");
const upload = require("../../middlewares/upload");

const router = express.Router();

// list superheroes
router.get("/", ctrlWrapper(ctrl.listSuperheroes));

// add new superhero
router.post(
  "/",
  validation(superheroesSchemas.addSchema),
  ctrlWrapper(ctrl.addSuperhero)
);

// get superhero by id
router.get("/:id", ctrlWrapper(ctrl.getSuperheroById));

// delete superhero by id
router.delete("/:id", ctrlWrapper(ctrl.deleteSuperhero));

// update superhero
router.put(
  "/:id",
  validation(superheroesSchemas.updateSchema),
  ctrlWrapper(ctrl.updateSuperhero)
);

// add superhero photo
router.patch(
  "/:id",
  upload.single("image"),
  ctrlWrapper(ctrl.addSuperheroImage)
);

// add superhero photo
router.delete("/:superheroId/:imageId", ctrlWrapper(ctrl.deleteSuperheroImage));

module.exports = router;
