const jwt = require('jsonwebtoken');
const decode = require('jwt-decode');
require('dotenv').config();

module.exports.generateAccessToken = (data) => {
  const token = jwt.sign({ data }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '10m',
  });
  const { exp } = decode(token);
  console.log(`acesstoken =${token}`);
  console.log('expiretime');
  console.log(new Date(exp * 1000));
  return token;
};
module.exports.generateRefreshToken = (data) => {
  const token = jwt.sign(data, process.env.REFRESH_TOKEN_SECRET);
  return token;
};

module;
