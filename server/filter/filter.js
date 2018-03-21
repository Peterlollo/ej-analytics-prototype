const db = require('../config/db.js')
var Sequelize = require('sequelize')

const Filter = db.define('filter', {
  id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false },
  dimension: { type: Sequelize.STRING, allowNull: false },
  operator: { type: Sequelize.STRING, allowNull: false },
  notValue: { type: Sequelize.BOOLEAN, defaultValue: null },
  expression: { type: Sequelize.TEXT, defaultValue: null },
  creator: { type: Sequelize.STRING, defaultValue: null },
  date: { type: Sequelize.DATEONLY, defaultValue: Sequelize.NOW }
})

module.exports = Filter
