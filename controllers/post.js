const db = require('../config/db');

const postModal = db.post;
const userModal = db.user;
const employeeModal = db.employee;


const addpost = async (req, res) => {
    const newpost = await postModal.create({ name: "tarun", title: "title", content: "content", user_id: 2 });
    return res.status(200).json({ message: 'ok', newpost });
}

const onetoone = async (req, res) => {
    let data = await userModal.findAll({
        include: [
            {
                model: postModal,
                attribute: ['title']
            }
        ],
        where: { id: 1 }
    });
    return res.status(200).json({ message: 'ok', data });
}

const onetomany = async (req, res) => {
    let data = await userModal.findAll({
        include: [
            {
                model: postModal,
                attribute: ['title']
            }
        ],
        where: { id: 1 }
    });
    return res.status(200).json({ message: 'ok', data });
}


const paranoid = async (req, res) => {
    let data = null;
    data = await employeeModal.findAll({});
    // data which is soft deleted
    // data = await employeeModal.findAll({
    //     paranoid:false
    // });

    // data = await employeeModal.destroy({
    //     where: { id: 2 }
    // });

    // data = await employeeModal.restore({
    //     where: { id: 2 }
    // });

    return res.status(200).json({ message: 'ok', data });
}




module.exports = {
    onetoone,
    addpost,
    onetomany,
    paranoid
}