home = require('./components/home')
routes = require('./routes')

angular.module('comeSailAway',
  ['ngSanitize', 'ngRoute', 'ngStorage', home.name])
.config(routes)
.run ($rootScope, $location, $localStorage) ->
  $rootScope.$on '$routeChangeStart', (event, nextRoute, currentRoute) ->
  return
