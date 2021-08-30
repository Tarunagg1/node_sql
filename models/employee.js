module.exports = (sequelize,DataType)=>{
    const Employee = sequelize.define('employee',{
        name:DataType.STRING,
        userId:DataType.INTEGER,
    },{
        timestamps:true,
        paranoid:true,
        deletedAt:'softDelete'
    })
    return Employee
}