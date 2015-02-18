module.exports = (app)->
  app.controller "HomeCtrl", ["$rootScope", "$scope", "$location", '$localStorage', "Home", "AuthService", "UserService"
    ($rootScope, $scope, $location, $localStorage, Home, AuthService, UserService) ->

  ]

