module.exports = (app)->
  app.controller "AuthCtrl", ["$scope", "$location", "$window", '$localStorage', "AuthService", "UserService"
    ($scope, $location, $window, $localStorage, AuthService, UserService) ->
      $scope.roles = {}
      #Admin User Controller (login, logout)
      $scope.logIn = ->
        username = $scope.username
        password = $scope.password
        #TODO: add error handling
        if username isnt `undefined` and password isnt `undefined`
          UserService.logIn(username, password)
          .success((data) ->
            AuthService.authenticate(data["user"], data["passport"], data["roles"])
            $location.path '/'
            return
          )
          .error (status, data) ->
            console.log status
            console.log data
            return

      $scope.logOut = ->
        UserService.logOut()
        $location.path "/"
        return

      $scope.register = ->
        console.log "here"
        username = $scope.username
        email = $scope.email
        password = $scope.password

        if username and email and password
          UserService.register(username, email, password)

      $scope.authenticated = ->
        AuthService.authenticated()

      $scope.authenticatedUserName = ->
        return AuthService.authenticatedUserName();
  ]
