//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User')
const Bug = require('./models/Bug')
const Project = require('./models/Project')

//associations could go here!
User.hasMany(Bug)
Bug.belongsTo(User)
Project.hasMany(Bug)
Bug.belongsTo(Project)

module.exports = {
  db,
  models: {
    User,
    Bug,
    Project
  },
}
