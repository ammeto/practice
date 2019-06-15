const Sequelize = require('sequelize');

const config = require('./config');

console.log('init sequelize...');

const sequelize = new Sequelize(config);

const { STRING, INTEGER } = Sequelize;

//model
var Users = sequelize.define('users', {
    id: {
        type: INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
    },
    name: STRING(100),
    city: STRING(10)
}, {
    tableName: 'users',
    timestamps: true,
    underscoredAll: true
});

//insertInfo
Users.insertInfo = function (name, city) {
    return new Promise((resolve, reject) => {
        Users.create({
            name,
            city,
        }).then(function (data) {
            if (data) {
                resolve(data);
            } else {
                resolve(null);
            }
        }).catch((err) => {
            reject(err);
        })
    })
};

//deleteInfoById
Users.deleteInfoById = function (id) {
    return new Promise((resolve, reject) => {
        Users.destroy({
            where: {
                id,
            }
        }).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
};

//selectAllInfo
Users.selectAllInfo = function () {
    return new Promise((resolve, reject) => {
        Users.findAll().then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
};


module.exports = Users