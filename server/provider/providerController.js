const Provider = require('./provider')

module.exports = {
  addProvider: (provider) => {
    Provider.findOrCreate({where: {name: provider}})
  }
}
