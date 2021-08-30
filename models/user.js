module.exports = (sequelize, DataTypes) => {
    const user = sequelize.define('user', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            required: true
        },
        email: {
            type: DataTypes.STRING,
            required: true,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING
        }
    }, { 
        timestamps: true,
        hooks: {
            beforeValidate:(user,options) => {
                user.name = "data test";
                user.email = "emailj@gmai.com"
            }
        }
    });
    return user;
}


