/**
 * @author Shawn
 * @desc router of app.core
 */
(function() {
    'use strict';

    angular.module('app.core')

        .config(function($stateProvider, $httpProvider, $urlRouterProvider, $locationProvider) {

            // Interceptor of Requests
            $httpProvider.interceptors.push([
                '$injector',
                function($injector) {
                    return $injector.get('AuthInterceptor');
                }
            ]);

            $locationProvider.html5Mode({
                enabled: false,
                requireBase: false
            });

            // For any unmatched url, redirect to /
            $urlRouterProvider.otherwise('/login');


            // loginregister
            $stateProvider

                // main page
                .state('home', {
                    url: '/',
                    templateUrl: 'html/dashboard.html'
                })

                .state("home.dash1", {
                    url: "dash1",
                    templateUrl: "html/rdash/dashboard.html"
                }).state("home.order", {
                    url: "order",
                    templateUrl: "js/components/client-order-list/client-order-list.html"
                }).state("home.dash2", {
                    url: "dash2",
                    templateUrl: "html/rdash/tables.html"
                })

                .state('login', {
                    url: '/login',
                    templateUrl: 'html/login.html'
                }).state('register', {
                    url: '/register',
                    templateUrl: 'html/register.html'
                })

                // User Account
                .state('account', {
                    url: '/account',
                    templateUrl: 'html/account/account.html'
                }).state('account.me', {
                    url: '/me',
                    templateUrl: 'html/account/account.me.html'
                })

                // for test
                .state('test', {
                    url: '/test',
                    templateUrl: 'html/test-angular-ui-bootstrap.html',
                    controller: 'testCtrl'
                })
        });
})();
