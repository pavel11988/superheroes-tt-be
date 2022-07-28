const { Superhero } = require("../../models");
const ObjectID = require("bson-objectid");

const addSuperhero = async (req, res) => {
  const heroId = await ObjectID();
  const result = await Superhero.create({ ...req.body, heroId });

  res.status(201).json(result);
};

module.exports = addSuperhero;
