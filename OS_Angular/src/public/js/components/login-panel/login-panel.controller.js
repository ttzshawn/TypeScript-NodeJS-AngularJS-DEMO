(function() {
    'use strict';

    angular
        .module('app.components')
        .controller('LoginCtrl', LoginCtrl);

    LoginCtrl.$inject = ['$scope', '$rootScope', '$location', '$http','$window', '$cookies', '$state', 'AUTH_EVENTS', 'CommonService', 'Session', 'AuthService', 'Login'];

    /* @ngInject */
    function LoginCtrl($scope, $rootScope, $location, $http, $window,$cookies, $state, AUTH_EVENTS, CommonService, Session, AuthService, Login) {

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
            // console.log(aaa);
            // console.log(aaa.token);
            // $scope.msg = Login.check(user, function(res) {
            //     console.log(res.token);
            // });


            // AuthService.login(user).then(function(res) {
            //
            //     console.log(res);
            //     if (CommonService.isReqSuccess(res)) {
            //         console.log('login success');
            //         // $cookies.put(res.data.sessionid, user.accountname);
            //         Session.create(res.data.sessionid, user.accountname);
            //         $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
            //         $state.go('home.order');
            //         $rootScope.setCurrentUser(user.accountname);
            //     } else {
            //         CommonService.handleResErr(res);
            //         $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
            //     }
            // }, function(res) {
            //     CommonService.handleHttpErr(res);
            //     $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
            // });
            console.log(user);
        }
    }

})();
