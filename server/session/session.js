const db = require('../config/db.js')
const Sequelize = require('sequelize')
const Provider = require('../provider/provider.js')

const Session = db.define('session', {
  id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false },
  date: { type: Sequelize.DATEONLY, allowNull: false },
  provider: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: Provider,
      key: 'id'
    }
  }
})

module.exports = Session
