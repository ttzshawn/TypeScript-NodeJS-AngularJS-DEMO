(function() {
    'use strict';

    angular
        .module('app.components')
        .controller('CoListCtrl', CoListCtrl);

    CoListCtrl.$inject = ['$scope', 'clientOrder'];

    /* @ngInject */
    function CoListCtrl($scope, clientOrder) {
            
        clientOrder.get(clientOrder, function(res) {
            console.log(res)
        }, function(res) {
            console.log('Can not load data.');
        });
        $scope.clientOrderItems = []; 
        for (var i = 0; i < 30; i++) {
            $scope.clientOrderItems[i] = i;
        }
       
    }

})();
