const db = require('../config/db.js')
var Sequelize = require('sequelize')

const Provider = db.define('provider', {
  id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false },
  name: { type: Sequelize.STRING, allowNull: false }
})

module.exports = Provider
