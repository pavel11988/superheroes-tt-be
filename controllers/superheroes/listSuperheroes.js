const { Superhero } = require("../../models");

const listSuperheroes = async (req, res) => {
  const { page = 1, limit = 5 } = req.query;
  const skip = (page - 1) * limit;
  const result = await Superhero.find({}, "-createdAt -updateedAt", {
    skip,
    limit: Number(limit),
  });
  res.status(200).json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = listSuperheroes;
