const { Superhero } = require("../../models");

const getAllSuperheroes = async (req, res) => {
  const result = await Superhero.find({}, "-createdAt -updateedAt");
  res.status(200).json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = getAllSuperheroes;
