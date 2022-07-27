const { Superhero } = require("../../models");
const { NotFound } = require("http-errors");

const deleteSuperhero = async (req, res) => {
  const { id } = req.params;
  const result = await Superhero.findByIdAndRemove(id);

  if (!result) {
    throw new NotFound("There is no such superhero...");
  }

  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = deleteSuperhero;
