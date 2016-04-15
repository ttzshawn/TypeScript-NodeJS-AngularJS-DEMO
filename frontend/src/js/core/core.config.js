/**
 * @author Shawn
 * @desc mainAPP
 */
(() => {
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
        .run(($rootScope, AUTH_EVENTS, AuthService) => {
            $rootScope.$on('$stateChangeStart', (event, next) => {
                if (!AuthService.isAuthenticated()) {
                    $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
                } else {
                    $rootScope.currentUser = AuthService.getUsername();
                }
            });
        })
})();
