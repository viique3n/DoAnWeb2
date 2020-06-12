const bcrypt = require('bcrypt');
const Sequelize = require('sequelize');
const db = require('../config/sequelize');
const Model = Sequelize.Model;


class User extends Model {
    static async findUserById(id){
        return User.findByPk(id);
    }
    static async findUserByEmail(email){
        return User.findOne({
            where: {
                email
            }
        });
    }
    static hashPassword(password){
        return bcrypt.hashSync(password, 10);
    }

    static verifyPassword(password, passwordHash){
        return bcrypt.compareSync(password, passwordHash);
    }
    static async add(name, dname, passw){
        return Todo.create({username: name, displayname: dname, password: passw});
    }
}
User.init({
    // attributes
    phonenumber: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    displayname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    token: {
        type: Sequelize.STRING,
    },
}, {
    sequelize: db,
    modelName: 'user'
});
module.exports = User;