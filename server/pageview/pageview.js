const db = require('../config/db.js')
const Sequelize = require('sequelize')
const Provider = require('../provider/provider.js')
const Page = require('../page/page.js')
const Session = require('../session/session.js')

const Pageview = db.define('pageview', {
  id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false },
  date: { type: Sequelize.DATEONLY, allowNull: false, defaultValue: Sequelize.NOW },
  seconds: { type: Sequelize.INTEGER, allowNull: false },
  session: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: Session,
      key: 'id'
    }
  },
  provider: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: Provider,
      key: 'id'
    }
  },
  page: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: Page,
      key: 'id'
    }
  }
})

module.exports = Pageview
