/**
 * @author Shawn
 * @desc The Root Controller of the mainAPP
 */
(function() {
    'use strict';

    angular
        .module('app.core')
        .controller('mainCtrl', mainCtrl);

    mainCtrl.$inject = ['$rootScope', '$scope', '$location', '$state', '$window', 'AuthService', 'AUTH_EVENTS', 'CommonService', 'Session'];

    function mainCtrl($rootScope, $scope, $location, $state, $window, AuthService, AUTH_EVENTS, CommonService, Session) {

        // if (!$window.sessionStorage.token) {
        //     $location.path('/login');
        //     console.log(1);
        // }

        // for test

        $scope.orderItems = [];
        for (var i = 0; i < 30; i++) {
            $scope.orderItems[i] = i;
        }

        $rootScope.setCurrentUser = function(user) {
            $rootScope.currentUser = user;
        };

        // Log out
        $scope.logout = function() {
            // $window.sessionStorage.token = '';
            // Session.destroy();
            $rootScope.currentUser = null;
            $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
            console.log('logout success');
            // AuthService.logout().then(function(res) {
            //     if (CommonService.isReqSuccess(res)) {
            //         $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
            //         console.log('Log out success');
            //     } else {
            //         CommonService.handleResErr(res);
            //     }
            // }, function(res) {
            //     CommonService.handleHttpErr(res);
            // });
        }

        // Listening
        $scope.$on(AUTH_EVENTS.loginSuccess, function(event, data) {
            console.log("login success");
            $state.go('home.order');
        });

        $scope.$on(AUTH_EVENTS.loginFailed, function(event, data) {
            $window.sessionStorage.token = '';
            console.log("login failed");
            // $location.path('/');
        });

        $scope.$on(AUTH_EVENTS.logoutSuccess, function(event, data) {
            console.log('remove token');
            $window.sessionStorage.removeItem('token');
            console.log("login failed");
            // $location.path('/');
        });

        $scope.$on('method-not-allow', function(event, data) {
            console.log("method not allow");
            // $location.path('/');
        });

        $scope.$on(AUTH_EVENTS.pageNotFound, function(event, data) {
            console.log('404 error');
        });

        $scope.$on(AUTH_EVENTS.serverError, function(event, data) {
            console.log('500 error');
        });

    }
})();
