/**
 * @author Shawn
 * @desc Controllers of the mainAPP
 */
(() => {
    angular
        .module('app.components')
        .controller('userCtrl', userCtrl);

    userCtrl.$inject = ['$scope', '$rootScope', '$location', 'AUTH_EVENTS', 'AuthService'];
    function userCtrl($scope, $rootScope, $location, AUTH_EVENTS, AuthService) {
        $scope.$on(AUTH_EVENTS.logoutSuccess, (event, data) => {
            $location.path("/");
        });

        if (!AuthService.isAuthenticated()) {
            console.log("user need login");
            $location.path("/login");
        }
    }
})();