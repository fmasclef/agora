/**
 * agora
 * a super fast frontend PReact app server
 *
 * created by François Masclef
 */
global.config   = require('../config/' + (process.env.NODE_ENV || 'production') + '.json')
global.cluster  = require('cluster')
global.pjson    = require('../package.json')
global.winston  = require('winston')

global.basePath = __dirname

let
  path = require('path'),
  figlet = require('figlet')

/**
 * Patch String class
 */

String.prototype.ucfirst = function()
{
   return this.charAt(0).toUpperCase() + this.substr(1).toLowerCase()
}

/**
 * Configure Winston
 */
winston.configure({ level: config.log.level || 'info', transports: [] });
if (config.log.console.enabled) winston.add(winston.transports.Console, { colorize: true, timestamp: true })
if (config.log.file.enabled) winston.add(winston.transports.File,{
  filename : config.log.file.filename || '/var/log/caligarum/caligarum.log',
  maxsize  : config.log.file.size || 1024,
  maxFiles : config.log.file.files || 10
})

/**
 * Start server in a clustered world
 */
if (cluster.isMaster) {

  // Hello
  figlet.text(pjson.name, {
      font: 'Small',
      horizontalLayout: 'default',
      verticalLayout: 'default'
    }, function(err, data) {
      if (err) {
        winston.error(err)
        return
      }
      console.log(data)
    }
  )

  winston.info("%s %s running on port %d from %s", pjson.name, pjson.version, config.server.port, basePath)

  // Let's fork
  var cpuCount = config.server.threads || require('os').cpus().length;
  winston.info('spawning %d workers', cpuCount)
  for (let i=0; i<cpuCount; i+=1) {
    cluster.fork()
  }
  // handle dying workers
  cluster.on('exit', function(worker) {
    winston.warn('worker %d died, respawning', worker.id)
    cluster.fork()
  })

} else {
  let app = require('./app')
  app.set('port', config.server.port)
  let server = app.listen(app.get('port'), function() { })
}
