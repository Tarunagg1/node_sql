const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize("work", "root", "", {      // connection
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
    pool: { max: 10, min: 0, idle: 10000 }
})

sequelize.authenticate()        // connection aplying
    .then(() => {                    // checkig
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    })


const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require('../models/user')(sequelize, DataTypes);  // importing modal

db.sequelize.sync({ force: false });   // syn all databases

module.exports = db;     // exporting db object




// Modal design
module.exports = (sequelize, DataTypes) => {
    const user = sequelize.define('user', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            required: true
        },
        email: {
            type: DataTypes.STRING,
            required: true
        },
        password: {
            type: DataTypes.STRING
        }
    }, { timestamps: true });
    return user;
}


/// insert data

let data = await UserModal.create({ name: "Tarun", email: "tarun@gmail.com", password: "tarun" });  // insert
{
    let data = new UserModal({ name: "Tarun", email: "tarun@gmail.com", password: "tarun" });  // insert
    data.save(); // save
}
let data = await UserModal.create({ name: "Tarun", email: "tarun@gmail.com", password: "tarun" });  // insert

data = await UserModal.create({ name: "Tarun", email: "tarun@gmail.com", password: "tarun" }, {
    fields: ["name", "email"]        // allowing only name or email fields
});



// update
let data = await UserModal.update({ name: "arun" }, { where: { id: 2 } })

// delete
let data = await UserModal.destroy({ where: { id: 2 } });

// find
data = await UserModal.findAll({})          // Select all rows
data = await UserModal.findOne({})          // Select One row

data = await UserModal.findAll({
    attributes: [            // Select all rows with limited fields
        "name", "email"
    ]
})

// Applying function
data = await UserModal.findAll({
    attributes: [
        "name", "email",
        [Sequelize.fn('Count', Sequelize.col('email')), "emailcount"]
    ]
})


// Include and exclude attributes
data = await UserModal.findAll({
    attributes: {
        exclude: ['createdAt', 'updatedAt'],
        include: [
            [Sequelize.fn('CONCAT', Sequelize.col('name'), ' Aggarwal'), "Fullname"]
        ]
    }
})


// Condition
data = await UserModal.findAll({
    where: {
        id: {
            [Op.lte]: 5
        }
    },
    group: ["name"],
    limit: 2
})


// finder
data = await UserModal.findAll({});  // get all record
data = await UserModal.findByPk(7);  // get record by primary key

data = await UserModal.findAndCountAll({});  // get all record with there counts


// Join one to One
db.user.hasOne(db.post,{foreignKey:'user_id'})
// db.post.belongsTo(db.user,{foreignKey:'user_id'});

let data = await userModal.findAll({
    include:postModal,
    where:{id:1}
});

// join onetomany
db.user.hasMany(db.post,{foreignKey:'user_id'}) // hasmany


// paranoid
soft delete your data 
declare your model with paranoid:true

// Hooks

before create
after create
before validate
after validate
before delete
after delete



// queryinterface
let queryInterface =sequelize.getQueryInterface();

// Create table
queryInterface.createTable('qi',{
    name:DataTypes.STRING
});

// -- Add column
queryInterface.addColumn('qi','email',{
    type:DataTypes.STRING,
})


// -- alter column
queryInterface.changeColumn('qi','email',{
    type:DataTypes.INTEGER
})

// - remove column
queryInterface.removeColumn('qi','email')

// -- drop table
queryInterface.dropTable('qi');


// migration
npm i sequlize-cli
npx sequelize-cli init
npx sequelize-cli model:generate --name anyname --attributes name:string,email:string
npx sequelize-cli db:migrate

npx sequelize-cli db:migrate:undo  // undo last migration
npx sequelize-cli db:migrate:undo:all  // undo all migration
npx sequelize-cli db:migrate:undo --name 20210830052721-create-cli.js  // undo by name migration
npx sequelize-cli db:migrate:status // check status



// seeders
npx sequelize-cli seed:generate --name createcli
sequelize-cli db:seed:all
sequelize-cli db:seed --seed 20210830054622-createcli.js







