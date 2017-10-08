/**
 * Main router
 */

var
  router = express.Router(),
  fs = require('fs')

/**
 * Default route.
 */

router.get('/', function(req, res, next) {
  res.status(200)
  res.send(fs.readFileSync('../../dist/index.html'))
})

/**
 * Make this router available
 */

module.exports = router;
