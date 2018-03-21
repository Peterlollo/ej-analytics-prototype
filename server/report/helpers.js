const pageviewController = require('../pageview/pageviewController.js')
const Provider = require('../provider/provider.js')
const Page = require('../page/page.js')
const Session = require('../session/session.js')
const {google} = require('googleapis')
const analytics = google.analyticsreporting('v4')

module.exports = {
  // recursively generate report requests until pageToken === undefined
  makeReportRequest: function (jwtClient, request, storeReportData, pageToken, next) {
    if (pageToken) {
      request.reportRequests[0].pageToken = pageToken
      module.exports.authorize(jwtClient, request, storeReportData, next)
    } else {
      next() // pass control to next route-defined function once all reports are requested
    }
  },
  // authorize jwt client, send report request to GA api, call storeData method once report is received
  authorize: function (jwtClient, request, storeReportData, next) {
    jwtClient.authorize(function (err, tokens) {
      if (err) {
        console.log('ERROR WITH JWT AUTH:', err)
      }
      analytics.reports.batchGet({resource: request, auth: jwtClient}, function (err, resp) {
        if (err) {
          console.log('ERROR WITH REPORT BATCH-GET: ', err)
        } else {
          let report = resp.data.reports[0]
          storeReportData(report)
          module.exports.makeReportRequest(jwtClient, request, storeReportData, report.nextPageToken, next)
          console.log('REPORT REQUESTS FINISHED')
        }
      })
    })
  },
  // create initial request body
  initRequest: function () {
    const viewID = '13972743' // Google Analytics view ID
    const request = {
      reportRequests: [
        {
          viewId: viewID,
          pageToken: '0', // API pagination offset
          pageSize: 500, // Number of records to request
          dateRanges: [
            {
              startDate: '2daysAgo',
              endDate: 'today'
            }
          ],
          metrics: [
            {
              expression: 'ga:timeOnPage'
            }
          ],
          dimensions: [
            {
              name: 'ga:networkLocation'
            },
            {
              name: 'ga:pagePath'
            },
            {
              name: 'ga:date'
            }
          ],
          'dimensionFilterClauses': [
            {
              'filters': [
                {
                  'dimensionName': 'ga:networkLocation',
                  'operator': 'REGEXP',
                  'not': true,
                  'expressions': '(not set|customer|internet|broadband|isp|cable com|network|tele|dsl|subscriber|pool|telecom|cable|addresses|telefonica|routed|leased line|communication|comcast|verizon|road runner|service provider|unknown|provider|t-mobile|wifi|telkom|sprint|at-t|residential|province|vodafone|clients|china|dial-up|netblock|wimax|wireless|elisa|sonera|dna oy|at&t|assigned|sl-cgn|block|consumers|kpn|telia|bredband|google|hosting|zscaler|city of|tdc|hubspot)'
                }
              ]
            }
          ]
        }
      ]
    }
    return request
  },
  // store received GA report in DB
  storeReportData: function (report) {
    // report headers
    const dimensions = report.columnHeader.dimensions
    const metrics = report.columnHeader.metricHeader.metricHeaderEntries.map((m) => m.name)

    // indices of variables within rows
    const providerIndex = dimensions.indexOf('ga:networkLocation')
    const pathIndex = dimensions.indexOf('ga:pagePath')
    const dateIndex = dimensions.indexOf('ga:date')
    const timeOnPageIndex = metrics.indexOf('ga:timeOnPage')
    const rows = report.data.rows

    // add report data to DB
    // TODO: delay start of next loop until all data from first loop synced into DB?
    for (var i = 0; i < rows.length; i++) {
      let rowDimensions = rows[i].dimensions
      let provider = rowDimensions[providerIndex]
      let path = rowDimensions[pathIndex]
      let rowMetrics = rows[i].metrics[0].values
      let date = rowDimensions[dateIndex]
      let timeOnPage = Number(rowMetrics[timeOnPageIndex])

      // add Provider
      Provider.findOrCreate({where: {name: provider}})
        .then(() => { // add Page
          Page.findOrCreate({where: {path: path}})
            .then(() => { // add Session
              Provider.findOrCreate({where: {name: provider}}) // search Providers for a match
                .spread((providerFound) => { // format date
                  let searchDate = date.slice(0, 4) + '-' + date.slice(4, 6) + '-' + date.slice(6, 8)
                  Session.findOrCreate({where: {provider: providerFound.id, date: searchDate}})
                }).then(() => { // add Pageview
                  pageviewController.addPageview(provider, path, date, timeOnPage)
                })
            })
        })
    }
  }
}
