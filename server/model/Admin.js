const { DataTypes } = require('sequelize')
const sequelize = require('../utils/database')

const Admin = sequelize.define('admin',{
    id:{
        type:DataTypes.INTEGER,
        required:true,
        autoIncrement:true,
        allowNull:false,
        primaryKey: true
    },
    email:{
        type:DataTypes.STRING,
        required:true,
    },
    password:{
        type:DataTypes.STRING,
        required:true,
    },
})

module.exports = Admin