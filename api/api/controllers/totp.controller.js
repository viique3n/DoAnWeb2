const Speakeasy = require('speakeasy');

module.exports.postTotpSecrete = (req, res) => {
  const secret = Speakeasy.generateSecret({ length: 20 });
  res.json({ secret: secret.base32 });
};
module.exports.postTotpGenerate = (req, res) => {
  res.json({
    token: Speakeasy.totp({
      secret: req.body.secret,
      encoding: 'base32',
    }),
    remaining: 300 - Math.floor((new Date().getTime() / 1000.0) % 30),
  });
};
module.exports.postTotpValidate = (req, res) => {
  res.json({
    valid: Speakeasy.totp.verify({
      secret: req.body.secret,
      encoding: 'base32',
      token: req.body.token,
      window: 0,
    }),
  });
};
