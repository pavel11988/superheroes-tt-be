const path = require("path");
const { NotFound } = require("http-errors");
const fs = require("fs/promises");
const { Superhero } = require("../../models");
const imagesDir = path.join(__dirname, "../../", "public", "images");

const deleteSuperheroImages = async (req, res) => {
  const { superheroId, imageId } = req.params;

  const superhero = await Superhero.findById(superheroId);
  if (superhero === null) {
    throw new NotFound();
  }

  const newImages = superhero.images;

  const index = superhero.images.findIndex((image) => image.id === imageId);
  if (index > -1) {
    const image = superhero.images[index];
    const path = `${imagesDir}/${image.id}.${image.extension}`;
    try {
      fs.unlink(path);
    } catch {
      res.status(404).json({
        message: `File not found: ${path}`,
      });
    }
    newImages.splice(index, 1);
    await Superhero.updateOne(
      { _id: superheroId },
      { $set: { images: newImages } }
    );
  } else {
    throw new NotFound();
  }

  res.status(200).json();
};

module.exports = deleteSuperheroImages;
