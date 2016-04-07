(function() {
    'use strict';

    angular
        .module('app.components')
        .controller('CoListCtrl', CoListCtrl);

    CoListCtrl.$inject = ['$scope', '$rootScope', 'clientOrder', 'marketOrder'];

    /* @ngInject */
    function CoListCtrl($scope, $rootScope, clientOrder, marketOrder) {

        $scope.selectCo = function(coId) {
             $rootScope.selectedClientOrderId = $rootScope.selectedClientOrderId == coId ? "" : coId;
        }

        // init
        clientOrder.query({}, function(res) {
            $scope.clientOrderItems = res;
        });

    }

})();
