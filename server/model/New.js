const { DataTypes } = require('sequelize')
const sequelize = require('../utils/database')

const New = sequelize.define('new',{
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
    views:{
        type:DataTypes.INTEGER,
        defaultValue:0
    },
    isSelected:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
    }
})

module.exports = New