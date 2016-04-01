(function() {
    'use strict';

    angular
        .module('app.components')
        .controller('MoListCtrl', MoListCtrl);

    MoListCtrl.$inject = ['$scope', '$rootScope', '$location', '$http', '$window', '$cookies', '$state', 'AUTH_EVENTS', 'CommonService', 'Session', 'AuthService', 'Login'];

    /* @ngInject */
    function MoListCtrl($scope, $rootScope, $location, $http, $window, $cookies, $state, AUTH_EVENTS, CommonService, Session, AuthService, Login) {

        // if (!!$rootScope.currentUser) {
        //     $state.go('home');
        // }


        $scope.user = {};
        $scope.login = function(user) {

            Login.get({}, function(res) {
                console.log(res)
                $window.sessionStorage.token = res.token || '';
                $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
                $state.go('home.order');
            }, function(res) {
                alert('login failed.');
            });

            console.log(user);
        }
    }

})();
