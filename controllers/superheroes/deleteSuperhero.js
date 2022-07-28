const { Superhero } = require("../../models");
const { NotFound } = require("http-errors");

const deleteSuperhero = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Superhero.findByIdAndRemove(id);
    if (!result) {
      throw new NotFound();
    }
  } catch {
    throw new NotFound();
  }

  res.status(200).json();
};

module.exports = deleteSuperhero;
