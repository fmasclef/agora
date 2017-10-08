global.express   = require('express')
global.app       = express()

var
  bodyparser = require('body-parser'),
  helmet = require('helmet'),
  compression = require('compression'),
  chronometer = require('./chronometer')

// security settings
app.set('trust proxy', 1)
app.use(helmet())
app.use(compression())

// middlewares
app.use(chronometer());
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }))

app.use(express.static(__dirname + '/../dist'))

// controllers
app.use('/', require('./router'))

// 404
app.use(function(req, res, next) {
  res.status(404)
  return res.json({ code: 404, message: 'Not found' })
})

// Errors
app.use(function(error, req, res, next) {
  let code = ('code' in error) ? error.code: 500
  res.status(code)
  return res.json({ code: code, message: (process.env.NODE_ENV == 'production') ? 'An error occured' : error })
})

module.exports = app
