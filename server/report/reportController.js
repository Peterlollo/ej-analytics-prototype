const Provider = require('../provider/provider.js')
const Page = require('../page/page.js')
const Session = require('../session/session.js')
const Pageview = require('../pageview/pageview.js')
const helpers = require('./helpers')
const {google} = require('googleapis')
// service account key object
// const key = require('../config/googleKey.json') // local dev
const key = process.env.googleKey // prod

const request = helpers.initRequest()
const makeReportRequest = helpers.makeReportRequest
const storeReportData = helpers.storeReportData

module.exports = {
  getAnalyticsData: function (req, res, next) {
    const jwtClient = new google.auth.JWT(
      key.client_email,
      null,
      key.private_key,
      ['https://www.googleapis.com/auth/analytics.readonly'], // an array of auth scopes
      null
    )
    // initialize first report request with pageToken set to '0'
    makeReportRequest(jwtClient, request, storeReportData, '0', next)
  },
  sendData: function (req, res, next) {
    Provider.findAll().then((providers) => {
      Page.findAll().then((pages) => {
        Session.findAll().then((sessions) => {
          Pageview.findAll().then((pageviews) => {
            res.send({providers, pages, sessions, pageviews})
          })
        })
      })
    })
  }
}
