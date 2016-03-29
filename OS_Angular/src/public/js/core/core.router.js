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
        $urlRouterProvider.otherwise('login');


        // loginregister
        $stateProvider

        // main page
        .state('home', {
            url: '/',
            templateUrl: 'views/dashboard.html'
        })

        .state("home.dash1", {
            url: "dash1",
            templateUrl: "views/rdash/dashboard.html"
        }).state("home.order", {
            url: "order",
            templateUrl: "views/rdash/order-list.html"
        }).state("home.dash2", {
            url: "dash2",
            templateUrl: "views/rdash/tables.html"
        })

        .state('login', {
            url: '/login',
            templateUrl: 'views/login.html'
        }).state('register', {
            url: '/register',
            templateUrl: 'views/register.html'
        })

        // User Account
        .state('account', {
            url: '/account',
            templateUrl: 'views/account/account.html'
        }).state('account.me', {
            url: '/me',
            templateUrl: 'views/account/account.me.html'
        }).state('account.charge', {
            url: '/charge',
            templateUrl: 'views/account/account.charge.html',
            controller: 'chargeCtrl'
        }).state('account.card', {
            url: '/card',
            templateUrl: 'views/account/account.card.html'
        }).state('account.coupons', {
            url: '/coupons',
            templateUrl: 'views/account/account.coupons.html'
        }).state('account.deposit', {
            url: '/deposit',
            templateUrl: 'views/account/account.deposit.html'
        }).state('account.gold', {
            url: '/gold',
            templateUrl: 'views/account/account.gold.html'
        }).state('account.reserve', {
            url: '/reserve',
            templateUrl: 'views/account/account.reserve.html'
        }).state('account.transaction', {
            url: '/transaction',
            templateUrl: 'views/account/account.transaction.html'
        }).state('account.withdraw', {
            url: '/withdraw',
            templateUrl: 'views/account/account.withdraw.html'
        })

        // for test
        .state('test', {
            url: '/test',
            templateUrl: 'views/test-angular-ui-bootstrap.html',
            controller: 'testCtrl'
        })
    });
})();
