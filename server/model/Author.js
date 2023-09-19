const { DataTypes } = require('sequelize')
const sequelize = require('../utils/database')

const Author = sequelize.define('author',{
    id:{
        type:DataTypes.INTEGER,
        required:true,
        autoIncrement:true,
        allowNull:false,
        primaryKey: true
    },
    image:{
        type:DataTypes.STRING,
        required:true,
    },
    name:{
        type:DataTypes.STRING,
        required:true,
    },
    headline:{
        type:DataTypes.STRING,
        required:true
    }
})

module.exports = Author