const { Superhero } = require("../../models");

const listSuperheroes = async (req, res) => {
  const { page = 1, limit = 5 } = req.query;
  const skip = (page - 1) * limit;
  const result = await Superhero.find({}, "-createdAt -updatedAt", {
    skip,
    limit: Number(limit),
  });

  console.log(result);

  res.status(200).json({
    page: page,
    limit: limit,
    data: result,
  });
};

module.exports = listSuperheroes;
