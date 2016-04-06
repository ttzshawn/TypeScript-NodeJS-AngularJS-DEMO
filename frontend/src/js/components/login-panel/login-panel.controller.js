(function() {
    'use strict';

    angular
        .module('app.components')
        .controller('LoginCtrl', LoginCtrl);

    LoginCtrl.$inject = ['$scope', '$rootScope', '$location', '$http', '$window', '$cookies', '$state', 'AUTH_EVENTS', 'CommonService', 'Session', 'AuthService', 'Login'];

    /* @ngInject */
    function LoginCtrl($scope, $rootScope, $location, $http, $window, $cookies, $state, AUTH_EVENTS, CommonService, Session, AuthService, Login) {

        $scope.user = {};
        $scope.login = function(user) {

            Login.login(user, function(res) {
                if (res.token != undefined && res.token != '') {
                    $window.sessionStorage.token = res.token;
                    $rootScope.currentUser = user.username;
                    $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
                } else {
                    alert('Login failed. Please try again.');
                }
            }, function(res) {
                alert('Invalid username or password. Please login again.');
            });

            console.log(user);
        }
    }

})();
