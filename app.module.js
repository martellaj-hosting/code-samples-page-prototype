/* global angular */

(function () {
  angular
    .module('app', [
      'ngRoute',
      'app.layout',
      'app.main',
    ])
    .config(config);

  function config ($routeProvider, $locationProvider) {
    // Configure the routes.
    $routeProvider
      .when('/', {
        templateUrl: 'main/main.html',
        controller: 'MainController',
        controllerAs: 'main',
        activeTab: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });

    // Make the URLs pretty.
    // $locationProvider.html5Mode(true);
  }
})();