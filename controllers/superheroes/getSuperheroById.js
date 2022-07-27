const { Superhero } = require("../../models");
const { NotFound } = require("http-errors");

const getSuperheroById = async (req, res) => {
  const { id } = req.params;
  const result = await Superhero.findById(id);

  if (!result) {
    throw new NotFound("There is no such superhero.");
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = getSuperheroById;
