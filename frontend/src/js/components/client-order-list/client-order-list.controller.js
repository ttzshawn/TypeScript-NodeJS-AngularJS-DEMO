(function() {
    'use strict';

    angular
        .module('app.components')
        .controller('CoListCtrl', CoListCtrl);

    CoListCtrl.$inject = ['$scope', 'clientOrder'];

    /* @ngInject */
    function CoListCtrl($scope, clientOrder) {

        $scope.toggleMO = function(moid) {
            // $(this).addClass("al")
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
