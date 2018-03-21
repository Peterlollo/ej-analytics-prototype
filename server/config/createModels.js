const Filter = require('../filter/filter')
const Provider = require('../provider/provider')
const Page = require('../page/page')
const Session = require('../session/session')
const Pageview = require('../pageview/pageview')

const createModels = () => {
  Filter.sync().then(() => {
    Provider.sync().then(() => {
      Page.sync().then(() => {
        Session.sync().then(() => {
          Pageview.sync()
        })
      })
    })
  }).catch((err) => { console.error(err) })
}

module.exports = createModels
