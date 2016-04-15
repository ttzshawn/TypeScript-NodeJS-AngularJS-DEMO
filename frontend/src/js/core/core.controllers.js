/**
 * @author Shawn
 * @desc The Root Controller of the mainAPP
 */
(() => {
    angular
        .module('app.core')
        .controller('mainCtrl', mainCtrl);

    mainCtrl.$inject = ['$rootScope', '$scope', '$location', '$state', '$window', 'AuthService', 'AUTH_EVENTS', 'CommonService'];

    function mainCtrl(
        $rootScope,
        $scope,
        $location,
        $state,
        $window,
        AuthService,
        AUTH_EVENTS,
        CommonService) {

        if (!AuthService.isAuthenticated()) {
            $location.path('/login');
            console.log(1);
        }

        $rootScope.setCurrentUser = user => {
            $rootScope.currentUser = user;
        };

        // Log out
        $scope.logout = () => {
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
        $scope.$on(AUTH_EVENTS.loginSuccess, (event, data) => {
            console.log("login success");
            $state.go('dashboard.order');
        });

        $scope.$on(AUTH_EVENTS.loginFailed, (event, data) => {
            AuthService.destory();
            console.log("login failed");
            // $location.path('/');
        });

        $scope.$on(AUTH_EVENTS.logoutSuccess, (event, data) => {
            AuthService.destroy();
            console.log("login failed");
            // $location.path('/');
        });

        $scope.$on('method-not-allow', (event, data) => {
            console.log("method not allow");
            // $location.path('/');
        });

        $scope.$on(AUTH_EVENTS.pageNotFound, (event, data) => {
            console.log('404 error');
        });

        $scope.$on(AUTH_EVENTS.serverError, (event, data) => {
            console.log('500 error');
        });

    }
})();
