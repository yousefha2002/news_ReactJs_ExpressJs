const { DataTypes } = require('sequelize')
const sequelize = require('../utils/database')

const Category = sequelize.define('category',{
    id:{
        type:DataTypes.INTEGER,
        required:true,
        autoIncrement:true,
        allowNull:false,
        primaryKey: true
    },
    title:{
        type:DataTypes.STRING,
        required:true,
    },
})

module.exports = Category