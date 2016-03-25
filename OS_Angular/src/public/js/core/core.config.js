/**
 * @author Shawn
 * @desc mainAPP
 */
(function() {
    'use strict';

    angular
        .module('app.core')
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

})();
