const { Superhero } = require("../../models");

const listSuperheroes = async (req, res) => {
  const { page = 1, limit = 5 } = req.query;

  const numberPage = Number(page);
  const numberLimit = Number(limit);

  const skip = (numberPage - 1) * numberLimit;
  const result = await Superhero.find({},{}, {
    skip,
    limit: numberLimit,
    sort: {
      createdAt: -1
    }
  });

  const countHeroes =  await Superhero.find({});
  const totalPages = await Math.ceil(countHeroes.length / numberLimit); 
  
  res.status(200).json({
    totalPages,
    page: numberPage,
    limit: numberLimit,
    data: result,
    
  });
};

module.exports = listSuperheroes;
