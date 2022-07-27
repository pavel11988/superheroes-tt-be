const path = require("path");
const { v4: uuidv4 } = require("uuid");

const fs = require("fs/promises");
const Jimp = require("jimp");
const { Superhero } = require("../../models");
const imagesDir = path.join(__dirname, "../../", "public", "images");

const changeSuperheroImages = async (req, res) => {
  console.log("change images");

  const { id } = req.params; // id superhero
  const { imageToRemove } = req.body; // if we deleting some image

  if (imageToRemove) {
    console.log(imageToRemove);

    const superhero = await Superhero.findById(id);
    const removeIndex = await superhero.images.findIndex((image) => {
      const [extention, imagePath] = image.split(".").reverse();
      const [imageName] = imagePath.split("/").reverse();
      if (imageName === imageToRemove) {
        fs.unlink(`${imagesDir}/${imageName}.${extention}`);
      }
      return imageName === imageToRemove;
    });

    let newImages = superhero.images;
    newImages.splice(removeIndex, 1);

    await Superhero.findByIdAndUpdate(id, {
      images: newImages,
    });

    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        imageToRemove,
      },
    });
  }

  if (!imageToRemove) {
    const { path: tempDir, originalname } = req.file;
    const [extention] = originalname.split(".").reverse();

    const newName = `${uuidv4()}.${extention}`;
    const resultDir = path.join(imagesDir, newName);
    await fs.rename(tempDir, resultDir);

    const image = await Jimp.read(resultDir);
    const imageResize = await image.resize(Jimp.AUTO, 400);
    await imageResize.write(resultDir);

    const imageURL = path.join("images", newName);
    console.log(imageURL);

    const superhero = await Superhero.findById(id);

    const newImages = [...superhero.images, imageURL];

    await Superhero.findByIdAndUpdate(id, { images: newImages });

    res.status(201).json({
      newImages,
    });
  }
};

module.exports = changeSuperheroImages;
