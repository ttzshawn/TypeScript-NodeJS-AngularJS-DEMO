/**
 * @author Shawn
 * @desc mainAPP
 */
(function() {
    'use strict';

    angular.module('router', [])

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
        $urlRouterProvider.otherwise('order');


        // loginregister
        $stateProvider

        // main page
        .state('home', {
            url: '/',
            templateUrl: 'partials/home.html',
            controller: 'indexCtrl'
        })

        .state("home.dash1", {
            url: "dash1",
            templateUrl: "partials/rdash/dashboard.html"
        }).state("home.order", {
            url: "order",
            templateUrl: "partials/rdash/orderlist.html"
        }).state("home.dash2", {
            url: "dash2",
            templateUrl: "partials/rdash/tables.html"
        })

        .state('login', {
            url: '/login',
            templateUrl: 'partials/login.html',
            controller: 'loginCtrl'
        }).state('register', {
            url: '/register',
            templateUrl: 'partials/register.html'
        })

        // User Account
        .state('account', {
            url: '/account',
            templateUrl: 'partials/account/account.html'
        }).state('account.me', {
            url: '/me',
            templateUrl: 'partials/account/account.me.html'
        }).state('account.charge', {
            url: '/charge',
            templateUrl: 'partials/account/account.charge.html',
            controller: 'chargeCtrl'
        }).state('account.card', {
            url: '/card',
            templateUrl: 'partials/account/account.card.html'
        }).state('account.coupons', {
            url: '/coupons',
            templateUrl: 'partials/account/account.coupons.html'
        }).state('account.deposit', {
            url: '/deposit',
            templateUrl: 'partials/account/account.deposit.html'
        }).state('account.gold', {
            url: '/gold',
            templateUrl: 'partials/account/account.gold.html'
        }).state('account.reserve', {
            url: '/reserve',
            templateUrl: 'partials/account/account.reserve.html'
        }).state('account.transaction', {
            url: '/transaction',
            templateUrl: 'partials/account/account.transaction.html'
        }).state('account.withdraw', {
            url: '/withdraw',
            templateUrl: 'partials/account/account.withdraw.html'
        })

        // for test
        .state('test', {
            url: '/test',
            templateUrl: 'partials/test-angular-ui-bootstrap.html',
            controller: 'testCtrl'
        })
    });
})();
