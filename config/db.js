const {Sequelize, DataTypes} = require('sequelize');


const sequelize = new Sequelize("work", "root", "", {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
    pool: { max: 10, min: 0, idle: 10000 }
})

sequelize.authenticate()
.then(()=> {
    console.log('Connection has been established successfully.');
})
.catch(err => {
    console.error('Unable to connect to the database:', err);
})


const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require('../models/user')(sequelize,DataTypes);
db.post = require('../models/post')(sequelize,DataTypes);
db.employee = require('../models/employee')(sequelize,DataTypes);

// db.user.hasOne(db.post,{foreignKey:'user_id'})  // hasone
db.user.hasMany(db.post,{foreignKey:'user_id'}) // hasmany

db.post.belongsTo(db.user);

db.sequelize.sync({force: false});

module.exports = db;
