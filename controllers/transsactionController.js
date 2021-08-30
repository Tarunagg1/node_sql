const { sequelize } = require("../config/db");
const db = require("../config/db");
const userModal = db.user;
const {DataTypes} = require('sequelize');

const transsaction = async (req, res) => {
    let data = null;
    const t = await sequelize.transaction();
    // try {
    //     const user = await userModal.create({name:"t",email:"t@gmail.com",password:"password"},{
    //         transaction:t
    //     });
    //     console.log('commit');
    //     t.commit();
    // } catch (error) {
    //     console.log('rollback');
    //     t.rollback();   
    // }

    data = await userModal.findAll({
        transaction: t,
        lock: true
    });

    return res.status(200).json({ message: 'ok', data });
}


const hooks = async (req, res) => {

    let data = null;

    data = await userModal.create({ name: "t", email: "tpsoj@gmail.com", password: "password" });

    return res.status(200).json({ message: 'ok', data });
}

const queryinterface = (req,res) => {
    let queryInterface =sequelize.getQueryInterface();

    let data = null;

    // queryInterface.createTable('qi',{
    //     name:DataTypes.STRING
    // });

    // queryInterface.addColumn('qi','email',{
    //     type:DataTypes.STRING,
    // })

    // queryInterface.changeColumn('qi','email',{
    //     type:DataTypes.INTEGER
    // })

    // queryInterface.removeColumn('qi','email')

    // queryInterface.dropTable('qi');

    return res.status(200).json({ message: 'ok', data });
}



module.exports = {
    transsaction,
    hooks,
    queryinterface
}