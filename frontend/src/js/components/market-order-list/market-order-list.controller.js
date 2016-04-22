(() => {
    angular
        .module('app.components')
        .controller('MoListCtrl', MoListCtrl);

    MoListCtrl.$inject = ['$scope', '$rootScope', '$location', '$http', '$window', '$cookies', '$state', '$interval', 'AUTH_EVENTS', 'CommonService', 'AuthService', 'marketOrder', 'mo'];

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
        marketOrder,
        mo) {
        
        // init
        $scope.marketOrderList = mo.get();

        $scope.$on('market-orde-have-been-set', function (data) {
            $scope.marketOrderList = mo.get();
        });
        $scope.$on('market-orde-have-been-updated', function (data) {
            $scope.marketOrderList = mo.get();
        });
    }
})();
