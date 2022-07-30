const path = require("path");
const { v4: uuidv4 } = require("uuid");
const { BadRequest, NotFound } = require("http-errors");

const fs = require("fs/promises");
const Jimp = require("jimp");
const { Superhero } = require("../../models");
const imagesDir = path.join(__dirname, "../../", "public", "images");

const addSuperheroImages = async (req, res) => {

  const { id } = req.params; // id superhero

  const superhero = await Superhero.findById(id);
  if(!superhero){
    throw new NotFound("Superhero not found.");
  }

  if (superhero.images.length === 6) {
    throw new BadRequest("You cannot add more than 6 images.");
  }

  if(!req.file){
    throw new BadRequest("Please, upload your image.");
  }

  const { path: tempDir, originalname } = req.file;
  const [extention] = originalname.split(".").reverse();

  const imageId = uuidv4();
  const newName = `${imageId}.${extention}`;
  const resultDir = path.join(imagesDir, newName);
  await fs.rename(tempDir, resultDir);

  const image = await Jimp.read(resultDir);

  const imageResize = await image.resize(Jimp.AUTO, 400);
  await imageResize.write(resultDir);

  const newImages = [
    ...superhero.images,
    { id: imageId, extension: extention },
  ];

  await Superhero.updateOne({ _id: id }, { $set: { images: newImages } });

  res.status(200).json({
    image: newName,
  });
};

module.exports = addSuperheroImages;
