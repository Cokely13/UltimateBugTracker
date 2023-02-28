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
    type: Sequelize.ENUM("Unassigned", "Working", "Fixed"),
    defaultValue: "Unassigned",
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

})

module.exports = Bug
