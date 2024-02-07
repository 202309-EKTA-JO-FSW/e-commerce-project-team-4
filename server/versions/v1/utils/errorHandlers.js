const handleValidationErrors = (err, req, res, next) => {
    if (err.name === 'ValidationError') {
      const errors = {};
      for (const field in err.errors) {
        errors[field] = err.errors[field].message;
      }
      return res.status(400).json({ errors });
    }
    next(err);
  };

  const handleDuplicateKeyError = (err, req, res, next) => {
    if (err.name === 'MongoError' && err.code === 11000) {
      const field = Object.keys(err.keyValue)[0];
      const value = err.keyValue[field];
      return res.status(400).json({ error: `${field} '${value}' already exists` });
    }
    next(err);
  };

  const handleGeneralError = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
  };

  module.exports = {
    handleValidationErrors,
    handleDuplicateKeyError,
    handleGeneralError,
  };
