const Pageview = require('./pageview')
const Session = require('../session/session')
const Provider = require('../provider/provider')
const Page = require('../page/page')

module.exports = {
  addPageview: (provider, path, date, timeOnPage) => {
    Provider.findOrCreate({where: {name: provider}}) // search providers table for a matching provider
      .spread((foundProvider) => {
        Page.findOrCreate({where: {path: path}})
          .spread((foundPage) => {
            let searchDate = date.slice(0, 4) + '-' + date.slice(4, 6) + '-' + date.slice(6, 8)
            Session.findOrCreate({where: {provider: foundProvider.id, date: searchDate}})
              .spread((foundSession) => {
                Pageview.findOrCreate(
                  {
                    where:
                    {
                      date: searchDate,
                      seconds: timeOnPage,
                      session: foundSession.id,
                      provider: foundProvider.id,
                      page: foundPage.id
                    }
                  }
                )
              })
          })
      })
  }
}
