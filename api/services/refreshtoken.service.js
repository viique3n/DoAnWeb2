const RefreshToken = require('../db/models/RefreshToken.Model');

//#region BaseService
module.exports.taoToken = async (token) => {
  const newToken = await RefreshToken.create({
    token,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  if (!newToken) {
    return { error: 'errrorrr' };
  }
  return newToken;
};
module.exports.findToken = async (token) => {
  const rs = RefreshToken.findByPk(token);
  if (!rs) {
    return {
      error: 'Token không tồn tại',
    };
  }
  return rs;
};
//#endregion
