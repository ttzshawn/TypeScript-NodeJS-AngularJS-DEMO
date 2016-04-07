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

        // $scope.alerts = []
        $scope.Alerts = {
            isShow: false,
            alerts: [],
            add: function(msg) {
                this.isShow = true;
                this.alerts = [];
                this.alerts.push(msg);
            },
            close: function(index) {
                this.isShow = false;
                this.alerts.splice(index, 1);
            }
        };


        $scope.login = function(user) {

            Login.login(user, function(res) {
                if (res.token != undefined && res.token != '') {
                    $window.sessionStorage.token = res.token;
                    $rootScope.currentUser = user.username;
                    $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
                    $scope.Alerts.close();
                } else {
                    $scope.Alerts.add({ type: "danger", msg: 'Login failed. Please try again.' });
                }
            }, function(res) {
                console.log(res)
                $scope.Alerts.add({ type: "danger", msg: res.data.reason });
            });

            console.log(user);
        };
    }

})();
