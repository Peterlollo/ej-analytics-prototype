const Session = require('./session')
const Provider = require('../provider/provider')

module.exports = {
  addSession: (provider, date) => {
    Provider.findOrCreate({where: {name: provider}}) // search providers table for a matching provider
      .spread((providerFound) => {
        let searchDate = date.slice(0, 4) + '-' + date.slice(4, 6) + '-' + date.slice(6, 8)
        Session.findOrCreate({where: {provider: providerFound.id, date: searchDate}})
      })
  }
}
