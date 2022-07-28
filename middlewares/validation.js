const validation = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      error.status = 422;
      next(error);
    }
    next();
  };
};

module.exports = validation;
