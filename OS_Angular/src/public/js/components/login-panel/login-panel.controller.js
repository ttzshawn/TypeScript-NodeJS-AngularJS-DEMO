(function() {
    'use strict';

    angular
        .module('app.components')
        .controller('LoginCtrl', LoginCtrl);

    LoginCtrl.$inject = ['$scope', '$rootScope', '$location', '$http', '$cookies', '$state', 'AUTH_EVENTS', 'CommonService', 'Session', 'AuthService'];

    /* @ngInject */
    function LoginCtrl($scope, $rootScope, $location, $http, $cookies, $state, AUTH_EVENTS, CommonService, Session, AuthService) {

        // if (!!$rootScope.currentUser) {
        //     $state.go('home');
        // }

        $scope.user = {};
        $scope.login = function(user) {

            AuthService.login(user).then(function(res) {

                console.log(res);
                if (CommonService.isReqSuccess(res)) {
                    console.log('login success');
                    // $cookies.put(res.data.sessionid, user.accountname);
                    Session.create(res.data.sessionid, user.accountname);
                    $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
                    $state.go('home.order');
                    $rootScope.setCurrentUser(user.accountname);
                } else {
                    CommonService.handleResErr(res);
                    $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
                }
            }, function(res) {
                CommonService.handleHttpErr(res);
                $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
            });
            console.log(user);
        }
    }

})();