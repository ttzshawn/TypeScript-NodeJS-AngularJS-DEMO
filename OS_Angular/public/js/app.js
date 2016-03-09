/**
 * @author Shawn
 * @desc mainAPP
 */
(function() {
    'use strict';

    angular.module('mainApp', ['ui.router', 'ui.bootstrap', 'ngAnimate', 'ctrls', 'services', 'filters', 'directives'])

        // Global
        .constant('WEB_INFO', {
            title: 'Order Management System'
        })

        .constant('AUTH_EVENTS', {
            loginSuccess: 'auth-login-success',
            loginFailed: 'auth-login-failed',
            logoutSuccess: 'auth-logout-success',
            sessionTimeout: 'auth-session-timeout',
            notAuthenticated: 'auth-not-authenticated',
            pageNotFound: 'page-not-found',
            serverError: 'server-error'
        })

        // Do auth when state/url change
        .run(function($rootScope, AUTH_EVENTS, AuthService, Session) {
            $rootScope.$on('$stateChangeStart', function(event, next) {
                if (!AuthService.isAuthenticated()) {
                    $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
                } else {
                    $rootScope.currentUser = Session.getUserName();
                }
            });
        })

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
            $urlRouterProvider.otherwise('/');

            // loginregister
            $stateProvider

                // main page
                .state('home', {
                    url: '/',
                    templateUrl: 'partials/home.html',
                    controller: 'indexCtrl'
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