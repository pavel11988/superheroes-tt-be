const { Superhero } = require("../../models");

const listSuperheroes = async (req, res) => {
  const { page = 1, limit = 5 } = req.query;

  const numberPage = Number(page);
  const numberLimit = Number(limit);
  console.log(numberPage, numberLimit)

  const skip = (numberPage - 1) * numberLimit;
  const result = await Superhero.find({}, "-createdAt -updatedAt", {
    skip,
    limit: numberLimit,
  });

  const allHeroes =  await Superhero.find({}, "-createdAt -updatedAt");
  const countHeroes = allHeroes.length;
  const totalPages = await Math.ceil(countHeroes / numberLimit); 
  
  console.log(result);

  res.status(200).json({
    totalPages,
    page: numberPage,
    limit: numberLimit,
    data: result,
    
  });
};

module.exports = listSuperheroes;
