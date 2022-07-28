const { Superhero } = require("../../models");
const { NotFound } = require("http-errors");

const updateSuperhero = async (req, res) => {
  const { id } = req.params;
  try {
    await Superhero.findByIdAndUpdate(id, { ...req.body });
    const result = await Superhero.findOne({ id });
    res.status(200).json(result);
  } catch {
    throw new NotFound();
  }
};

module.exports = updateSuperhero;
