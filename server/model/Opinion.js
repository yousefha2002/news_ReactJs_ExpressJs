const { DataTypes } = require('sequelize')
const sequelize = require('../utils/database')

const Opinion = sequelize.define('opinion',{
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
    title:{
        type:DataTypes.STRING,
        required:true,
    },
    description:{
        type:DataTypes.TEXT,
        required:true,
    },
    headLine:{
        type:DataTypes.STRING,
        required:true
    }
})

module.exports = Opinion