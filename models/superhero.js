const { Schema, model } = require("mongoose");

const ImageSchema = new Schema(
  {
    id: {
      type: String,
      required: [true, "Image id"],
    },
    extension: {
      type: String,
      required: [true, "Image extension"],
    }
  },
  { _id: false }
);


const superheroShema = new Schema(
  {
    nickname: {
      type: String,
      required: [true, "Set a nickname for superhero."],
    },
    real_name: {
      type: String,
      required: [true, "Set a name for the superhero."],
    },
    origin_description: {
      type: String,
      required: [true, "Set a description for the superhero."],
    },
    superpowers: {
      type: String,
      required: [true, "Set a superpowers for the superhero."],
    },
    catch_phrase: {
      type: String,
      required: [true, "Set a catch phrase for the superhero."],
    },
    images: [
      {
        type: ImageSchema,
        required: false,
        default: "",
      },
    ],
  },
  { versionKey: false, timestamps: true }
);


const Superhero = model("superheroes", superheroShema);

module.exports = {
  Superhero,
};
