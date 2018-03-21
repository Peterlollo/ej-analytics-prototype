const Sequelize = require('sequelize')
const env = process.env.NODE_ENV || 'dev'
let db

if (env === 'dev') {
  // local machine ... use mysql
  db = new Sequelize('earthjustice', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    operatorsAliases: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  })
} else {
  // on Heroku ... use the postgres database
  let match = process.env.DATABASE_URL.match(/postgres:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/)
  db = new Sequelize(match[5], match[1], match[2], {
    dialect: 'postgres',
    protocol: 'postgres',
    port: match[4],
    host: match[3],
    logging: false
  })
}

db.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.')
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err)
  })

module.exports = db
