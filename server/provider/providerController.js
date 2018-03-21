const Provider = require('./provider')
const Promise = require('bluebird')

module.exports = {
  addProvider: (provider) => {
    Provider.findOrCreate({where: {name: provider}})
  }
}
