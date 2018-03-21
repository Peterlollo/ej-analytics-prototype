var reportController = require('../report/reportController.js')

module.exports = function (app, express) {
  app.get('/api/data', reportController.sendData)
  app.get('/api/fetchMoreData', reportController.getAnalyticsData, reportController.sendData)
}
