module.exports = ['$routeProvider', '$locationProvider', '$httpProvider',
  ($routeProvider, $locationProvider, $httpProvider) ->
    $routeProvider
    .when '/',
      templateUrl: "components/home/homeView.html"
      controller: 'HomeCtrl'
      access: {requiredLogin: false}
    .when '/home',
      templateUrl: "components/home/homeView.html"
      controller: 'HomeCtrl'
      access: {requiredLogin: false}
    .when '/login',
      templateUrl: "components/auth/login.html"
      controller: 'AuthCtrl'
      access: {requiredLogin: false}
    .when '/register',
      templateUrl: "components/auth/register.html"
      controller: 'AuthCtrl'
      access: {requiredLogin: false}
    .otherwise
        redirectTo: '/'
        access: {requiredLogin: false}

    $locationProvider.html5Mode(true)
    $httpProvider.interceptors.push 'TokenInterceptor'
]
