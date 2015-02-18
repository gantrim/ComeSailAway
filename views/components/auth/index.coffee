app = angular.module('auth', [])

require('./controllers')(app)
#require('./directives')(app)
#require('./services')(app)
require('./factories')(app)

module.exports = app
