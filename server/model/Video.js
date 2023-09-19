const { DataTypes } = require('sequelize')
const sequelize = require('../utils/database')

const Video = sequelize.define('video',{
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
    url:{
        type:DataTypes.STRING,
        required:true,
    },
})

module.exports = Video