const db = require('../config/db.js')
var Sequelize = require('sequelize')

const Provider = db.define('provider', {
  id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false },
  name: { type: Sequelize.STRING, unique: true, allowNull: false },
  important: { type: Sequelize.BOOLEAN, defaultValue: null },
  sector: { type: Sequelize.STRING, defaultValue: null }
})

module.exports = Provider
