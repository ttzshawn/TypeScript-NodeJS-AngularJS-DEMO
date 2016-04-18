(() => {
    angular
        .module('app.components')
        .controller('CoListCtrl', CoListCtrl);

    CoListCtrl.$inject = ['$scope', '$rootScope', 'clientOrder', 'marketOrder'];

    /* @ngInject */
    function CoListCtrl($scope, $rootScope, clientOrder, marketOrder) {

        $scope.selectedClientOrderId = "";

        $scope.selectClientOrder = id => {
            if ($scope.selectedClientOrderId == id) {
                $scope.closeMarketOrderList(id);
            } else {
                $scope.selectedClientOrderId = $scope.selectedClientOrderId == id ? "" : id;
            }
        }

        $scope.closeMarketOrderList = id => {
            $scope.selectedClientOrderId = "";
        }
        
        // init
        clientOrder.query({}, res => {
            $scope.clientOrderItems = res;
        });

    }

})();
