'use strict';

/**
 * @ngdoc overview
 * @name AdministrativeApp
 * @description
 * # AdministrativeApp
 *
 * Main module of the application.
 */
var app = angular
  .module('AdministrativeApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap',
    'smart-table'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/employee', {
        templateUrl: 'views/employee.html',
        controller: 'EmployeeCtrl'
      })
      .when('/inventory', {
        templateUrl: 'views/inventory.html',
        controller: 'InventoryCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginController'
      })
      .when('/purchase', {
        templateUrl: 'views/purchase.html',
        controller: 'PurchaseCtrl'
      })
  })

  .run(['$rootScope', '$location', '$cookieStore', '$http',
    function ($rootScope, $location, $cookieStore, $http) {
        // keep user logged in after page refresh
        $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
        }
 
        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in
            if ($location.path() !== '/login' && !$rootScope.globals.currentUser) {
                $location.path('/login');
            }
        });
    }]);