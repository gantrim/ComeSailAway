"use strict"
module.exports = (app)->
  app.factory "AuthService", ($localStorage) ->
    authenticated: ->
      if $localStorage.user && $localStorage.user.passport && $localStorage.user.roles
        return true
      else
        return false
    authenticate: (user, passport, roles)->
      $localStorage.user = user
      $localStorage.user.passport = passport;
      $localStorage.user.roles = roles
    unauthenticate: ->
      delete $localStorage.token
      delete $localStorage.user
    hasCorrectRole: (requiredRole)->
      hasRole = false
      # route requires role
      if(requiredRole)
        # user is logged in, they should have roles
        if this.authenticated()
          user = $localStorage.user
          for role in user.roles
            #if they have a matching role return immediately
            if role.name == requiredRole
              return true
      else
        hasRole = true
      return hasRole
    authenticatedUserName: ->
      if($localStorage.user)
        return $localStorage.user.username
      else
        return "Guest"


  app.factory "UserService", ($http, $rootScope, $localStorage, $location, AuthService) ->
    logIn: (username, password) ->
      $http.post("/auth/local/login",
        provider: "local",
        action: "login",
        identifier: username
        password: password
      )
    #TODO: call http logout function to invalidate token
    logOut: ->
      if AuthService.authenticated()
        AuthService.unauthenticate()

    #todo add error handling
    register: (username, email, password)->
      $http.post("/auth/local",
        provider: "local",
        action: "register",
        username: username
        email: email
        password: password
      ).success((data) ->
        console.log(data)
        $localStorage.token = data.token
      ).error (status, data) ->
        console.log status
        console.log data
    currentUser: ->
      if AuthService.authenticated()
        return $localStorage.user
      else
        return null

  app.factory "TokenInterceptor", ($q, $localStorage, $location, AuthService) ->
    request: (config) ->
      config.headers ?= {}
      if $localStorage.token
        config.headers.Authorization = 'Bearer ' + $localStorage.token
      return config

    requestError: (rejection) ->
      return $q.reject rejection

    response: (response)->
      return response or $q.when response
    responseError: (rejection) ->
      if rejection isnt null and rejection.status == 401 and AuthService.authenticated()
        AuthService.unauthenticate()
        delete $localStorage.token
        $location.path "/login"

      return $q.reject rejection
