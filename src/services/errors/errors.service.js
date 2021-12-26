const { errorMessages } = require('./errors.model');

const handleNotFound = (reply, entityType) => {
  reply
    .code(404)
    .header('Content-Type', 'application/json; charset=utf-8')
    .send({ error: errorMessages.NOT_FOUND[entityType] });
};

module.exports = {
  handleNotFound,
};
