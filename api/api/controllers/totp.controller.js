const Speakeasy = require('speakeasy');
const mailService = require('../../services/mail.service');

module.exports.postTotpSecrete = (req, res) => {
  const secret = Speakeasy.generateSecret({ length: 20 });
  res.json({ secret: secret.base32 });
};
module.exports.postTotpGenerate = async (req, res) => {
  const OTP = {
    token: Speakeasy.totp({
      secret: req.body.secret,
      encoding: 'base32',
    }),
    remaining: 300 - Math.floor((new Date().getTime() / 1000.0) % 30),
  };
  // console.log(`generate token`);
  // console.log(`secret: ${req.body.secret}`);
  // console.log(`token: ${OTP.token}`);
  return res.json(OTP);
  // console.log(OTP);
  // const sendMail = await mailService.send(
  //   'davera2211@pastmao.com',
  //   'Ma xac thuc',
  //   OTP.token
  // );
  // if (sendMail) {
  //   return res.json({
  //     remaining: OTP.remaining,
  //   });
  // }
};
module.exports.postTotpValidate = (req, res) => {
  const { secret, token } = req.body;
  console.log(`secret: ${secret}`);
  console.log(`token: ${token}`);

  const verify = {
    valid: Speakeasy.totp.verify({
      secret,
      encoding: 'base32',
      token,
      window: 2,
    }),
  };
  console.log(`verify: ${verify.valid}`);

  res.json(verify);
};
