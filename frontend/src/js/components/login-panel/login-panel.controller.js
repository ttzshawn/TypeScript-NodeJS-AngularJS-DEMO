(() => {
    angular
        .module('app.components')
        .controller('LoginCtrl', LoginCtrl);

    LoginCtrl.$inject = ['$scope', '$rootScope', '$location', '$http', '$window', '$cookies', '$state', 'AUTH_EVENTS', 'CommonService', 'AuthService', 'Login'];

    /* @ngInject */
    function LoginCtrl(
        $scope,
        $rootScope,
        $location,
        $http,
        $window,
        $cookies,
        $state,
        AUTH_EVENTS,
        CommonService,
        AuthService,
        Login) {

        // TODO check if user is Login
        if (AuthService.isAuthenticated()) {
            $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
        }


        $scope.user = {};

        // $scope.alerts = []
        $scope.Alerts = {
            isShow: false,
            alerts: [],
            add(msg) {
                this.isShow = true;
                this.alerts = [];
                this.alerts.push(msg);
            },
            close(index) {
                this.isShow = false;
                this.alerts.splice(index, 1);
            }
        };


        $scope.login = user => {

            Login.login(user, res => {
                if (res.token != undefined && res.token != '') {
                    AuthService.createUserInfo(user.username, res.token);
                    $rootScope.currentUser = user.username;
                    $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
                    $scope.Alerts.close();
                } else {
                    $scope.Alerts.add({ type: "danger", msg: 'Login failed. Please try again.' });
                }
            }, res => {
                $scope.Alerts.add({ type: "danger", msg: res.data.reason || "Login failed." });
            });

            console.log(user);
        };
    }
})();
