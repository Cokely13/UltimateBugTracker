//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User')
const Bug = require('./models/Bug')

//associations could go here!
User.hasMany(Bug)
Bug.belongsTo(User)

module.exports = {
  db,
  models: {
    User,
    Bug
  },
}
