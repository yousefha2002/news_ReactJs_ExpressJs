const { DataTypes } = require('sequelize')
const sequelize = require('../utils/database')

const SocialMedia = sequelize.define('socialMedia',{
    id:{
        type:DataTypes.INTEGER,
        required:true,
        autoIncrement:true,
        allowNull:false,
        primaryKey: true
    },
    Link:{
        type:DataTypes.STRING,
        required:true,
    },
})

module.exports = SocialMedia