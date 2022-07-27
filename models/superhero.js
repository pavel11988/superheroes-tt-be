const { Schema, model } = require("mongoose");

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
        type: String,
        required: false,
        default: "",
      },
    ],
  },
  { versionKey: false, timestamps: true }
);

const Superhero = model("superhero", superheroShema);

module.exports = {
  Superhero,
};
