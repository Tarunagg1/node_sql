const { Sequelize,Op, QueryTypes } = require('sequelize');
const db = require('../config/db');
const UserModal = db.user;


const adduser = async (req, res) => {
    let data = await UserModal.create({ name: "Tarun", email: "tarun@gmail.com", password: "tarun" });
    return res.status(200).json({ message: "ok" });
}


const crudController = async (req, res) => {
    let data = null;
    //  data = await UserModal.create({ name: "Tarun", email: "tarun@gmail.com", password: "tarun" },{
    //      fields:["name","email"]
    //  });


    //  data = await UserModal.update({ name: "arun"},{where: {id:2}})
    //  data = await UserModal.destroy({ where:{id:2}});

    // find
    // data = await UserModal.findAll({})

    // data = await UserModal.findAll({
    //     attributes: [
    //         "name", "email",
    //         [Sequelize.fn('Count', Sequelize.col('email')),"emailcount"]
    //     ]
    // })

    // data = await UserModal.findAll({
    //     attributes: { 
    //         exclude: ['createdAt', 'updatedAt'],
    //         include:[
    //             [Sequelize.fn('CONCAT',Sequelize.col('name'),' Aggarwal'),"Fullname"]
    //         ]
    //      }
    // })

    // data = await UserModal.findAll({
    //     where: {
    //         id: {
    //             [Op.lte]: 5
    //         }
    //     },
    //     group:["name"],
    //     limit:2
    // });
    data = await UserModal.findAll({})

    return res.status(200).json({ message: "ok", data });

}


const finderController = async (req,res) => {
    let data =null;

    data = await UserModal.findAll({});
    // data = await UserModal.findByPk(7);

    data = await UserModal.findAndCountAll({});
    

    return res.status(200).json({ message: "finder", data });
}



const rawQueryController = async (req,res) => {       
    let data = null;
    data = await db.sequelize.query("SELECT * FROM users where name=:name",{
        // type:QueryTypes.SELECT,
        // module:UserModal,
        // raw:true,
        replacements:{name:'tarun'}
    });

    return res.status(200).json({ message: "finder", data });}


module.exports = {
    adduser,
    crudController,
    finderController,
    rawQueryController
}