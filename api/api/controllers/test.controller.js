const User = require('../../db/models/user.model');

//#region 
module.exports.getIndex = function(req, res, next){
    res.send("API is working properly");
};

module.exports.postIndex = function(req, res){
    console.log('request body');
    console.log(req.body);
    res.render(req.body);
};
//#endregion