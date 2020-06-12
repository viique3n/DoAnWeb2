const User = require('../../db/models/user.model');


module.exports.getLogin = (req, res) => res.send('login oke');

module.exports.postLogin = async (req, res, next) => {
    const user = await User.findUserByEmail(req.body.userEmail)
    if(!user || !User.verifyPassword(req.body.userPassword, user.password)){
        console.log('failed');
        return res.json({
            "error": "Email or password is incorrect",
            "login": "failed",
            redirect: "/login"
        });
    }
    console.log('successed');
    //req.session.userId = user.id;
    return res.json({
        user: user,
        "login": "successed",
        redirect: "/"
    });
};