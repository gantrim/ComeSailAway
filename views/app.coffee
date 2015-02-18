home = require('./components/home')
auth = require('./components/auth')
routes = require('./routes')

angular.module('comeSailAway',
  ['ngSanitize', 'ngRoute', 'ngStorage', home.name, auth.name])
.config(routes)
.run ($rootScope, $location, $localStorage, AuthService) ->
  $rootScope.$on '$routeChangeStart', (event, nextRoute, currentRoute) ->
    #    hasRequiredRole = AuthService.hasCorrectRole(nextRoute.access.requiredRole)
    #    console.log isAuthenticated
    if nextRoute.access.requiredLogin and !AuthService.authenticated()
      $location.path '/login'
    return
  return
