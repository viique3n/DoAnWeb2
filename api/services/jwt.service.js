const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports.generateAccessToken = (data) => {
  const token = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '10m',
  });
  return token;
};
module.exports.generateRefreshToken = (data) => {
  const token = jwt.sign(data, process.env.REFRESH_TOKEN_SECRET);
  return token;
};

module;
