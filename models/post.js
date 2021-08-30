module.exports = (sequelize, DataTypes) => {
    const post = sequelize.define('posts', {
        name: {
            type: DataTypes.STRING
        },
        title: {
            type: DataTypes.STRING
        },
        content: {
            type: DataTypes.STRING
        },
        user_id: { 
            type: DataTypes.INTEGER
        }
    }, { timestamps: true });
    return post;
}


