const Sequelize = require('sequelize');

const db = new Sequelize({
  dialect: "mysql",
  database: "sample",
  username: "abhimanyu",
  password: "abhimanyu",
});

const user = db.define("User", {
    name : {
        type : Sequelize.STRING,
        allowNull : false,
    },
    id : {
        type : Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement : true,
    },
    email : {
        type : Sequelize.STRING,
        allowNull: false,
    },
    password : {
        type: Sequelize.STRING,
        allowNull: false,
    },
    role : {
        type : Sequelize.STRING,
        defaultValue : 'user',
    },
    token : {
        type: Sequelize.STRING,
    },
    logs : {
        type : Sequelize.JSON(),
    }
})

const logs = db.define('logs', {
    email : {
        type : Sequelize.STRING,
        allowNull : false
    },
    client_ip : {
        type : Sequelize.STRING,
        allowNull : false
    },
    activity : {
        type : Sequelize.STRING,
        allowNull : false
    }
})

module.exports = {
    db,user, logs
}