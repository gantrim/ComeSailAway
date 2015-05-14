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
    .otherwise
        redirectTo: '/'
        access: {requiredLogin: false}

    $locationProvider.html5Mode(true)
]
