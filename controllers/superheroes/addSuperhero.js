const { Superhero } = require("../../models");
const ObjectID = require("bson-objectid");

const addSuperhero = async (req, res) => {
  console.log(req.body);
  const heroId = await ObjectID();
  const result = await Superhero.create({ ...req.body, heroId });

  res.status(201).json({
    status: "success",
    code: 201,
    message: "A new superhero has been created!",
    data: {
      result,
    },
  });
};

module.exports = addSuperhero;
