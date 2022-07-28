const { Superhero } = require("../../models");
const { NotFound } = require("http-errors");

const getSuperheroById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Superhero.findById(id);
    if (!result) {
      throw new NotFound("There is no such superhero.");
    }
    res.status(200).json({
      data: result,
    });
  } catch {
    throw new NotFound();
  }
};

module.exports = getSuperheroById;
