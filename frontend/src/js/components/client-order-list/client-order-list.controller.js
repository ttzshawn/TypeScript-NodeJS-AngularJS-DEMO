(function() {
    'use strict';

    angular
        .module('app.components')
        .controller('CoListCtrl', CoListCtrl);

    CoListCtrl.$inject = ['$scope', '$rootScope', 'clientOrder', 'marketOrder'];

    /* @ngInject */
    function CoListCtrl($scope, $rootScope, clientOrder, marketOrder) {
        
        $scope.toggleMO = function(coId) {

            // $(this).addClass("al")
            // $rootScope.coId = moid;
            $rootScope.selectedClientOrderId = coId;
            marketOrder.query({ coId: coId }, function(res) {
                // $rootScope.moList = res;
                console.log(res)
            });

            console.log(this)
            $('.mo-list').animate({
                height: 'toggle'
            }, 350);
        }

        clientOrder.query({}, function(res) {
            $scope.clientOrderItems = res;
        });
        // $scope.clientOrderItems = []; 
        // for (var i = 0; i < 30; i++) {
        //     $scope.clientOrderItems[i] = i;
        // }

    }

})();
