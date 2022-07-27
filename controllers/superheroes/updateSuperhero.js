const { Superhero } = require("../../models");

const updateSuperhero = async (req, res) => {
  console.log(req.body);
  const { id } = req.params;

  await Superhero.findByIdAndUpdate(id, { ...req.body });

  const result = await Superhero.findOne({ id });

  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = updateSuperhero;
