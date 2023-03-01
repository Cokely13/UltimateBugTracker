const Sequelize = require('sequelize')
const db = require('../db')

const Bug = db.define('bug', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    // allowNull: false
  },
  steps: {
    type: Sequelize.STRING,
    // allowNull: false
  },
  date: {
    type: Sequelize.DATEONLY,
    allowNull: false,
    defaultValue: Sequelize.NOW
  },
  status: {
    type: Sequelize.ENUM("New", "Working", "Fixed"),
    defaultValue: "New",
    allowNull: false
  },
  priority: {
    type: Sequelize.ENUM("Low", "Medium", "High"),
    defaultValue: "Low",
    allowNull: false
  },
  assigned: {
    type: Sequelize.STRING,
    defaultValue: "None",
  },
  dateAssigned: {
    type: Sequelize.DATEONLY,
  },
  dateFixed: {
    type: Sequelize.DATEONLY,
  },

})

module.exports = Bug
