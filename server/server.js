const express = require('express')
const createModels = require('./config/createModels.js')
const path = require('path')
const serveStatic = require('serve-static')

createModels()
const app = express()
app.use(serveStatic(path.join(__dirname, '/dist')))

const port = process.env.PORT || 5000

require('./config/middleware.js')(app, express)
require('./config/routes.js')(app, express)

app.listen(port)
console.log('server started ' + port)
