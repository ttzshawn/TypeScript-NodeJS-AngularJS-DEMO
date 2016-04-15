(() => {
    angular
        .module('app.components')
        .controller('MoListCtrl', MoListCtrl);

    MoListCtrl.$inject = ['$scope', '$rootScope', '$location', '$http', '$window', '$cookies', '$state', '$interval', 'AUTH_EVENTS', 'CommonService', 'AuthService', 'marketOrder'];

    /* @ngInject */
    function MoListCtrl(
        $scope,
        $rootScope,
        $location,
        $http,
        $window,
        $cookies,
        $state,
        $interval,
        AUTH_EVENTS,
        CommonService,
        AuthService,
        marketOrder) {

        // console.log($rootScope.moList)
        // $scope.moList = [];
        $interval(() => {
            if ($rootScope.selectedClientOrderId != '' && $rootScope.selectedClientOrderId != undefined && AuthService.isAuthenticated()) {
                marketOrder.query({ coId: $rootScope.selectedClientOrderId }, res => {
                    $scope.moList = res;
                    console.log(res)
                });
            }
        }, 1000);

    }
})();
