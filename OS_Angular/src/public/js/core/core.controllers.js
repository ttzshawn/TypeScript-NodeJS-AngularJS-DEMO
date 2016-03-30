/**
 * @author Shawn
 * @desc The Root Controller of the mainAPP
 */
(function() {
    'use strict';

    angular
        .module('app.core')
        .controller('mainCtrl', mainCtrl);

    mainCtrl.$inject = ['$rootScope', '$scope', '$location', 'AuthService', 'AUTH_EVENTS', 'CommonService', 'Session'];

    function mainCtrl($rootScope, $scope, $location, AuthService, AUTH_EVENTS, CommonService, Session) {
        // for test
        $scope.toggleMO = function() {
            $(this).addClass("al")
            console.log(this)
            $('.mo-list').animate({
                height: 'toggle'
            }, 350);
        }
        $scope.orderItems = [];
        for (var i = 0; i < 30; i++) {
            $scope.orderItems[i] = i;
        }

        $rootScope.setCurrentUser = function(user) {
            $rootScope.currentUser = user;
        };

        // Log out
        $scope.logout = function() {
            Session.destroy();
            $rootScope.currentUser = null;
            AuthService.logout().then(function(res) {
                if (CommonService.isReqSuccess(res)) {
                    $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
                    console.log('Log out success');
                } else {
                    CommonService.handleResErr(res);
                }
            }, function(res) {
                CommonService.handleHttpErr(res);
            });
        }

        // Listening
        $scope.$on(AUTH_EVENTS.loginSuccess, function(event, data) {
            console.log("login success");
            $location.path('/');
        });

        $scope.$on(AUTH_EVENTS.loginFailed, function(event, data) {
            console.log("login failed");
            $location.path('/');
        });

        $scope.$on('method-not-allow', function(event, data) {
            console.log("method not allow");
            $location.path('/');
        });

        $scope.$on(AUTH_EVENTS.pageNotFound, function(event, data) {
            console.log('404 error');
        });

        $scope.$on(AUTH_EVENTS.serverError, function(event, data) {
            console.log('500 error');
        });

    }
})();
