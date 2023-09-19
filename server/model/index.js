const Admin = require('./Admin')
const Author = require('./Author')
const Category = require('./Category')
const New = require('./New')
const Opinion = require('./Opinion')
const Video = require('./Video')
const SocialMedia = require('./SocialMedia')

Author.hasMany(Opinion)
Opinion.belongsTo(Author)

Category.hasMany(Opinion)
Opinion.belongsTo(Category)

Category.hasMany(New)
New.belongsTo(Category)

module.exports = {Admin,Author,Category,New,Opinion,Video,SocialMedia}