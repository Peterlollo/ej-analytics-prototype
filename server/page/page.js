const db = require('../config/db.js')
var Sequelize = require('sequelize')

const Page = db.define('page', {
  id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false },
  path: { type: Sequelize.STRING, allowNull: false }
})

module.exports = Page
