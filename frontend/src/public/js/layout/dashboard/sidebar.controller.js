(function() {
    'use strict';

    angular.module('app.layout')
        // dashboard Sidebar
        .controller("MasterCtrl", MasterCtrl);

    MasterCtrl.$inject = ["$scope", "$cookies"];


    function MasterCtrl($scope, $cookies) {
        /**
         * Sidebar Toggle & Cookies Control
         */
        var mobileView = 992;
        $scope.getWidth = function() {
            return window.innerWidth;
        };
        $scope.$watch($scope.getWidth, function(newValue, oldValue) {
            if (newValue >= mobileView) {
                if (angular.isDefined($cookies.get('toggle'))) {
                    $scope.toggle = !$cookies.get('toggle') ? true : false;
                } else {
                    $scope.toggle = false;
                }
            } else {
                $scope.toggle = true;
            }
        });
        $scope.toggleSidebar = function() {
            $scope.toggle = !$scope.toggle;
            $cookies.put('toggle', $scope.toggle);
        };
        window.onresize = function() {
            $scope.$apply();
        };
    }


})();