(function() {
    'use strict';

    angular
        .module('app.components')
        .controller('LoginCtrl', LoginCtrl);

    LoginCtrl.$inject = ['$scope', '$rootScope', '$location', '$http', '$window', '$cookies', '$state', 'AUTH_EVENTS', 'CommonService', 'Session', 'AuthService', 'Login'];

    /* @ngInject */
    function LoginCtrl($scope, $rootScope, $location, $http, $window, $cookies, $state, AUTH_EVENTS, CommonService, Session, AuthService, Login) {

        // TODO check if user is Login
        if ($window.sessionStorage.token != undefined && $window.sessionStorage.token != '') {
            $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
        }


        $scope.user = {};




        function Alert() {
            this.add = function(msg) {
                $scope.errMsg = true;
                $scope.alerts.push();
            }
        }
        $scope.alerts = [];
        $scope.closeAlert = function(index) {
            $scope.alerts.splice(index, 1);
            $scope.errMsg = "";
        };
        $scope.addAlert = function(msg) {

        };

        $scope.login = function(user) {

            Login.login(user, function(res) {
                if (res.token != undefined && res.token != '') {
                    $window.sessionStorage.token = res.token;
                    $rootScope.currentUser = user.username;
                    $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
                } else {
                    $scope.addAlert({ type: "danger", msg: 'Login failed. Please try again.' });
                }
            }, function(res) {
                $scope.addAlert({ type: "danger", msg: 'Invalid username or password. Please login again.' });
            });

            console.log(user);
        };
    }

})();
